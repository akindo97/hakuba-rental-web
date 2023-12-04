// myReducer.js

const initialState = {
  modal: [0, ""],
  nxpr: 0,
  home: 0,
  lang: localStorage.getItem('llangu') ? localStorage.getItem('llangu') : 'jp'
};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MODAL':
      return {
        ...state,
        modal: action.payload
      };
    case 'LANGUA':
      return {
        ...state,
        lang: action.payload
      };
    case 'NXPRID':
      return {
        ...state,
        nxpr: action.payload
      };
    case 'HOMEID':
      return {
        ...state,
        home: action.payload
      };
    default:
      return state;
  }
};

export default myReducer;
