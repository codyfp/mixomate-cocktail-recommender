import pickle
import gzip
import h5py
import numpy as np

# Adjusted paths for Docker container
DF_FILE_PATH = 'app/api/recommendations/compressed_combined_df.pkl.gz'

class RecommendationModel:
    def __init__(self):
        with gzip.open(DF_FILE_PATH, 'rb') as f:
            self.combined_df = pickle.load(f)

    def adjust_score_for_cocktail(self, cocktail, score, allergen_ids, like_ids, dislike_ids):
        """Adjust the similarity score based on user preferences using ingredient IDs."""
        for allergen in allergen_ids:
            if cocktail[allergen] == 1.0:
                return -1  

        for like in like_ids:
            if cocktail[like] == 1.0:
                score += 1

        for dislike in dislike_ids:
            if cocktail[dislike] == 1.0:
                score *= 0.80

        return score

    def get_similar_cocktails(self, N=5, allergen_ids=[], like_ids=[], dislike_ids=[]):
        user_scores = np.zeros(len(self.combined_df))
        
        for idx, cocktail in self.combined_df.iterrows():
            user_scores[idx] = self.adjust_score_for_cocktail(cocktail, 1, allergen_ids, like_ids, dislike_ids)

        sorted_indices = np.argsort(user_scores)[::-1][:N]
        return self.combined_df.iloc[sorted_indices]['recipe_id'].tolist()

# Create and expose a single model
recommendationModel = RecommendationModel()