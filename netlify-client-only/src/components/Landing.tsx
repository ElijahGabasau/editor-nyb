import { Heading } from './Heading';
import { Notes } from './Notes';
import { SearchBox } from './SearchBox';

export function Landing():JSX.Element {
  return(
    <div className="landing">
      <Heading className="landing__heading" />
      <SearchBox className="landing__searchbox" />
      <Notes className="landing__notes" />
    </div>
  )
}