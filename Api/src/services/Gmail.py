import base64
from email.message import EmailMessage
from typing import List, Dict, Callable

import googleapiclient
from sqlalchemy.orm import Session
from src.models.Services import save_start_authorization, Service, ServiceType, BaseService, add_metadata, \
    ServiceMetadata, DataConfigurationType, inputData
from src.models.User import UserMe
from src.utils.Helper import warn
from src.utils.Services import Google


class Gmail(BaseService):

    def __init__(self):
        super().__init__()
        self.service_name = "Gmail"
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
            scopes=['https://mail.google.com/'],
        )
        save_start_authorization("Gmail", state, User, db)
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
            service="Gmail",
            state=state,
            code=code,
            scopes=scopes,
        )
        db.query(Service).filter(Service.name == "Gmail", Service.state == state).update({"refresh": refresh})
        db.commit()

    @staticmethod
    def create_email(data: dict, service: googleapiclient.discovery.Resource):
        """
        create email
        :param data: Dict of data with keys: content, to, subject
        :param service: Service
        :return: None
        """
        email = service.users().getProfile(userId="me").execute()["emailAddress"]
        message = EmailMessage()
        message.set_content(data["content"])
        message["Subject"] = data["subject"]
        message["From"] = email
        message["To"] = data["to"]
        encoded_message = base64.urlsafe_b64encode(message.as_bytes()).decode()
        return encoded_message

    @add_metadata(ServiceMetadata(
        name="Create draft",
        description="Create draft",
        type=ServiceType.action,
        inputsData=[
            inputData(
                id="content",
                name="Email content",
                inputType=DataConfigurationType.textMultiline,
                type="string",
                required=True,
            ),
            inputData(
                id="to",
                name="To",
                inputType=DataConfigurationType.text,
                type="string",
                required=True,
            ),
            inputData(
                id="subject",
                name="Subject",
                inputType=DataConfigurationType.text,
                type="string",
                required=True,
            ),
        ],
        outputsData=[]
    ))
    def create_draft(self, data: dict):
        """
        [Action] Create draft
        :param data: Dict of data with keys: content, to, subject
        :return: None
        """
        service = Google.get_service(self.service_name, self.User, self.db, self.version)
        try:
            emailRaw = self.create_email(data, service)
            service.users().drafts().create(userId="me", body={"message": {"raw": emailRaw}}).execute()
        except Exception as e:
            warn(str(e))
            return {"signal": False}
        return {"signal": True}

    @add_metadata(ServiceMetadata(
        name="Send email",
        description="Send Email",
        type=ServiceType.action,
        inputsData=[
            inputData(
                id="content",
                name="Email content",
                inputType=DataConfigurationType.textMultiline,
                type="string",
                required=True,
            ),
            inputData(
                id="to",
                name="To",
                inputType=DataConfigurationType.text,
                type="string",
                required=True,
            ),
            inputData(
                id="subject",
                name="Subject",
                inputType=DataConfigurationType.text,
                type="string",
                required=True,
            ),
        ],
        outputsData=[]
    ))
    def send_email(self, data: dict):
        """
        [Action] Send email
        :param data: Dict of data with keys: content, to, subject
        :return: None
        """
        service = Google.get_service(self.service_name, self.User, self.db, self.version)
        try:
            emailRaw = self.create_email(data, service)
            service.users().messages().send(userId="me", body={"raw": emailRaw}).execute()
        except Exception as e:
            warn(str(e))
            return {"signal": False}
        return {"signal": True}