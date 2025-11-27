//* InstructionForm.jsx

import React, {useEffect, useRef, useState} from 'react';
import {setHapticFeedback} from '../../../hooks/setHapticFeedback';
import {useCoreInfo} from '../../../utilities/coreInfo';
import {Button, Input, Text, View} from '../../../KQ-UI';
import {Icons} from '../../../components/IconListRouter';
import {ScrollView} from 'react-native-gesture-handler';
import {KeyboardAvoidingView, Platform, TouchableOpacity} from 'react-native';
import {useColors} from '../../../KQ-UI/KQUtilities';
import {capEachWord, formatParagraph} from '../../../utilities/helpers';
import {Keyboard} from 'react-native';

const InstructionForm = props => {
  const {instructions, setInstructions, handleCloseInstructions, tempName} =
    props;
  const useHaptics = setHapticFeedback();
  const core = useCoreInfo();

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', e => {
      // you can store this in state and use it for offset
    });

    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      // console.log('Keyboard hidden');
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const groupRefs = useRef([]);

  const handleAddGroup = () => {
    setInstructions(prev => {
      const updated = [...prev, {name: '', steps: [], index: prev.length}];
      return updated.map((g, i) => ({...g, index: i}));
    });

    // mark the new group as edit mode
    setCompleted(prev => ({
      ...prev,
      [instructions.length]: true,
    }));

    setTimeout(() => {
      const lastIndex = instructions.length;
      groupRefs.current[lastIndex]?.focus();
    }, 50);
  };

  const stepRefs = useRef({});

  const handleAddStep = groupIndex => {
    setInstructions(prev => {
      const updated = [...prev];
      const newStepIndex = updated[groupIndex].steps.length;

      updated[groupIndex] = {
        ...updated[groupIndex],
        steps: [...updated[groupIndex].steps, {step: newStepIndex, action: ''}],
      };
      return updated;
    });

    setTimeout(() => {
      const newIndex = instructions[groupIndex]?.steps.length || 0;
      stepRefs.current[groupIndex]?.[newIndex]?.focus();
    }, 50);
  };

  const moveInstruction = (fromIndex, toIndex) => {
    setInstructions(prev => {
      const updated = [...prev];
      const item = updated.splice(fromIndex, 1)[0];
      updated.splice(toIndex, 0, item);
      return updated.map((g, i) => ({...g, index: i}));
    });
  };

  const handleMove = (index, direction) => {
    useHaptics(core?.userSettings?.hapticStrength || 'light');
    moveInstruction(index, direction);
  };

  const moveStep = (groupIndex, fromIndex, toIndex) => {
    setInstructions(prev => {
      const updated = [...prev];
      const steps = [...updated[groupIndex].steps];
      const [moved] = steps.splice(fromIndex, 1);
      steps.splice(toIndex, 0, moved);

      updated[groupIndex] = {
        ...updated[groupIndex],
        steps: steps.map((s, i) => ({...s, step: i})), // reindex
      };
      return updated;
    });
  };

  useEffect(() => {
    if (instructions.length === 0) {
      setInstructions([{name: '', steps: [], index: 0}]);
      setCompleted({0: true}); // start in edit mode
    }
  }, [instructions, setInstructions]);

  const [completed, setCompleted] = useState({});

  return (
    <View flex ph5>
      <View row mb5>
        <View flex>
          <Button
            type="outline"
            textSize="xSmall"
            size="tiny"
            onPress={handleAddGroup}>
            Add Group
          </Button>
        </View>
        <View flex>
          <Button
            textSize="xSmall"
            size="tiny"
            onPress={handleCloseInstructions}>
            Finished
          </Button>
        </View>
      </View>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 180 : 180} // adjust depending on your header height
      >
        <ScrollView style={styles.scrollStyles} hideBar>
          {instructions?.map((instruction, index) => (
            <View key={index} style={styles.groupContainer}>
              {completed[index] ? (
                <>
                  <View row>
                    <View flex>
                      <Input
                        ref={el => (groupRefs.current[index] = el)}
                        required
                        label="Group Name"
                        value={capEachWord(instruction.name)}
                        onChangeText={text => {
                          setInstructions(prev => {
                            const updated = [...prev];
                            updated[index] = {
                              ...updated[index],
                              name: text,
                            };
                            return updated;
                          });
                        }}
                        textSize="tiny"
                        labelTextSize="tiny"
                        capitalize
                        capitalMode="sentences"
                        multiline
                        multiHeight="small"
                      />
                    </View>
                    <View row centerVH>
                      {index > 0 && (
                        <TouchableOpacity
                          style={styles.indexButtons}
                          onPress={() => handleMove(index, index - 1)}>
                          <Icons.ChevronUp
                            size={15}
                            color={useColors('dark')}
                          />
                        </TouchableOpacity>
                      )}
                      {index < instructions.length - 1 && (
                        <TouchableOpacity
                          style={styles.indexButtons}
                          onPress={() => handleMove(index, index + 1)}>
                          <Icons.ChevronDown
                            size={15}
                            color={useColors('dark')}
                          />
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity
                        style={{marginRight: 10}}
                        onPress={() => {
                          useHaptics(
                            core?.userSettings?.hapticStrength || 'light',
                          );
                          setInstructions(prev =>
                            prev.filter((_, i) => i !== index),
                          );
                        }}>
                        <Icons.XCircleOutline
                          size={18}
                          color={useColors('danger')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View>
                    {instruction.steps?.length > 0 &&
                      instruction.steps.map((step, stepIndex) => (
                        <View key={stepIndex} row>
                          <View flex>
                            <Input
                              ref={el => {
                                if (!stepRefs.current[index])
                                  stepRefs.current[index] = [];
                                stepRefs.current[index][stepIndex] = el;
                              }}
                              label={`Step ${stepIndex + 1}`}
                              value={step.action}
                              onChangeText={text => {
                                setInstructions(prev => {
                                  const updated = [...prev];
                                  updated[index] = {
                                    ...updated[index],
                                    steps: updated[index].steps.map((s, i) =>
                                      i === stepIndex
                                        ? {...s, action: text}
                                        : s,
                                    ),
                                  };
                                  return updated;
                                });
                              }}
                              textSize="tiny"
                              labelTextSize="tiny"
                              capitalize
                              capitalMode="sentences"
                              multiline
                              multiHeight="small"
                            />
                          </View>
                          <View row centerVH>
                            {stepIndex > 0 && (
                              <TouchableOpacity
                                style={styles.indexButtons}
                                onPress={() => {
                                  useHaptics(
                                    core?.userSettings?.hapticStrength ||
                                      'light',
                                  );
                                  moveStep(index, stepIndex, stepIndex - 1);
                                }}>
                                <Icons.ChevronUp
                                  size={15}
                                  color={useColors('dark')}
                                />
                              </TouchableOpacity>
                            )}
                            {stepIndex < instruction.steps.length - 1 && (
                              <TouchableOpacity
                                style={styles.indexButtons}
                                onPress={() => {
                                  useHaptics(
                                    core?.userSettings?.hapticStrength ||
                                      'light',
                                  );
                                  moveStep(index, stepIndex, stepIndex + 1);
                                }}>
                                <Icons.ChevronDown
                                  size={15}
                                  color={useColors('dark')}
                                />
                              </TouchableOpacity>
                            )}
                            <TouchableOpacity
                              style={{marginRight: 10}}
                              onPress={() => {
                                useHaptics(
                                  core?.userSettings?.hapticStrength || 'light',
                                );
                                setInstructions(prev => {
                                  const updated = [...prev];
                                  updated[index] = {
                                    ...updated[index],
                                    steps: updated[index].steps.filter(
                                      (_, i) => i !== stepIndex,
                                    ),
                                  };
                                  return updated;
                                });
                              }}>
                              <Icons.XCircleOutline
                                size={18}
                                color={useColors('danger')}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      ))}
                    <View row>
                      <View>
                        <Button
                          textSize="xSmall"
                          size="tiny"
                          onPress={() => handleAddStep(index)}>
                          Add Step
                        </Button>
                      </View>
                      <View flex></View>
                      <View>
                        <Button
                          textSize="xSmall"
                          size="tiny"
                          onPress={() => {
                            setCompleted(prev => ({
                              ...prev,
                              [index]: false, // mark this group as complete
                            }));
                          }}>
                          Complete
                        </Button>
                      </View>
                    </View>
                  </View>
                </>
              ) : (
                <>
                  <View flex>
                    <View m5 mh10>
                      <Text size="small" font="open-7">
                        {capEachWord(instruction.name)}
                      </Text>
                    </View>
                    {instruction.steps?.length > 0 &&
                      instruction.steps.map((step, stepIndex) => (
                        <View key={stepIndex} m5 ph20 row>
                          <View>
                            <Text size="xSmall" font="open-7">
                              Step {step.step + 1}:
                            </Text>
                          </View>
                          <View flex ml5>
                            <Text size="xSmall" font="open-6">
                              {formatParagraph(step.action)}
                            </Text>
                          </View>
                        </View>
                      ))}
                    <View row>
                      <View flex />
                      <View>
                        <Button
                          textSize="xSmall"
                          size="tiny"
                          onPress={() => {
                            setCompleted(prev => ({
                              ...prev,
                              [index]: true, // mark this group as complete
                            }));
                          }}>
                          Edit
                        </Button>
                      </View>
                    </View>
                  </View>
                </>
              )}
            </View>
          ))}
          <View style={{height: 50}}></View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = {
  scrollStyles: {
    // borderWidth: 1,
    flex: 1,
    marginTop: 0,
    backgroundColor: '#fff',
    // paddingHorizontal: 5,
  },
  indexButtons: {
    marginRight: 5,
    width: 25,
    height: 20,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: useColors('dark70'),
  },
  groupContainer: {
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: useColors('dark50'),
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 5,
    padding: 5, // remove this later
    marginBottom: 5,
  },
};

export default InstructionForm;
