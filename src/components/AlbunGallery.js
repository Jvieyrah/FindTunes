import React from 'react';
import PropTypes from 'prop-types';
// import AlbunCard from './AlbunCard';

class AlbunGallery extends React.Component {
  render() {
    const result = this.props;
    return (
      <div data-testid="Album-Gallery">
        <p>
          { result}
          funcionou!
        </p>
        {/* { result.map((e) => <AlbunCard key={ e.collectionId } prop={ e } />) } */}
      </div>
    );
  }
}

AlbunGallery.propTypes = PropTypes.shape({
  artistName: PropTypes.string,
  collectionId: PropTypes.string,
  artworkUrl100: PropTypes.string,
}).isRequired;

export default AlbunGallery;
