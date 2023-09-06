# Create Tensorflow model object
# Load model.json generated from modelGenerator into Tensflow model object

from numpy import loadtxt
from keras import models
from tensorflow.keras.models import load_model

class RecommendationModel:

  def __init__(self):
    try:
      # self.tfModel = load_model('recommendationModel.h5')     # Load model
      self.tfModel = models.Sequential()                        # Create temporary sequential model
      # self.tfModel.summary()                                    # Summarise model

      # self.dataset = loadtxt(                                 # Load dataset
      #   "cocktails.csv",
      #   delimiter=",")
    except ValueError as e:
      print("ERROR: Failed to load Recommendations model")
      raise e

  def test_model(self):
    self.tfModel.summary()

  def generate_recommendation_for_user(user_id, count=5):
    print(f"Generating {count} recommendations for user with ID: {user_id}")
    # Interact with self.tfModel to recommended {count} of cocktails for the given user
    return []

recommendationModel = RecommendationModel()
