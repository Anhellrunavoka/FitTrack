import {  Text } from '@react-navigation/elements';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const Progress = () => {
    const scale=useSharedValue(1);

    const animatedStyle=useAnimatedStyle(()=>{
        return{
            transform:[{scale:scale.value}]
        }
    })

    const handlePress=()=>{
        if(scale.value===1){
            scale.value=withSpring(0.5,{stiffness:1500,damping:50,mass:100});
        }else{
            scale.value=withSpring(1,{duration:1000});
        }
    }
    return (
        <SafeAreaView style={{flex:1}}>
            <Animated.View style={[styles.box,animatedStyle]}/>
            <Button title="Zoom" onPress={handlePress}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    box:{
        width:100,
        height:100,
        backgroundColor:'purple',
        marginBottom:20
    }
})

export default Progress;
