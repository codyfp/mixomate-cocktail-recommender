def get_similar_cocktails(input_value,combined_df,similarity_matrix, N=5):
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
        if input_value not in combined_df['name'].values:
            raise ValueError(f"No cocktail named {input_value} found in the dataset.")
        cocktail_index = combined_df[combined_df['name'] == input_value].index[0]
    elif isinstance(input_value, int):  # Assuming ID is an integer
        if input_value not in combined_df['recipe_id'].values:
            raise ValueError(f"No cocktail with ID {input_value} found in the dataset.")
        cocktail_index = combined_df[combined_df['recipe_id'] == input_value].index[0]
    else:
        raise ValueError("Input value must be either a name (string) or an ID (integer).")
    
    # Fetch and enumerate similarity scores for the given cocktail
    similar_scores = list(enumerate(similarity_matrix[cocktail_index]))
    
    # Sort the scores
    sorted_similar_scores = sorted(similar_scores, key=lambda x: x[1], reverse=True)
    
    # Return the top N cocktail names excluding the input cocktail itself
    return [combined_df.iloc[i[0]]['name'] for i in sorted_similar_scores[1:N+1]]

