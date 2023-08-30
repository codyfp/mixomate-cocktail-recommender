from flask_restx import Namespace, fields

class RecommendationDto:

    api = Namespace("recommendations", description="Recommendation related operations.")

    # user = api.model(
    #     "User object",
    #     {
    #         "email": fields.String,
    #         "name": fields.String,
    #         "username": fields.String,
    #         "joined_date": fields.DateTime,
    #         "role_id": fields.Integer,
    #     },
    # )

    # data_resp = api.model(
    #     "User Data Response",
    #     {
    #         "status": fields.Boolean,
    #         "message": fields.String,
    #         "user": fields.Nested(user),
    #     },
    # )
