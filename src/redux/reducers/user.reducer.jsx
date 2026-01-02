//* user.reducer.jsx
const initialState = {
  data: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // 🔐 Signup Flow
    case 'USER_SIGNUP_REQUEST':
      return {...state, loading: true, error: null};
    case 'USER_SIGNUP_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
        isAuthenticated: true,
      };
    case 'USER_SIGNUP_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
        isAuthenticated: false,
      };

    // 🔓 Login Flow
    case 'LOGIN_REQUEST':
      return {...state, loading: true, error: null};
    case 'SET_USER':
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
        isAuthenticated: true,
      };
    case 'LOGIN_FAILED':
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };

    // 🔒 Logout & Reset
    case 'UNSET_USER':
      return {...initialState, loading: false};
    case 'LOGOUT':
      return initialState;
    case 'RESET_USER_STATE':
    case 'RESET_ALL_STATE':
      return initialState;

    default:
      return state;
  }
};

export default userReducer;
