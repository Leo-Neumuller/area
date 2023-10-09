import base64
from datetime import datetime
from email.message import EmailMessage
from typing import List, Dict, Callable, Tuple
from pprint import pprint
import googleapiclient
from sqlalchemy.orm import Session
from src.models.Services import save_start_authorization, Service, ServiceType, BaseService, add_metadata, \
    ServiceMetadata, DataConfigurationType, inputData, outputData
from src.models.User import UserMe
from src.utils.Helper import warn
from src.utils.Services import Google

input_mail = [
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
]

output_mail = [
    outputData(
        id="Subject",
        name="Subject",
        type="string",
    ),
    outputData(
        id="From",
        name="From",
        type="string",
    ),
    outputData(
        id="To",
        name="To",
        type="string",
    ),
    outputData(
        id="Date",
        name="Date",
        type="date",
    ),
    outputData(
        id="Content",
        name="Content",
        type="string",
    ),
]


class Gmail(BaseService):

    def __init__(self, User: UserMe | None = None, db: Session | None = None):
        super().__init__(User, db)
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

    @staticmethod
    def parse_messages(email_data, return_datas, service):
        for email in email_data["messages"]:
            email_content = service.users().messages().get(userId="me", id=email["id"], format="full").execute()
            if "payload" not in email_content.keys():
                continue
            email_content = email_content["payload"]
            email_data = Google.get_headers_from_message(email_content, {
                "Subject": "",
                "From": "",
                "To": "",
                "Date": "",
            })
            email_data["Date"] = datetime.strptime(email_data["Date"], "%a, %d %b %Y %H:%M:%S %z")
            email_data["Content"] = ""
            if "parts" not in email_content.keys():
                return_datas.append(email_data)
                continue
            for part in email_content["parts"]:
                if part["mimeType"] == "text/plain":
                    email_data["Content"] = base64.urlsafe_b64decode(part["body"]["data"]).decode()
                    break
            return_datas.append(email_data)

    @add_metadata(ServiceMetadata(
        name="Create draft",
        description="Create draft",
        type=ServiceType.reaction,
        inputsData=input_mail,
        outputsData=[]
    ))
    def create_draft(self, data: dict) -> dict:
        """
        [Reaction] Create draft
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
        type=ServiceType.reaction,
        inputsData=input_mail,
        outputsData=[]
    ))
    def send_email(self, data: dict) -> dict:
        """
        [Reaction] Send email
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

    @add_metadata(ServiceMetadata(
        name="New email from email",
        description="New email from email",
        type=ServiceType.action,
        prev_data={"time": lambda x: datetime.now().timestamp()},
        inputsData=[
            inputData(
                id="email",
                name="Email",
                inputType=DataConfigurationType.text,
                type="string",
                required=True,
            ),
        ],
        outputsData=output_mail
    ))
    def new_email_from_email(self, prevData: dict, data: dict) -> Tuple[dict, dict]:
        """
        [Action] New email from email
        :param prevData: Previous data
        :param data: Dict of data with keys: email
        :return: None
        """
        service = Google.get_service(self.service_name, self.User, self.db, self.version)
        prev_time_fetch = prevData["time"]
        return_datas = []
        next_data = {"time": datetime.now().timestamp()}
        try:
            email_data = service.users().messages().list(userId="me",
                                                         q=f"from:{data['email']} after:{prev_time_fetch}").execute()
            if email_data["resultSizeEstimate"] == 0:
                return next_data, {"signal": False, "data": []}
            self.parse_messages(email_data, return_datas, service)
        except Exception as e:
            warn(str(e))
            return next_data, {"signal": False, "data": []}
        return next_data, {"signal": True, "data": return_datas}

    @add_metadata(ServiceMetadata(
        name="New email with subject",
        description="New email with subject",
        type=ServiceType.action,
        prev_data={"time": lambda x: datetime.now().timestamp()},
        inputsData=[
            inputData(
                id="subject",
                name="Subject",
                inputType=DataConfigurationType.text,
                type="string",
                required=True,
            ),
        ],
        outputsData=output_mail
    ))
    def new_email_with_subject(self, prevData: dict, data: dict) -> Tuple[dict, List[dict]]:
        """
        [Action] New email with subject
        :param prevData: Previous data
        :param data: Dict of data with keys: subject
        :return: None
        """
        service = Google.get_service(self.service_name, self.User, self.db, self.version)
        prev_time_fetch = prevData["time"]
        return_datas = []
        next_data = {"time": datetime.now().timestamp()}
        try:
            email_data = service.users().messages().list(userId="me",
                                                         q=f"subject:{data['subject']} after:{prev_time_fetch}").execute()
            if email_data["resultSizeEstimate"] == 0:
                return next_data, {"signal": False, "data": []}
            self.parse_messages(email_data, return_datas, service)
        except Exception as e:
            warn(str(e))
            return next_data, {"signal": False, "data": []}
        return next_data, {"signal": True, "data": return_datas}

