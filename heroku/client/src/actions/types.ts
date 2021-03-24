import { PushActiveTagAction, PopActiveTagAction, ClearActiveAction } from './activeTags';
import { DeleteNote, FetchNotes, PatchNote, PostNote } from './notes';
import { PushTagPoolAction, PopTagPoolAction } from './tagsPool';

export interface Note {
  id: string;
  text: string;
  title: string;
  tags: string[];
}

export enum NoteTypes {
  FETCH_NOTES = 'FETCH_NOTES',
  DELETE_NOTE = 'DELETE_NOTE',
  PATCH_NOTE = 'PATCH_NOTE',
  POST_NOTE = 'POST_NOTE'
}

export enum ActiveTagsTypes {
  PUSH_TAG = 'PUSH_TAG_TO_ACTIVE',
  POP_TAG = 'POP_TAG_FROM_ACTIVE',
  CLEAR_TAGS = 'CLEAR_ACTIVE_TAGS'
}

export enum TagsPoolTypes {
  PUSH_TAG = 'PUSH_TAG_TO_POOL',
  POP_TAG = 'PUSH_TAG_FROM_POOL'
}

export type ActiveTagsAction = PushActiveTagAction | PopActiveTagAction | ClearActiveAction;
export type TagsPoolAction = PushTagPoolAction | PopTagPoolAction;
export type NoteAction = FetchNotes | DeleteNote | PostNote | PatchNote;