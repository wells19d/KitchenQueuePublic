//*device.reducer.jsx
const initialState = {
  deviceInfo: null,
  error: null,
};

const deviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DEVICE_INFO':
      return {...state, deviceInfo: action.payload, error: null};
    case 'DEVICE_INFO_FETCH_FAILED':
      return {...state, error: action.payload};
    case 'RESET_DEVICE_INFO_STATE':
      return initialState;
    default:
      return state;
  }
};

export default deviceReducer;
