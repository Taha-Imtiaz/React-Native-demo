import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import Container from '../common/Container';
import colors from '../../assets/theme/colors';

const SettingsComponent = ({settingsOptions}) => {
  return (
    <ScrollView style={{backgroundColor: colors.white}}>
      {settingsOptions.map(({title, subTitle, onPress}, index) => (
        <TouchableOpacity key={title}>
          <View
            style={{paddingHorizontal: 20, paddingBottom: 20, paddingTop: 20}}>
            <Text style={{fontSize: 17}}>{title}</Text>
            {subTitle && (
              <Text style={{fontSize: 14, opacity:0.5, paddingTop: 5}}>
                {subTitle}
              </Text>
            )}
          </View>
          <View style={{height: 0.5, backgroundColor: colors.grey}}></View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default SettingsComponent;
