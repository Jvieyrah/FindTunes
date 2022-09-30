import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import Load from './Load';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: 'teste',
      userEmail: 'teste',
      userImage: 'teste',
      userDescription: 'teste',
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
    const { name, email, image, description } = userData;

    this.setState({
      loading: false,
      userName: name,
      userEmail: email,
      userImage: image,
      userDescription: description,
    });
  }

  render() {
    const { loading, userName, userEmail, userImage, userDescription } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <content>
          <h2>Profile</h2>
          {loading ? (
            <Load />
          ) : (
            <div>
              <img src={ userImage } alt={ userName } />
              <p>
                Usuário:
                { userName }
              </p>
              <p>
                E-mail:
                { userEmail }
              </p>
              <p>
                Descrição:
                { userDescription }
              </p>
              <Link
                data-testid="link-to-profileEdit"
                to="/profile/edit"
              >
                Editar perfil
              </Link>
            </div>
          )}
        </content>
      </div>
    );
  }
}

export default Profile;
