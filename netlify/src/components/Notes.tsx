import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { StoreState } from '../reducers';
import { Note as NoteType } from '../actions';

import { Note } from './Note';

interface NotesProps {
  className: string;
  notes: NoteType[];
  tags: string[];
}

function _Notes({ className, notes, tags }: NotesProps):JSX.Element {
  //checks if current note has all of active tags
  const missesTags = (note: NoteType, tags: string[]):boolean => {
    for (let tag of tags) {
      if (!note.tags.includes(tag)){
        return true;
      }
    }

    return false;
  }

  //renders each separate note, while checking if the active tags are present in note tags
  //if no match returns "no results"
  const renderNotes = ():JSX.Element[] => {
    const data = [];

    for (let note of notes) {
      if (tags.length > 0 && missesTags(note, tags)) {
        continue;
      }

      data.push(<Note key={note.id} {...note}/>);
    }

    if (data.length === 0) {
      data.push (
        <h3 key="no-results" className="notes__title notes__title--noresults">No results</h3>
      );
    }

    return data;
  }


  return (
    <div className={`notes ${className}`}>
      <div className="notes__background"></div>

      <div className="notes__bar">
        <h2 className="notes__title">Your Notes</h2>
        <Link to="/add" className="notes__link">+Add</Link>
      </div>
      
      { renderNotes() }

    </div>
  );
}

const mapStateToProps = ({ notes, activeTags }: StoreState): { notes: NoteType[], tags: string[] } => {
  return { notes, tags: activeTags }
}

export const Notes = connect(mapStateToProps)(_Notes);