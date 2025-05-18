import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { OwnedVehicle } from '../types/ownedVehicle';

const IMAGE_BASE_URL = 'http://10.0.2.2:5000/data/images/vehicles/';

type VehicleItemProps = {
  vehicle: OwnedVehicle;
  onOptionsPress?: (vehicle: OwnedVehicle) => void;
};

const VehicleItem: React.FC<VehicleItemProps> = ({ vehicle, onOptionsPress }) => {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      activeOpacity={0.8}
      onLongPress={() => onOptionsPress?.(vehicle)}
      delayLongPress={300}
    >
      <Image
        source={{ uri: IMAGE_BASE_URL + vehicle.vehicle.imageFileName }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Top-left: Vehicle name and class */}
      <View style={styles.topLeft}>
        <Text style={styles.name}>{vehicle.vehicle.name}</Text>
        <Text style={styles.class}>{vehicle.vehicle.class}</Text>
      </View>

      {/* Bottom-left: Vehicle price */}
      <View style={styles.bottomLeft}>
        <Text style={styles.price}>${vehicle.vehicle.price}</Text>
      </View>

      {/* Bottom-right: Garage that the vehicle is in */}
      <View style={styles.bottomRight}>
        <Text style={styles.garage}>{vehicle.garage.garage.name}</Text>
      </View>

      {/* Top-right: Cog icon (to manage the car)*/}
      <TouchableOpacity
        style={styles.optionsButton}
        onPress={() => onOptionsPress?.(vehicle)}
      >
        <Icon name="cog-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default VehicleItem;

const styles = StyleSheet.create({
    itemContainer: {
        position: 'relative',
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#1e1e2f',
    },
    image: {
        width: '100%',
        height: 200,
    },
    topLeft: {
        position: 'absolute',
        top: 8,
        left: 8,
        alignItems: 'flex-start',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 6,
        borderRadius: 8,
    },
    name: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
        class: {
        color: '#ccc',
        fontSize: 12,
    },
    bottomLeft: {
        position: 'absolute',
        bottom: 8,
        left: 8,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 6,
        borderRadius: 8,
    },
    price: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    bottomRight: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 6,
        borderRadius: 8,
    },
    garage: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    optionsButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 8,
        borderRadius: 20,
    },
});
