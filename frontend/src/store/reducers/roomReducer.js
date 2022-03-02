const initialValues = {
  nickname: null,
  room: null,
};

export const roomReducer = (state = initialValues, action) => {
  switch (action.type) {
    case 'ADD_ROOM':
      return { ...state, room: action.payload };

    case 'ADD_NICKNAME':
      return { ...state, nickname: action.payload };

    default:
      return state;
  }
};
