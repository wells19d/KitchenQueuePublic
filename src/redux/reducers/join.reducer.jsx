//* join.reducer.jsx

const initialInviteState = {
  inviteFound: false,
  inviteData: null,
  accountFound: false,
  accountData: null,
  error: false,
  errorMsg1: '',
  errorMsg2: '',
};

const joinInviteReducer = (state = initialInviteState, action) => {
  switch (action.type) {
    case 'SET_INVITE_DATA':
      return {
        ...state,
        inviteFound: true,
        inviteData: action.payload,
        error: false,
        errorMsg1: '',
        errorMsg2: '',
      };

    case 'INVITE_EXPIRED':
    case 'INVITE_NOT_FOUND':
    case 'INVITE_LOOKUP_FAILED':
      return {
        ...state,
        inviteFound: false,
        inviteData: null,
        error: true,
        errorMsg1: action.payload.msg1,
        errorMsg2: action.payload.msg2,
      };

    case 'SET_TEMP_ACCOUNT_DATA':
      return {
        ...state,
        accountFound: true,
        accountData: action.payload,
        error: false,
      };
    case 'TEMP_ACCOUNT_DATA_FAILED':
      return {
        ...state,
        accountFound: false,
        accountData: null,
        error: true,
      };
    case 'RESET_ALL_STATE':
    case 'CLEAR_TEMP_ACCOUNT_DATA':
    case 'CLEAR_INVITE_DATA':
      return initialInviteState;

    default:
      return state;
  }
};

export default joinInviteReducer;
