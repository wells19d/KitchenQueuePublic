//* Styles.jsx
import {StyleSheet} from 'react-native';
import {useColors} from '../KQ-UI/KQUtilities';

export const AppStyles = StyleSheet.create({
  navMenu: {
    height: 90,
  },
  safeArea: {
    flex: 1,
    margin: 5,
  },
  globalContainer: {
    flex: 1,
  },
});

export const NavMenuStyles = StyleSheet.create({
  container: {flex: 1},
  wrapper: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    padding: 5,
  },
});

export const CurvedBarStyles = StyleSheet.create({
  fillColor: '#f7f7f7',
  strokeColor: '#373d4340',
  strokeWidth: 1.5,
  shadowStroke: '#373d4320',
  shadowStrokeWidth: 4,
});

export const MenuButtonStyles = StyleSheet.create({
  wrapper: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    zIndex: 2000, // Bottom Layer
    paddingHorizontal: 5,
  },
  container: {
    flex: 1,
    height: 65,
    position: 'relative',
    top: -21,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    zIndex: 2100, // Middle Layer
  },
  button: {
    borderWidth: 1,
    height: 55,
    width: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderColor: '#c4c4c480',
    backgroundColor: '#29856c',
    zIndex: 2300, // Over Layer
  },
  menuButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2200, // Top Layer
  },
});

export const ListStyles = StyleSheet.create({
  rightActionButton: {
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center',
    marginHorizontal: 3,
    width: 90,
    // height: 60,
  },
  rightActionsContainer: {
    alignItems: 'top',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
    paddingLeft: 0,
    paddingVertical: 5,
    // borderBottomWidth: 1,
    borderColor: '#c4c4c4',
  },
  addButton: {
    backgroundColor: '#44B3B3',
  },
  favButton: {
    backgroundColor: '#FFAE42',
  },
  bottomInnerContainer: {
    borderColor: '#c4c4c4',
    borderTopWidth: 1,
    height: 58,
    justifyContent: 'center',
    marginHorizontal: -5,
  },
  bottomLeft: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 5,
  },
  bottomRight: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 10,
  },
  bottomCenter: {width: '50%', paddingLeft: 5, paddingRight: 5},
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 2,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  container: {
    backgroundColor: '#ffffff',
    width: '100%',
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#fE4949',
  },
  viewContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    width: '100%',
  },
  updateButton: {
    backgroundColor: '#0077A2',
  },
  bottomSheet: {
    zIndex: 9000,
    borderColor: 'transparent',
    borderRadius: 18,
  },

  rmcContainer: {flex: 1},
  rmcImage: {alignItems: 'center', justifyContent: 'center'},
  rmcTitle: {
    marginHorizontal: 5,
    marginVertical: 2,
    alignItems: 'center',
    paddingVertical: 2,
  },
  rmcBrand: {
    marginHorizontal: 5,
    marginTop: 2,
    marginBottom: 5,
    alignItems: 'center',
    paddingVertical: 2,
  },
  rmcScroll: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  rmcScrollShellTop: {height: 5},
  rmcScrollShellBottom: {height: 15},
  rmcScrollWrapper: {
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  rmcNutrientLabel: {
    flex: 1,
    borderBottomWidth: 1,
    padding: 2,
    paddingBottom: 1,
    justifyContent: 'center',
  },
  rmcNutrientValue: {
    borderBottomWidth: 1,
    alignItems: 'flex-end',
    padding: 2,
    paddingBottom: 1,
    justifyContent: 'center',
  },
  rmcContents: {borderWidth: 0, marginTop: 10, paddingHorizontal: 5},
  rmcButtonWrapper: {flexDirection: 'row', paddingHorizontal: 5},
  rmcButtonContainer: {flex: 1, marginHorizontal: 5},
  rmcDisclaimer: {marginTop: 3, marginHorizontal: 5, paddingHorizontal: 2},
});

export const NavHeaderStyles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#c4c4c490',
    borderBottomWidth: 1,
    elevation: 4,
    shadowColor: '#c4c4c490',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.8,
  },
  titleContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
  },
  buttonContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 2001,
  },
  buttonRows: {flexDirection: 'row', height: '100%'},
  sideContainers: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 15,
  },
  leftWrapper: {flexDirection: 'row', marginLeft: 0},
  leftContainer: {flex: 1, justifyContent: 'center'},
  rightWrapper: {flexDirection: 'row', marginRight: 10},
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
  },
  rightContainerAlt: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 5,
  },
  iconPosition: {position: 'relative', top: 1},
  textStyles: {
    fontSize: 16,
  },
});

export const ScreenStyles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  error: {
    color: 'red',
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
  },
  errorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  success: {
    color: 'green',
    flex: 1,
    fontSize: 22,
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  successContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  viewContainer: {
    flex: 1,
    paddingBottom: 2,
    padding: 5,
  },
  viewInnerTopContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 5,
    paddingHorizontal: 15,
  },
  scrollContainer: {
    marginTop: 5,
    flex: 0,
  },
});

export const SelectItemStyles = StyleSheet.create({
  container: {
    marginHorizontal: 2.5,
    flex: 1,
  },
  imageContainer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateContainer: {
    padding: 0,
    marginVertical: -5,
  },
  infoContainer: {
    flex: 0.7,
    paddingHorizontal: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1.5,
    borderRadius: 8,
    borderBottomColor: '#c4c4c490',
    paddingBottom: 6,
    paddingTop: 3,
    marginLeft: 5,
  },
  itemNoteContainer: {
    borderRadius: 8,
    borderBottomColor: '#c4c4c4',
    paddingBottom: 3,
    paddingTop: 7,
    marginLeft: 5,
  },
  titleWrap: {paddingTop: 3, paddingHorizontal: 3},
  infoWrap: {
    flex: 1,
    paddingTop: 3,
    paddingHorizontal: 4,
  },
  infoNoteWrap: {
    paddingTop: 3,
    paddingHorizontal: 4,
  },
  textStyles: {textAlign: 'right'},
  textNoteStyles: {letterSpacing: 0.2, textAlign: 'justify'},
  addToContainer: {flexDirection: 'row', marginVertical: 15},
  quantityWrapper: {
    flex: 2,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    margin: 5,
  },
  quantityContainer: {flex: 2},
  quantityText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerFieldWrapper: backgroundColor => ({
    marginHorizontal: 5,
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: backgroundColor || '#29856c',
    alignItems: 'center',
    justifyContent: 'center',
  }),
});

export const LegalStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 15,
  },
  body: {
    flex: 1,
  },
  buttonWrapper: {
    flexDirection: 'row',
  },
  buttonCells: {
    flex: 1,
    paddingHorizontal: 5,
  },
  sectionWrapper: {
    marginVertical: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
  },
  sectionIndex: {
    width: 40,
    alignItems: 'flex-end',
    paddingRight: 3,
    paddingVertical: 3,
  },
  sectionTitle: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 3,
    paddingVertical: 3,
  },
  clauseWrapper: {},
  clauseHeader: {
    flexDirection: 'row',
  },
  clauseIndexSpacing: {width: 39},
  clauseTextWrapper: {
    flex: 1,
    paddingVertical: 3,
    paddingLeft: 3,
    paddingRight: 20,
    paddingBottom: 5,
  },
  subClauseWrapper: {},
  subClauseHeader: {flexDirection: 'row'},
  bulletWrapper: {
    width: 55,
    alignItems: 'flex-end',
    paddingRight: 3,
  },
  subClauseTextWrapper: {
    flex: 1,
    paddingVertical: 2,
    paddingLeft: 3,
    paddingRight: 25,
    paddingBottom: 10,
  },
  clauseInfo: {},
});

export const SettingsStyles = StyleSheet.create({
  card: {
    marginTop: 15,
    marginHorizontal: 15,
    backgroundColor: '#29856c',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderWidth: 1,
    borderBottomWidth: 0.5,
    borderColor: '#c4c4c4',
  },
  cardTitle: {marginVertical: 10, color: '#fff'},
  topContainer: {
    borderTopWidth: 1,
    borderColor: '#c4c4c4',
    height: 70,
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 70,
  },
  innerTopContainer: {
    width: 70,
    padding: 8,
  },
  quantityCell: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#c4c4c4',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCell: {
    flex: 1,
    marginVertical: 5,
    marginRight: 5,
    justifyContent: 'center',
    padding: 0,
  },
  bottomContainer: {
    marginHorizontal: 15,
    borderWidth: 1,
    borderTopWidth: 0.5,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    paddingVertical: 7,
    borderColor: '#c4c4c4',
  },
  buttonContainer: {alignContent: 'center', alignItems: 'center'},

  listContainer: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#dcdcdc',
  },
  description: {
    marginVertical: 10,
  },
  segmentedButtonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    gap: 10,
  },
  hapticButton: {
    elevation: 4,
    shadowColor: '#373d43',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.3,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 5,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#29856c',
    height: 45,
  },
  hbInner: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    flexDirection: 'row',
  },
});

export const KQDropStyles = StyleSheet.create({
  dropdownContainer: {
    marginVertical: 5,
    marginHorizontal: 7,
  },
  labelContainer: {
    marginBottom: 4,
    marginLeft: 5,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#c4c4c4',
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  iconContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetContentContainer: {
    paddingVertical: 16,
  },
  sheetItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sheetItemText: {
    fontSize: 18,
  },
  bottomSheet: {
    zIndex: 9000,
    borderColor: 'transparent',
    borderWidth: 4,
    borderRadius: 18,
  },
  captionWrap: {marginHorizontal: 10, marginBottom: 5},
  captionText: {
    color: '#373d4390',
  },
});

export const AvatarStyles = StyleSheet.create({
  avatarCard: {
    // width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  avatarView: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 50,
    overflow: 'hidden',
  },
});

export const ProfileStyles = StyleSheet.create({
  FTCenter: {textAlign: 'center'},
  FTLeft: {
    // fontWeight: 700,
    textAlign: 'right',
    marginRight: 5,
  },
  FTRight: {marginLeft: 5},
  optionContainer: {height: 35, flexDirection: 'row', marginVertical: 4},
  optionLeft: {
    borderWidth: 1,
    borderColor: '#373d43',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    width: 40,
    backgroundColor: '#fff',
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.3,
    elevation: 4,
  },
  olInner: {
    position: 'relative',
    left: 5,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  optionRight: {
    borderWidth: 1,
    borderColor: '#373d43',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    width: 40,
    backgroundColor: '#fff',
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.3,
    elevation: 4,
  },
  orInner: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  optionView: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#373d43',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    backgroundColor: '#fff',
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.3,
    elevation: 4,
  },
});

export const AccountStyles = StyleSheet.create({
  topSection: {
    backgroundColor: '#fff',
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 5,
  },
  midSection: {
    minHeight: 125,
    backgroundColor: '#fff',
    marginTop: 5,
    marginBottom: 5,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#c4c4c4',
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#373d4380',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 4,
  },
  userSection: {
    backgroundColor: '#fff',
    marginTop: 5,
    marginBottom: 5,
    marginHorizontal: 10,
  },
  sectionNav: {flexDirection: 'row'},
  sectionUsers: {
    borderWidth: 1,
    borderColor: '#c4c4c4',
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#373d4380',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 4,
  },
  usersHeader: {
    borderBottomWidth: 1,
    borderColor: '#c4c4c4',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  avatarWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  subWrapper: {
    height: 65,
    borderWidth: 1,
    borderColor: '#c4c4c4',
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#373d4380',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 4,
    marginHorizontal: 5,
  },
  subIcon: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignContent: 'center',
  },
  subTextWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});

export const CMStyles = StyleSheet.create({
  shContainer: {height: 35, borderWidth: 0},
  shLine: {
    borderBottomWidth: 1,
    position: 'relative',
    top: 16,
    marginLeft: 15,
    marginRight: 50,
    zIndex: 1,
  },
  shTWrap: {alignItems: 'flex-end', marginRight: 1},
  shTO: {
    height: 30,
    width: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shTitleWrap: {
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: -7,
  },
  shTitle: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 2,
  },
  sectionExpanded: {paddingHorizontal: 25, paddingVertical: 5, marginTop: -10},
  sectionCollapsed: {
    paddingHorizontal: 25,
    paddingTop: 3,
    paddingBottom: 10,
    alignItems: 'center',
    marginTop: -10,
  },
  sectionTO: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
  },
  sectionIcon: {marginRight: 20},
});

export const RecipeSearchStyles = StyleSheet.create({
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    paddingTop: 6,
    paddingBottom: 3,
    paddingLeft: 6,
    paddingRight: 3,
  },
  loadingText: {
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  listWrapper: {marginTop: 2},
  listTitle: {paddingHorizontal: 3, paddingBottom: 2},
  listSubTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 3,
  },
  listReadyIn: {flex: 1, justifyContent: 'center'},
  listScoreContainer: {flex: 1, flexDirection: 'row'},
  listScoreLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  listScoreRight: {justifyContent: 'center'},
  wrapperStyles: {
    borderBottomWidth: 1.5,
    borderWidth: 1.5,
    borderRadius: 20,
    padding: 1,
    paddingLeft: 15,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    marginHorizontal: 0,
  },
  iconStyles: {padding: 5, paddingRight: 0},
  innerLayoutWrapper: {flex: 1, justifyContent: 'center'},
  inputWrapper: {
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  clearButton: {
    paddingLeft: 8,
    paddingRight: 5,
  },
  clearButtonWrapper: {
    marginLeft: -5,
  },
});

export const SelectedRecipeStyles = StyleSheet.create({
  aboutRecipe: {marginTop: 10, marginBottom: 2, marginHorizontal: 15},
  aboutRecipeButton: {
    alignItems: 'flex-end',
    marginBottom: 10,
    marginHorizontal: 20,
  },
  ingWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ingDot: {
    position: 'relative',
    top: 8,
    paddingHorizontal: 3,
  },
  ingColOne: {
    // borderWidth: 1,
    width: '100%',
    // marginVertical: 3,
    // marginHorizontal: 4,
    paddingVertical: 3,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  ingColTwo: {
    width: '50%',
    justifyContent: 'center',
    paddingVertical: 2,
    paddingLeft: 7,
    paddingRight: 5,
  },
  noteWrapper: {marginBottom: 10, marginHorizontal: 15},
  imageSelectedStyles: {
    width: '100%',
    height: 200,
  },
  selectedCloseButton: {
    position: 'absolute',
    top: 50,
    left: 10,
    height: 35,
    width: 35,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  selectedTRButton: {
    position: 'absolute',
    top: 50,
    right: 10,
    height: 35,
    width: 35,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  selectedBRButton: {
    position: 'absolute',
    top: 195,
    right: 10,
    height: 35,
    width: 35,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  selectedBLButton: {
    position: 'absolute',
    top: 195,
    left: 10,
    height: 35,
    width: 35,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  selectedViewWrapper: {
    flex: 1,
    paddingTop: 1,
    marginBottom: 0,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  sectionWrapper: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionEnd: {
    flex: 1,
    borderBottomWidth: 1.5,
    borderColor: useColors('dark30'),
  },
  sectionTitle: {
    marginHorizontal: 10,
    position: 'relative',
    top: -1.5,
  },
  stepWrapper: {
    // borderWidth: 0.2,
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 5,
    marginTop: 5,
  },
  stepNumber: {
    width: 60,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  stepText: {
    flex: 1,
    marginLeft: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingRight: 5,
  },
  toolWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 0,
    paddingHorizontal: 5,
  },
  toolText: {
    width: '50%',
    marginVertical: 2,
    paddingLeft: 15,
    paddingRight: 5,
    justifyContent: 'center',
  },
});

export const UploadPictureStyles = StyleSheet.create({
  button: {
    height: 90,
    borderWidth: 1.5,
    borderColor: useColors('dark50'),
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#373d4380',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 4,
    marginHorizontal: 10,
  },
  bbWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 1000,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  cameraButton: buttonWidth => ({
    borderWidth: 4,
    borderColor: '#ffffff90',
    borderRadius: 50,
    width: buttonWidth,
    height: buttonWidth,
    marginHorizontal: 20,
    marginVertical: 10,
  }),
  redDot: {
    margin: 3,
    backgroundColor: '#da2c4390',
    borderRadius: 50,
  },
  btWrapper: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1000,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cameraWrapper: {
    height: '98%',
    width: '98%',
    borderWidth: 0.5,
    borderRadius: 25,
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  previewWrapper: {
    height: '48%',
    width: '98%',
    borderWidth: 0.5,
    borderRadius: 25,
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  finalizedWrapper: {
    height: 170,
    width: 275,
    borderWidth: 0.5,
    borderRadius: 25,
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});
