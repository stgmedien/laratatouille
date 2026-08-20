import { Fragment } from 'react';

/** Renders "\n" in dictionary strings as line breaks. */
export function MultilineText({ children }: { children: string }) {
  const lines = children.split('\n');
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {line}
          {i < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </>
  );
}
