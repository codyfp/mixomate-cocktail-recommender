import pickle
import gzip
import h5py

# Adjusted paths for Docker container
DF_FILE_PATH = 'app/api/recommendations/compressed_combined_df.pkl.gz'
SIMILARITY_MATRIX_FILE_PATH = 'app/api/recommendations/compressed_similarity_matrix.h5'

class RecommendationModel:
    def __init__(self):
        with gzip.open(DF_FILE_PATH, 'rb') as f:
            self.combined_df = pickle.load(f)

        with h5py.File(SIMILARITY_MATRIX_FILE_PATH, "r") as hf:
            self.similarity_matrix = hf["similarity_matrix"][:]


    def get_similar_cocktails(self, input_value, N=5):
        """
        Fetch similar cocktails based on a given cocktail name or ID.
        
        Args:
        - input_value (str or int): Name or ID of the cocktail.
        - N (int): Number of similar cocktails to return. Default is 5.

        Returns:
        - list: Names of top N similar cocktails.
        """

        # Determine if input is name or ID
        if isinstance(input_value, str):
            if input_value not in self.combined_df['name'].values:
                raise ValueError(f"No cocktail named {input_value} found in the dataset.")

            cocktail_index = self.combined_df[self.combined_df['name'] == input_value].index[0]
        elif isinstance(input_value, int):  # Assuming ID is an integer
            if input_value not in self.combined_df['recipe_id'].values:
                raise ValueError(f"No cocktail with ID {input_value} found in the dataset.")
            
            cocktail_index = self.combined_df[self.combined_df['recipe_id'] == input_value].index[0]
        else:
            raise ValueError("Input value must be either a name (string) or an ID (integer).")
        
        # Fetch and enumerate similarity scores for the given cocktail
        similar_scores = list(enumerate(self.similarity_matrix[cocktail_index]))
        
        # Sort the scores
        sorted_similar_scores = sorted(similar_scores, key=lambda x: x[1], reverse=True)
        
        # Return the top N cocktails excluding the input cocktail itself
        return [self.combined_df.iloc[i[0]]['recipe_id'] for i in sorted_similar_scores[1:N+1]]

# Create and expose a single model
recommendationModel = RecommendationModel()