from flask_restx import Resource
from flask import current_app

from app.utils import err_resp, ok_resp, internal_err_resp
from .service import RecommendationService
from .dto import RecommendationDto

api = RecommendationDto.api
# data_resp = RecommendationDto.data_resp

@api.route("/")
class Recommendation(Resource):
    def get(self):
        try:
            return RecommendationService.generate_for_user(user_id='some_user_id')
        except Exception as error:
            current_app.logger.error(error)
            return internal_err_resp()
