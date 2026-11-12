// File: src/components/InputBalok.tsx
import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

interface InputBalokProps {
  label: string;
  placeholder: string;
  isPassword?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
}

export default function InputBalok({ label, placeholder, isPassword, value, onChangeText }: InputBalokProps) {
  return (
    <View style={styles.wadah}>
      <Text style={styles.label}>{label}</Text>
      <TextInput 
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#7cb342"
        secureTextEntry={isPassword}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wadah: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '900',
    color: '#2e7d32',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#e8f5e9',
    borderWidth: 3,
    borderColor: '#2e7d32',
    padding: 15,
    fontSize: 16,
    color: '#1b5e20',
    borderRadius: 12,
    shadowColor: '#2e7d32',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  }
});