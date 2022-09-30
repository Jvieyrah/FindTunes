import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Load from '../pages/Load';
// import './Card.css';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      checked: false,
    };
  }

  componentDidMount() {
    const array = this.props;
    const { favSongs, trackId } = array;
    const arrayToCompare = [];
    favSongs.forEach((element) => {
      arrayToCompare.push(element.trackId);
    });
    if (arrayToCompare.includes(trackId)) {
      this.setState({
        checked: true,
      });
    }
  }

  favSong = async ({ target }) => {
    this.setState({
      loading: true,
    });
    const { checked } = this.state;
    const { update } = this.props;
    if (checked === true) {
      const favMusic = await getMusics(target.id);
      await removeSong(favMusic[0]);
      update();
      this.setState({
        loading: false,
        checked: false,
      });
    } else {
      const favMusic = await getMusics(target.id);
      await addSong(favMusic[0]);
      this.setState({
        loading: false,
        checked: true,
      });
    }
  };

  render() {
    const { song, url, trackId } = this.props;
    const { loading, checked } = this.state;
    return (
      <section className="Music-card">
        <p>
          { song }
        </p>
        <audio data-testid="audio-component" src={ url } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        {loading ? <Load /> : (
          <label htmlFor={ `checkbox-music-${trackId}` }>
            Favorita
            <input
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              id={ trackId }
              checked={ checked }
              onChange={ this.favSong }
            />
          </label>)}
      </section>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.string,
  url: PropTypes.string,
  trackId: PropTypes.string,
  update: PropTypes.func,
}.isRequired;

export default MusicCard;
