import "expo-dev-client";
import "../global.css";

import { useColorScheme } from "@/lib/use-color-scheme";
import { NAV_THEME } from "@/theme/";
import { ThemeProvider as NavThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <NavThemeProvider value={NAV_THEME[colorScheme]}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            title: "EVM Wallet Generator",
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </NavThemeProvider>
  );
}
