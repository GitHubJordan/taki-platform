import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import theme from "../styles/theme";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>TAKI</Text>
      <Text style={styles.slogan}>O seu destino é importante</Text>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: { color: theme.colors.text, fontSize: 40, fontWeight: "700" },
  slogan: { color: theme.colors.textMuted, marginTop: 12 },
});
