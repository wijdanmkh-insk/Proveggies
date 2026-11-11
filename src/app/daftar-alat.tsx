// File: src/app/daftar-alat.tsx
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';

export default function DaftarAlatScreen() {
  // Simulasi daftar alat yang dimiliki user dari Firebase
  const [daftarAlat, setDaftarAlat] = useState([
    { id: 'MAC_ESP_001', nama: 'Mesin Ozon Pabrik A', status: 'Online' },
    { id: 'MAC_ESP_002', nama: 'Mesin Ozon Gudang B', status: 'Offline' }
  ]);

  // Fungsi saat salah satu kartu mesin diklik -> Masuk ke Dashboard
  const pilihAlat = (idAlat: string) => {
    // Bisa dilempar ke halaman dashboard sambil membawa ID alat
    router.push({ pathname: '/Dashboard', params: { mac: idAlat } });
  };

  // Fungsi simulasi untuk Mode Sandingkan (Pairing)
  const handleSandingkanAlat = () => {
    Alert.alert(
      "Mode Sandingkan (AP Mode)",
      "Pastikan ESP sudah menyala dan memancarkan WiFi AP. Aplikasi akan menghubungkan perangkat ke jaringan alat.",
      [
        { text: "Batal", style: "cancel" },
        { text: "Mulai Sandingkan", onPress: () => alert('Mengarahkan ke wizard pairing...') }
      ]
    );
  };

  const handleLogout = () => {
    router.replace('/'); // Kembali ke halaman Login
  };

  return (
    <SafeAreaView style={styles.layar}>
      {/* Header Halaman */}
      <View style={styles.header}>
        <View>
          <Text style={styles.labelAtas}>Kelola Perangkat</Text>
          <Text style={styles.judulHeader}>Alat Saya 🟢</Text>
        </View>
        <TouchableOpacity style={styles.tombolKeluar} onPress={handleLogout}>
          <Text style={styles.teksKeluar}>Keluar</Text>
        </TouchableOpacity>
      </View>

      {/* Daftar Mesin */}
      <ScrollView style={styles.areaScroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.subJudul}>Pilih mesin untuk memantau sensor:</Text>

        {daftarAlat.map((alat) => (
          <TouchableOpacity 
            key={alat.id} 
            style={styles.kartuAlat}
            onPress={() => pilihAlat(alat.id)}
          >
            <View>
              <Text style={styles.namaAlat}>{alat.nama}</Text>
              <Text style={styles.idAlat}>MAC: {alat.id}</Text>
            </View>
            <View style={[styles.badgeStatus, { backgroundColor: alat.status === 'Online' ? '#64dd17' : '#e53935' }]}>
              <Text style={styles.teksStatus}>{alat.status}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Tombol Tambah / Sandingkan Alat Baru */}
        <TouchableOpacity style={styles.tombolTambah} onPress={handleSandingkanAlat}>
          <Text style={styles.teksTambah}>➕ SANDINGKAN ALAT BARU (PAIRING)</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  layar: {
    flex: 1,
    backgroundColor: '#c8e6c9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#2e7d32',
    borderBottomWidth: 4,
    borderBottomColor: '#1b5e20',
  },
  labelAtas: {
    color: '#aed581',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  judulHeader: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '900',
  },
  tombolKeluar: {
    backgroundColor: '#e53935',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#b71c1c',
  },
  teksKeluar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  areaScroll: {
    padding: 20,
  },
  subJudul: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 15,
    textTransform: 'uppercase',
  },
  kartuAlat: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: '#2e7d32',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    // Efek balok 3D
    shadowColor: '#1b5e20',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  namaAlat: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1b5e20',
    marginBottom: 4,
  },
  idAlat: {
    fontSize: 12,
    color: '#558b2f',
    fontWeight: 'bold',
  },
  badgeStatus: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  teksStatus: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  tombolTambah: {
    backgroundColor: '#64dd17',
    padding: 18,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#1b5e20',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#1b5e20',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    elevation: 5,
  },
  teksTambah: {
    color: '#1b5e20',
    fontWeight: '900',
    fontSize: 15,
  }
});