const initialValues = {
  room: null,
};

export const roomReducer = (state = initialValues, action) => {
  switch (action.type) {
    case 'ADD_ROOM':
      return { ...state, room: action.payload };

    default:
      return state;
  }
};
