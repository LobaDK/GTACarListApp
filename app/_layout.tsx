import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Stack } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { AuthProvider, useAuth } from "./context/authContext";
import AccountModal from "./modals/AccountModal";

const Drawer = createDrawerNavigator();

function AppBar({ title }: { title: string }) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [accountModalVisible, setAccountModalVisible] = useState(false);
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setAccountModalVisible(false);
  };

  return (
    <View style={[styles.appBar, { paddingTop: insets.top }]}>
      {/* Left: Menu Button */}
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Icon name="menu" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Middle: Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Right: Account Button */}
      <TouchableOpacity onPress={() => setAccountModalVisible(true)}>
        <Icon name="account-circle" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Account Modal */}
      <AccountModal
        visible={accountModalVisible}
        onClose={() => setAccountModalVisible(false)}
        onSignOut={handleSignOut}
      />
    </View>
  );
}

function DrawerScreens() {
  return (
    <Stack
      initialRouteName="VehicleList"
      screenOptions={{
        header: () => <AppBar title="Your Collection" />,
      }}
    >
      <Stack.Screen name="VehicleList" />
    </Stack>
  );
}

export default function AppLayout() {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
}

function RootLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <Stack
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" />
      </Stack>
    );
  }

  return (
    // Drawer navigator
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Your collection" component={DrawerScreens} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  appBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e1e2f",
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: "space-between",
  },
  title: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 12,
    backgroundColor: "#2e2e3f",
    borderRadius: 8,
    paddingHorizontal: 10,
    color: "#fff",
    height: 36,
  },
  accountMenu: {
    position: "absolute",
    top: 48,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    elevation: 4,
    zIndex: 10,
  },
});
