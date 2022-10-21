import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import AppModal from '../common/AppModal';
import CustomButton from '../common/CustomButton';
import Message from '../common/Message';
import colors from '../../assets/theme/colors';

const ContactsComponent = ({modalVisible, data, loading, setModalVisible}) => {
  const ListEmptyComponent = () => {
    return (
      <View style={{paddingVertical: 100, paddingHorizontal: 100}}>
        <Message info message={`No Contacts to show`} />
      </View>
    );
  };
  const renderItem = ({item}) => {
    console.log('🚀 ~ file: index.js ~ line 16 ~ renderItem ~ item', item);
    return (
      <TouchableOpacity>
        <Text>Contact</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <AppModal
        title="My Profile"
        modalBody={
          <View>
            <Text>Hello </Text>
          </View>
        }
        modalFooter={<></>}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      {loading && (
        <View>
          <ActivityIndicator size={`large`} color={colors.primary} />
        </View>
      )}
      {/* list empty component is shown when list is empty */}
      {!loading && (
        <FlatList
          data={data}
          renderItem={renderItem}
          //renderItem is called for each item
          ListEmptyComponent={ListEmptyComponent}
          keyExtractor={item => String(item.id)} //returns unique key for each item
        />
      )}
      {/* <CustomButton
        title="Open Modal"
        secondary
        onPress={() => setModalVisible(true)}
      /> */}
    </View>
  );
};

export default ContactsComponent;
