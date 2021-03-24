import { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { fetchNotes } from '../actions/notes';

import { Background } from './Background';
import { Landing } from './Landing';
import { NoteForm } from './NoteForm';

interface AppProps {
  fetchNotes: Function;
}

function _App({ fetchNotes }:AppProps): JSX.Element {
  useEffect(():void => {
    fetchNotes();
  }, [fetchNotes])

  return (
    <div className="app">
      <Background />
      <BrowserRouter>
        <Route exact path="/" component={ Landing } />
        <Route exact path="/add" component={ NoteForm } />
      </BrowserRouter>
    </div>
  )
}

export const App = connect(null, { fetchNotes })(_App);