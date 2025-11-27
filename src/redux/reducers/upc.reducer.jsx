//* upc.reducer.jsx

const initialState = {
  upcData: null,
  error: null,
  loading: false,
};

const upcReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_UPC_DATA':
      return {...state, loading: true, error: null};

    case 'SET_UPC_DATA':
      return {...state, upcData: action.payload, loading: false};

    case 'UPC_API_FETCH_FAILED':
      return {...state, error: action.payload, loading: false};

    case 'RESET_UPC_DATA':
      return {...initialState};

    case 'RESET_ALL_STATE':
      return initialState;

    default:
      return state;
  }
};

export default upcReducer;
