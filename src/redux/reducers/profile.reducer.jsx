//* profile.reducer.jsx
const initialState = {
  profile: null,
  error: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    // ✅ Fetched and set
    case 'SET_PROFILE':
      return {...state, profile: action.payload};

    // ✅ New profile created
    case 'PROFILE_CREATE_SUCCESS':
      return {...state, profile: action.payload, error: null};
    case 'PROFILE_CREATE_FAILURE':
      return {...state, error: action.payload};

    // ✅ Profile updated
    case 'UPDATE_PROFILE_SUCCESS':
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.payload,
        },
      };
    case 'UPDATE_PROFILE_FAILED':
    case 'PROFILE_FETCH_FAILED':
      return {...state, error: action.payload};

    // 🔄 Reset cases
    case 'RESET_PROFILE_STATE':
    case 'RESET_ALL_STATE':
      return initialState;

    default:
      return state;
  }
};

export default profileReducer;
