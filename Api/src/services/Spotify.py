import json
import urllib
from datetime import datetime
from pprint import pprint
from typing import List, Tuple

import requests
from sqlalchemy.orm import Session

from src.models.Services import BaseService, save_start_authorization, Service, add_metadata, ServiceMetadata, \
    ServiceType, inputData, DataConfigurationType, outputData
from src.models.User import UserMe
from src.utils.Helper import warn, get_random_string, encode_base64, info
from src.constants import Environment


class Spotify(BaseService):

    def __init__(self, User: UserMe | None = None, db: Session | None = None):
        super().__init__(User, db)

    @staticmethod
    def get_name() -> str:
        """
        Get name of service
        :return: Name of service
        """
        return "Spotify"

    @staticmethod
    def get_authorization_url(User: UserMe, db: Session, redirect: str,
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
        redirect_uri = urllib.parse.quote(f"{redirect}")
        save_start_authorization(Spotify.get_name(), state, User, db)
        return f"https://accounts.spotify.com/authorize?client_id={client_id}&response_type=code&redirect_uri={redirect_uri}&scope=user-modify-playback-state%20user-read-playback-state&state={state}"

    @staticmethod
    def authorize(state: str, code: str, scopes: List[str] | None, db: Session, redirect: str,
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
            "redirect_uri": redirect,
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
            refresh = response.json()
            refresh["last_refresh"] = datetime.now().timestamp()
        except Exception as e:
            raise Service.Exception.InvalidGrant(str(e))
        db.query(Service).filter(Service.name == Spotify.get_name(), Service.state == state).update(
            {"refresh": refresh})
        db.commit()
        return

    def check_refresh_token(self):
        """
        Check refresh token
        :return: Refresh token
        """
        try:
            refresh = self.db.query(Service).filter(Service.name == self.get_name(),
                                                    Service.user_id == self.User.id).first().refresh
            refresh_token = refresh["refresh_token"]
            if "last_refresh" not in refresh or refresh["last_refresh"] + refresh[
                "expires_in"] < datetime.now().timestamp() - 1000:
                param = {
                    "grant_type": "refresh_token",
                    "refresh_token": refresh_token,
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
                    refresh = response.json()
                    refresh["refresh_token"] = refresh_token
                    refresh["last_refresh"] = datetime.now().timestamp()
                except Exception as e:
                    raise Service.Exception.InvalidGrant(str(e))
                self.db.query(Service).filter(Service.name == Spotify.get_name(),
                                              Service.user_id == self.User.id).update(
                    {"refresh": refresh})
                self.db.commit()
        except Exception as e:
            raise Service.Exception.InvalidService(str(e))
        return refresh

    @add_metadata(ServiceMetadata(
        name="Actuellement en train d'écouter une musique",
        description="Permet de déclencher une action lorsqu'une certaine musique est jouée",
        type=ServiceType.action,
        prev_data={"last_track_uri": lambda: ""},
        inputsData=[],
        outputsData=[
            outputData(
                id="track_name",
                name="Nom de la musique",
                type="string"
            ),
            outputData(
                id="artist_names",
                name="Nom des artistes",
                type="string"
            )
        ]
    ))
    def current_track_play(self, prev_data: dict, data: dict) -> Tuple[dict, dict]:
        """
        Create draft
        :param data: Data
        :return: Create draft
        """
        refresh = self.check_refresh_token()
        try:
            response = requests.get("https://api.spotify.com/v1/me/player?market=FR", headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {refresh['access_token']}"
            })
            if response.status_code == 204:
                return {"last_track_uri": ""}, {"signal": False, "data": []}
            elif response.status_code == 200:
                data_spotify = response.json()
                info(data_spotify)
                if "last_track_uri" not in prev_data or prev_data["last_track_uri"] != data_spotify["item"]["uri"]:
                    if data_spotify["is_playing"]:
                        return {"last_track_uri": data_spotify["item"]["uri"]}, {"signal": True, "data": [{
                            "track_name": data_spotify["item"]["name"],
                            "artist_names": " - ".join([artist["name"] for artist in data_spotify["item"]["artists"]]),
                        }]}
        except Exception as e:
            warn(str(e))
            return prev_data, {"signal": False, "data": []}
        return prev_data, {"signal": False, "data": []}

    @add_metadata(ServiceMetadata(
        name="Actuellement en train d'écouter une musique de l'artiste",
        description="Permet de déclencher une action lorsqu'une certaine musique est jouée",
        type=ServiceType.action,
        prev_data={"last_track_uri": lambda: ""},
        inputsData=[
            inputData(
                id="artist_name",
                name="Nom de l'artiste",
                inputType=DataConfigurationType.text,
                type="string",
                required=True,
            ),
        ],
        outputsData=[
            outputData(
                id="track_name",
                name="Nom de la musique",
                type="string"
            ),
            outputData(
                id="artist_names",
                name="Nom des artistes",
                type="string"
            )
        ]
    ))
    def current_track_play_by_artist(self, prev_data: dict, data: dict) -> Tuple[dict, dict]:
        """
        Create draft
        :param data: Data
        :return: Create draft
        """
        refresh = self.check_refresh_token()
        try:
            response = requests.get("https://api.spotify.com/v1/me/player?market=FR", headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {refresh['access_token']}"
            })
            if response.status_code == 204:
                return {"last_track_uri": ""}, {"signal": False, "data": []}
            elif response.status_code == 200:
                data_spotify = response.json()
                info(data_spotify)
                if data_spotify["is_playing"]:
                    if "last_track_uri" not in prev_data or prev_data["last_track_uri"] != data_spotify["item"]["uri"]:
                        for artist in data_spotify["item"]["artists"]:
                            if artist["name"] == data["artist_name"]:
                                return {"last_track_uri": data_spotify["item"]["uri"]}, {"signal": True, "data": [{
                                    "track_name": data_spotify["item"]["name"],
                                    "artist_names": " - ".join(
                                        [artist["name"] for artist in data_spotify["item"]["artists"]]),
                                }]}
        except Exception as e:
            warn(str(e))
            return prev_data, {"signal": False, "data": []}
        return prev_data, {"signal": False, "data": []}

    @add_metadata(ServiceMetadata(
        name="Passer à la musique suivante",
        description="Permet de passer à la musique suivante",
        type=ServiceType.action,
        inputsData=[],
        outputsData=[]
    ))
    def next_track(self, data: dict) -> Tuple[dict, dict]:
        """
        Create draft
        :param data: Data
        :return: Create draft
        """
        refresh = self.check_refresh_token()
        try:
            response = requests.get("https://api.spotify.com/v1/me/player?market=FR", headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {refresh['access_token']}"
            })
            if response.status_code != 200:
                return {"signal": False, "data": []}
            data_spotify = response.json()
            if data_spotify["is_playing"]:
                response = requests.post(
                    f"https://api.spotify.com/v1/me/player/next?device_id={data_spotify['device']['id']}", headers={
                        "Content-Type": "application/json",
                        "Authorization": f"Bearer {refresh['access_token']}"
                    })
                print(response.text)
                if response.status_code == 204:
                    return {"signal": True, "data": []}
        except Exception as e:
            warn(str(e))
            return {"signal": False, "data": []}
        return {"signal": False, "data": []}

    @add_metadata(ServiceMetadata(
        name="Passer à la musique suivante",
        description="Permet de passer à la musique suivante",
        type=ServiceType.reaction,
        inputsData=[],
        outputsData=[]
    ))
    def next_track(self, data: dict) -> Tuple[dict, dict]:
        """
        Create draft
        :param data: Data
        :return: Create draft
        """
        refresh = self.check_refresh_token()
        try:
            response = requests.get("https://api.spotify.com/v1/me/player?market=FR", headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {refresh['access_token']}"
            })
            if response.status_code != 200:
                return {"signal": False, "data": []}
            data_spotify = response.json()
            if data_spotify["is_playing"]:
                response = requests.post(
                    f"https://api.spotify.com/v1/me/player/next?device_id={data_spotify['device']['id']}", headers={
                        "Content-Type": "application/json",
                        "Authorization": f"Bearer {refresh['access_token']}"
                    })
                print(response.text)
                if response.status_code == 204:
                    return {"signal": True, "data": []}
        except Exception as e:
            warn(str(e))
            return {"signal": False, "data": []}
        return {"signal": False, "data": []}

    @add_metadata(ServiceMetadata(
        name="Changer le volume",
        description="Permet de changer le volume",
        type=ServiceType.reaction,
        inputsData=[
            inputData(
                id="volume",
                name="Volume",
                inputType=DataConfigurationType.number,
                type="number",
                required=True,
            ),
        ],
        outputsData=[]
    ))
    def volume(self, data: dict) -> Tuple[dict, dict]:
        """
        Create draft
        :param data: Data
        :return: Create draft
        """
        refresh = self.check_refresh_token()
        if data["volume"] < 0:
            data["volume"] = 0
        elif data["volume"] > 100:
            data["volume"] = 100
        try:
            response = requests.get("https://api.spotify.com/v1/me/player?market=FR", headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {refresh['access_token']}"
            })
            if response.status_code != 200:
                return {"signal": False, "data": []}
            data_spotify = response.json()
            if data_spotify["is_playing"]:
                response = requests.put(
                    f"https://api.spotify.com/v1/me/player/volume?device_id={data_spotify['device']['id']}&volume_percent={str(data['volume'])}",
                    headers={
                        "Authorization": f"Bearer {refresh['access_token']}"
                    })
                print(response.status_code)
                if response.status_code == 204:
                    return {"signal": True, "data": []}
        except Exception as e:
            warn(str(e))
            return {"signal": False, "data": []}
        return {"signal": False, "data": []}
