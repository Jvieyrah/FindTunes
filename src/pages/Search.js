import React from 'react';
import { Link } from 'react-router-dom';
import Load from './Load';
import Header from '../components/Header';
import AlbunCard from '../components/AlbunCard';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchArtist: '',
      LockButton: true,
      Loading: false,
      result: [],
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        const { searchArtist } = this.state;
        const floor = 2;
        if (searchArtist.length >= floor) {
          this.setState({
            LockButton: false,
          });
        } else {
          this.setState({
            LockButton: true,
          });
        }
      },
    );
  };

  buttonHandler = async () => {
    const { searchArtist } = this.state;
    console.log('handler');

    this.setState({
      Loading: true,
      returnedArtist: searchArtist,
    });
    console.log(searchArtist);
    const artista = await searchAlbumsAPI(searchArtist);

    this.setState({
      Loading: false,
      searchArtist: '',
      result: [...artista],
    });
  };

  render() {
    const { searchArtist,
      LockButton,
      Loading,
      result,
      returnedArtist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {Loading ? (
          <Load />
        ) : (
          <label id="page-search" htmlFor="search-artist">
            Pesquise seu Artista /Banda
            <input
              type="text"
              name="searchArtist"
              data-testid="search-artist-input"
              value={ searchArtist }
              onInput={ this.onInputChange }
            />
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ LockButton }
              onClick={ this.buttonHandler }
            >
              Pesquisar
            </button>
          </label>
        )}
        <div id="Resultados">
          { Loading && <Load />}
          { result.length > 0 && (
            <h2>
              Resultado de álbuns de:&nbsp;
              { returnedArtist }
            </h2>)}
          {result.length > 0 ? (
            result.map((album) => (
              <Link
                to={ `/album/${album.collectionId}` }
                key={ album.collectionId }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                <AlbunCard { ...album } />
              </Link>
            ))
          ) : (
            <h1> Nenhum álbum foi encontrado </h1>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
