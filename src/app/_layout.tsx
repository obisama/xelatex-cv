import { Amiri_400Regular, Amiri_700Bold, useFonts } from '@expo-google-fonts/amiri';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ProgressProvider } from '@/state/progress';
import { SettingsProvider, useSettings } from '@/state/settings';

SplashScreen.preventAutoHideAsync();

function AppStack() {
  const { colors, isDark, ready } = useSettings();
  const [fontsLoaded] = useFonts({ Amiri_400Regular, Amiri_700Bold });

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(colors.background).catch(() => {});
  }, [colors.background]);

  useEffect(() => {
    if (ready && fontsLoaded) SplashScreen.hideAsync();
  }, [ready, fontsLoaded]);

  if (!ready || !fontsLoaded) return null;

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'slide_from_right',
        }}
      />
    </>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <ProgressProvider>
          <AppStack />
        </ProgressProvider>
      </SettingsProvider>
    </SafeAreaProvider>
  );
}
