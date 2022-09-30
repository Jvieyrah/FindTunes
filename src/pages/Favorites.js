import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Load from './Load';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      favSongs: [],
    };
  }

  componentDidMount() {
    this.loadFav();
  }

  loadFav = async () => {
    this.setState({
      loading: true,
    });
    const favSongsList = await getFavoriteSongs();
    console.log(favSongsList);
    this.setState({
      loading: false,
      favSongs: [...favSongsList],
    });
  };

  render() {
    const { loading, favSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <content>
          <h2>Favorites </h2>
          {loading ? (
            <Load />
          ) : (
            favSongs.map((single) => (
              <MusicCard
                key={ single.trackId }
                song={ single.trackName }
                url={ single.previewUrl }
                trackId={ single.trackId }
                favSongs={ favSongs }
                update={ this.loadFav }
              />
            ))
          )}
        </content>
      </div>
    );
  }
}

export default Favorites;
