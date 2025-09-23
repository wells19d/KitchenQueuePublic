//*useHooks.jsx
import {useSelector, shallowEqual} from 'react-redux';

export const useDeviceInfo = () => {
  return useSelector(state => state.deviceInfo?.deviceInfo);
};

export const useAuth = () => {
  return useSelector(state => state.user?.isAuthenticated);
};

export const useUser = () => {
  return useSelector(state => state.user?.data);
};

export const useLoginError = () => {
  return useSelector(state => state.user?.error);
};

export const useProfile = () => {
  return useSelector(state => state.profile?.profile);
};

export const useProfileError = () => {
  return useSelector(state => state.profile?.error);
};

export const useAccount = () => {
  return useSelector(state => state.account?.account);
};

export const useAccountError = () => {
  return useSelector(state => state.account?.error);
};

export const useShoppingCart = () => {
  return useSelector(state => state.shopping?.shopping);
};

export const useShoppingCartError = () => {
  return useSelector(state => state.shopping?.error);
};

export const useCupboard = () => {
  return useSelector(state => state.cupboard?.cupboard);
};

export const useCupboardError = () => {
  return useSelector(state => state.cupboard?.error);
};

export const useAllowedProfiles = () => {
  return useSelector(state => state.account?.allowedProfiles);
};

export const useExistingInvite = () => {
  return useSelector(state => state.invites?.existingInvite || null);
};

export const useFoodData = () => {
  return useSelector(state => state.edamam?.foodData);
};

export const useFoodDataError = () => {
  return useSelector(state => state.edamam?.error);
};

export const useFoodDataLoading = () => {
  return useSelector(state => state.edamam?.loading);
};

export const useRecipesData = () => {
  return useSelector(
    state => state.recipe?.communityRecipes || [],
    shallowEqual,
  );
};

export const useRecipeRawData = () => {
  return useSelector(state => state.recipe);
};

export const useRecipeDataError = () => {
  return useSelector(state => state.recipe?.error);
};

export const useRecipeDataLoading = () => {
  return useSelector(state => state.recipe?.loading);
};

export const useFoundInvite = () => {
  const {inviteFound, inviteData, error, errorMsg1, errorMsg2} = useSelector(
    state => state.joinInvite || {},
  );
  return {
    inviteFound: inviteFound || false,
    inviteData: inviteData || null,
    error: error || false,
    errorMsg1: errorMsg1 || '',
    errorMsg2: errorMsg2 || '',
  };
};

export const useFoundAccount = () => {
  const {accountFound, accountData, error} = useSelector(
    state => state.joinInvite || {},
  );
  return {
    accountFound: accountFound || false,
    accountData: accountData || null,
    error: error || false,
  };
};

export const useFavorites = () => {
  return useSelector(state => state.favorites?.favorites);
};

export const useRecipeBox = () => {
  return useSelector(state => state.recipe?.recipeBox);
};
