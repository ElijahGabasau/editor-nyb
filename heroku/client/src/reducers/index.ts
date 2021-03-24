import { combineReducers } from 'redux';
import { Note } from '../actions';
import { activeTagsReducer } from './activeTagsReduser';
import { tagsPoolReducer } from './tagsPoolReducer';
import { notesReducer } from './notesReduser';

export interface StoreState {
  activeTags: string[];
  tagsPool: string[];
  notes: Note[];
}

export const reducers = combineReducers<StoreState> ({
  activeTags: activeTagsReducer,
  tagsPool: tagsPoolReducer,
  notes: notesReducer
})