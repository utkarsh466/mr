import { StyleSheet, Text, View ,TouchableOpacity,Image} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize'
import * as React from 'react';
import {Header,AirbnbRating,Icon} from 'react-native-elements'
import axios from 'axios';

export default class Home extends React.Component {

    get_movies=()=>{
        
        try{
            axios
            .get('https://127.0.0.1:5000/get-movies')
            .then((response)=>{
            console.log(response)
        })
        }
        catch(e){
            console.log(e)
        }
    }
    componentDidMount(){
        this.get_movies()
    }

    render() {
        return(
            <View>

            </View>
        );
    }

}
