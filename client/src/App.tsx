import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import MainPage from './pages/main';
import CoursesPage from './pages/courses';
import HomeworksPage from './pages/homeworks';
import MessagesPage from './pages/messages';
import ProfilePage from './pages/profile';
import AuthPage from './pages/auth';
import NotFoundPage from './pages/404';
import { ChakraProvider } from '@chakra-ui/react';

const App: React.FC = () => {
  return (
    <ChakraProvider>
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
    </ChakraProvider>
  );
};

export default App;
