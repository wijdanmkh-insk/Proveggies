import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// 1. Panggil (Import) komponen balok dari folder components
// Tanda '../../' artinya kita naik dua folder (keluar dari Auth, lalu keluar dari app) untuk masuk ke folder components
import InputBalok from '../../components/InputBalok';
import TombolBalok from '../../components/TombolBalok';

export default function SignUpScreen() {
  const tekanDaftar = () => {
    alert('Tombol Daftar Ditekan!');
  };

  return (
    <View style={styles.layar}>
      <Text style={styles.judul}>Daftar Akun Baru</Text>

      {/* 2. Gunakan balok-baloknya di sini dan tinggal isi teksnya! */}
      <InputBalok label="Nama Lengkap" placeholder="Masukkan nama..." />
      <InputBalok label="Email" placeholder="nama@email.com" />
      <InputBalok label="Kata Sandi" placeholder="Rahasia123" isPassword={true} />
      
      <TombolBalok teks="BUAT AKUN" onPress={tekanDaftar} />

    </View>
  );
}

const styles = StyleSheet.create({
  layar: {
    flex: 1,
    padding: 20,
    backgroundColor: '#c8e6c9', // Warna latar belakang hijau
    justifyContent: 'center',
  },
  judul: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 30,
    textAlign: 'center',
  }
});