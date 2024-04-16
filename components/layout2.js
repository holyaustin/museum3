/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment } from 'react';
import Header from './header/header2';

export default function Layout({ children }) {
  return (
    <Fragment>
      <Header />
      <main
        sx={{
          variant: 'layout.main',
          padding: '20px', // Adjust padding as needed
          maxWidth: '100%', // Ensure the content doesn't stretch too wide
          margin: '0 auto', // Center align content
        }}
      >
        {children}
      </main>
    </Fragment>
  );
}
