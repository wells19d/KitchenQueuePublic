//*_root.reducer.jsx
import {combineReducers} from 'redux';
import userReducer from './user.reducer';
import profileReducer from './profile.reducer';
import accountReducer from './account.reducer';
import shoppingReducer from './shopCart.reducer';
import cupboardReducer from './cupboard.reducer';
import deviceReducer from './device.reducer';
import invitesReducer from './invites.reducer';
import joinInviteReducer from './join.reducer';
import upcReducer from './upc.reducer';
import recipeReducer from './recipe.reducer';
import favoriteReducer from './favorites.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  account: accountReducer,
  shopping: shoppingReducer,
  cupboard: cupboardReducer,
  deviceInfo: deviceReducer,
  invites: invitesReducer,
  joinInvite: joinInviteReducer,
  upc: upcReducer,
  recipe: recipeReducer,
  favorites: favoriteReducer,
});

export default rootReducer;
