interface HeadingProps {
  className: string;
}

export function Heading({ className }:HeadingProps):JSX.Element {
  return (
    <div className={`heading ${className}`}>
      <div className="heading__background"></div>
      <h1 className="heading__title">Noter</h1>
      <button className="heading__button button button--marble">Login</button>
    </div>
  )
}