import React from 'react';
import { authenticationService } from '../../services/authentication.service';
import { useHistory } from 'react-router-dom';
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

import { LoginMutationVariables, useLoginMutation } from '../../__generated__/types';

/**
 *
 * Auth component
 * Component for user authorization through a form.
 *
 */

const Auth: React.FC = () => {
  const toast = useToast();
  const history = useHistory();
  const [authState, setAuthState] = React.useState<LoginMutationVariables>({
    login: '',
    password: '',
  });
  const [login, { loading }] = useLoginMutation({
    onCompleted: ({ login: { name } }) => {
      authenticationService.setUserLoggedIn()
      history.push('/');
      toast({
        title: `👋 Приветствуем вас, ${name}`,
        description: 'Вы были успешно авторизованы.',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: '❌ Ошибка авторизации!',
        description: `${error.graphQLErrors[0].message}`,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    },
  });
 
  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      login({ variables: {
        login: authState.login,
        password: authState.password,
      }})
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
