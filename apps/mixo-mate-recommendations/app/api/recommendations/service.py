from .model import recommendationModel 

class RecommendationService:
    @staticmethod
    def recommend(count=5, allergens=[], likes=[], dislikes=[], flavourProfile=[]):
        try:
            return ['182985', '259553', '280085', '61912', '429550']
            # # Use RecommendationModel
            # recipe_ids = recommendationModel.recommend(
            #     N=count,
            #     allergens=allergens,
            #     likes=likes,
            #     dislikes=dislikes,
            #     flavourProfile=flavourProfile)

            # Return recommended cocktail/recipe IDs (ensure all recipe_ids are strings)
            return list(map(lambda id: str(int(id)), recipe_ids))

        except Exception as error:
            raise Exception(f'Failed to generate recommendations. {error}')
