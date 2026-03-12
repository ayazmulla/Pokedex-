import { Link } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import colorsByType from "./colors";

export default function PokemonCard({ pokemon }: any) {
  const type = pokemon.types[0].type.name;

  return (
    <Link
      href={{ pathname: "/details", params: { name: pokemon.name } }}
      style={[styles.card, { backgroundColor: colorsByType[type] || "#ccc" }]}
    >
      <View>
        <Text style={styles.name}>{pokemon.name}</Text>

        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>{type}</Text>
        </View>

        <Image source={{ uri: pokemon.image }} style={styles.image} />
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
  },

  typeBadge: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 5,
    alignSelf: "flex-start",
  },

  typeText: {
    fontWeight: "bold",
  },

  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 10,
  },
});
