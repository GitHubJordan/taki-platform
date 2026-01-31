import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import theme from "../styles/theme";

export default function TripProgressScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Viagem em progresso</Text>
      <Text style={styles.sub}>Motorista: Pedro K.</Text>

      <TouchableOpacity
        style={styles.momentBtn}
        onPress={() => {
          /* abrir camera / gravar */
        }}
      >
        <Text style={{ color: "#fff" }}>Registrar Momento TAKI</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.endBtn}
        onPress={() => navigation.navigate("TripEnd")}
      >
        <Text>Finalizar Viagem</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: theme.colors.background },
  title: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  sub: { color: theme.colors.textMuted, marginBottom: 20 },
  momentBtn: {
    backgroundColor: theme.colors.accent,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  endBtn: { padding: 12, borderRadius: 10, alignItems: "center" },
});
