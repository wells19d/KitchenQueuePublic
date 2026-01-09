// recipe.reducer.jsx
const initialState = {
  communityRecipes: [],
  recipeBox: [],
  loading: false,
  error: null,
};

export default function recipeReducer(state = initialState, action) {
  switch (action.type) {
    // 🔄 Fetching
    case 'FETCH_RECIPE_BOX':
      return {...state, loading: true, error: null};
    case 'SET_RECIPE_BOX':
      return {...state, recipeBox: action.payload, loading: false, error: null};
    case 'RECIPE_BOX_SET_FAILED':
      return {...state, loading: false, error: action.payload};

    case 'FETCH_COMMUNITY_RECIPES':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'SET_COMMUNITY_RECIPES':
      return {
        ...state,
        communityRecipes: action.payload,
        loading: false,
        error: null,
      };
    case 'SET_COMMUNITY_RECIPES_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'RESET_COMMUNITY_RECIPES':
      return {
        ...state,
        communityRecipes: [],
        loading: false,
        error: null,
      };

    // ➕ Add Item
    case 'ADD_ITEM_TO_RECIPE_BOX':
      return {...state, loading: true, error: null};
    case 'BOOKMARK_TO_RECIPE_BOX':
      return {...state, loading: true, error: null};
    case 'ADD_TO_COMMUNITY_RECIPES':
      return {...state, loading: true, error: null};
    case 'RECIPE_BOX_ADD_FAILED':
      return {...state, loading: false, error: action.payload};
    case 'COMMUNITY_ADD_FAILED':
      return {...state, loading: false, error: action.payload};
    case 'RECIPE_BOX_UPDATE_FAILED':
      return {...state, loading: false, error: action.payload};
    case 'BOOKMARK_ADD_FAILED':
      return {...state, loading: false, error: action.payload};

    // ✏️ Update Item
    case 'UPDATE_ITEM_IN_RECIPE_BOX':
      return {...state, loading: true, error: null};
    case 'RECIPE_BOX_UPDATE_ITEM_FAILED':
      return {...state, loading: false, error: action.payload};
    case 'UPDATE_TO_COMMUNITY_RECIPES':
      return {...state, loading: true, error: null};
    case 'UPDATE_TO_COMMUNITY_RECIPES_FAILED':
      return {...state, loading: false, error: action.payload};

    // ❌ Delete Item
    case 'DELETE_ITEM_FROM_RECIPE_BOX':
      return {...state, loading: true, error: null};
    case 'RECIPE_BOX_DELETE_ITEM_FAILED':
      return {...state, loading: false, error: action.payload};
    case 'DELETE_FROM_COMMUNITY_RECIPES':
      return {...state, loading: true, error: null};
    case 'DELETE_FROM_COMMUNITY_RECIPES_FAILED':
      return {...state, loading: false, error: action.payload};

    // ❌ Delete List
    case 'DELETE_LIST_FROM_RECIPE_BOX':
      return {...state, loading: true, error: null};
    case 'RECIPE_BOX_DELETE_LIST_FAILED':
      return {...state, loading: false, error: action.payload};

    // ♻️ Reset
    case 'RESET_RECIPE_BOX':
      return {...state, loading: true, error: null};
    case 'RECIPE_BOX_RESET_FAILED':
      return {...state, loading: false, error: action.payload};

    case 'RESET_RECIPE_BOX_STATE':
      return {
        ...state,
        recipeBox: [],
        loading: false,
        error: null,
      };
    case 'RESET_ALL_STATE':
      return {
        ...state,
        recipeBox: [],
        loading: false,
        error: null,
      };

    default:
      return state;
  }
}
