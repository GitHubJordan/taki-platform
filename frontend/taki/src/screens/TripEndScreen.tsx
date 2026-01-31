import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import theme from "../styles/theme";

export default function TripEndScreen({ navigation }: any) {
  const onPublish = () => {
    // PUT /viagens/{id}/concluir + POST /posts
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fim da Viagem 🎉</Text>
      <TouchableOpacity style={styles.publish} onPress={onPublish}>
        <Text style={{ color: "#fff" }}>Publicar Momento no Feed</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: theme.colors.text,
    marginTop: 40,
  },
  publish: {
    marginTop: 20,
    backgroundColor: theme.colors.primary,
    padding: 14,
    borderRadius: 12,
  },
});
