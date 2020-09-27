import React from 'react';
import { useHistory } from "react-router-dom";
import { useMutation } from '@apollo/client'
import { Flex, Box, Heading, FormControl, FormLabel, Input, Button, Text } from '@chakra-ui/core'

import LOGIN_QUERY from '../../graphql/queries/login'


const Auth: React.FC = () => {
  const [authState, setAuthState] = React.useState({ login: '', password: '' })
  const [error, setError] = React.useState({ isError: false, message: '' })

  const [login, result] = useMutation(LOGIN_QUERY, {
    onError: (error) => setError({ isError: true, message: error.graphQLErrors[0].message })
  })

  let history = useHistory()

  const handleLogin = async (e: any) => {
    e.preventDefault()

    try {
      await login({
        variables: { 
          login: authState.login, 
          password: authState.password 
        },
      })
      setAuthState({ login: '', password: '' })
    } catch (error) {
      console.log(error)
      setAuthState({ login: '', password: '' })
    }
  }

  const handleInputChange = (e: any) => {
    e.persist()

    setAuthState(prevState => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }

  React.useEffect(() => {
    if (result.data) {
      const token = result.data.login.token
      
      document.cookie = `token=${token}`
      history.push('/')
    }
  }, [result.data, history])

  return (
    <Flex minHeight='100vh' align='center' justifyContent='center'>
      <Box p={8} my={40} width='full' maxWidth="450px" borderWidth={1} borderRadius={8}>
        <Box textAlign='center'>
          <Heading>Вход в Educt</Heading>
        </Box>
        <Box my={50}>
          <form onSubmit={handleLogin}>
            {error.message ? <Text textAlign='left' color='tomato' marginBottom={2} >{error.message}</Text> : null}
            <FormControl isRequired={true}>
              <FormLabel>Логин</FormLabel>
              <Input onChange={handleInputChange} value={authState.login} type="Логин" name='login' placeholder="testemail@gmail.com" />
            </FormControl>
            <FormControl mt={5} isRequired={true}>
              <FormLabel>Пароль</FormLabel>
              <Input onChange={handleInputChange} value={authState.password} type="password" name='password' placeholder='********' />
            </FormControl>
            <Button isLoading={result.loading ? true : false} loadingText="Выполняется вход..." type='submit' variantColor="teal" variant="outline" width="full" mt={4}>
              Вход
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  )
}

export default Auth