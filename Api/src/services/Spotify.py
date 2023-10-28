import json
import urllib
from typing import List

import requests
from sqlalchemy.orm import Session

from src.models.Services import BaseService, save_start_authorization, Service, add_metadata, ServiceMetadata, \
    ServiceType
from src.models.User import UserMe
from src.utils.Helper import warn, get_random_string, encode_base64
from src.constants import Environment


class Spotify(BaseService):

    def __init__(self, User: UserMe | None = None, db: Session | None = None):
        super().__init__(User, db)
        self.service_name = "Calendar"
        self.version = "v3"

    @staticmethod
    def get_name() -> str:
        """
        Get name of service
        :return: Name of service
        """
        return "Spotify"

    @staticmethod
    def get_authorization_url(User: UserMe, db: Session,
                              Env: Environment.Settings = Environment.Settings()) -> str:
        """
        Get authorization url
        :param User: User
        :param db: Session of database
        :param Env: Environment
        :return: Authorize URL
        """
        try:
            with open("secrets/Spotify.json") as f:
                client_id = json.load(f)["client_id"]
        except Exception as e:
            warn("Spotify.json not found or invalid")
            raise Service.Exception.InvalidGrant(str(e))
        state = get_random_string(32)
        redirect_uri = urllib.parse.quote(f"{Env.REDIRECT_URI}/services/{Spotify.get_name()}/authorize")
        save_start_authorization(Spotify.get_name(), state, User, db)
        return f"https://accounts.spotify.com/authorize?client_id={client_id}&response_type=code&redirect_uri={redirect_uri}&scope=playlist-read-private%20user-read-playback-state&state={state}"

    @staticmethod
    def authorize(state: str, code: str, scopes: List[str] | None, db: Session,
                  Env: Environment.Settings = Environment.Settings()):
        """
        Basic authorize with Google
        :param state: State
        :param code: Code
        :param scopes: Scopes
        :param db: Session of database
        :return: Authorize
        """
        param = {
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": f"{Env.REDIRECT_URI}/services/{Spotify.get_name()}/authorize",
        }
        try:
            with open("secrets/Spotify.json") as f:
                data = json.load(f)
                client_id = data["client_id"]
                client_secret = data["client_secret"]
        except Exception as e:
            warn("Spotify.json not found or invalid")
            raise Service.Exception.InvalidGrant(str(e))
        basic = f"Basic {encode_base64(client_id + ':' + client_secret)}"
        header_basic = {
            'Authorization': basic,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        try:
            response = requests.post("https://accounts.spotify.com/api/token", data=param, headers=header_basic)
            if response.status_code != 200:
                raise Service.Exception.InvalidGrant("Invalid grant")
            print(response)
            refresh = response.json()
            print(refresh)
        except Exception as e:
            raise Service.Exception.InvalidGrant(str(e))
        db.query(Service).filter(Service.name == Spotify.get_name(), Service.state == state).update(
            {"refresh": refresh})
        db.commit()
        return

    @add_metadata(ServiceMetadata(
        name="test",
        description="test",
        type=ServiceType.reaction,
        inputsData=[],
        outputsData=[]
    ))
    def create_draft(self, data: dict) -> dict:
        """
        Create draft
        :param data: Data
        :return: Create draft
        """
        return {}
