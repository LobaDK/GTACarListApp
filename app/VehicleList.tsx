import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as storage from './services/authStorage';
import { OwnedVehicle } from './types/ownedVehicle';
import VehicleItem from './views/vehicleItem';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState<OwnedVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [menuVehicle, setMenuVehicle] = useState<OwnedVehicle | null>(null);

  const fetchVehicles = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:5000/api/User/${await storage.getToken()}/ownedVehicles/`);
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error('Failed to fetch vehicles:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchVehicles();
  };

  const filteredVehicles = vehicles.filter(v =>
    v.vehicle.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <ActivityIndicator size="large" color="#999" />;

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredVehicles}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <VehicleItem
            vehicle={item}
            onOptionsPress={setMenuVehicle}
          />
        )}
        contentContainerStyle={styles.listContent}
        style={styles.list}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
      <BottomAppBar
        search={search}
        setSearch={setSearch}
        onAdd={() => {/* open modal/view to add car or something */}}
      />
      {/* Menu Modal */}
      <Modal
        visible={!!menuVehicle}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVehicle(null)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.3)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          activeOpacity={1}
          onPressOut={() => setMenuVehicle(null)}
        >
          <View style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 24,
            minWidth: 200,
            alignItems: 'center',
          }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 16 }}>
              {menuVehicle?.vehicle.name}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 8 }}>
              <TouchableOpacity
                onPress={() => {/* handle edit */}}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 24,
                  backgroundColor: '#eee',
                  borderRadius: 8,
                  marginRight: 16,
                }}
              >
                <Text>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {/* handle delete */}}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 24,
                  backgroundColor: '#fee',
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: 'red' }}>Delete</Text>
              </TouchableOpacity>
            </View>
            <View style={{ borderTopColor: '#ccc', width: '100%' }}>
              <TouchableOpacity
                onPress={() => {/* handle view details */}}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 48,
                  backgroundColor: '#eee',
                  borderRadius: 8,
                  marginTop: 8,
                }}
              >
                <Text>Go to garage</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setMenuVehicle(null)}>
              <Text style={{ marginTop: 25, color: '#888' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

function BottomAppBar({
  search,
  setSearch,
  onAdd,
}: {
  search: string;
  setSearch: (text: string) => void;
  onAdd: () => void;
}) {
  return (
    <View style={bottomBarStyles.container}>
      <TextInput
        style={bottomBarStyles.searchInput}
        placeholder="Search vehicles"
        placeholderTextColor="#ccc"
        value={search}
        onChangeText={setSearch}
      />
      <TouchableOpacity onPress={onAdd} style={bottomBarStyles.button}>
        <Icon name="add-circle" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e2f',
  },
  list: {
    flex: 1,
    backgroundColor: '#1e1e2f',
  },
  listContent: {
    paddingVertical: 8,
  },
});

const bottomBarStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1e1e2f",
    paddingVertical: 12,
    paddingHorizontal: 16,
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 24,
    borderRadius: 24,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#2e2e3f",
    color: "#fff",
    borderRadius: 16,
    paddingHorizontal: 16,
    marginRight: 12,
    height: 40,
  },
  button: {
    padding: 8,
  },
});

export default VehicleList;
