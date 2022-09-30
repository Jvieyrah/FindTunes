import React from 'react';
import Header from '../components/Header';

class NotFound extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found">
        <Header />
        <p>NotFound VQV</p>
      </div>

    );
  }
}

export default NotFound;
