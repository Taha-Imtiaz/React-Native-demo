import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import colors from '../../../assets/theme/colors';
import Icon from '../../common/Icon';
import ImagePickerCropper from 'react-native-image-crop-picker';
import styles from './styles';

// passing ref to a child component is called forward ref
const ImagePicker = React.forwardRef(({onFileSelected}, ref) => {
  const options = [
    {
      name: 'Take From Camera',
      icon: <Icon name="camera" color={colors.grey} size={21}></Icon>,
      onPress: () => {
        ImagePickerCropper.openCamera({
          width: 300,
          height: 300,
          cropping: true,
          freeStyleCropEnabled: true,
        })
          .then(images => {
            onFileSelected(images);
          })
          .catch(error => {
            console.log(
              '🚀 ~ file: index.js ~ line 29 ~ ImagePicker ~ error',
              error,
            );
          });
      },
    },
    {
      name: 'Choose From Gallery',
      icon: <Icon name="image" color={colors.grey} size={21}></Icon>,
      onPress: () => {
        ImagePickerCropper.openPicker({
          width: 300,
          height: 300,
          cropping: true,
          freeStyleCropEnabled: true,
        })
          .then(images => {
            onFileSelected(images);
          })
          .catch(error => {
            console.log(
              '🚀 ~ file: index.js ~ line 29 ~ ImagePicker ~ error',
              error,
            );
          });
      },
    },
  ];
  return (
    <RBSheet
      ref={ref}
      height={190}
      openDuration={250}
      closeOnDragDown
      customStyles={{
        container: {
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        },
      }}>
      <View style={styles.optionsWrapper}>
        {options.map(({name, onPress, icon}) => (
          <TouchableOpacity
            onPress={onPress}
            key={name}
            style={styles.pickerOption}>
            {icon}
            <Text style={styles.text}>{name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </RBSheet>
  );
});

export default ImagePicker;
