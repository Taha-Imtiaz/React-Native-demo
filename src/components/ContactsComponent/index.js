import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import React from 'react';
import AppModal from '../common/AppModal';
import CustomButton from '../common/CustomButton';
import Message from '../common/Message';
import colors from '../../assets/theme/colors';
import Icon from '../common/Icon';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {CREATE_CONTACT} from '../../constants/routeNames';

const ContactsComponent = ({modalVisible, data, loading, setModalVisible}) => {
  const {navigate} = useNavigation();
  const ListEmptyComponent = () => {
    return (
      <View style={{paddingVertical: 100, paddingHorizontal: 100}}>
        <Message info message={`No Contacts to show`} />
      </View>
    );
  };
  const renderItem = ({item}) => {
    // console.log('🚀 ~ file: index.js ~ line 16 ~ renderItem ~ item', item);
    const {contact_picture, first_name, last_name, phone_number, country_code} =
      item;
    // console.log(
    //   '🚀 ~ file: index.js ~ line 26 ~ renderItem ~ contact_picture',
    //   contact_picture,
    // );
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <View style={styles.item}>
          {contact_picture ? (
            <Image
              style={{width: 45, height: 45, borderRadius: 100}}
              source={{uri: contact_picture}}
            />
          ) : (
            <View
              style={{
                width: 45,
                height: 45,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.grey,
                borderRadius: 100,
              }}>
              <Text style={[styles.name, {color: colors.white}]}>
                {first_name && first_name[0]}
              </Text>
              <Text style={[styles.name, {color: colors.white}]}>
                {last_name && last_name[0]}
              </Text>
            </View>
          )}

          <View style={{paddingLeft: 20}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.name}>{first_name}</Text>
              <Text style={styles.name}>{last_name}</Text>
            </View>
            <Text
              style={
                styles.phoneNumber
              }>{`${country_code} ${phone_number}`}</Text>
          </View>
        </View>
        <Icon name="right" type={`ant`} size={18} color={colors.grey} />
      </TouchableOpacity>
    );
  };
  return (
    <>
      <View style={{backgroundColor: colors.white}}>
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
          <View style={{paddingVertical: 20}}>
            <FlatList
              data={data}
              ItemSeparatorComponent={() => (
                <View
                  style={{height: 0.5, backgroundColor: colors.grey}}></View>
              )} //add a separator for each item
              renderItem={renderItem}
              //renderItem is called for each item
              ListEmptyComponent={ListEmptyComponent}
              keyExtractor={item => String(item.id)} //returns unique key for each item
              ListFooterComponent={<View style={{height: 150}}></View>}
            />
          </View>
        )}
        {/* <CustomButton
        title="Open Modal"
        secondary
        onPress={() => setModalVisible(true)}
      /> */}
      </View>
      <TouchableOpacity
        style={styles.floatingActionButton}
        onPress={() => navigate(CREATE_CONTACT)}>
        <Icon name="plus" size={21} color={colors.white} />
      </TouchableOpacity>
    </>
  );
};

export default ContactsComponent;
