import React from 'react';
import PropTypes from 'prop-types';
// import './Card.css';

class AlbunCard extends React.Component {
  render() {
    const {
      artistName,
      collectionName,
      artworkUrl100,
    } = this.props;
    return (
      <section className="Albun-card">
        <img src={ artworkUrl100 } alt={ `artista ${artistName}` } />
        <p>
          Artist:
          { artistName }
          Album:
          { collectionName }
        </p>
      </section>
    );
  }
}

AlbunCard.propTypes = {
  artistName: PropTypes.string,
  collectionName: PropTypes.string,
  artworkUrl100: PropTypes.string,
}.isRequired;

export default AlbunCard;
