//* DevText.jsx
import React from 'react';
import {Platform, View} from 'react-native';
import {Layout, Text} from '../../KQ-UI';

const DevText = () => {
  const Row = ({children}) => (
    <View style={{flexDirection: 'row', width: '90%'}}>{children}</View>
  );

  const Cell = ({children}) => (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.2,
        borderColor: '#00000090',
        margin: 5,
        height: 40,
      }}>
      {children}
    </View>
  );

  const TextBefore = ({font, text, weight, size, ...props}) => (
    <Text
      kqColor="black"
      style={{fontFamily: font, fontWeight: weight, fontSize: size || 20}}
      {...props}>
      {text}
    </Text>
  );

  const TextAfter = ({font, text, size, ...props}) => (
    <Text kqColor="black" font={font} style={{fontSize: size || 20}} {...props}>
      {text}
    </Text>
  );

  return (
    <Layout
      headerTitle="Dev Text"
      LeftButton=""
      RightButton=""
      LeftAction={null}
      RightAction={null}
      sheetOpen={false}
      innerViewStyles={{justifyContent: 'center', alignItems: 'center'}}>
      <Row>
        <Cell>
          <TextBefore font="NotoSans-Light" weight={300} text="Noto 300" />
        </Cell>
        <Cell>
          <TextAfter font="Noto-3" text="Noto 300" style={{color: 'purple'}} />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <TextBefore font="NotoSans-Medium" weight={500} text="Noto 500" />
        </Cell>
        <Cell>
          <TextAfter font="Noto-5" text="Noto 500" kqColor="primary" />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <TextBefore font="NotoSans-Bold" weight={700} text="Noto 700" />
        </Cell>
        <Cell>
          <TextAfter font="Noto-7" text="Noto 700" kqColor="success" />
        </Cell>
      </Row>

      <Row>
        <Cell>
          <TextBefore font="Montserrat-Light" weight={200} text="Mont 300" />
        </Cell>
        <Cell>
          <TextAfter font="Mont-3" text="Mont 300" style={{color: 'blue'}} />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <TextBefore font="Montserrat-Medium" weight={500} text="Mont 500" />
        </Cell>
        <Cell>
          <TextAfter font="Mont-5" text="Mont 500" kqColor="info" />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <TextBefore font="Montserrat-Bold" weight={700} text="Mont 700" />
        </Cell>
        <Cell>
          <TextAfter font="Mont-7" text="Mont 700" kqColor="warning" />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <TextBefore font="OpenSans-Light" weight={300} text="Open 300" />
        </Cell>
        <Cell>
          <TextAfter font="open-3" text="Open 300" style={{color: 'aqua'}} />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <TextBefore font="OpenSans-Medium" weight={500} text="Open 500" />
        </Cell>
        <Cell>
          <TextAfter font="open-5" text="Open 500" kqColor="danger" />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <TextBefore font="OpenSans-Bold" weight={700} text="Open 700" />
        </Cell>
        <Cell>
          <TextAfter font="open-7" text="Open 700" kqColor="dark" />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <TextBefore
            font={Platform.OS === 'ios' ? 'CherryBlossom' : 'Cherry-Blossom'}
            weight={500}
            size={22}
            text="Cherry Blossom"
          />
        </Cell>
        <Cell>
          <TextAfter
            font="cherry"
            text="Cherry Blossom"
            size={22}
            kqColor="basic"
          />
        </Cell>
      </Row>
      <Row>
        <Cell>
          <TextBefore
            font="BananaChips-Regular"
            text="Banana Chips"
            size={40}
            weight={500}
          />
        </Cell>
        <Cell>
          <TextAfter
            font="banana"
            text="Banana Chips"
            size={40}
            style={{color: 'gold'}}
          />
        </Cell>
      </Row>
      <Text font="open-6" size="large">
        The quick brown lazy dog.
      </Text>
    </Layout>
  );
};

export default DevText;
