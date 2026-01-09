//* DevModals.jsx
import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Layout, Modal, Text} from '../../KQ-UI';

const DevModals = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);

  return (
    <Layout
      headerTitle="Dev Modals"
      LeftButton=""
      RightButton=""
      LeftAction={null}
      RightAction={null}
      sheetOpen={false}
      innerViewStyles={{justifyContent: 'center', alignItems: 'center'}}>
      <Modal
        visible={showModal}
        title="Full Screen"
        headerFont="open-6"
        headerSize="small"
        height="95%"
        width="95%"
        fullScreen
        // hideHeader
        // hideTitle
        // hideClose
        onClose={() => setShowModal(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Full Screen w/ Header</Text>
          <Button onPress={() => setShowModal(false)}>Close Modal</Button>
        </View>
      </Modal>
      <Modal
        visible={showModal2}
        title="Full Screen"
        headerFont="open-6"
        headerSize="small"
        height="95%"
        width="95%"
        fullScreen
        hideHeader
        // hideTitle
        // hideClose
        onClose={() => setShowModal2(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Full Screen w/o Header</Text>
          <Button onPress={() => setShowModal2(false)}>Close Modal</Button>
        </View>
      </Modal>
      <Modal
        visible={showModal3}
        title="Modal Title"
        headerFont="open-6"
        headerSize="small"
        height="95%"
        width="95%"
        // fullScreen
        // hideHeader
        hideTitle
        // hideClose
        onClose={() => setShowModal3(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>95% Screen w/o Title</Text>
          <Button onPress={() => setShowModal3(false)}>Close Modal</Button>
        </View>
      </Modal>
      <Modal
        visible={showModal4}
        title="Modal Title"
        headerFont="open-6"
        headerSize="small"
        height="85%"
        width="85%"
        // fullScreen
        // hideHeader
        // hideTitle
        hideClose
        onClose={() => setShowModal4(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>85% Screen w/o Close Button</Text>
          <Button onPress={() => setShowModal4(false)}>Close Modal</Button>
        </View>
      </Modal>
      <Button onPress={() => setShowModal(true)}>Show F/S w/ Header</Button>
      <Button onPress={() => setShowModal2(true)}>Show F/S w/o Header</Button>
      <Button onPress={() => setShowModal3(true)}>
        Show 95% Modal w/o Title
      </Button>
      <Button onPress={() => setShowModal4(true)}>
        Show 85% Modal w/o Close
      </Button>
    </Layout>
  );
};

export default __DEV__ ? DevModals : React.memo(DevModals);
