import pickle
import gzip
import h5py
import pandas as pd
from model import get_similar_cocktails 

with gzip.open(r'apps\mixo-mate-recommendations\app\api\recommendations\compressed_combined_df.pkl.gz', 'rb') as f:
    combined_df = pickle.load(f)

with h5py.File(r"apps\mixo-mate-recommendations\app\api\recommendations\compressed_similarity_matrix.h5", "r") as hf:
    similarity_matrix = hf["similarity_matrix"][:]




print(similarity_matrix.shape)

class RecommendationService:
    @staticmethod
    def generate_for_user(user_id):
        try:
            # Use RecommendationModel
            return get_similar_cocktails(182985,combined_df,similarity_matrix,5)

        except Exception as error:
            raise Exception(f'Failed to generate recommendations. {error}')

print(get_similar_cocktails(182985,combined_df=combined_df,similarity_matrix=similarity_matrix,N=5))