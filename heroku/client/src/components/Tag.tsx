import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { SearchState } from './SearchBox';
import { pushActiveTag, popActiveTag } from '../actions';

interface TagProps {
  data: string;
  pushActiveTag: typeof pushActiveTag;
  popActiveTag: typeof popActiveTag;
  pushToDelete: Function;
  popFromDelete: Function;
  searchState: SearchState;
}

function _Tag({ data, pushActiveTag, popActiveTag, pushToDelete, popFromDelete, searchState }: TagProps):JSX.Element {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  //clears isChecked each time user changes state of SearchBox (e.g. chooses add or delete a tag)
  useEffect(():void => {
    setIsChecked(false);
  }, [searchState]);

  //chooses an action appropriate to current SearchBox state
  const handleCheck = ():void => {
    const newChecked = !isChecked
    
    const onActive = searchState === SearchState.DELETE? pushToDelete : pushActiveTag;
    const onInactive = searchState === SearchState.DELETE? popFromDelete : popActiveTag;

    if(newChecked) {
      onActive(data);
      setIsChecked(newChecked);
      return;
    }

    onInactive(data);
    setIsChecked(newChecked);
  };

  return (
    <button 
      className={`tag ${isChecked? 'tag--active' : ''}`}
      onMouseDown={handleCheck}  
    >
      { data }
    </button>
  )
}

export const Tag = connect(null, { pushActiveTag, popActiveTag })(_Tag);