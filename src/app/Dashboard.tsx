// File: src/app/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
// Impor database dari file konfigurasi kita
import { database } from '../services/firebaseConfig';
import { ref, onValue, set } from 'firebase/database';
import KartuSensor from '../components/KartuSensor';

export default function DashboardScreen() {
  // Menerima parameter MAC Address alat yang diklik dari halaman sebelumnya
  const params = useLocalSearchParams();
  const macAlat = (params.mac as string) || 'MAC_ESP_001'; 

  // State untuk menampung data sensor asli dari Firebase
  const [dataOzon, setDataOzon] = useState({ tekanan: 0, suhu: 0, status_mesin: false });
  const [dataBaterai, setDataBaterai] = useState({ tegangan: 0, arus: 0 });
  const [dataInverter, setDataInverter] = useState({ tegangan: 0, arus: 0, daya: 0 });
  const [dataKondisi, setDataKondisi] = useState({ suhu: 0, kelembapan: 0 });

  // 1. LISTENER REALTIME FIREBASE (Membaca Data)
  useEffect(() => {
    // Menunjuk ke jalur perangkat di database: devices/{macAlat}/sensors
    const sensorRef = ref(database, `devices/${macAlat}/sensors`);
    
    // onValue akan terus mendengarkan perubahan (real-time) tanpa henti
    const unsubscribe = onValue(sensorRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        // Perbarui state layar dengan data asli dari alat
        if (data.ozon) setDataOzon(data.ozon);
        if (data.baterai) setDataBaterai(data.baterai);
        if (data.inverter) setDataInverter(data.inverter);
        if (data.kondisi) setDataKondisi(data.kondisi);
      }
    });

    // Membersihkan memori listener saat pengguna keluar dari halaman ini
    return () => unsubscribe();
  }, [macAlat]);

  // 2. FUNGSI REMOTE CONTROL (Menulis Perintah ke Firebase)
  const tanganiToggleOzon = async () => {
    try {
      // Kita menembak jalur 'commands' (perintah), bukan sensor!
      const commandRef = ref(database, `devices/${macAlat}/commands/ozon_power`);
      
      // Balikkan status saat ini (jika mesin nyala jadi mati, jika mati jadi nyala)
      const perintahBaru = !dataOzon.status_mesin;
      await set(commandRef, perintahBaru);
      
      Alert.alert(
        "Perintah Terkirim 🚀", 
        `Instruksi untuk ${perintahBaru ? 'MENYALAKAN' : 'MEMATIKAN'} alat ozon berhasil dikirim ke perangkat.`
      );
    } catch (error) {
      Alert.alert("Gagal", "Tidak dapat mengirim perintah ke alat. Periksa koneksi.");
    }
  };

  const handleKembali = () => {
    router.back(); // Kembali ke daftar alat
  };

  return (
    <SafeAreaView style={styles.layar}>
      
      {/* HEADER */}
      <View style={styles.headerDashboard}>
        <View>
          <Text style={styles.teksSapaan}>MEMANTAU: {macAlat}</Text>
          <Text style={styles.judulDashboard}>Dashboard 🟢</Text>
        </View>
        <TouchableOpacity style={styles.tombolKembali} onPress={handleKembali}>
          <Text style={styles.teksTombolKembali}>Kembali</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.areaScroll} showsVerticalScrollIndicator={false}>
        
        {/* TOMBOL REMOTE CONTROL UTAMA */}
        <TouchableOpacity 
          style={[styles.tombolKontrol, { backgroundColor: dataOzon.status_mesin ? '#e53935' : '#64dd17' }]} 
          onPress={tanganiToggleOzon}
        >
          <Text style={[styles.teksKontrol, { color: dataOzon.status_mesin ? '#ffffff' : '#1b5e20' }]}>
            {dataOzon.status_mesin ? '🔴 MATIKAN MESIN OZON' : '⚡ NYALAKAN MESIN OZON'}
          </Text>
        </TouchableOpacity>

        {/* MODUL 1: OZON */}
        <KartuSensor 
          judul="Sistem Ozon" 
          statusOzon={dataOzon.status_mesin}
          data={[
            { label: 'Tekanan Gas', nilai: String(dataOzon.tekanan), satuan: 'Bar' },
            { label: 'Suhu Tabung', nilai: String(dataOzon.suhu), satuan: '°C' }
          ]} 
        />

        {/* MODUL 2: BATERAI */}
        <KartuSensor 
          judul="Power Baterai" 
          data={[
            { label: 'Tegangan', nilai: String(dataBaterai.tegangan), satuan: 'Volt' },
            { label: 'Arus Keluar', nilai: String(dataBaterai.arus), satuan: 'Ampere' }
          ]} 
        />

        {/* MODUL 3: INVERTER */}
        <KartuSensor 
          judul="Power Inverter" 
          data={[
            { label: 'Tegangan AC', nilai: String(dataInverter.tegangan), satuan: 'Volt' },
            { label: 'Arus Beban', nilai: String(dataInverter.arus), satuan: 'Ampere' },
            { label: 'Daya Output', nilai: String(dataInverter.daya), satuan: 'Watt' }
          ]} 
        />

        {/* MODUL 4: KONDISI LINGKUNGAN */}
        <KartuSensor 
          judul="Kondisi Ruangan" 
          data={[
            { label: 'Suhu Ruangan', nilai: String(dataKondisi.suhu), satuan: '°C' },
            { label: 'Kelembapan Udara', nilai: String(dataKondisi.kelembapan), satuan: '%' }
          ]} 
        />

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  layar: { flex: 1, backgroundColor: '#c8e6c9' },
  headerDashboard: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 20, backgroundColor: '#2e7d32', borderBottomWidth: 4, borderBottomColor: '#1b5e20',
  },
  teksSapaan: { color: '#aed581', fontSize: 12, fontWeight: 'bold' },
  judulDashboard: { color: '#ffffff', fontSize: 24, fontWeight: '900' },
  tombolKembali: {
    backgroundColor: '#ffffff', paddingHorizontal: 12, paddingVertical: 8,
    borderRadius: 8, borderWidth: 2, borderColor: '#1b5e20',
  },
  teksTombolKembali: { color: '#1b5e20', fontWeight: 'bold' },
  areaScroll: { padding: 15 },
  
  // Gaya Tombol Remote Control
  tombolKontrol: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 4,
    borderColor: '#1b5e20',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#1b5e20',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    elevation: 6,
  },
  teksKontrol: {
    fontSize: 18,
    fontWeight: '900',
  }
});