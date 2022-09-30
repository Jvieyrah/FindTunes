import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Load from '../pages/Load';
import logo from '../images/logo.svg';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.UserAPI();
  }

  UserAPI = async () => {
    this.setState({
      loading: true,
    });

    const userData = await getUser();
    const { name } = userData;

    this.setState({
      loading: false,
      userName: name,
    });
  }

  render() {
    const { userName, loading } = this.state;

    return (
      <div id="top_header">
        <header data-testid="header-component" id="header-component">
          <img src={ logo } alt="Trybetunes Logo" />
          <div id="header-user-name" data-testid="header-user-name">
            {loading ? (
              <Load />
            ) : (
              <p>
                Usuário:
                { userName }
              </p>)}
          </div>
        </header>
        <nav>
          <Link id="navLinks" data-testid="link-to-search" to="/search"> Search </Link>
          <Link
            id="navLinks"
            data-testid="link-to-favorites"
            to="/favorites"
          >
            Favorites
          </Link>
          <Link id="navLinks" data-testid="link-to-profile" to="/profile"> Profile </Link>
        </nav>
      </div>
    );
  }
}

export default Header;
