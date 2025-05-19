import { Modal, StyleSheet, Text, TouchableOpacity } from "react-native";

type AccountModalProps = {
  visible: boolean;
  onClose: () => void;
  onSignOut: () => void;
};

const AccountModal = ({ visible, onClose, onSignOut }: AccountModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.modalContainer} onPress={onClose} activeOpacity={1}>
        <TouchableOpacity style={styles.modal} activeOpacity={1}>
          <Text style={ styles.AccountOptionsText}>Account Options</Text>
          <TouchableOpacity onPress={() => console.log('Account Settings pressed')}>
            <Text style={styles.AccountSettingsText}>Account Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSignOut()}>
            <Text style={styles.AccountLogoutText}>Logout</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  AccountOptionsText: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  AccountSettingsText: {
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff',
  },
  AccountLogoutText: {
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#ff6347', // Tomato color for logout
  },
  modal: {
    backgroundColor: '#1e1e2f',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    }
  },
});

export default AccountModal;