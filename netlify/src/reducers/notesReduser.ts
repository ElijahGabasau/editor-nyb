import { NoteAction, NoteTypes, Note } from '../actions';

export const notesReducer = (state: Note[] = [], action: NoteAction) => {
  switch (action.type) {
    case NoteTypes.FETCH_NOTES:
      return action.payload;
    case NoteTypes.DELETE_NOTE:
      return state.filter((note: Note) => note.id !== action.payload);
    case NoteTypes.PATCH_NOTE:
      return state.map((note: Note) => note.id === action.payload.id ? action.payload : note);
    case NoteTypes.POST_NOTE:
      return [ ...state, action.payload ];
    default: 
      return state;
  }
};