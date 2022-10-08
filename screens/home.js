import { StyleSheet, Text, View ,TouchableOpacity,Image} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize'
import * as React from 'react';
import {Header,AirbnbRating,Icon} from 'react-native-elements'
import axios from 'axios';

export default class Home extends React.Component {

    constructor(){
        super();
        this.state={
            movie_detail:{}
        }
    }

    get_movies=()=>{
        
        try{
            axios
            .get('https://c097-103-163-192-175.in.ngrok.io/get-movies')
            .then((response)=>{
            var details=response.data.Data
            details['duration']=this.timeConvert(details.duration)
            this.setState({
                movie_detail:details
            })
        })
        }
        catch(e){
            console.log(e)
        }
    }
    liked_movies=()=>{
        axios
        .post('https://c097-103-163-192-175.in.ngrok.io/liked-movies')
        .then((response)=>{
            this.get_movies()
        })
        .catch((e)=>{console.log(e)})

    }
    disliked_movies=()=>{
        axios
        .post('https://c097-103-163-192-175.in.ngrok.io/disliked-movies')
        .then((response)=>{
            this.get_movies()
        })
    }
    notwatched_movies=()=>{
        axios
        .post('https://c097-103-163-192-175.in.ngrok.io/did-not-watched')
        .then((response)=>{
            this.get_movies()
        })
    }
    timeConvert=(num)=>{
        var hours=Math.floor(num/60)
        var minutes=num%60
        return `${hours}hrs ${minutes}mins`
    }

    componentDidMount(){
        this.get_movies()
    }

    render() {
        return(
            <View style={styles.container}>
                <Header
                    centerComponent={{
                        text:'Movies',
                        style:{
                            fontSize:RFValue(30),
                        }
                    }}
                    backgroundColor={'pink'}
                    rightComponent={{
                        icon:'movie-open',
                        color:'white',
                        type:'material-community',
                        onPress:()=>{

                        }
                    }}
                />
                <View style={styles.imgContainer}>
                    <Image source={{uri:this.state.movie_detail.poster_link}}/>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {this.state.movie_detail.title}
                    </Text>
                </View>
                <View style={styles.time}>
                    <Text style={styles.tt}>{this.state.movie_detail.release_date}</Text>
                    <Text style={styles.tt}>{this.state.movie_detail.duration}</Text>
                </View>
                <View style={styles.ratingContainer}>
                    <AirbnbRating
                    count={10}
                    defaultRating={this.state.movie_detail.rating}
                    isDisabled={true}
                    size={RFValue(25)}
                    />
                </View>
                <View style={styles.overviewContainer}>
                    <Text style={styles.overviewtext}>
                        {this.state.movie_detail.overview}
                    </Text>
                    <View style={styles.ldbtncont}>
                        <TouchableOpacity style={styles.lbtn} onPress={this.liked_movies}>
                            <Icon
                                name={'check'}
                                type={'entypo'}
                                size={RFValue(30)}
                                color={"#76FF03"}

                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.dbtn} onPress={this.disliked_movies}>
                            <Icon
                                name={'check'}
                                type={'entypo'}
                                size={RFValue(30)}
                                color={"#FF1744"}
                            />
                        </TouchableOpacity>
                    </View>
                    <View styles={styles.dnwbtncont}>
                        <TouchableOpacity style={styles.dnwbtn} onPress={this.notwatched_movies}>
                            <Text style={styles.dnwtxt}>
                                Did not watch
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

}
const styles=StyleSheet.create({
    container:{
        flex:1
    }
})
