// src/screens/HomeScreen.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import api from "../api/client";
import theme from "../styles/theme";

const { height, width } = Dimensions.get("window");

/**
 * Full-screen feed (vertical pager)
 * - uses FlatList with pagingEnabled + snapToInterval = height
 * - each item occupies full screen (height)
 * - simple overlay UI (top: safe area, bottom: actions)
 *
 * Notes:
 * - Use feature flag to avoid calling /feed during development
 * - The card here uses thumbnail + overlay and open-on-press behaviour (avoids native player conflicts)
 */

const FEATURE_FEED_ENABLED = false; // enable when backend /feed exists
const USE_MOCK_FEED = true;

const mockPosts = [
  {
    post_id: "mock-1",
    conteudo: "Passeio incrível pelo miradouro!",
    usuario: { nome: "Maria Silva", user_id: "u1", email: "maria@exemplo.com" },
    midias: [
      {
        media_id: "m1",
        url_cdn: "https://picsum.photos/720/1280?random=1",
        thumb_url: "https://picsum.photos/720/1280?random=1",
        tipo: "image",
      },
    ],
    curtidas: 12,
    comentarios: 3,
  },
  {
    post_id: "mock-2",
    conteudo: "Registrei um momento TAKI hoje.",
    usuario: { nome: "Carlos Mendes", user_id: "u2", email: "carlos@exemplo.com" },
    midias: [
      {
        media_id: "m2",
        url_cdn: "https://picsum.photos/720/1280?random=2",
        thumb_url: "https://picsum.photos/720/1280?random=2",
        tipo: "video",
      },
    ],
    curtidas: 42,
    comentarios: 8,
  },
];

export default function HomeScreen() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const insets = useSafeAreaInsets();
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      setLoading(true);
      if (!FEATURE_FEED_ENABLED) {
        if (USE_MOCK_FEED) setPosts(mockPosts);
        else setPosts([]);
        setLoading(false);
        return;
      }

      try {
        const resp = await api.get("/feed?page=1&limit=10");
        if (!mounted) return;
        const p = resp.data?.posts || [];
        setPosts(p);
      } catch (err) {
        console.warn("[Home] feed error", err);
        if (USE_MOCK_FEED) setPosts(mockPosts);
        else setPosts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  const renderItem = ({ item }: { item: any }) => {
    const uri = item.midias?.[0]?.thumb_url || item.midias?.[0]?.url_cdn;
    return (
      <View style={[styles.cardContainer, { height }]}>
        <Image source={{ uri }} style={styles.media} resizeMode="cover" />
        {/* Top safe area / header overlay */}
        {/* <View style={[styles.topOverlay, { paddingTop: insets.top + 12 }]}>
          <Text style={styles.brand}>TAKI</Text>
        </View> */}

        {/* Bottom overlay actions */}
        <View style={styles.bottomOverlay}>
          <View style={styles.postInfo}>
            <Text style={styles.postUser}>{item.usuario?.nome}</Text>
            <Text style={styles.postCaption} numberOfLines={2}>
              {item.conteudo}
            </Text>
          </View>

          <View style={styles.actionsColumn}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionText}>❤</Text>
              <Text style={styles.actionCount}>{item.curtidas ?? 0}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionText}>💬</Text>
              <Text style={styles.actionCount}>{item.comentarios ?? 0}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionText}>🔖</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      ref={listRef}
      data={posts}
      keyExtractor={(i) => i.post_id}
      renderItem={renderItem}
      pagingEnabled
      snapToInterval={height}
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
      snapToAlignment="start"
      removeClippedSubviews
      windowSize={3}
      initialNumToRender={1}
      maxToRenderPerBatch={2}
      getItemLayout={(_, index) => ({ length: height, offset: height * index, index })}
    />
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.colors.background },
  cardContainer: { width: "100%", backgroundColor: theme.colors.background, position: "relative" },
  media: { width: "100%", height: "100%", backgroundColor: "#000" },
  // topOverlay: {
  //   position: "absolute",
  //   left: 0,
  //   right: 0,
  //   top: 0,
  //   paddingHorizontal: 16,
  // },
  brand: { color: theme.colors.text, fontSize: 18, fontWeight: "700" },
  bottomOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 150,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    alignItems: "flex-end",
  },
  postInfo: { flex: 1, paddingRight: 12 },
  postUser: { color: theme.colors.text, fontWeight: "700", fontSize: 16 },
  postCaption: { color: theme.colors.textMuted, marginTop: 6 },
  actionsColumn: { width: 72, alignItems: "center", justifyContent: "flex-end" },
  actionButton: { marginBottom: 16, alignItems: "center" },
  actionText: { color: "#fff", fontSize: 20 },
  actionCount: { color: theme.colors.textMuted, marginTop: 6, fontSize: 12 },
});
