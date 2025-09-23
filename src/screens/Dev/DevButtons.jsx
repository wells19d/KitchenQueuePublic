//* DevButtons.jsx
import React from 'react';
import {Button, Layout} from '../../KQ-UI';
import {View} from 'react-native';

const DevButtons = () => {
  return (
    <Layout
      headerTitle="Dev Buttons"
      LeftButton=""
      RightButton=""
      LeftAction={null}
      RightAction={null}
      sheetOpen={false}
      innerViewStyles={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Button
        type="filled" //useButtonType
        size="small" //useButtonSizes
        color="primary" //useColors or allow custom like "white" or "#fff"
        textSize="medium" //useFonts
        fontType="open-6" //useFonts
        textColor="white" //or useColors or allow custom like "white" or "#fff"
        disabled={false} //true or false, default is false and the prop is optional
        onPress={() => {
          // kqconsole.log('button pressed');
        }}>
        Press Me
      </Button>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Button
            type="filled" //useButtonType
            color="Primary"
            onPress={() => {
              // kqconsole.log('button pressed');
            }} //function to run on button press
          >
            Primary
          </Button>
        </View>
        <View style={{flex: 1}}>
          <Button
            type="outline" //useButtonType
            color="Primary"
            onPress={() => {
              // kqconsole.log('button pressed');
            }} //function to run on button press
          >
            Primary
          </Button>
        </View>
        <View style={{flex: 1}}>
          <Button
            type="ghost" //useButtonType
            color="Primary"
            onPress={() => {
              // kqconsole.log('button pressed');
            }} //function to run on button press
          >
            Primary
          </Button>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Button
            type="filled" //useButtonType
            color="Success"
            onPress={() => {
              // kqconsole.log('button pressed');
            }} //function to run on button press
          >
            Success
          </Button>
        </View>
        <View style={{flex: 1}}>
          <Button
            type="outline" //useButtonType
            color="Success"
            onPress={() => {
              // kqconsole.log('button pressed');
            }} //function to run on button press
          >
            Success
          </Button>
        </View>
        <View style={{flex: 1}}>
          <Button
            type="ghost" //useButtonType
            color="Success"
            onPress={() => {
              // kqconsole.log('button pressed');
            }} //function to run on button press
          >
            Success
          </Button>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Button
            type="filled" //useButtonType
            color="Info"
            onPress={() => {
              // kqconsole.log('button pressed');
            }} //function to run on button press
          >
            Info
          </Button>
        </View>
        <View style={{flex: 1}}>
          <Button
            type="outline" //useButtonType
            color="Info"
            onPress={() => {
              // kqconsole.log('button pressed');
            }} //function to run on button press
          >
            Info
          </Button>
        </View>
        <View style={{flex: 1}}>
          <Button
            type="ghost" //useButtonType
            color="Info"
            onPress={() => {
              // kqconsole.log('button pressed');
            }} //function to run on button press
          >
            Info
          </Button>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Button
            type="filled" //useButtonType
            color="Warning"
            onPress={() => {
              // kqconsole.log('button pressed');
            }} //function to run on button press
          >
            Warning
          </Button>
        </View>
        <View style={{flex: 1}}>
          <Button
            type="outline" //useButtonType
            color="Warning"
            onPress={() => {
              // kqconsole.log('button pressed');
            }} //function to run on button press
          >
            Warning
          </Button>
        </View>
        <View style={{flex: 1}}>
          <Button
            type="ghost" //useButtonType
            color="Warning"
            onPress={() => {
              // kqconsole.log('button pressed');
            }} //function to run on button press
          >
            Warning
          </Button>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Button
            type="filled" //useButtonType
            color="Danger"
            onPress={() => {
              // kqconsole.log('button pressed');
            }} //function to run on button press
          >
            Danger
          </Button>
        </View>
        <View style={{flex: 1}}>
          <Button
            type="outline" //useButtonType
            color="Danger"
            onPress={() => {
              // kqconsole.log('button pressed');
            }} //function to run on button press
          >
            Danger
          </Button>
        </View>
        <View style={{flex: 1}}>
          <Button
            type="ghost" //useButtonType
            color="Danger"
            onPress={() => {
              // kqconsole.log('button pressed');
            }} //function to run on button press
          >
            Danger
          </Button>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Button
            type="filled" //useButtonType
            color="Dark"
            onPress={() => {
              // kqconsole.log('button pressed');
            }} //function to run on button press
          >
            Dark
          </Button>
        </View>
        <View style={{flex: 1}}>
          <Button
            type="outline" //useButtonType
            color="Dark"
            onPress={() => {
              // kqconsole.log('button pressed');
            }} //function to run on button press
          >
            Dark
          </Button>
        </View>
        <View style={{flex: 1}}>
          <Button
            type="ghost" //useButtonType
            color="Dark"
            onPress={() => {
              // kqconsole.log('button pressed');
            }} //function to run on button press
          >
            Dark
          </Button>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Button
            type="filled" //useButtonType
            disabled
            onPress={() => {
              // kqconsole.log('button pressed');
            }} //function to run on button press
          >
            Disabled
          </Button>
        </View>
        <View style={{flex: 1}}>
          <Button
            type="outline" //useButtonType
            disabled
            onPress={() => {
              // kqconsole.log('button pressed');
            }} //function to run on button press
          >
            Disabled
          </Button>
        </View>
        <View style={{flex: 1}}>
          <Button
            type="ghost" //useButtonType
            disabled
            onPress={() => {
              // kqconsole.log('button pressed');
            }} //function to run on button press
          >
            Disabled
          </Button>
        </View>
      </View>
    </Layout>
  );
};

export default DevButtons;
