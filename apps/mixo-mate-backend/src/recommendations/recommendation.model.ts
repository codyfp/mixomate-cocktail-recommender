import tf from '@tensorflow/tfjs-node'
import { Cocktail } from '../cocktails/cocktail.dto.js';
import { CocktailReview } from './review.dto.js';

export default class RecommendationModel {
  private static mlModel: tf.Sequential;

  constructor() {
    RecommendationModel.mlModel = tf.sequential();
    
    // Add a single input layer
    RecommendationModel.mlModel.add(tf.layers.dense({inputShape: [1], units: 1, useBias: true}));
    
    // Add an output layer
    RecommendationModel.mlModel.add(tf.layers.dense({units: 1, useBias: true}));
  }

  getRecommendedForUser(userId: string): Cocktail[] {
    // TODO: Get recommended cocktails for user from Recommendation ML model
    return [];
  }

  reviewRecommendation(review: CocktailReview): void {
    // Use cocktail review to adjust ML model
    return;
  }


}
