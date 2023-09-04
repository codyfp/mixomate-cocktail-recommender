class RecommendationService:
    @staticmethod
    def get_recommend(user_id):
        try:
            recommendations = []

            return recommendations

        except Exception as error:
            raise Exception(f'Failed to generate recommendations. {error.message}')
