import PropTypes from 'prop-types';
import React from 'react';
// import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Load from './Load';

class Album extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      artistName: '',
      singleAlbumName: '',
      songs: [],
      favSongs: [],
    };
  }

  componentDidMount() {
    this.loadAlbun();
  }

  loadAlbun = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.setState({
      loading: true,
    });

    const albumId = await getMusics(id);
    const songList = albumId.filter((music, index) => index !== 0);
    const favSongsList = await getFavoriteSongs();
    console.log(favSongsList);
    this.setState({
      loading: false,
      artistName: albumId[0].artistName,
      singleAlbumName: albumId[0].collectionName,
      songs: [...songList],
      favSongs: [...favSongsList],
    });
  };

  render() {
    const { artistName, singleAlbumName, songs, loading, favSongs } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <content id="album">
          <h1 data-testid="artist-name">
            { artistName }
          </h1>
          <h2 data-testid="album-name">
            { singleAlbumName }
          </h2>
          {loading ? <Load /> : (
            songs.map((single) => (
              <MusicCard
                key={ single.trackId }
                song={ single.trackName }
                url={ single.previewUrl }
                trackId={ single.trackId }
                favSongs={ favSongs }
                update={ this.loadAlbun }
              />
            )))}
        </content>
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default Album;
