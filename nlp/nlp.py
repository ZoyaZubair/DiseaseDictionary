import nltk
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

nltk.download('punkt')

class DiseaseDictionary:
    def __init__(self, csv_file):
        self.data = pd.read_csv(csv_file)
        self.vectorizer = TfidfVectorizer().fit_transform(self.data['description'])
    
    def get_disease_info(self, query):
        query_vector = TfidfVectorizer().fit_transform([query])
        similarities = cosine_similarity(query_vector, self.vectorizer).flatten()
        max_sim_index = similarities.argmax()
        return self.data.iloc[max_sim_index]

# Usage Example:
# dictionary = DiseaseDictionary('diseases.csv')
# result = dictionary.get_disease_info('fever symptoms')
