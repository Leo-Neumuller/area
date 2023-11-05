import json
from typing import Tuple

from sqlalchemy.orm import Session

from src.models.Services import BaseService, ServiceMetadata, add_metadata, ServiceType, inputData, \
    DataConfigurationType, outputData
from src.models.User import UserMe
import requests

from src.utils.Helper import warn


class Weather(BaseService):
    def __init__(self, User: UserMe | None = None, db: Session | None = None):
        super().__init__(User, db)

    @staticmethod
    def get_name() -> str:
        """
        Get name of service
        :return: Name of service
        """
        return "Weather"

    @add_metadata(ServiceMetadata(
        name="Vérifie s'il pleut dans la ville indiquée",
        description="Vérifie s'il pleut dans la ville indiquée",
        type=ServiceType.action,
        prev_data={
            "last_check": lambda: False,
        },
        inputsData=[
            inputData(
                id="city",
                name="Nom de la ville",
                inputType=DataConfigurationType.text,
                type="string",
                required=True,
            ),
        ],
        outputsData=[]
    ))
    def check_rain(self, prev_data: dict, data: dict) -> Tuple[dict, dict]:
        """
        [Reaction] Check if it's raining
        :param data: Dict of data with keys: city
        :return: dict of signal
        """

        """
        curl -X 'GET' \
  'https://api.weatherapi.com/v1/current.json?q=mouchin&lang=fr&key=a591f50c7ae84d42a8160928230511' \
  -H 'accept: application/json'
        """
        try:
            with open("secrets/Weather.json") as f:
                data = json.load(f)
                api_key = data["api_key"]
        except Exception as e:
            warn("Weather.json not found or invalid")
            return prev_data, {"signal": False, "data": []}

        try:
            url = f"https://api.weatherapi.com/v1/current.json?q={data['city']}&lang=fr&key={api_key}"
            response = requests.request("GET", url)
            if response.status_code != 200:
                return prev_data, {"signal": False, "data": []}
            response = response.json()
            if "current" not in response and "precip_in" not in response["current"]:
                return prev_data, {"signal": False, "data": []}
            if response["current"]["precip_in"] > 0 and not prev_data["last_check"]:
                return {"last_check": True}, {"signal": True, "data": []}
            else:
                return {"last_check": False}, {"signal": False, "data": []}
        except Exception as e:
            warn(str(e))
            return prev_data, {"signal": False, "data": []}
        return prev_data, {"signal": False, "data": []}
