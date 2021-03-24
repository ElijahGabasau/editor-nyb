import { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { pushTagToPool, popTagFromPool } from '../actions';

import { Tags } from './Tags';

interface SearchBoxProps {
  className: string;
  pushTagToPool: typeof pushTagToPool;
  popTagFromPool: typeof popTagFromPool;
}

export enum SearchState {
  ADD,
  DELETE,
  DEFAULT
}

function _SearchBox({ className, pushTagToPool, popTagFromPool }: SearchBoxProps):JSX.Element {
  const [toDelete, setToDelete] = useState<string[]>([]);
  const [currentState, setCurrentState] = useState<SearchState>(SearchState.DEFAULT);
  const ref = useRef<HTMLInputElement>(null);

  const setAdd = ():void => setCurrentState(SearchState.ADD);
  const setDelete = ():void => setCurrentState(SearchState.DELETE);
  const setDefault = ():void => setCurrentState(SearchState.DEFAULT);

  //if several words were given, makes it one separated by underscore
  //if no hash was given, adds one in front
  //then pushes value to the pool of tags in a redux store
  const handleAdd = ():void => {
    if (ref.current && ref.current.value) {
      let value = ref.current.value.split(' ').join('_');
      value = value[0] === '#'? value : '#' + value;

      pushTagToPool([value]);
    }

    setDefault();
  }

  const pushToDelete = (tag: string):void => {
    const newToDelete = [ ...toDelete, tag];
    setToDelete(newToDelete);
  }

  const popFromDelete = (tag: string):void => {
    const newToDelete = toDelete.filter(item => item !== tag);
    setToDelete(newToDelete);
  }

  const handleDelete = ():void => {
    if(toDelete.length > 0){
      popTagFromPool(toDelete);
    }
    setDefault();
  }

  return (
    <div className={`searchbox ${className}`}>
      <div className="searchbox__background"></div>

      {currentState === SearchState.DEFAULT &&
        <div className="searchbox__bar">
          <div className="searchbox__text"><p>Click on tags to search</p></div>
          <button className="button button--sm searchbox__button" onMouseDown={ setAdd }>add</button>
          <button className="button button--sm button--danger searchbox__button" onMouseDown={ setDelete }>Delete</button>
        </div>
      }

      {currentState === SearchState.ADD && 
        <div className="searchbox__bar">
          <input className="input searchbox__input" ref={ ref } placeholder="type in a new tag here" />
          <button className="button button--sm searchbox__button" onMouseDown={ handleAdd }>Add</button>
          <button className="button button--sm searchbox__button" onMouseDown={ setDefault }>Cancel</button>
        </div>
      }

      {currentState === SearchState.DELETE && 
        <div className="searchbox__bar">
          <div className="searchbox__text"><p>Choose tags you would like to remove</p></div>
          <button className="button button--sm searchbox__button" onMouseDown={setDefault}>Cancel</button>
          <button className="button button--sm button--danger searchbox__button" onMouseDown={ handleDelete }>Confirm</button>
        </div>
      }

      <Tags 
        searchState={ currentState }
        pushToDelete={ pushToDelete }
        popFromDelete={ popFromDelete } 
      />
    </div>
  )
}

export const SearchBox = connect(null, { pushTagToPool, popTagFromPool })(_SearchBox);