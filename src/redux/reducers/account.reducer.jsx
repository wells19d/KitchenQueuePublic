//* account.reducer.jsx
const initialState = {
  account: null,
  allowedProfiles: [],
  error: null,
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    // ✅ Account set or created
    case 'SET_ACCOUNT':
    case 'ACCOUNT_CREATE_SUCCESS':
      return {...state, account: action.payload, error: null};
    case 'DAILY_COUNTUP_SUCCESS':
      return state;
    case 'RESET_DAILY_COUNTERS_SUCCESS':
      return {
        ...state,
        account: {
          ...state.account, // 🟢 Preserve existing data
          ...action.payload, // 🟢 Overwrite with updated fields
        },
        error: null,
      };

    case 'ACCOUNT_CREATE_FAILURE':
    case 'ACCOUNT_FETCH_FAILED':
    case 'RESET_DAILY_COUNTERS_FAILED':
      return {...state, error: action.payload};

    // ✅ Allowed profiles
    case 'SET_ALLOWED_PROFILES':
      return {...state, allowedProfiles: action.payload};
    case 'FETCH_ALLOWED_PROFILES_FAILED':
      return {...state, error: action.payload};

    // 🔄 Reset
    case 'RESET_ACCOUNT_STATE':
    case 'RESET_ALL_STATE':
      return initialState;

    default:
      return state;
  }
};

export default accountReducer;
