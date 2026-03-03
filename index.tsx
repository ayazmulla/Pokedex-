import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

interface Pokemon {
  name: string;
  image: string;
  imageBack: string;
  types: PokemonTypes[];
}

interface PokemonTypes {
  type: {
    name: string;
    url: string;
  };
}

const colorsByType = {
  grass: "#38b000", // fresh vibrant green
  fire: "#ff4d00", // bright fiery orange-red
  water: "#0096ff", // rich ocean blue
  bug: "#70e000", // lively lime green
};

export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    try {
      const respond = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=10",
      );

      const data = await respond.json();

      //Fetch each pokemon

      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            name: pokemon.name,
            image: details.sprites.front_default,
            imageBack: details.sprites.back_default,
            types: details.types,
          };
        }),
      );
      setPokemons(detailedPokemons);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}
    >
      {pokemons.map((pokemon) => (
        <Link
          key={pokemon.name}
          href={{ pathname: "/details", params: { name: pokemon.name } }}
          style={{
            backgroundColor: colorsByType[pokemon.types[0].type.name] + 70,
            padding: 20,
            borderRadius: 20,
          }}
        >
          <View>
            <Text style={styles.name}>{pokemon.name}</Text>
            <Text style={styles.type}>{pokemon.types[0].type.name}</Text>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Image
                source={{ uri: pokemon.image }}
                style={{ width: 100, height: 100 }}
              />
              <Image
                source={{ uri: pokemon.imageBack }}
                style={{ width: 150, height: 150 }}
              />
            </View>
          </View>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 29,
    fontWidth: "bold",
    textAlign: "center",
  },
  type: {
    fontSize: 20,
    fontWidth: "bold",
    color: "gray",
    textAlign: "center",
  },
});
