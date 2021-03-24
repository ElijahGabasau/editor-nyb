import { useState, useEffect } from 'react';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';

import { postNote, patchNote } from '../actions';
import { uniq } from '../utils';

interface LocationState {
  id: string;
  text: string;
  title: string;
}

interface FormType {
  title: string;
  text: string;
}

interface NoteFormProps extends RouteComponentProps<{}, {}, LocationState> {
  postNote: Function;
  patchNote: Function;
}

function _NoteForm({ postNote, patchNote, history: { location: { state } } }: NoteFormProps):JSX.Element {
  const [ isRedirect, setIsRedirect ] = useState<boolean>(false);
  const [ value, setValue ] = useState<string>('');
  const [ tags, setTags ] = useState<string[]>([]);
  const { register, handleSubmit } = useForm<FormType>();

  //goes through text and checks for hashtags 
  const evaluateTags = ( value: string ):void => {
    const newTags = value.split(' ').filter(word => word[0] === '#');
    setTags(newTags.filter(uniq));
  }

  //stores user's text in the state
  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  //calls check for hashtags 1.5s after user stopped typing
  useEffect(() => {
    const timeoutId = setTimeout(() => evaluateTags(value), 1500);
    return () => clearTimeout(timeoutId);
  }, [value]);

  //submits created/edited note and sets redirect to the main page
  const onSubmit = ( data: FormType ):void => {

    //a redirect from an existing note results in the id prop given
    //thus if id exists, patch instead of post
    if(state && state.id) {
      const id = state.id;
      patchNote({ ...data, id, tags });
    } else {
      postNote({ ...data, tags });
    }

    setIsRedirect(true);
  }

  //renders stored hashtags on each render
  const renderTags = ():JSX.Element[] => {
    const data = [];

    for (let tag of tags) {
      data.push(
        <p key={`newform-${tag}`} className="noteform__tag">{ tag }</p>
      )
    }

    return data;
  }

  return (
    <div className="noteform__container">

      { isRedirect && <Redirect to="/"/> }

      <div className="noteform">
        <div className="noteform__background"></div>
        <div className="noteform__heading">
          <h2 className="noteform__title">Add new</h2>
          <Link to="/" className="noteform__link">Go back</Link>
        </div>
        <form className="noteform__form" onSubmit={handleSubmit(onSubmit)} >
          <div className="noteform__field" >
            <label className="noteform__label">Title</label>
            <input 
              className="input noteform__input" 
              name="title" 
              ref={register()} 
              defaultValue={ state && state.title } 
            />
          </div>

          <div className="noteform__field" >
            <label className="noteform__label">Note</label>
            <textarea 
              className="input input__textarea noteform__input" 
              name="text" 
              onChange={handleOnChange} 
              ref={register()} 
              defaultValue={ state && state.text } 
            />
          </div>

          <div className="noteform__tags">
            { renderTags() }
          </div>

          <button className="button button--marble noteform__button">{state && state.id? 'Update' : 'Create'}</button>
        </form> 
      </div>
    </div>  
  )
}

export const NoteForm = connect(null, { postNote, patchNote })(_NoteForm);