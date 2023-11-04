from typing import Tuple

from sqlalchemy.orm import Session

from src.models.Services import BaseService, ServiceMetadata, add_metadata, ServiceType, inputData, \
    DataConfigurationType, outputData
from src.models.User import UserMe
import requests


class Downdetector(BaseService):
    def __init__(self, User: UserMe | None = None, db: Session | None = None):
        super().__init__(User, db)

    @staticmethod
    def get_name() -> str:
        """
        Get name of service
        :return: Name of service
        """
        return "DownDetector"

    @add_metadata(ServiceMetadata(
        name="Vérifie si le site Web est en panne",
        description="Vérifie si le site Web est en panne avec une requête HTTP GET",
        type=ServiceType.action,
        prev_data={
            "last_check": lambda: False,
        },
        inputsData=[
            inputData(
                id="status",
                name="Status code en temps normal",
                inputType=DataConfigurationType.number,
                type="number",
                required=True,
            ),
            inputData(
                id="url",
                name="URL du site Web",
                inputType=DataConfigurationType.text,
                type="string",
                required=True,
            )
        ],
        outputsData=[
            outputData(
                id="content",
                name="Contenu de la page",
                type="string",
            ),
        ]
    ))
    def check_website(self, prev_data: dict, data: dict) -> Tuple[dict, dict]:
        """
        [Action] Create draft
        :param data: Dict of data with keys: content, to, subject
        :return: dict of signal
        """
        try:
            r = requests.get(self.service_name)
            if r.status_code == data["status"]:
                return {"last_check": True}, {"signal": False, "data": []}
            elif not prev_data["last_check"]:
                return {"last_check": False}, {"signal": True, "data": [{"content": r.text}]}
        except Exception as e:
            return {"last_check": False}, {"signal": False, "data": []}
        return {"last_check": False}, {"signal": False, "data": []}
