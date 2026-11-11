import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { masukDenganEmail, daftarDenganEmail } from '../services/authService';

import InputBalok from '../components/InputBalok';
import TombolBalok from '../components/TombolBalok';

export default function LayarLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const tanganiAuth = async () => {
    if (!email || !password) {
      Alert.alert('Gagal', 'Email dan password tidak boleh kosong!');
      return;
    }

    try {
      if (isLogin) {
        // Proses Login
        await masukDenganEmail(email, password);
        Alert.alert('Sukses', 'Berhasil masuk!');
        router.replace('/daftar-alat'); // Pindah ke layar selanjutnya
      } else {
        // Proses Daftar
        await daftarDenganEmail(email, password);
        Alert.alert('Sukses', 'Akun berhasil dibuat! Silakan masuk.');
        setIsLogin(true);
      }
    } catch (error: any) {
      Alert.alert('Terjadi Kesalahan', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.layar}>
      <View style={styles.kartuLogin}>
        
        <Text style={styles.judul}>PROVEGGIES</Text>
        <Text style={styles.subJudul}>
          {isLogin ? 'Masuk ke kebun virtualmu' : 'Daftarkan akun barumu'}
        </Text>

        {/* Input Email & Password (perlu sedikit modifikasi di komponen InputBalok agar bisa menerima value/onChangeText) */}
        <InputBalok 
          label="Email" 
          placeholder="petani@proveggies.com" 
          value={email}
          onChangeText={setEmail}
        />
        <InputBalok 
          label="Kata Sandi" 
          placeholder="Rahasia123" 
          isPassword={true}
          value={password}
          onChangeText={setPassword}
        />
        
        <TombolBalok 
          teks={isLogin ? "MASUK SEKARANG" : "BUAT AKUN"} 
          onPress={tanganiAuth} 
        />

        <TouchableOpacity onPress={() => setIsLogin(!isLogin)} style={styles.tombolPindah}>
          <Text style={styles.teksPindah}>
            {isLogin ? 'Belum punya akun? Daftar di sini' : 'Sudah punya akun? Masuk di sini'}
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  layar: { flex: 1, backgroundColor: '#c8e6c9', justifyContent: 'center', padding: 20 },
  kartuLogin: {
    backgroundColor: '#ffffff', padding: 30, borderWidth: 4, borderColor: '#2e7d32',
    borderRadius: 16, shadowColor: '#2e7d32', shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1, shadowRadius: 0, elevation: 10,
  },
  judul: { fontSize: 32, fontWeight: '900', color: '#2e7d32', textAlign: 'center', marginBottom: 5 },
  subJudul: { fontSize: 16, color: '#558b2f', textAlign: 'center', fontWeight: 'bold', marginBottom: 30 },
  tombolPindah: { marginTop: 20, alignItems: 'center' },
  teksPindah: { color: '#2e7d32', fontWeight: 'bold', fontSize: 14, textDecorationLine: 'underline' }
});