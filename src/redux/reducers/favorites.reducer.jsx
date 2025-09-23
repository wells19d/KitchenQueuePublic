//*shopCart.reducer.jsx
const initialState = {
  favorites: null,
  loading: false,
  error: null,
};

const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    // 🔄 Fetching
    case 'FETCH_FAVORITES':
      return {...state, loading: true, error: null};
    case 'SET_FAVORITES':
      return {...state, favorites: action.payload, loading: false, error: null};
    case 'FAVORITES_SET_FAILED':
      return {...state, loading: false, error: action.payload};

    // ➕ Add Item
    case 'ADD_ITEM_TO_FAVORITES':
      return {...state, loading: true, error: null};
    case 'FAVORITES_ADD_ITEM_FAILED':
      return {...state, loading: false, error: action.payload};

    // ✏️ Update Item
    case 'UPDATE_ITEM_IN_FAVORITES':
      return {...state, loading: true, error: null};
    case 'FAVORITES_UPDATE_ITEM_FAILED':
      return {...state, loading: false, error: action.payload};

    // ❌ Delete Item
    case 'DELETE_ITEM_FROM_FAVORITES':
      return {...state, loading: true, error: null};
    case 'FAVORITES_DELETE_ITEM_FAILED':
      return {...state, loading: false, error: action.payload};

    // ❌ Delete List
    case 'DELETE_LIST_FROM_FAVORITES':
      return {...state, loading: true, error: null};
    case 'FAVORITES_DELETE_LIST_FAILED':
      return {...state, loading: false, error: action.payload};

    // ♻️ Reset
    case 'RESET_FAVORITES':
      return {...state, loading: true, error: null};
    case 'FAVORITES_RESET_FAILED':
      return {...state, loading: false, error: action.payload};

    case 'RESET_FAVORITES_STATE':
    case 'RESET_ALL_STATE':
      return initialState;

    default:
      return state;
  }
};

export default favoriteReducer;
