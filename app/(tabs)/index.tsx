
import WorkoutCard from "@/src/components/WorkoutCard";
import { MOCK_WORKOUTS } from "@/src/constants/mockData";
import { Workout } from "@/src/types/workout";
import { Text } from "@react-navigation/elements";
import { useRouter } from "expo-router";


import {FlatList, StyleSheet, View } from "react-native";

const HomeScreen=() =>{
  const router=useRouter();
  const handleWorkoutPress=(workout:Workout)=>{
    router.push(`/workout/${workout.id}`);
  }
  return (
       <View>
          <Text>Home</Text>

          <FlatList
          data={MOCK_WORKOUTS}
          keyExtractor={item=>item.id}
          renderItem={({item})=><WorkoutCard workout={item} onPress={handleWorkoutPress}/>}/>
       </View>
  );
}

const styles = StyleSheet.create({
 
});
export default HomeScreen;
