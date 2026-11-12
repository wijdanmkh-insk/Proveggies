// File: src/components/KartuSensor.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ItemData {
  label: string;
  nilai: string;
  satuan: string;
}

interface KartuSensorProps {
  judul: string;
  data: ItemData[];
  statusOzon?: boolean; 
}

export default function KartuSensor({ judul, data, statusOzon }: KartuSensorProps) {
  return (
    <View style={styles.kartu}>
      <View style={styles.header}>
        <Text style={styles.judulKartu}>{judul}</Text>
        {statusOzon !== undefined && (
          <View style={[styles.badge, { backgroundColor: statusOzon ? '#64dd17' : '#e53935' }]}>
            <Text style={styles.teksBadge}>{statusOzon ? 'MENYALA' : 'MATI'}</Text>
          </View>
        )}
      </View>

      <View style={styles.garisPemisah} />

      <View style={styles.isiData}>
        {data.map((item, index) => (
          <View key={index} style={styles.barisData}>
            <Text style={styles.labelData}>{item.label}</Text>
            <Text style={styles.nilaiData}>
              {item.nilai} <Text style={styles.satuan}>{item.satuan}</Text>
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  kartu: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: '#2e7d32',
    shadowColor: '#1b5e20',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  judulKartu: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1b5e20',
    textTransform: 'uppercase',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#1b5e20',
  },
  teksBadge: {
    color: '#1b5e20',
    fontWeight: '900',
    fontSize: 10,
  },
  garisPemisah: {
    height: 3,
    backgroundColor: '#e8f5e9',
    marginBottom: 15,
    borderRadius: 2,
  },
  isiData: {
    gap: 8, 
  },
  barisData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f1f8e9',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#c8e6c9',
  },
  labelData: {
    fontSize: 14,
    color: '#558b2f',
    fontWeight: 'bold',
  },
  nilaiData: {
    fontSize: 18,
    fontWeight: '900',
    color: '#2e7d32',
  },
  satuan: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#7cb342',
  }
});