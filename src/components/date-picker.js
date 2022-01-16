import moment from 'moment';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
const DateTimePicker = ({
  isVisible = false,
  ...props
}) => {

  return (
    <View>
      <DateTimePickerModal
        {...props}
        isVisible={isVisible}
        minimumDate={new Date()}
        maximumDate={new Date(moment().add(30,'days'))}
      />
    </View>
  );
};

export default DateTimePicker;

const styles = StyleSheet.create({});
