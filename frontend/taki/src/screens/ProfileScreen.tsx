// src/screens/ProfileScreen.tsx
import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  Dimensions,
  RefreshControl,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import api from "../api/client";
import theme from "../styles/theme";
import { AuthContext } from "../context/AuthContext";

const { width } = Dimensions.get("window");

/**
 * ProfileScreen (desenvolvimento)
 * - mantive as flags que tinhas (FEATURE_PROFILE_API, FEATURE_PROFILE_POSTS, FEATURE_FEED_ENABLED)
 * - adicionei botão de Terminar Sessão
 */

const FEATURE_PROFILE_API = false;
const FEATURE_PROFILE_POSTS = false;
const FEATURE_FEED_ENABLED = false;
const USE_MOCK_MOMENTS = true;

const mockMoments = [
  {
    post_id: "mock-p1",
    conteudo: "Memória linda!",
    usuario: { nome: "Você", user_id: "me", email: "me@taki.local" },
    midias: [{ media_id: "mm1", thumb_url: "https://picsum.photos/300/300", url_cdn: "https://picsum.photos/720/1280" }],
  },
];

export default function ProfileScreen() {
  const { user, signOut } = useContext(AuthContext);
  const [profile, setProfile] = useState<any>(null);
  const [moments, setMoments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [feedAvailable, setFeedAvailable] = useState<boolean | null>(null);

  const fetchProfileAndMoments = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setMoments([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      setProfile(user);

      if (FEATURE_PROFILE_API) {
        try {
          const resp = await api.get(`/profiles/${user.user_id}`);
          setProfile(resp.data);
        } catch (err: any) {
          console.warn("[Profile] /profiles/:id failed (ignored)", err?.message || err);
        }
      }

      if (FEATURE_PROFILE_POSTS) {
        try {
          const r2 = await api.get(`/profiles/${user.user_id}/posts`);
          if (Array.isArray(r2.data)) {
            setMoments(r2.data);
            setFeedAvailable(true);
            return;
          }
        } catch (err: any) {
          console.warn("[Profile] /profiles/:id/posts failed (ignored)", err?.message || err);
        }
      }

      if (FEATURE_FEED_ENABLED) {
        try {
          const feed = await api.get("/feed?page=1&limit=50");
          const posts = (feed.data.posts || []).filter((p: any) => {
            const postUser = p.usuario || {};
            if (user.user_id && postUser.user_id) return String(postUser.user_id) === String(user.user_id);
            if (user.email && postUser.email) return String(postUser.email) === String(user.email);
            return false;
          });
          setMoments(posts);
          setFeedAvailable(true);
          return;
        } catch (err: any) {
          console.warn("[Profile] /feed request failed (ignored)", err?.message || err);
          if (err?.response?.status === 404) setFeedAvailable(false);
        }
      }

      if (USE_MOCK_MOMENTS) {
        setMoments(mockMoments);
        setFeedAvailable(false);
      } else {
        setMoments([]);
        setFeedAvailable(false);
      }
    } catch (err) {
      console.error("Erro ao carregar perfil:", err);
      Alert.alert("Erro", "Não foi possível carregar o perfil.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProfileAndMoments();
  }, [fetchProfileAndMoments]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchProfileAndMoments();
    setRefreshing(false);
  }, [fetchProfileAndMoments]);

  const handleSignOut = () => {
    Alert.alert("Sair", "Desejas terminar a sessão?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut();
          } catch (err) {
            console.warn("[Profile] signOut error", err);
          }
        },
      },
    ]);
  };

  if (!user) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: theme.colors.textMuted }}>Inicia sessão para ver o perfil</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.colors.primary} />}
    >
      <View style={styles.header}>
        <View style={styles.topRow}>
          <View style={styles.profileRow}>
            <Image
              source={profile?.foto_url ? { uri: profile.foto_url } : require("../../assets/default-profile-aluno.png")}
              style={styles.avatar}
            />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={styles.name}>{profile?.nome || "Usuário TAKI"}</Text>
              <Text style={styles.level}>{profile?.nivel || "Explorador"}</Text>
            </View>

            <TouchableOpacity style={styles.editBtn} onPress={() => Alert.alert("Editar", "Implementa a edição de perfil.")}>
              <Text style={styles.editText}>Editar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <View style={styles.ringWrapper}>
              <View style={styles.ringOuter}>
                <View style={styles.ringInner}>
                  <Text style={styles.statValueSmall}>{Math.round(((profile?.taki_coins ?? 0) % 100))}%</Text>
                </View>
              </View>
            </View>
            <Text style={styles.statLabel}>Progresso</Text>
          </View>

          <View style={styles.stat}>
            <Text style={styles.statValue}>{profile?.taki_coins ?? 0}</Text>
            <Text style={styles.statLabel}>TakiCoins</Text>
          </View>

          <View style={styles.stat}>
            <Text style={styles.statValue}>{profile?.total_viagens ?? 0}</Text>
            <Text style={styles.statLabel}>Viagens</Text>
          </View>
        </View>

        {profile?.biografia ? <Text style={styles.bio}>{profile.biografia}</Text> : null}

        {/* Sign out button */}
        <View style={{ marginTop: 12, alignItems: "flex-end" }}>
          <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
            <Text style={styles.signOutText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Momentos</Text>

        {moments.length === 0 ? (
          <View style={styles.emptyBox}>
            {feedAvailable ? (
              <>
                <Text style={styles.emptyText}>Ainda não tens momentos publicados.</Text>
                <Text style={styles.emptySub}>Regista um momento numa viagem para aparecer aqui.</Text>
              </>
            ) : (
              <>
                <Text style={styles.emptyText}>O feed/perfil ainda não está disponível no servidor.</Text>
                <Text style={styles.emptySub}>Durante o desenvolvimento, ativa FEATURE_PROFILE_POSTS ou FEATURE_FEED_ENABLED quando as rotas estiverem prontas.</Text>
              </>
            )}
          </View>
        ) : (
          <FlatList
            data={moments}
            keyExtractor={(i) => i.post_id || i.media_id || String(Math.random())}
            numColumns={3}
            scrollEnabled={false}
            columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: 12 }}
            renderItem={({ item }) => {
              const thumb = item.midias?.[0]?.thumb_url || item.midias?.[0]?.url_cdn;
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.gridItemWrapper}
                  onPress={() => {
                    Alert.alert("Momento", "Implementa a navegação para ver este momento/post.");
                  }}
                >
                  <Image source={{ uri: thumb }} style={styles.gridItem} />
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </ScrollView>
  );
}

const AVATAR_SIZE = 84;
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { padding: 16, paddingTop: 50, backgroundColor: theme.colors.card, borderBottomLeftRadius: 12, borderBottomRightRadius: 12 },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  profileRow: { flexDirection: "row", alignItems: "center", flex: 1 },
  avatar: { width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: AVATAR_SIZE / 2, backgroundColor: "#222" },
  name: { color: theme.colors.text, fontSize: 20, fontWeight: "700" },
  level: { color: theme.colors.primary, marginTop: 4 },
  editBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: "#213" },
  editText: { color: theme.colors.text, fontSize: 13 },
  statsRow: { flexDirection: "row", marginTop: 12, justifyContent: "space-between", alignItems: "center" },
  stat: { alignItems: "center", flex: 1 },
  statValue: { color: theme.colors.text, fontWeight: "700", fontSize: 18 },
  statValueSmall: { color: theme.colors.text, fontWeight: "700", fontSize: 14 },
  statLabel: { color: theme.colors.textMuted, marginTop: 4, fontSize: 12 },
  bio: { color: theme.colors.textMuted, marginTop: 12 },
  content: { paddingHorizontal: 12, marginTop: 12 },
  sectionTitle: { color: theme.colors.text, fontWeight: "700", marginBottom: 8 },
  emptyBox: { padding: 16, backgroundColor: "#071026", borderRadius: 12, alignItems: "center" },
  emptyText: { color: theme.colors.textMuted, fontSize: 14 },
  emptySub: { color: theme.colors.textMuted, fontSize: 12, marginTop: 6 },
  gridItemWrapper: { marginBottom: 12, width: (width - 48) / 3 },
  gridItem: { width: (width - 48) / 3, height: (width - 48) / 3, borderRadius: 8, backgroundColor: "#000" },

  /* ring styles (visual simple) */
  ringWrapper: { alignItems: "center", justifyContent: "center" },
  ringOuter: { width: 64, height: 64, borderRadius: 64 / 2, borderWidth: 6, borderColor: theme.colors.primary, alignItems: "center", justifyContent: "center", backgroundColor: "transparent" },
  ringInner: { width: 46, height: 46, borderRadius: 46 / 2, backgroundColor: theme.colors.card, alignItems: "center", justifyContent: "center" },

  signOutBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: theme.colors.danger ?? "#EF4444",
  },
  signOutText: { color: "#fff", fontWeight: "700" },
});
