"""
Services utils (Google)
"""

import os
import urllib.parse
from typing import List, Tuple

import google_auth_oauthlib
import googleapiclient.discovery
import google.oauth2.credentials
from sqlalchemy.orm import Session

from src.constants import Environment
from src.models.Services import Service
from src.models.User import UserMe


class Google:

    @staticmethod
    def credentials_to_dict(credentials: google_auth_oauthlib.flow.InstalledAppFlow.credentials) -> dict:
        """
        Credentials to dict
        :param credentials: Credentials
        :return: Dict
        """
        return {'token': credentials.token,
                'refresh_token': credentials.refresh_token,
                'token_uri': credentials.token_uri,
                'client_id': credentials.client_id,
                'client_secret': credentials.client_secret,
                'scopes': credentials.scopes}

    @staticmethod
    def get_authorization_url(service: str, scopes: List[str], redirect: str,
                              Env: Environment.Settings = Environment.Settings()) -> Tuple[str, str]:
        """
        Get authorization url and state
        :param service: Service
        :param scopes: Scopes
        :param redirect: Redirect
        :param login_hint: Login hint
        :param Env: Environment
        :return: Authorization url
        """
        flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
            os.path.join('secrets', f'Google.json'),
            scopes=scopes
        )
        redirect = redirect.replace(service, urllib.parse.quote(service))
        flow.redirect_uri = redirect
        authorization_url, state = flow.authorization_url(
            access_type='offline',
            include_granted_scopes='true',
        )
        return authorization_url, state

    @staticmethod
    def authorize(service: str, state: str, code: str, scopes: List[str], redirect: str,
                  Env: Environment.Settings = Environment.Settings()) -> dict:
        """
        Authorize
        :param service: Service
        :param state: State
        :param code: Code
        :param scopes: Scopes
        :param Env: Environment
        :return: Credentials in dict
        """
        flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
            os.path.join('secrets', f'Google.json'),
            scopes=scopes,
            state=state,
        )
        redirect = redirect.replace(service, urllib.parse.quote(service))
        flow.redirect_uri = redirect
        try:
            flow.fetch_token(code=code)
        except Exception as e:
            raise Service.Exception.InvalidGrant(str(e))
        return Google.credentials_to_dict(credentials=flow.credentials)

    @staticmethod
    def get_service(service: str, db_service_name: str, User: UserMe, db: Session,
                    version: str) -> googleapiclient.discovery.Resource:
        """
        Get service from service name and user (optional refresh the credentials)
        :param service: Service
        :param db_service_name: Service name in database
        :param User: User
        :param db: Session of database
        :param version: Version
        :return: Service
        """
        refresh = db.query(Service).filter(Service.name == db_service_name,
                                           Service.user_id == User.id).first()
        if refresh is None:
            raise Service.Exception.InvalidService("Service non trouvé ou non autorisé")
        refresh = refresh.refresh
        if not refresh:
            db.query(Service).filter(Service.name == db_service_name, Service.user_id == User.id).delete()
            db.commit()
            raise Service.Exception.InvalidService("Service non trouvé ou non autorisé")

        credentials = google.oauth2.credentials.Credentials(**refresh)
        db.query(Service).filter(Service.name == db_service_name, Service.user_id == User.id).update(
            {"refresh": Google.credentials_to_dict(credentials)})
        db.commit()
        return googleapiclient.discovery.build(service, version, credentials=credentials)

    @staticmethod
    def get_headers_from_message(baseData: dict, toFill: dict) -> dict:
        """
        Get headers from message
        :param baseData: Base data
        :param toFill: Dict to fill
        :return: Headers
        """
        if "headers" not in baseData:
            return toFill
        for header in baseData["headers"]:
            for key in toFill.keys():
                if key == header["name"]:
                    toFill[key] = header["value"]
        return toFill
