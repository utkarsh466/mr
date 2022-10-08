from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

df = pd.read_csv('final.csv')

df=df[df['soup'].notna()]

count=CountVectorizer(stop_words='english')
count_matrix=count.fit_transform(df['soup'])

cosine_sim=cosine_similarity(count_matrix,count_matrix)

df=df.reset_index()
indices=pd.Series(df.index,index=df['title'])


def getRecommendation(title,C_S):
    idx=indices[title]
    sim_scores=list(enumerate(C_S[idx]))
    sim_scores=sorted(sim_scores,key=lambda x:x[1],reverse=True)
    sim_scores=sim_scores[1:21]
    movie_indices=[i[0] for i in sim_scores]
    return df[['title','vote_count','vote_average','poster_link']].iloc[movie_indices].values.to_list()

