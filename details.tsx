import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function Details() {
  const params = useLocalSearchParams();
  console.log(params.name);

  useEffect(() => {}, []);

  async function fetchPokemonByName(name: string) {
    // try{} catch()
  }
  return (
    <>
      <Stack.Screen options={{ title: params.name as string }} />
      <ScrollView
        contentContainerStyle={{
          gap: 16,
          padding: 16,
        }}
      ></ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
