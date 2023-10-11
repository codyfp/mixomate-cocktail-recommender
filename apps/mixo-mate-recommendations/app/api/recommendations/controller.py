from flask_restx import Resource
from flask import current_app, request

from app.utils import err_resp, ok_resp, internal_err_resp
from .service import RecommendationService
from .dto import RecommendationDto

api = RecommendationDto.api
# data_resp = RecommendationDto.data_resp

@api.route("/", methods=['POST'])
class Recommendation(Resource):
    def post(self):
        try:
            data = request.get_json()

            count = data.get('count', 5)
            allergens = data.get('allergens', [])
            likes = data.get('likes', [])
            dislikes = data.get('dislikes', [])
            flavour_profile = data.get('flavourProfile', [])

            # Ensure count is an integer and is > 0
            if not isinstance(count, int):
                return "Count must be a integer", 400
            if count <= 0:
                return "Count must be greater than zero", 400
            
            # Ensure arrays are arrays
            if not isinstance(allergens, list):
                return "Allergens must be an array", 400
            if not isinstance(likes, list):
                return "Likes must be an array", 400
            if not isinstance(dislikes, list):
                return "Dislikes must be an array", 400
            if not isinstance(flavour_profile, list):
                return "Flavour profile must be an array", 400

            # Ensure arrays only contain strings
            if not all(isinstance(s, str) for s in allergens):
                return "Allergens must only contain strings", 400
            if not all(isinstance(s, str) for s in likes):
                return "Likes must only contain strings", 400
            if not all(isinstance(s, str) for s in dislikes):
                return "Dislikes must only contain strings", 400
            if not all(isinstance(s, str) for s in flavour_profile):
                return "Flavour profile must only contain strings", 400

            print(count, flush=True)
            print(allergens, flush=True)
            print(likes, flush=True)
            print(dislikes, flush=True)
            print(flavour_profile, flush=True)

            return RecommendationService.recommend(
                count=count,
                allergens=allergens,
                likes=likes,
                dislikes=dislikes,
                flavour_profile=flavour_profile)

        except Exception as error:
            current_app.logger.error(error)
            return internal_err_resp(error)
