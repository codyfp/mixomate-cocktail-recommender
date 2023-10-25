import pickle
import gzip
import numpy as np

# Adjusted paths for Docker container
# Note if the dataset is changed at all this file will need to be manually created / copied from the modelGeneration folder
DF_FILE_PATH = 'app/api/recommendations/compressed_combined_df.pkl.gz'

class RecommendationModel:
    def __init__(self):
        with gzip.open(DF_FILE_PATH, 'rb') as f:
            self.combined_df = pickle.load(f)

    def adjust_score_for_cocktail(self, cocktail, score, allergen_ids, like_ids, dislike_ids,flavour_profile):
        """Adjust the similarity score based on user preferences using ingredient IDs."""
        for profile in flavour_profile:
            if profile in cocktail['flavour_profile']:
                score =+ 0.5
        
        
        for allergen in allergen_ids:
            if cocktail[allergen] == 1.0:
                score -= -10


        for like in like_ids:
            if cocktail[like] == 1.0:
                score += 1

        for dislike in dislike_ids:
            if cocktail[dislike] == 1.0:
                score *= 0.80

        return score

    def get_recommended_cocktails(self, N=5, allergen_ids=[], like_ids=[], dislike_ids=[], flavour_profile=[]):
        user_scores = np.zeros(len(self.combined_df))
        
        for idx, cocktail in self.combined_df.iterrows():
            user_scores[idx] = self.adjust_score_for_cocktail(cocktail, 1, allergen_ids, like_ids, dislike_ids,flavour_profile)

        sorted_indices = np.argsort(user_scores)[::-1][:N]
        return self.combined_df.iloc[sorted_indices]['recipe_id'].tolist()

# Create and expose a single model
recommendationModel = RecommendationModel()