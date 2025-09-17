//* invites.reducer.jsx
const initialState = {
  existingInvite: null,
  limitExceeded: false,
  error: null,
};

const invitesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_EXISTING_INVITE':
      return {
        ...state,
        existingInvite: action.payload,
        error: null,
      };
    case 'SET_EXCEEDING_LIMITS':
      return {
        ...state,
        limitExceeded: true,
        existingInvite: null,
        error: null, // no error needed for form field now
      };
    case 'ADD_INVITE':
      return {
        ...state,
        existingInvite: action.payload,
        error: null,
      };
    case 'UPDATE_INVITE':
      return {
        ...state,
        existingInvite: {
          ...state.existingInvite,
          ...action.payload,
        },
        error: null,
      };
    case 'DELETE_INVITE':
      return {
        ...state,
        existingInvite: null,
        error: null,
      };
    case 'CLEAR_EXISTING_INVITE':
      return {
        ...state,
        existingInvite: null,
        limitExceeded: false,
        error: null,
      };
    case 'INVITE_ACTION_FAILED':
      return {
        ...state,
        error: action.payload,
      };
    case 'RESET_ALL_STATE':
      initialState;
    default:
      return state;
  }
};

export default invitesReducer;
