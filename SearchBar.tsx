import { StyleSheet, TextInput } from "react-native";

export default function SearchBar({ search, setSearch }: any) {
  return (
    <TextInput
      placeholder="🔍 Search Pokémon..."
      placeholderTextColor="#888"
      value={search}
      onChangeText={setSearch}
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#ffffff",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 15,
    marginBottom: 16,
    fontSize: 18,
    borderWidth: 2,
    borderColor: "#ff4d00",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
});
