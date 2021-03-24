import { Dispatch } from 'redux';
import axios from 'axios';
import { Note, NoteTypes } from './types';

export interface FetchNotes {
  type: NoteTypes.FETCH_NOTES;
  payload: Note[];
}

export interface DeleteNote {
  type: NoteTypes.DELETE_NOTE;
  payload: string;
}

export interface PostNote {
  type: NoteTypes.POST_NOTE;
  payload: Note;
}

export interface PatchNote {
  type: NoteTypes.PATCH_NOTE;
  payload: Note;
}

export const fetchNotes = () => async (dispatch: Dispatch) => {
  const response = await axios.get<Note[]>('/.netlify/functions/api/note');

  dispatch<FetchNotes>({
    type: NoteTypes.FETCH_NOTES,
    payload: response.data
  })
}

export const deleteNote = (id: string) => async (dispatch: Dispatch) => {
  const response = await axios.delete<string>(`/.netlify/functions/api/note/${id}`);

  dispatch<DeleteNote>({
    type: NoteTypes.DELETE_NOTE,
    payload: response.data.toString()
  })
}

export const patchNote = (note: Note) => async (dispatch: Dispatch) => {
  const response = await axios.patch<Note>(`/.netlify/functions/api/note/${note.id}`, note);

  dispatch<PatchNote>({
    type: NoteTypes.PATCH_NOTE,
    payload: response.data
  })
}

export const postNote = (note: Note) => async (dispatch: Dispatch) => {
  const response =  await axios.post<Note>(`/.netlify/functions/api/note/`, note);

  dispatch<PostNote>({
    type: NoteTypes.POST_NOTE,
    payload: response.data
  })
}