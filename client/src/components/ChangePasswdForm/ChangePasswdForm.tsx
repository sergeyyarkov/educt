import React, { useState } from 'react';
import { MdLock, MdReplay } from 'react-icons/md'
import { Flex, Box, Heading, FormControl, FormLabel, FormErrorMessage, Button, Input, InputGroup, InputRightElement } from '@chakra-ui/core';
import { useForm } from 'react-hook-form';

const ChangePasswdForm: React.FC = () => {
  const [showPasswd, setShowPasswd] = useState<boolean[]>([false, false, false]);
  const onShowPasswd = (index: number) => setShowPasswd(prevState => ([...prevState.map((state, i) => i === index ? !showPasswd[index] : state)]));

  const { register, handleSubmit, errors, watch } = useForm<{ oldPasswd: string; confirmPasswd: string; newPasswd: string; }>()
  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
  })

  return (
    <Box
      onSubmit={onSubmit}
      as="form"
      padding="15px"
      flexBasis="85%"
      rounded="md"
      border="1px solid #E2E8F0"
    >
      <Flex alignItems="center">
        <Box mr="5px" as={MdLock} size="24px" />
        <Heading as="h3" fontSize="xl">
          Изменить пароль
        </Heading>
      </Flex>
      <Flex width="100%" mt="15px" flexDirection="column">
        <FormControl isRequired isInvalid={errors.oldPasswd && true}>
          <FormLabel htmlFor='oldPasswd'>Старый пароль</FormLabel>
          <InputGroup mb="10px" >
            <Input
              ref={register({
                required: true
              })}
              name='oldPasswd'
              id='oldPasswd'
              pr="5.5rem"
              type={showPasswd[0] ? "text" : "password"}
              placeholder="Введите текущий пароль"
            />
            <InputRightElement width="5rem" mr='5.5px'>
              <Button h="1.75rem" size="sm" onClick={() => onShowPasswd(0)}>
                {showPasswd[0] ? "Скрыть" : "Показать"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            {errors.oldPasswd?.type === 'required' && 'Это поля является обязательным!'}
          </FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={errors.newPasswd && true}>
          <FormLabel htmlFor='newPasswd'>Новый пароль</FormLabel>
          <InputGroup mb="10px" >
            <Input
              ref={register({
                minLength: 6,
                required: true
              })}
              name='newPasswd'
              id='newPasswd'
              pr="5.5rem"
              type={showPasswd[1] ? "text" : "password"}
              placeholder="Введите текущий пароль"
            />
            <InputRightElement width="5rem" mr='5.5px'>
              <Button h="1.75rem" size="sm" onClick={() => onShowPasswd(1)}>
                {showPasswd[1] ? "Скрыть" : "Показать"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            {errors.newPasswd?.type === 'required' && 'Это поля является обязательным!'}
            {errors.newPasswd?.type === 'minLength' && 'Пароль должен содержать не менее 6 символов!'}
          </FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={errors.confirmPasswd && true}>
          <FormLabel htmlFor='confirmPasswd'>Подтвердите пароль</FormLabel>
          <InputGroup mb="10px" >
            <Input
              ref={register({
                minLength: 6,
                required: true,
                validate: (value) => value === watch('newPasswd')
              })}
              name='confirmPasswd'
              id='confirmPasswd'
              pr="5.5rem"
              type={showPasswd[2] ? "text" : "password"}
              placeholder="Введите текущий пароль"
            />
            <InputRightElement width="5rem" mr='5.5px'>
              <Button h="1.75rem" size="sm" onClick={() => onShowPasswd(2)}>
                {showPasswd[2] ? "Скрыть" : "Показать"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            {errors.confirmPasswd?.type === 'required' && 'Это поля является обязательным!'}
            {errors.confirmPasswd && 'Пароли не совпадают!'}
          </FormErrorMessage>
        </FormControl>
      </Flex>
      <Flex>
        <Button
          type="submit"
          // isLoading={mutateProfileResult.loading}
          loadingText="Сохранение..."
          ml="auto"
          leftIcon={MdReplay}
          variantColor="red"
          rounded="9999px"
        >
          Изменить
        </Button>
      </Flex>
    </Box>
  )
}

export default ChangePasswdForm