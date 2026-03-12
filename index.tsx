import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

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

const colorsByType: any = {
  grass: "#38b000",
  fire: "#ff4d00",
  water: "#0096ff",
  bug: "#70e000",
};

export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    try {
      const respond = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=50",
      );

      const data = await respond.json();

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

  // Search filtering
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}
    >
      {/* Search Bar */}
      <TextInput
        placeholder="Search Pokémon..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      {filteredPokemons.map((pokemon) => (
        <Link
          key={pokemon.name}
          href={{ pathname: "/details", params: { name: pokemon.name } }}
          style={{
            backgroundColor: colorsByType[pokemon.types[0].type.name] || "#ccc",
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
                justifyContent: "center",
              }}
            >
              <Image
                source={{ uri: pokemon.image }}
                style={{ width: 100, height: 100 }}
              />

              <Image
                source={{ uri: pokemon.imageBack }}
                style={{ width: 120, height: 120 }}
              />
            </View>
          </View>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  search: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },

  name: {
    fontSize: 29,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "capitalize",
  },

  type: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
    textAlign: "center",
  },
});
