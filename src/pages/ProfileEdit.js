import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import { getUser, updateUser } from '../services/userAPI';
import Header from '../components/Header';
import Load from './Load';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: 'teste',
      userEmail: 'teste',
      userImage: 'teste',
      userDescription: 'teste',
      loading: true,
      LockButton: true,
      updated: false,
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

  buttonHandler = async () => {
    const { userName,
      userEmail,
      userImage,
      userDescription } = this.state;

    this.setState({
      loading: true,
    });

    await updateUser({ name: userName,
      email: userEmail,
      image: userImage,
      description: userDescription,
    });

    this.setState({
      loading: false,
      updated: true,
    });
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const {
        userName, userEmail, userImage, userDescription,
      } = this.state;
      const floor = 1;
      if (userName.length >= floor
        && userEmail.includes('@')
        && userDescription.length >= floor
        && userImage.length >= floor
      ) {
        this.setState({
          LockButton: false,
        });
      } else {
        this.setState({
          LockButton: true,
        });
      }
    });
  }

  render() {
    const { LockButton,
      loading,
      updated,
      userName,
      userEmail,
      userImage,
      userDescription } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <content>
          <h2>Edite o Profile</h2>
          {loading ? (
            <Load />
          ) : (
            <div>
              <label id="nameform" htmlFor="edit-input-name">
                insira seu nome
                <input
                  type="text"
                  name="userName"
                  data-testid="edit-input-name"
                  value={ userName }
                  onChange={ this.onInputChange }
                />
              </label>
              <label id="emailform" htmlFor="edit-input-email">
                insira seu email
                <input
                  type="text"
                  name="userEmail"
                  data-testid="edit-input-email"
                  value={ userEmail }
                  onChange={ this.onInputChange }
                />
              </label>
              <label id="emailform" htmlFor="edit-input-email">
                insira uma descrição sobre você
                <textarea
                  type="text"
                  name="userDescription"
                  data-testid="edit-input-description"
                  value={ userDescription }
                  onChange={ this.onInputChange }
                />
              </label>
              <label id="emailform" htmlFor="edit-input-email">
                insira o endereço para sua foto
                <input
                  type="text"
                  name="userImage"
                  data-testid="edit-input-image"
                  value={ userImage }
                  onChange={ this.onInputChange }
                />
              </label>
              <button
                type="submit"
                data-testid="edit-submit-button"
                disabled={ LockButton }
                onClick={ this.buttonHandler }
              >
                salvar
              </button>
            </div>
          )}
          {updated
          && (
            <Route exact path="/profile/edit">
              <Redirect to="/profile" />
            </Route>)}
        </content>
      </div>

    );
  }
}

export default ProfileEdit;
