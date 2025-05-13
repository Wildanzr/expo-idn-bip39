import { useColorScheme } from "@/lib/use-color-scheme";
import Entypo from "@expo/vector-icons/Entypo";

import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const { colors } = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color, focused }) => (
            <Entypo name="wallet" size={50} color={colors.grey} />
          ),
        }}
      />
      <Tabs.Screen
        name="wordlist"
        options={{
          title: "Wordlist",
          tabBarIcon: ({ color, focused }) => (
            <Entypo name="text" size={24} color={colors.grey} />
          ),
        }}
      />
    </Tabs>
  );
}
