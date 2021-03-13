import React from 'react';
import LanguageSelectorWithTranslation from '../components/LanguageSelector';
import HomePage from '../pages/homePage';
import UserPage from '../pages/userPage';
import UserSignupPage from '../pages/userSignupPage';
import LoginPageWithProgress from '../pages/loginPage';
import {HashRouter as Router ,Route , Redirect , Switch} from 'react-router-dom';
import TopBar from '../components/TopBar';
import {useSelector} from 'react-redux';

// import {Authentication} from '../shared/AuthenticationContext';

const App = props =>{ 
  
  const {isLoggedIn} = useSelector((store) => ({
      isLoggedIn: store.isLoggedIn
  }));
  
  return (
      <div>
        <Router>
          <TopBar/>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            {!isLoggedIn &&<Route path="/login" component={LoginPageWithProgress}/>}
            {!isLoggedIn && <Route path="/signup" component={UserSignupPage}/>}
            <Route path="/user/:username" component={UserPage}/>
            <Redirect to="/" />
          </Switch>
        </Router>
          
        <LanguageSelectorWithTranslation/>
      </div>
  );
  }


export default App;
