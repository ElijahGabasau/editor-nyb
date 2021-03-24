import { ActiveTagsTypes } from './types';

export interface PushActiveTagAction {
  type: ActiveTagsTypes.PUSH_TAG;
  payload: string;
}

export interface PopActiveTagAction {
  type: ActiveTagsTypes.POP_TAG
  payload: string;
}

export interface ClearActiveAction {
  type: ActiveTagsTypes.CLEAR_TAGS
}

export const pushActiveTag = (tag: string): PushActiveTagAction => {
  return {
    type: ActiveTagsTypes.PUSH_TAG,
    payload: tag
  }
}

export const popActiveTag = (tag: string): PopActiveTagAction => {
  return {
    type: ActiveTagsTypes.POP_TAG,
    payload: tag
  }
}

export const clearActive = (): ClearActiveAction => {
  return {
    type: ActiveTagsTypes.CLEAR_TAGS
  }
}