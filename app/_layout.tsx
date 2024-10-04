import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { createTables } from '@/db/database';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    createTables();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tracker)/AddSemesterScreen" options={{title: 'Add New Semester'}} />
        <Stack.Screen name="(tracker)/AddCourseScreen" options={{title: 'Add New Course'}} />
        <Stack.Screen name="(tracker)/AddAssessmentsScreen" options={{title: 'Add New Assessment'}} />
        <Stack.Screen name="(tracker)/CourseScreen" options={{title: 'Course List', headerShown: false}}  />
        <Stack.Screen name="(tracker)/CourseDetailScreen" options={{title: 'Course Details', headerShown: false}}  />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
