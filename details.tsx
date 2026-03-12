import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text } from "react-native";

export default function Details() {
  const params = useLocalSearchParams();

  const [pokemon, setPokemon] = useState<any>(null);

  useEffect(() => {
    fetchPokemon();
  }, []);

  async function fetchPokemon() {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);

    const data = await res.json();

    setPokemon(data);
  }

  if (!pokemon) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <Stack.Screen options={{ title: pokemon.name }} />

      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={{ uri: pokemon.sprites.front_default }}
          style={styles.image}
        />

        <Text style={styles.name}>{pokemon.name.toUpperCase()}</Text>

        <Text style={styles.text}>Height: {pokemon.height}</Text>

        <Text style={styles.text}>Weight: {pokemon.weight}</Text>

        <Text style={styles.text}>
          Type: {pokemon.types.map((t: any) => t.type.name).join(", ")}
        </Text>

        <Text style={styles.text}>
          Abilities:{" "}
          {pokemon.abilities.map((a: any) => a.ability.name).join(", ")}
        </Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },

  image: {
    width: 200,
    height: 200,
  },

  name: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
  },

  text: {
    fontSize: 18,
    marginTop: 10,
  },
});


