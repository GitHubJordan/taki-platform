import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import theme from "../styles/theme";

export default function CallRideScreen({ navigation }: any) {
  const onConfirm = async () => {
    // chamar POST /viagens
    // ex: await api.post('/viagens', { usuario_id: '...', destino_id: '...', tipo: 'romantica' })
    navigation.navigate("TripProgress");
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapPlaceholder}>
        <Text style={{ color: theme.colors.textMuted }}>
          Mapa (a integrar com react-native-maps ou Mapbox)
        </Text>
      </View>
      <View style={styles.bottomSheet}>
        <Text style={styles.sheetTitle}>Escolha destino</Text>
        {/* campos destino, opções de tipo */}
        <TouchableOpacity style={styles.confirmBtn} onPress={onConfirm}>
          <Text style={{ color: "#fff" }}>Confirmar Corrida</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  mapPlaceholder: { flex: 1, justifyContent: "center", alignItems: "center" },
  bottomSheet: {
    height: 260,
    backgroundColor: theme.colors.card,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  sheetTitle: { color: theme.colors.text, fontWeight: "700", marginBottom: 12 },
  confirmBtn: {
    marginTop: 12,
    backgroundColor: theme.colors.primary,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
});
