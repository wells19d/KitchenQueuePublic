import React, {useMemo} from 'react';
import {useRecipeBox} from '../../hooks/useHooks';
import {useCoreInfo} from '../../utilities/coreInfo';
import {SelectedRecipeStyles} from '../../styles/Styles';
import {useColors} from '../../KQ-UI/KQUtilities';
import {Icons} from '../../components/IconListRouter';
import {View} from '../../KQ-UI';
import {TouchableOpacity} from 'react-native';

const HeaderButtons = ({
  selectedRecipe,
  recipeBoxView,
  handleAddBM,
  handleRemoveBM,
  handleShowOptions,
  handleShareRec,
  handleRequestEditDelete,
  onClose,
}) => {
  const coreInfo = useCoreInfo();
  const recipeBox = useRecipeBox();
  const recipesListIDs = recipeBox?.items?.map(rec => rec?.id) || [];

  const isBookmarked = useMemo(() => {
    return recipesListIDs.includes(selectedRecipe?.id);
  }, [recipesListIDs, selectedRecipe]);

  const admin = coreInfo?.admin;
  const btAccount = selectedRecipe?.accountID === coreInfo?.accountID; // belongs to account
  const btAuthor = selectedRecipe?.authorID === coreInfo?.userID; // belongs to author
  const bookmarked = isBookmarked;
  const shared = selectedRecipe?.recipeShared;

  const CloseButton = () => {
    return (
      <TouchableOpacity
        style={SelectedRecipeStyles.selectedCloseButton}
        onPress={onClose}>
        <Icons.Close size={25} color={useColors('white')} />
      </TouchableOpacity>
    );
  };

  const BookmarkButton = () => {
    if (shared) {
      return (
        <TouchableOpacity
          style={SelectedRecipeStyles.selectedTRButton}
          onPress={bookmarked ? handleRemoveBM : handleAddBM}>
          {bookmarked ? (
            <Icons.BookmarkMinus size={25} color={useColors('white')} />
          ) : (
            <Icons.BookmarkPlus size={25} color={useColors('white')} />
          )}
        </TouchableOpacity>
      );
    }
  };

  const UserEditButton = () => {
    if (!shared && btAccount && recipeBoxView) {
      return (
        <TouchableOpacity
          style={SelectedRecipeStyles.selectedTRButton}
          onPress={handleShowOptions}>
          <Icons.Options size={25} color={useColors('white')} />
        </TouchableOpacity>
      );
    }
  };

  const UserShareButton = () => {
    if (!shared && btAccount && btAuthor && recipeBoxView) {
      return (
        <TouchableOpacity
          style={SelectedRecipeStyles.selectedBRButton}
          onPress={handleShareRec}>
          <View style={{position: 'relative', top: -2}}>
            <Icons.Share size={25} color={useColors('white')} />
          </View>
        </TouchableOpacity>
      );
    }
  };

  const AuthorRequestButton = () => {
    if (shared && btAuthor) {
      return (
        <TouchableOpacity
          style={SelectedRecipeStyles.selectedBRButton}
          onPress={handleRequestEditDelete}>
          <Icons.Account size={25} color={useColors('white')} />
        </TouchableOpacity>
      );
    }
  };

  const AdminEditButton = () => {
    if (admin && !recipeBoxView) {
      return (
        <TouchableOpacity
          style={SelectedRecipeStyles.selectedBLButton}
          onPress={handleShowOptions}>
          <Icons.AdminEdit size={25} color={useColors('white')} />
        </TouchableOpacity>
      );
    }
  };

  return (
    <>
      <CloseButton />
      <BookmarkButton />
      <UserEditButton />
      <UserShareButton />
      {/* <AuthorRequestButton /> */}
      <AdminEditButton />
    </>
  );
};

export default HeaderButtons;
