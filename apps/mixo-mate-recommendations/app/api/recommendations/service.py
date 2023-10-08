from .model import recommendationModel 

class RecommendationService:
    @staticmethod
    def recommend_similar_cocktails(cocktail_id, count=5):
        try:
            # Use RecommendationModel
            recipe_ids = recommendationModel.get_similar_cocktails(cocktail_id, N=count)

            # Return recommended cocktail/recipe IDs
            return list(map(lambda id: int(id), recipe_ids))

        except Exception as error:
            raise Exception(f'Failed to generate recommendations. {error}')
