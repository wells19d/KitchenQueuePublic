//* cupboard.reducer.jsx
const initialState = {
  cupboard: null,
  loading: false,
  error: null,
};

const cupboardReducer = (state = initialState, action) => {
  switch (action.type) {
    // 🔄 Fetching
    case 'FETCH_CUPBOARD':
      return {...state, loading: true, error: null};
    case 'SET_CUPBOARD':
      return {...state, cupboard: action.payload, loading: false, error: null};
    case 'CUPBOARD_SET_FAILED': // ✅ fixed name
      return {...state, loading: false, error: action.payload};
    // ➕ Add Item
    case 'ADD_ITEM_TO_CUPBOARD':
      return {...state, loading: true, error: null};
    case 'CUPBOARD_ADD_ITEM_FAILED':
      return {...state, loading: false, error: action.payload};

    // ✏️ Update Item
    case 'UPDATE_ITEM_IN_CUPBOARD':
      return {...state, loading: true, error: null};
    case 'CUPBOARD_UPDATE_ITEM_FAILED':
      return {...state, loading: false, error: action.payload};

    // ❌ Delete Item
    case 'DELETE_ITEM_FROM_CUPBOARD':
      return {...state, loading: true, error: null};
    case 'CUPBOARD_DELETE_ITEM_FAILED':
      return {...state, loading: false, error: action.payload};

    // ❌ Delete List
    case 'DELETE_LIST_FROM_CUPBOARD':
      return {...state, loading: true, error: null};
    case 'CUPBOARD_DELETE_LIST_FAILED':
      return {...state, loading: false, error: action.payload};

    // 📦 Batch Add
    case 'BATCH_TO_CUPBOARD':
      return {...state, loading: true, error: null};
    case 'CUPBOARD_BATCH_ADD_START':
      return {...state, loading: true, error: null};
    case 'CUPBOARD_BATCH_ADD_SUCCESS':
      return {...state, loading: false, error: null};
    case 'CUPBOARD_BATCH_ADD_FAILED':
      return {...state, loading: false, error: action.payload};

    // ♻️ Reset
    case 'RESET_CUPBOARD':
      return {...state, loading: true, error: null};
    case 'CUPBOARD_RESET_FAILED':
      return {...state, loading: false, error: action.payload};

    case 'RESET_CUPBOARD_STATE':
    case 'RESET_ALL_STATE':
      return initialState;

    default:
      return state;
  }
};

export default cupboardReducer;
