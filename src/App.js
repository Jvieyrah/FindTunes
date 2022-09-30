import React from 'react';
// import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import { createUser } from './services/userAPI';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      UserName: '',
      LockButton: true,
      Loading: false,
      Logged: false,
    };
  }

  buttonHandler = async () => {
    const { UserName } = this.state;

    this.setState({
      Loading: true,
    });

    await createUser({ name: UserName,
      email: '',
      image: '',
      description: '',
    });

    this.setState({
      Loading: false,
      Logged: true,
    });
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const {
        UserName,
      } = this.state;
      const floor = 3;
      if (UserName.length >= floor) {
        this.setState({
          LockButton: false,
        });
      } else {
        this.setState({
          LockButton: true,
        });
      }
    });
  };

  render() {
    const { UserName, LockButton, Loading, Logged } = this.state;
    return (
      <main>
        {/* <BrowserRouter> */}
        <Switch>
          <Route exact path="/">
            {
              Logged ? (
                <Redirect to="/search" />
              ) : (
                <Login
                  UserName={ UserName }
                  LockButton={ LockButton }
                  Loading={ Loading }
                  Logged={ Logged }
                  onInputChange={ this.onInputChange }
                  buttonHandler={ this.buttonHandler }
                />)
            }
          </Route>
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" render={ (props) => <Album { ...props } /> } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
        {/* </BrowserRouter> */}
      </main>
    );
  }
}

export default App;
