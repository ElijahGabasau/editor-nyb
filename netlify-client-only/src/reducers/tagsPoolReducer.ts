import { TagsPoolAction, TagsPoolTypes } from '../actions';
import { uniq } from '../utils';

export const tagsPoolReducer = (state: string[] = [], action: TagsPoolAction) => {
  switch (action.type) {
    case TagsPoolTypes.PUSH_TAG:
      return [ ...state, ...action.payload ].filter(uniq);
    case TagsPoolTypes.POP_TAG:
      return state.filter((tag: string) => !action.payload.includes(tag))
    default: 
      return state;
  }
};