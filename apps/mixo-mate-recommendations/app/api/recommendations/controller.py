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
            return RecommendationService.recommend_similar_cocktails(cocktail_id=182985)
        except Exception as error:
            current_app.logger.error(error)
            return internal_err_resp()
