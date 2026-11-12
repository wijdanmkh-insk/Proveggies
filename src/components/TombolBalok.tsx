// File: src/components/TombolBalok.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface TombolBalokProps {
  teks: string;
  onPress: () => void;
  warnaBg?: string; // Opsional: jika ingin warna selain hijau
}

export default function TombolBalok({ teks, onPress, warnaBg = '#64dd17' }: TombolBalokProps) {
  return (
    <TouchableOpacity 
      style={[styles.tombol, { backgroundColor: warnaBg }]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.teksTombol}>{teks}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tombol: {
    padding: 18,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#1b5e20',
    width: '100%',
    marginTop: 10,
    borderRadius: 15, 
    // Efek bayangan balok 3D
    shadowColor: '#1b5e20',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  teksTombol: {
    color: '#1b5e20',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 1,
  }
});