// src/navigation/AppNavigator.tsx
import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import CallRideScreen from "../screens/CallRideScreen";
import TripProgressScreen from "../screens/TripProgressScreen";
import ProfileScreen from "../screens/ProfileScreen";
import TripEndScreen from "../screens/TripEndScreen";
import { Ionicons } from "@expo/vector-icons";
import theme from "../styles/theme";

// optional BlurView (expo-blur)
let BlurView: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  BlurView = require("expo-blur").BlurView;
} catch (e) {
  BlurView = null;
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const { width } = Dimensions.get("window");

/**
 * TopBar - recebe navigation do Tab (quando usado como header do Tab.Navigator),
 * e usa navigation.getParent() para navegar ao Stack 'Profile' (tela separada).
 *
 * Mostra avatar do user (AuthContext) ou imagem default.
 */
function TopBar({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { user } = useContext(AuthContext);

  const onPressProfile = () => {
    // tenta navegar para a screen 'Profile' no stack pai
    // getParent() costuma retornar o Stack navigator que contém o Tab navigator
    const parent = navigation?.getParent?.();
    if (parent && parent.navigate) {
      parent.navigate("Profile");
    } else {
      // fallback: tentar navegar localmente (pode falhar silenciosamente se não existir)
      navigation.navigate("Profile");
    }
  };

  return (
    <View style={[styles.topbar, { paddingTop: insets.top + 8 }]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.topbarTitle}>TAKI</Text>
        <Text style={styles.topbarSubtitle}> — O seu destino é importante</Text>
      </View>

      <View style={styles.topbarRight}>
        <TouchableOpacity
          onPress={onPressProfile}
          style={styles.avatarBtn}
          activeOpacity={0.8}
        >
          {/* {user?.foto_url ? (
            <Image source={{ uri: user.foto_url }} style={styles.avatar} />
          ) : (
            <Image source={require("../../assets/default-profile-aluno.png")} style={styles.avatar} />
          )} */}

          <Image source={require("../../assets/default-profile-aluno.png")} style={styles.avatar} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function CustomTabBar({ state, descriptors, navigation }: any) {
  const paddingBottom = Platform.OS === "ios" ? 18 : 12;
  const Container: React.ComponentType<any> = BlurView ? BlurView : View;
  const containerProps = BlurView
    ? { intensity: 70, tint: "dark", style: styles.blurContainer }
    : { style: styles.fallbackContainer };

  return (
    <Container {...containerProps}>
      <View style={[styles.tabBar, { paddingBottom }]}>
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const iconName = (() => {
            switch (route.name) {
              case "Home":
                return isFocused ? "home" : "home-outline";
              case "Viagem":
                return isFocused ? "car" : "car-outline";
              case "Momentos":
                return isFocused ? "albums" : "albums-outline";
              default:
                return "ellipse";
            }
          })();

          const label = route.name; // já está nos nomes que definimos

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tabItem}
              activeOpacity={0.85}
            >
              <Ionicons
                name={iconName as any}
                size={22}
                color={isFocused ? theme.colors.primary : theme.colors.textMuted}
              />
              <Text style={[styles.tabLabel, { color: isFocused ? theme.colors.primary : theme.colors.textMuted }]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </Container>
  );
}

/**
 * MainTabs - três tabs conforme pedido:
 * - Home -> HomeScreen
 * - Viagem -> CallRideScreen
 * - Momentos -> TripProgressScreen (conforme tua instrução para mapear Momentos à TripProgress)
 *
 * Aqui definimos header do Tab Navigator como TopBar (recebe navigation do Tab),
 * o que permite TopBar usar navigation.getParent() para abrir a screen 'Profile' do Stack.
 */
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        header: (props) => <TopBar {...props} />, // TopBar recebe navigation do Tab
        headerShown: true,
        tabBarStyle: { display: "none" }, // usamos CustomTabBar
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Viagem" component={CallRideScreen} />
      <Tab.Screen name="Momentos" component={TripProgressScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            {/* Profile como tela stack separada — TopBar navega para aqui */}
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="TripEnd" component={TripEndScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const TAB_HEIGHT = 72;
const styles = StyleSheet.create({
  topbar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: theme.colors.card,
    zIndex: 50,
  },
  topbarTitle: {
    color: theme.colors.text,
    fontWeight: "800",
    fontSize: 20,
  },
  topbarSubtitle: {
    color: theme.colors.textMuted,
    marginLeft: 8,
    fontWeight: "600",
    fontSize: 12,
  },
  topbarRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarBtn: {
    padding: 6,
    borderRadius: 999,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
  },

  blurContainer: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 12,
    borderRadius: 28,
    overflow: "hidden",
    alignItems: "center",
  },
  fallbackContainer: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 12,
    borderRadius: 28,
    backgroundColor: "rgba(8,10,20,0.6)",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 12,
  },
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: TAB_HEIGHT,
    paddingHorizontal: 12,
    width: width - 32,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4 as any,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: "600",
  },
});
