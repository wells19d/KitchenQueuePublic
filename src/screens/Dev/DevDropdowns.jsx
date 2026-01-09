//* DevDropdowns.jsx
import React, {useState} from 'react';
import {Dropdown, Input, Layout, Text} from '../../KQ-UI';
import {displayMeasurements} from '../../utilities/measurements';

const DevDropdowns = () => {
  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState('');

  return (
    <Layout
      headerTitle="Dev Dropdowns"
      LeftButton=""
      RightButton=""
      LeftAction={null}
      RightAction={null}
      sheetOpen={false}>
      <Input
        label="Item Name"
        placeholder="Enter Item Name"
        value={value2}
        onChangeText={setValue2}
        capitalize={false}
        capitalMode="words"
        caption="Enter Item"
      />
      <Dropdown
        label="Category"
        placeholder="Press to Select"
        value={value}
        setValue={setValue}
        caption="Select a Category"
        mapData={displayMeasurements}
      />
    </Layout>
  );
};

export default DevDropdowns;
