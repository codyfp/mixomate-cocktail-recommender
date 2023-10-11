from .model import recommendationModel 

class RecommendationService:
    @staticmethod
    def recommend(count=5, allergens=[], likes=[], dislikes=[], flavour_profile=[]):
        try:
            # Use RecommendationModel
            recipe_ids = recommendationModel.get_recommended_cocktails(
                N=count,
                allergen_ids=allergens,
                like_ids=likes,
                dislike_ids=dislikes,
                flavour_profile=flavour_profile)

            # Return recommended cocktail/recipe IDs (ensure all recipe_ids are strings)
            return list(map(lambda id: str(int(id)), recipe_ids))

        except Exception as error:
            raise Exception(f'Failed to generate recommendations. {error}')
