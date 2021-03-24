import { useEffect } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../reducers';
import { Tag } from './Tag';
import { SearchState } from './SearchBox';
import { clearActive } from '../actions';

interface TagsProps {
  tags: string[];
  searchState: SearchState;
  pushToDelete: Function;
  popFromDelete: Function;
  clearActive: typeof clearActive
}

function _Tags({ tags, searchState, pushToDelete, popFromDelete, clearActive }: TagsProps):JSX.Element {
  //clears all active tags each time user changes state of SearchBox (e.g. chooses add or delete a tag)
  useEffect(() => {
    clearActive();
  }, [searchState, clearActive])

  const renderTags = ():JSX.Element[] => {
    const render = [];

    for (let tag of tags) {
      render.push(
        <Tag 
          key={`tag-${tag}`} 
          data={ tag } 
          pushToDelete={ pushToDelete }
          popFromDelete={ popFromDelete }
          searchState={ searchState }
        />
      )
    }

    return render;
  }

  return (
    <div className="tags">
      { renderTags() }
    </div>
  )
}

const mapStateToProps = ({ tagsPool }: StoreState): { tags: string[] } => {
  return { tags: tagsPool }
}

export const Tags = connect(mapStateToProps, { clearActive })(_Tags);