//* PrivacyPolicy.jsx
import React from 'react';
import {View} from 'react-native';
import {LegalStyles} from '../../styles/Styles';
import {LegalArray} from './LegalArray';
import {Text, Button, ScrollView} from '../../KQ-UI';

export default function PrivacyPolicy({
  handlePPConfirm,
  handleCancel,
  hideConfirm,
}) {
  let terms = LegalArray.PP[0];

  const RenderTermData = ({terms}) => {
    return terms.sections.map(section => (
      <View key={section.index} style={LegalStyles.sectionWrapper}>
        <View style={LegalStyles.sectionHeader}>
          <View style={LegalStyles.sectionIndex}>
            <Text size="small">{section.index}.</Text>
          </View>
          <View style={LegalStyles.sectionTitle}>
            <Text size="small">{section.title}:</Text>
          </View>
        </View>
        {section.clauses.map(clause => (
          <View key={clause.index} style={LegalStyles.clauseWrapper}>
            <View style={LegalStyles.clauseHeader}>
              <View style={LegalStyles.clauseIndexSpacing}></View>
              <View style={LegalStyles.clauseTextWrapper}>
                <Text size="small" style={LegalStyles.clauseInfo}>
                  {clause.info}
                </Text>
              </View>
            </View>
            {clause.subClause?.length > 0 && (
              <View style={LegalStyles.subClauseWrapper}>
                {clause.subClause.map(sub => (
                  <View key={sub.index} style={LegalStyles.subClauseHeader}>
                    <View style={LegalStyles.bulletWrapper}>
                      <Text size="small">{'\u2022'}</Text>
                    </View>
                    <View style={LegalStyles.subClauseTextWrapper}>
                      <Text size="small" style={LegalStyles.clauseInfo}>
                        {sub.info}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>
    ));
  };
  return (
    <View style={LegalStyles.container}>
      <View
        style={[
          LegalStyles.body,
          hideConfirm ? {paddingBottom: 20} : {paddingBottom: 10},
        ]}>
        <ScrollView>
          <RenderTermData terms={terms} />
        </ScrollView>
      </View>
      {!hideConfirm && (
        <View style={LegalStyles.buttonWrapper}>
          <View style={LegalStyles.buttonCells}>
            <Button
              color="danger"
              size="small"
              onPress={() => handleCancel('Privacy Policy')}>
              Cancel
            </Button>
          </View>
          <View style={LegalStyles.buttonCells}>
            <Button
              color="success"
              size="small"
              onPress={() => handlePPConfirm()}>
              Confirm
            </Button>
          </View>
        </View>
      )}
    </View>
  );
}
