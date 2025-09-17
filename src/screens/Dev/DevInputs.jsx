//* DevInputs.jsx
import React, {useState} from 'react';
import {Layout, Input} from '../../KQ-UI';
import {TouchableWithoutFeedback} from 'react-native';
import {Icons} from '../../components/IconListRouter';

const DevInputs = ({}) => {
  const [value, setValue] = useState('');
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = () => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      {secureTextEntry ? <Icons.EyeOff /> : <Icons.EyeOn />}
    </TouchableWithoutFeedback>
  );

  return (
    <Layout
      headerTitle="Dev Inputs"
      LeftButton=""
      RightButton=""
      LeftAction={null}
      RightAction={null}
      sheetOpen={false}
      mode="keyboard-scroll">
      <Input
        label="Email"
        placeholder="Email"
        value={value}
        onChangeText={setValue}
        capitalize={false}
        capitalMode="words"
        caption="Enter your email address"
        // keyboardType="default"
        // keyboardType="number-pad" // ios, has no decimal point
        // keyboardType="decimal-pad"
        // keyboardType="numeric" // ios, shows letters on number pad
        // keyboardType="email-address"
        // keyboardType="phone-pad" // same as numeric
        // keyboardType="url"
      />
      <Input
        label="Password"
        placeholder="Password"
        value={value1}
        onChangeText={setValue1}
        capitalize={false}
        accessoryRight={renderIcon}
        secureTextEntry={secureTextEntry}
        required
        caption="Password must be at least 8 characters long"
        counter
        maxCount={500}
      />
      <Input
        label="Multiple Lines"
        placeholder="Enter text here"
        value={value2}
        onChangeText={setValue2}
        multiline
        // multiHeight="medium"
        required
        caption="Enter a message"
        counter
        maxCount={150}
      />
      <Input
        label="Notes"
        placeholder="Type multiple lines..."
        value={value3}
        onChangeText={setValue3}
        multiline
        multiHeight="large"
        caption="Enter notes"
        counter
        maxCount={250}
      />
    </Layout>
  );
};

export default DevInputs;
