import pandas as pd

df=pd.read_csv('final.csv')

C=df['vote_average'].mean()
m=df['vote_count'].quantile(0.9)

BestRatedMovies=df.copy().loc[df['vote_count']>=m]

def weightedRating(x,m=m,C=C):
    v=x['vote_count']
    R=x['vote_average']
    Score=(v/(v+m)*R)+(m/(m+v)*C)
    return Score 

BestRatedMovies['Score']=BestRatedMovies.apply(weightedRating,axis=1)

BestRatedMovies=BestRatedMovies.sort_values('Score',ascending=False)

OUTPUT=BestRatedMovies[['title','vote_count','vote_average','poster_link']].head(20).values.tolist()



