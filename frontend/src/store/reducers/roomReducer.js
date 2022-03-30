const initialValues = {
  user: null,
  room: null,
  socket: new WebSocket('ws://localhost:5001/'),
};

export const roomReducer = (state = initialValues, action) => {
  switch (action.type) {
    case 'ADD_ROOM':
      return { ...state, room: action.payload };

    case 'ADD_USER':
      return { ...state, user: action.payload };

    default:
      return state;
  }
};
