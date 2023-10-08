import pickle
import gzip
import h5py
import pandas as pd
import os
from model import get_similar_cocktails 

# Adjusted paths for Docker container
file_path1 = os.path.join('/app', 'compressed_combined_df.pkl.gz')
file_path2 = os.path.join('/app', 'compressed_similarity_matrix.h5')

with gzip.open(file_path1, 'rb') as f:
    combined_df = pickle.load(f)

with h5py.File(file_path2, "r") as hf:
    similarity_matrix = hf["similarity_matrix"][:]

class RecommendationService:
    @staticmethod
    def generate_for_user(user_id):
        try:
            # Use RecommendationModel
            return get_similar_cocktails(182985,combined_df=combined_df,similarity_matrix=similarity_matrix,N=5)

        except Exception as error:
            raise Exception(f'Failed to generate recommendations. {error}')
