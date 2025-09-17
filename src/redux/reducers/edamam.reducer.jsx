//* edamam.reducer.jsx
const initialState = {
  foodData: null,
  error: null,
  loading: false,
};

const edamamReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_FOOD_DATA':
      return {...state, loading: true, error: null};

    case 'SET_FOOD_DATA':
      return {...state, foodData: action.payload, loading: false};

    case 'FOOD_API_FETCH_FAILED':
      return {...state, error: action.payload, loading: false};

    case 'RESET_FOOD_DATA':
      return {...initialState};
    case 'RESET_ALL_STATE':
      return initialState;

    default:
      return state;
  }
};

export default edamamReducer;
