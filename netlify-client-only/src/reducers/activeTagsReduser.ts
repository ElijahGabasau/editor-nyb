import { ActiveTagsAction, ActiveTagsTypes } from '../actions';
import { uniq } from '../utils';

export const activeTagsReducer = (state: string[] = [], action: ActiveTagsAction) => {
  switch (action.type) {
    case ActiveTagsTypes.PUSH_TAG:
      return [ ...state, action.payload].filter(uniq);
    case ActiveTagsTypes.POP_TAG:
      return state.filter((tag: string) => tag !== action.payload);
    case ActiveTagsTypes.CLEAR_TAGS:
      return [];
    default: 
      return state;
  }
};