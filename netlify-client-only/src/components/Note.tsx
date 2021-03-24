import { useEffect, useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { pushTagToPool, deleteNote } from '../actions';

interface NoteProps {
  id: string;
  title: string;
  text: string;
  tags: string[];
  pushTagToPool: typeof pushTagToPool;
  deleteNote: Function;
}

function _Note({id, title, text, tags, pushTagToPool, deleteNote}: NoteProps):JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const [ isDanger, setIsDanger ] = useState<boolean>(false);
  const [ isRedirect, setIsRedirect ] = useState<boolean>(false);
  
  //pushes note's tags in the pool of tags
  useEffect(():void => {
    pushTagToPool(tags);
  }, [ pushTagToPool, tags ]);

  //colors each tag in a note's text
  useEffect(():void => {
    if (ref.current) {
      const innerHtml = ref.current.innerHTML;
      const newInnerHtml = innerHtml.split(' ')
                                    .map(word => tags.includes(word)? `<span class="u-hash">${ word }</span>` : word)
                                    .join(' ');
      ref.current.innerHTML = newInnerHtml;
    }
  }, [tags]);

  //toggles danger zone
  const toggleDanger = ():void => setIsDanger(!isDanger);

  //deletes currect note by its id
  const handleDelete = ():void => {
    deleteNote(id);
  }

  //sets redirect - the rest is carried out by the react-router Redirect component
  const handleEdit = ():void => setIsRedirect(true);

  //renders note's tags on each render
  const renderTags = ():JSX.Element[] => {
    const data = [];

    for (let tag of tags) {
      data.push(
        <p key={`${title}-${tag}`} className="note__tag">{ tag }</p>
      )
    }

    return data;
  }

  return(
    <div className="note">

      { isRedirect && 
        <Redirect 
          to={{
            pathname: "/add",
            state: { id, title, text }
          }}
        />
      }

      <h3 className="note__title">{ title }</h3>
      <p className="note__text" ref={ ref }>{ text }</p>
      <div className="note__tags">
        { renderTags() }
      </div>
      {!isDanger &&
        <div className="note__buttons">
          <button className="button button--sm note__button" onMouseDown={ handleEdit }>Edit</button>
          <button className="button button--sm button--danger note__button" onMouseDown={ toggleDanger }>Delete</button>
        </div>
      }
      {isDanger &&
        <div className="note__buttons">
          <div className="note__confirm"><p>Are you sure?</p></div>
          <button className="button button--sm note__button" onMouseDown={ toggleDanger }>Cancel</button>
          <button className="button button--sm button--danger note__button" onMouseDown={ handleDelete }>Confirm</button>
        </div>
      }
    </div>
  )
}

export const Note = connect(null, { pushTagToPool, deleteNote })(_Note);