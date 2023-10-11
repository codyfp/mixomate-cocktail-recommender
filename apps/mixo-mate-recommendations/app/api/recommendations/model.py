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
        if any(allergen in cocktail['ingredient_ids'] for allergen in allergen_ids):
            score = -1

        for like in like_ids:
            if like in cocktail['ingredient_ids']:
                score += 1

        for dislike in dislike_ids:
            if dislike in cocktail['ingredient_ids']:
                score *= 0.80

        return score

    def get_similar_cocktails(self, N=5, allergen_ids=[], like_ids=[], dislike_ids=[]):
        user_scores = np.zeros(len(self.combined_df))
        
        for idx, cocktail in self.combined_df.iterrows():
            user_scores[idx] = self.adjust_score_for_cocktail(cocktail, 1, allergen_ids, like_ids, dislike_ids)

        sorted_indices = np.argsort(user_scores)[::-1][:N]
        return self.combined_df.iloc[sorted_indices]['name'].tolist()

# Create and expose a single model
recommendationModel = RecommendationModel()