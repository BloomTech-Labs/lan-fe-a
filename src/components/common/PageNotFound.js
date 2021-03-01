import React from 'react';
import PageNotFoundContainer from './styles/pageNotFoundStyle';
import Header from './Header';

const PageNotFound = props => {
  return (
    <>
      <Header history={props.history} />
      <PageNotFoundContainer>
        <h1>Page not found</h1>
        <button onClick={() => props.history.push('/')}>Go back</button>
      </PageNotFoundContainer>
    </>
  );
};

export default PageNotFound;
