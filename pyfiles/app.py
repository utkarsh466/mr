from flask import Flask,jsonify,request
import csv
import demographicFilt
import ContentBasedFilt

all_movies=[]
with open('final.csv',encoding="utf8") as f:
    reader=csv.reader(f)
    data=list(reader)
    all_movies=data[1:]

liked_moviz=[]
disliked_moviz=[]
notwatched_moviz=[]




app=Flask(__name__)

@app.route('/get-movies')

def getMovies():
    movie_data = { 
                  "title": all_movies[0][19],
                  "poster_link": all_movies[0][27],
                  "release_date": all_movies[0][13] or "N/A",
                  "duration": all_movies[0][15], 
                  "rating": all_movies[0][20], 
                  "overview": all_movies[0][9]
                  }
    return jsonify({"Data":movie_data,"Status":"Success"})

@app.route('/liked-movies',methods=['POST'])

def likedMovies():
    movie=all_movies[0]
    all_movies=all_movies[1:] #all_movies.pop(0)
    liked_moviz.append(movie)
    return jsonify({"Status":"Success"})

@app.route('/disliked-movies', methods=['POST'])
    
def dislikedMovies():
    movie=all_movies[0]
    all_movies=all_movies[1:]
    disliked_moviz.append(movie)
    return jsonify({"Status":"Success"})

@app.route('/did-not-watched',methods=['POST'])

def dnwMovies():
    movie=all_movies[0]
    all_movies=all_movies[1:]
    notwatched_moviz.append(movie)
    return jsonify({"Status":"Success"})
           
@app.route('/get-popular-movies')

def gpm():
    return jsonify({"Data":demographicFilt.OUTPUT,"Status":"Success"})

@app.route('/get-recommended-movies',methods=['POST'])

def grm():
    movies=all_movies[0]
    
    return jsonify({"Data":ContentBasedFilt.getRecommendation(movies)})
    
app.run(debug=True)

