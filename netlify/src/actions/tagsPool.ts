import { TagsPoolTypes } from './types';

export interface PushTagPoolAction {
  type: TagsPoolTypes.PUSH_TAG;
  payload: string[];
}

export interface PopTagPoolAction {
  type: TagsPoolTypes.POP_TAG
  payload: string[];
}

export const pushTagToPool = (tags: string[]): PushTagPoolAction => {
  const parsedTags = tags.map(tag => tag);

  return {
    type: TagsPoolTypes.PUSH_TAG,
    payload: parsedTags
  }
}

export const popTagFromPool = (tags: string[]): PopTagPoolAction => {
  const parsedTags = tags.map(tag => tag);

  return {
    type: TagsPoolTypes.POP_TAG,
    payload: parsedTags
  }
}