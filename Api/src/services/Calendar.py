from datetime import datetime
from typing import List

from sqlalchemy.orm import Session

from src.models.Services import BaseService, save_start_authorization, Service, add_metadata, ServiceType, inputData, \
    DataConfigurationType, outputData, ServiceMetadata
from src.models.User import UserMe
from src.utils.Helper import warn
from src.utils.Services import Google


class Calendar(BaseService):

    def __init__(self, User: UserMe | None = None, db: Session | None = None):
        super().__init__(User, db)
        self.service_name = "Calendar"
        self.version = "v1"

    @staticmethod
    def get_authorization_url(User: UserMe, db: Session) -> str:
        """
        Get authorization url
        :param User: User
        :param db: Session of database
        :return: Authorize URL
        """
        authorization_url, state = Google.get_authorization_url(
            service="Gmail",
            scopes=['https://www.googleapis.com/auth/calendar'],
        )
        save_start_authorization("Calendar", state, User, db)
        return authorization_url

    @staticmethod
    def authorize(state: str, code: str, scopes: List[str], db: Session):
        """
        Basic authorize with Google
        :param state: State
        :param code: Code
        :param scopes: Scopes
        :param db: Session of database
        :return: Authorize
        """
        refresh = Google.authorize(
            service="Calendar",
            state=state,
            code=code,
            scopes=scopes,
        )
        db.query(Service).filter(Service.name == "Gmail", Service.state == state).update({"refresh": refresh})
        db.commit()

    @staticmethod
    def create_event_data(data: dict):
        return {
            'summary': data["summary"],
            **({'location': data["location"]} if "location" in data else {}),
            'description': data["description"],
            'start': {
                # TODO parse datetime and timezone
                'dateTime': data["start"],
                'timeZone': datetime.now().astimezone().tzinfo,
            },
            'end': {
                # TODO parse datetime and timezone
                'dateTime': data["end"],
                'timeZone': datetime.now().astimezone().tzinfo,
            },
        }

    @add_metadata(ServiceMetadata(
        name="Create Event",
        description="Create an event",
        type=ServiceType.reaction,
        inputsData=[
            inputData(
                id="summary",
                name="Title",
                inputType=DataConfigurationType.text,
                type="string",
                required=True,
            ),
            inputData(
                id="location",
                name="Location",
                inputType=DataConfigurationType.text,
                type="string",
                required=False,
            ),
            inputData(
                id="description",
                name="Description",
                inputType=DataConfigurationType.textMultiline,
                type="string",
                required=True,
            ),
            inputData(
                id="start",
                name="Start",
                inputType=DataConfigurationType.date,
                type="date",
                required=True,
            ),
            inputData(
                id="end",
                name="End",
                inputType=DataConfigurationType.date,
                type="date",
                required=True,
            )
        ],
        outputsData=[
            outputData(
                id="event_url",
                name="Event URL",
                type="string",
            ),
        ]
    ))
    def create_event(self, data: dict):
        """
        Create an event
        :param data: Data
        :return: None
        """
        service = Google.get_service(self.service_name, self.User, self.db, self.version)
        try:
            data = self.create_event_data(data)
            event = service.events().insert(calendarId='primary', body=data).execute()
        except Exception as e:
            warn(str(e))
            return {"signal": False}
        return {"signal": True, "event_url": event.get("htmlLink")}
