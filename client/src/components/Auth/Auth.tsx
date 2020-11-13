import React from 'react';
import { authenticationService } from '../../services/authentication.service';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { MdAccountCircle, MdSchool, MdVpnKey } from 'react-icons/md';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputLeftElement,
  Button,
  useToast,
} from '@chakra-ui/core';
import { isLoggedInVar } from '../../cache';

import LOGIN_MUTATION from '../../graphql/mutations/login';
import {
  Login,
  LoginVariables,
} from '../../graphql/mutations/__generated__/Login';

/**
 * 
 * Auth Component
 * Component for user authorization through a form
 * 
 */

const Auth: React.FC = () => {
  const isLoggedIn = isLoggedInVar();
  const [authState, setAuthState] = React.useState<LoginVariables>({
    login: '',
    password: '',
  });
  const [login, { data, loading, error }] = useMutation<Login>(LOGIN_MUTATION, {
    onCompleted: () => authenticationService.setUserLoggedIn(),
    onError: (error) => {
      toast({
        title: '❌ Ошибка авторизации!',
        description: error.graphQLErrors[0].message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    },
  });
  const toast = useToast();
  const history = useHistory();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      await authenticationService.login(login, {
        login: authState.login,
        password: authState.password,
      });
      setAuthState({ login: '', password: '' });
    } catch (error) {
      toast({
        title: '❌ Произошла ошибка!',
        description: 'Повторите запрос позже.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      setAuthState({ login: '', password: '' });
    }
  };

  const handleInputChange = (e: any): void => {
    e.persist();

    setAuthState((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  React.useEffect(() => {
    if (data && data.login && isLoggedIn) {
      const { name } = data.login;

      history.push('/');
      toast({
        title: `👋 Приветствуем вас, ${name}`,
        description: 'Вы были успешно авторизованы.',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
    }
  }, [data, error, history, isLoggedIn, toast]);

  return (
    <Flex minHeight="100vh" align="center" justifyContent="center">
      <Box
        p={8}
        my={40}
        width="full"
        maxWidth="450px"
        borderWidth={1}
        borderRadius={8}
      >
        <Box textAlign="center">
          <Flex justifyContent="center">
            <Box as={MdSchool} color="blue.600" size="64px" />
          </Flex>
        </Box>
        <Box my="30px">
          <form onSubmit={handleLogin}>
            <FormControl isRequired={true}>
              <FormLabel>Логин</FormLabel>
              <InputGroup>
                <InputLeftElement children={<Box as={MdAccountCircle} />} />
                <Input
                  onChange={handleInputChange}
                  value={authState.login}
                  type="Логин"
                  name="login"
                  placeholder="example@gmail.com"
                />
              </InputGroup>
            </FormControl>
            <FormControl mt={5} isRequired={true}>
              <FormLabel>Пароль</FormLabel>
              <InputGroup>
                <InputLeftElement children={<Box as={MdVpnKey} />} />
                <Input
                  onChange={handleInputChange}
                  value={authState.password}
                  type="password"
                  name="password"
                  placeholder="********"
                />
              </InputGroup>
            </FormControl>
            <Button
              isLoading={loading ? true : false}
              loadingText="Выполняется вход..."
              type="submit"
              variantColor="blue"
              variant="outline"
              width="full"
              mt={4}
            >
              Вход
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default Auth;
