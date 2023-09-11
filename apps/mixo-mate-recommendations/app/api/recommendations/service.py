from .model import recommendationModel

class RecommendationService:
    @staticmethod
    def generate_for_user(user_id):
        try:
            # Use RecommendationModel
            return recommendationModel.generate_recommendation_for_user(user_id)

        except Exception as error:
            raise Exception(f'Failed to generate recommendations. {error}')
