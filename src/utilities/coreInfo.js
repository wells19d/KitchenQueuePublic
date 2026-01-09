//* coreInfo.js
import {
  useUser,
  useAccount,
  useCupboard,
  useProfile,
  useShoppingCart,
  useFavorites,
  useRecipeBox,
} from '../hooks/useHooks';

export const useCoreInfo = () => {
  const user = useUser();
  const profile = useProfile();
  const account = useAccount();
  const shopping = useShoppingCart();
  const cupboard = useCupboard();
  const favorites = useFavorites();
  const recipeBox = useRecipeBox();

  return {
    // User
    userID: user?.uid,
    userEmail: user?.email,

    // Profile
    profileID: profile?.id || null,
    firstName: profile?.firstName || null,
    lastName: profile?.lastName || null,
    onlineName: profile?.onlineName || null,
    role: profile?.role || null,
    isActive: profile?.isActive || null,
    pictureApproved: profile?.pictureApproved || null,
    pictureUrl: profile?.pictureUrl || null,
    profileCreatedOn: profile?.createdOn || null,
    profileLastUpdated: profile?.lastUpdated || null,
    ppVersion: profile?.ppVersion || null,
    tosVersion: profile?.tosVersion || null,
    userSettings: profile?.userSettings || null,
    onboarding: profile?.onboarding || null,
    permissionsGranted: profile?.permissionsGranted || false,
    permissionsRequested: profile?.permissionsRequested || false,
    admin: profile?.admin || false,

    // Account
    accountID: account?.id || null,
    allowedUsers: account?.allowedUsers || null,
    shoppingCartID: account?.shoppingCartID || null,
    cupboardID: account?.cupboardID || null,
    recipeBoxID: account?.recipeBoxID || null,
    favoriteItemsID: account?.favoriteItemsID || null,
    accountCreatedOn: account?.createdOn || null,
    accountLastUpdated: account?.lastUpdated || null,
    accountLastUpdatedBy: account?.lastUpdatedBy || null,
    accountOwner: account?.owner || null,
    subType: account?.subType || null,
    maxShoppingItems: account?.shoppingCartLimit || null,
    maxCupboardItems: account?.cupboardLimit || null,
    maxRecipeBoxItems: account?.recipeBoxLimit || null,
    maxFavoriteItems: account?.favoriteItemsLimit || null,
    maxRecipeSearchLimit: account?.recipeSearchLimit || null,
    maxUPCSearchLimit: account?.upcSearchLimit || null,
    accountStatus: account?.isActive || null,

    // Shopping Cart Metadata
    shoppingCartLength:
      shopping?.items?.filter(item => item.status === 'shopping-cart').length ||
      0,
    shoppingListLength:
      shopping?.items?.filter(item => item.status === 'shopping-list').length ||
      0,
    shoppingAllItemsLength: shopping?.items?.length || 0,
    shoppingCreatedOn: shopping?.createdOn || null,
    shoppingLastUpdated: shopping?.lastUpdated || null,
    shoppingLastUpdatedBy: shopping?.lastUpdatedBy || null,

    // Cupboard Metadata
    cupboardLength: cupboard?.items?.length || 0,
    cupboardCreatedOn: cupboard?.createdOn || null,
    cupboardLastUpdated: cupboard?.lastUpdated || null,
    cupboardLastUpdatedBy: cupboard?.lastUpdatedBy || null,

    // Favorites Metadata - feature not yet implemented
    favoritesLength: favorites?.items?.length || 0,
    favoriteItemsCreatedOn: favorites?.createdOn || null,
    favoriteItemsLastUpdated: favorites?.lastUpdated || null,
    favoriteItemsLastUpdatedBy: favorites?.lastUpdatedBy || null,

    // Recipe Box Metadata
    recipeBoxLength: recipeBox?.items?.length || 0,
    recipeBoxCreatedOn: recipeBox?.createdOn || null,
    recipeBoxLastUpdated: recipeBox?.lastUpdated || null,
    recipeBoxLastUpdatedBy: recipeBox?.lastUpdatedBy || null,

    // Recipes Metadata - feature not yet implemented
    dailyRecipeCounter: account?.dailyRecipeCounter || 0,
    dailyUPCCounter: account?.dailyUPCCounter || 0,
  };
};
