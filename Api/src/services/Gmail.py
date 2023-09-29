from src.models.About import Service, Action, Reaction


class Gmail:

    @staticmethod
    def get_description() -> Service:
        return Service(
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