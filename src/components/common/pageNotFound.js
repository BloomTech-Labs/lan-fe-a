import React from 'react';
import PageNotFoundContainer from './styles/pageNotFoundStyle';

const PageNotFound = props => {
  return (
    <PageNotFoundContainer>
      <h1>Page not found</h1>
      <button onClick={() => props.history.push('/')}>Go back</button>
    </PageNotFoundContainer>
  );
};

export default PageNotFound;