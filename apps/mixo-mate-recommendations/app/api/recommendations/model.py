import pickle
import gzip
import numpy as np

# Adjusted paths for Docker container
DF_FILE_PATH = 'app/api/recommendations/compressed_combined_df.pkl.gz'

class RecommendationModel:
    def __init__(self):
        with gzip.open(DF_FILE_PATH, 'rb') as f:
            self.combined_df = pickle.load(f)

    def adjust_score_for_cocktail(self, cocktail, score, allergen_ids, like_ids, dislike_ids, flavour_profile):
        """Adjust the similarity score based on user preferences using ingredient IDs."""
        for allergen in allergen_ids:
            if allergen in cocktail and cocktail[allergen] == 1.0:
                score = -1e9
                return score

        for profile in flavour_profile:
            if profile in cocktail['flavour_profile']:
                score += 0.5

        for like in like_ids:
            if like in cocktail and cocktail[like] == 1.0:
                score += 1

        for dislike in dislike_ids:
            if dislike in cocktail and cocktail[dislike] == 1.0:
                score -= 0.50

        return score

    def get_recommended_cocktails(self, N=5, allergen_ids=[], like_ids=[], dislike_ids=[], flavour_profile=[]):
        user_scores = np.zeros(len(self.combined_df))
        
        for idx, cocktail in self.combined_df.iterrows():
            user_scores[idx] = self.adjust_score_for_cocktail(cocktail, 1, allergen_ids, like_ids, dislike_ids,flavour_profile)

        # Only recommend cocktails that a score > 0
        positive_user_stores = np.where(user_scores > 0)[0]
        sorted_indices = np.argsort(positive_user_stores)[::-1][:N]
        return self.combined_df.iloc[sorted_indices]['recipe_id'].tolist()

# Create and expose a single model
recommendationModel = RecommendationModel()