import { createStore, Action } from 'redux'; 

type SignInAction = { type: 'SIGN_IN' };
type SignOutAction = { type: 'SIGN_OUT' };

type ActionTypes = SignInAction | SignOutAction;

const initialState = {
  isSignedIn: false,

};

const reducer = (state = initialState, action: ActionTypes): typeof initialState => {
  switch (action.type) {
    case 'SIGN_IN':
      return { ...state, isSignedIn: true };
    case 'SIGN_OUT':
      return { ...state, isSignedIn: false };
    default:
      return state;
  }
};

const makeStore = () => createStore(reducer);

export default makeStore;
