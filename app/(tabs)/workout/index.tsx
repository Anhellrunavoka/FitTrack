
import AddWorkoutModal from "@/src/components/addWorkoutModal";
import WorkoutCard from "@/src/components/WorkoutCard";
import { useUIStore } from "@/src/store/uiStore";
import { useWorkoutStore } from "@/src/store/workoutStore";
import { Workout } from "@/src/types/workout";
import { Text } from "@react-navigation/elements";
import { useRouter } from "expo-router";


import {FlatList, StyleSheet, View } from "react-native";

const HomeScreen=() =>{
  const{workouts}=useWorkoutStore();
  const router=useRouter();
  const handleWorkoutPress=(workout:Workout)=>{
    router.push(`/workout/${workout.id}`);
  }
  const isModalOpen=useUIStore(state=>state.isAddWorkoutModalOpen);
  const closeModal=useUIStore(state=>state.closeAddWorkoutModalOpen);
  return (
       <View>
          <Text>Home</Text>

          <FlatList
          data={workouts}
          keyExtractor={item=>item.id}
          renderItem={({item})=><WorkoutCard workout={item} onPress={handleWorkoutPress}/>}/>

          <AddWorkoutModal visible={isModalOpen} onClose={closeModal}/>
       </View>
  );
}

const styles = StyleSheet.create({
 
});
export default HomeScreen;
