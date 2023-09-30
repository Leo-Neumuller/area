import os
from typing import List

from sqlalchemy.orm import Session

from src.models.About import Service as ServiceDescription, Action, Reaction
from src.models.Services import save_start_authorization, Service
from src.models.User import UserMe
from src.utils.Services import Google


class Gmail:

    def __init__(self):
        pass

    @staticmethod
    def get_authorization_url(User: UserMe, db: Session) -> str:
        """
        Get authorization url
        :param User: User
        :param db: Session of database
        :return: Authorize URL
        """
        service = "Gmail"
        authorization_url, state = Google.get_authorization_url(
            service=service,
            scopes=['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/gmail.send'],
        )
        save_start_authorization(service, state, User, db)
        return authorization_url

    @staticmethod
    def authorize(state: str, code: str, scopes: List[str], db: Session):
        """
        Authorize
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
    def get_description() -> ServiceDescription:
        return ServiceDescription(
            name="Gmail",
            actions=[
                Action(
                    name="send_email",
                    description="Send email",
                ),
            ],
            reactions=[
                Reaction(
                    name="new_email",
                    description="New email",
                ),
            ],
        )
