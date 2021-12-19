import React from 'react';
import { View, Image, SafeAreaView } from 'react-native';

const ActionBarImage = () => {
  return (
    <SafeAreaView>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={{
            uri:
              'https://generalappliances.co.za/wp-content/uploads/2017/11/Appliance-Repairs-Fridge-icon.png',
          }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 40 / 2,
            marginRight: 290,
            marginTop: 5
          }} />
      </View>
    </SafeAreaView>
  );
};

export default ActionBarImage;