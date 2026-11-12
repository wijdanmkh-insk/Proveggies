// File: src/app/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    // Menyembunyikan header bawaan Expo untuk semua layar
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="daftar-alat" />
      <Stack.Screen name="Dashboard" />
    </Stack>
  );
}