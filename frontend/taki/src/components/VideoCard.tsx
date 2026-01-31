// src/components/VideoCard.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
} from "react-native";
import theme from "../styles/theme";

type Props = {
  post: any;
};

export default function VideoCard({ post }: Props) {
  const uri = post?.midias?.[0]?.url_cdn;
  const thumb = post?.midias?.[0]?.thumb_url || uri;

  const onOpen = async () => {
    if (!uri) {
      Alert.alert("Sem mídia", "Este post não tem mídia disponível.");
      return;
    }
    // abre no player do sistema / browser
    try {
      const supported = await Linking.canOpenURL(uri);
      if (supported) {
        await Linking.openURL(uri);
      } else {
        Alert.alert("Não foi possível abrir", "O dispositivo não suporta abrir este tipo de URL.");
      }
    } catch (err) {
      console.error("[VideoCard] open error", err);
      Alert.alert("Erro", "Não foi possível abrir a mídia.");
    }
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity activeOpacity={0.9} onPress={onOpen} style={styles.mediaWrap}>
        {thumb ? (
          <Image source={{ uri: thumb }} style={styles.media} resizeMode="cover" />
        ) : (
          <View style={[styles.media, styles.mediaFallback]}>
            <Text style={{ color: "#fff" }}>Sem Thumb</Text>
          </View>
        )}

        <View style={styles.playOverlay}>
          <View style={styles.playCircle}>
            <Text style={styles.playTriangle}>▶</Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.info}>
        <Text style={styles.user}>{post.usuario?.nome ?? "Usuário"}</Text>
        <Text style={styles.caption} numberOfLines={2}>
          {post.conteudo}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 12, backgroundColor: theme.colors.card, borderRadius: 12, overflow: "hidden" },
  mediaWrap: { width: "100%", aspectRatio: 9 / 16, backgroundColor: "#000" },
  media: { width: "100%", height: "100%" },
  mediaFallback: { alignItems: "center", justifyContent: "center", backgroundColor: "#000" },
  playOverlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center" },
  playCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: "rgba(0,0,0,0.5)", alignItems: "center", justifyContent: "center" },
  playTriangle: { color: "#fff", fontSize: 20, marginLeft: 6 },
  info: { padding: 12 },
  user: { color: theme.colors.text, fontWeight: "700" },
  caption: { color: theme.colors.textMuted, marginTop: 6 },
});
