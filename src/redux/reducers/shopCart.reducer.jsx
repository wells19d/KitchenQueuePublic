//*shopCart.reducer.jsx
const initialState = {
  shopping: null,
  loading: false,
  error: null,
};

const shoppingReducer = (state = initialState, action) => {
  switch (action.type) {
    // 🔄 Fetching
    case 'FETCH_SHOP_CART':
      return {...state, loading: true, error: null};
    case 'SET_SHOP_CART':
      return {...state, shopping: action.payload, loading: false, error: null};
    case 'SHOP_CART_SET_FAILED':
      return {...state, loading: false, error: action.payload};

    // ➕ Add Item
    case 'ADD_ITEM_TO_SHOP_CART':
      return {...state, loading: true, error: null};
    case 'ADD_ALL_ITEMS_TO_SHOP_CART':
      return {...state, loading: true, error: null};
    case 'SHOP_CART_ADD_ITEM_FAILED':
      return {...state, loading: false, error: action.payload};
    case 'SHOP_CART_ADD_ALL_ITEMS_FAILED':
      return {...state, loading: false, error: action.payload};

    // ✏️ Update Item
    case 'UPDATE_ITEM_IN_SHOP_CART':
      return {...state, loading: true, error: null};
    case 'SHOP_CART_UPDATE_ITEM_FAILED':
      return {...state, loading: false, error: action.payload};

    // ❌ Delete Item
    case 'DELETE_ITEM_FROM_SHOP_CART':
      return {...state, loading: true, error: null};
    case 'SHOP_CART_DELETE_ITEM_FAILED':
      return {...state, loading: false, error: action.payload};

    // ❌ Delete List
    case 'DELETE_LIST_FROM_SHOP_CART':
      return {...state, loading: true, error: null};
    case 'SHOP_CART_DELETE_LIST_FAILED':
      return {...state, loading: false, error: action.payload};

    // 📦 Batch Add
    case 'BATCH_TO_SHOP_CART':
      return {...state, loading: true, error: null};
    case 'SHOP_CART_BATCH_ADD_START':
      return {...state, loading: true, error: null};
    case 'SHOP_CART_BATCH_ADD_SUCCESS':
      return {...state, loading: false, error: null};
    case 'SHOP_CART_BATCH_ADD_FAILED':
      return {...state, loading: false, error: action.payload};

    // ♻️ Reset
    case 'RESET_SHOP_CART':
      return {...state, loading: true, error: null};
    case 'SHOP_CART_RESET_FAILED':
      return {...state, loading: false, error: action.payload};

    case 'RESET_SHOP_CART_STATE':
    case 'RESET_ALL_STATE':
      return initialState;

    default:
      return state;
  }
};

export default shoppingReducer;
