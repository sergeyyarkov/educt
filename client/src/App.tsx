import React from 'react';
import client from './apolloClient'
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserContext } from './context/user.context'
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import MainPage from './pages/main';
import CoursesPage from './pages/courses';
import HomeworksPage from './pages/homeworks';
import MessagesPage from './pages/messages';
import ProfilePage from './pages/profile';
import AuthPage from './pages/auth';
import NotFoundPage from './pages/404';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
// import authenticationService from './services/authentication.service';

const App: React.FC = () => {
  const [userContext, setUserContext] = React.useState({ user: {} })

  // React.useEffect(() => {
  //   if (authenticationService.isAuthenticated()) {
  //     setUserContext({ user: authenticationService.getCurrentUserValue() })
  //   }
  // }, [setUserContext])

  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <CSSReset />
        <UserContext.Provider value={[userContext, setUserContext]}>
          <Router>
            <Switch>
              <PrivateRoute exact path="/" component={MainPage} title="Главная" />
              <PrivateRoute
                path="/courses"
                component={CoursesPage}
                title="Список курсов"
              />
              <PrivateRoute
                path="/homeworks"
                component={HomeworksPage}
                title="Домашние задания"
              />
              <PrivateRoute
                path="/messages"
                component={MessagesPage}
                title="Мои сообщения"
              />
              <PrivateRoute
                path="/profile"
                component={ProfilePage}
                title="Мой профиль"
              />
              <Route path="/auth" component={AuthPage} title="Авторизация" />
              <Route component={NotFoundPage} title="Ошибка 404" />
            </Switch>
          </Router>
        </UserContext.Provider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
