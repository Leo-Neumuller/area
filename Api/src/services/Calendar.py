"""
Google Calendar service
"""

from datetime import datetime, timezone
from typing import List

from sqlalchemy.orm import Session

from src.models.Services import BaseService, save_start_authorization, Service, add_metadata, ServiceType, inputData, \
    DataConfigurationType, outputData, ServiceMetadata
from src.models.User import UserMe
from src.utils.Helper import warn, info
from src.utils.Services import Google


class Calendar(BaseService):

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
        return "Google Calendar"

    @staticmethod
    def get_authorization_url(User: UserMe, db: Session, redirect: str) -> str:
        """
        Get authorization url
        :param User: User
        :param db: Session of database
        :return: Authorize URL
        """
        authorization_url, state = Google.get_authorization_url(
            service=Calendar.get_name(),
            scopes=['https://www.googleapis.com/auth/calendar'],
            redirect=redirect,
        )
        save_start_authorization(Calendar.get_name(), state, User, db)
        return authorization_url

    @staticmethod
    def authorize(state: str, code: str, scopes: List[str], db: Session, redirect: str):
        """
        Basic authorize with Google
        :param state: State
        :param code: Code
        :param scopes: Scopes
        :param db: Session of database
        :return: Authorize
        """
        refresh = Google.authorize(
            service=Calendar.get_name(),
            state=state,
            code=code,
            scopes=scopes,
            redirect=redirect,
        )
        db.query(Service).filter(Service.name == Calendar.get_name(), Service.state == state).update(
            {"refresh": refresh})
        db.commit()

    @staticmethod
    def create_event_data(data: dict):
        return {
            'summary': data["summary"],
            **({'location': data["location"]} if "location" in data else {}),
            'description': data["description"],
            'start': {
                # TODO parse datetime and timezone
                'dateTime': datetime.fromisoformat(data["start"].replace("Z", "")).astimezone(timezone.utc).isoformat(),
                'timeZone': "Europe/Paris"
            },
            'end': {
                'dateTime': datetime.fromisoformat(data["end"].replace("Z", "")).astimezone(timezone.utc).isoformat(),
                'timeZone': "Europe/Paris"
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
    def create_event(self, data: dict) -> dict:
        """
        Create an event
        :param data: Data
        :return: None
        """
        service = Google.get_service("calendar", Calendar.get_name(), self.User, self.db, self.version)
        try:
            data = self.create_event_data(data)
            event = service.events().insert(calendarId='primary', body=data).execute()
            info(str(event))
        except Exception as e:
            warn(e)
            return {"signal": False, "data": []}
        return {"signal": True, "data": [{"event_url": event.get("htmlLink")}]}

    @add_metadata(ServiceMetadata(
        name="New Created Event",
        description="New created event",
        type=ServiceType.action,
        prev_data={"time": lambda: datetime.now().astimezone(timezone.utc).timestamp()},
        inputsData=[],
        outputsData=[
            outputData(
                id="summary",
                name="Title",
                type="string",
            ),
            outputData(
                id="start",
                name="Start Date",
                type="date",
            ),
            outputData(
                id="end",
                name="End Date",
                type="date",
            ),
            outputData(
                id="link",
                name="Event URL",
                type="string",
            ),
        ]
    ))
    def new_created_event(self, prev_data: dict, data: dict):
        """
        New created event
        :param prev_data: Previous data
        :param data: Data
        """
        service = Google.get_service("calendar", Calendar.get_name(), self.User, self.db, self.version)
        prev_time_fetch = prev_data["time"]
        prev_time_fetch = datetime.fromtimestamp(prev_time_fetch).astimezone(timezone.utc)
        parsed_data = []
        try:
            data = service.events().list(calendarId='primary', updatedMin=prev_time_fetch.isoformat()).execute()
            if len(data["items"]) == 0:
                return prev_data, {"signal": True, "data": []}
            for event in data["items"]:
                parsed_data.append({
                    "summary": event["summary"],
                    "start": datetime.fromisoformat(event["start"]["dateTime"]).timestamp(),
                    "end": datetime.fromisoformat(event["end"]["dateTime"]).timestamp(),
                    "link": event["htmlLink"],
                })
                info(str(event))
            prev_data["time"] = max(
                [datetime.fromisoformat(event["updated"].replace("Z", "")).timestamp() for event in data["items"]])
        except Exception as e:
            warn(str(e))
            return prev_data, {"signal": False, "data": []}
        return prev_data, {"signal": True, "data": parsed_data}
