import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import { Flex, Box, FormControl, FormLabel, FormErrorMessage, Input, Heading, Button, Spinner } from '@chakra-ui/core'
import { MdAccountCircle, MdSave } from 'react-icons/md'
import { currentUserData } from '../../graphql/queries/__generated__/currentUserData';

const ProfileForm: React.FC<{ loading: boolean, data: currentUserData | undefined }> = ({ data, loading }) => {
  const [telegram, setTelegram] = useState<string>('')
  const [vk, setVk] = useState<string>('')
  const { register, handleSubmit, errors } = useForm<{ telegram: string, vk: string }>()

  React.useEffect(() => {
    if (data && data?.me) {
      setTelegram(data.me.login || '')
      setVk(data.me.email || '')
    }
  }, [data])

  if (data?.me === null) {
    return null
  }

  if (loading) {
    return (
      <Box ml='auto' mr='auto' mt='50px'>
        <Spinner
          thickness="3px"
          speed="0.85s"
          emptyColor="gray.200"
          color="blue.500"
          size="lg"
        />
      </Box>
    )
  }

  const onSubmit = handleSubmit(data => {
    console.log(data)
  });

  return (
    <Box onSubmit={onSubmit} as='form' padding='15px' flexBasis='85%' rounded='md' border='1px solid #E2E8F0'>
      <Flex alignItems='center'>
        <Box mr='5px' as={MdAccountCircle} size='24px' />
        <Heading as='h3' fontSize='xl'>Информация о профиле</Heading> 
      </Flex>
      <Flex width='100%' mt='15px' flexDirection='column'>
        <FormControl isReadOnly isRequired>
          <FormLabel>Логин</FormLabel>
          <Input isReadOnly value={`${data?.me.login}`} mb='10px' /> 
        </FormControl>
        <FormControl isReadOnly isRequired>
          <FormLabel>ФИО</FormLabel>
          <Input isReadOnly value={`${data?.me.surname} ${data?.me.name} ${data?.me.patronymic}`} mb='10px' /> 
        </FormControl>          
        <FormControl isReadOnly isRequired>
          <FormLabel>Почта</FormLabel>
          <Input isReadOnly value={`${data?.me.email}`} mb='10px' />
        </FormControl>
        <FormControl isInvalid={errors.telegram && true}>
          <FormLabel htmlFor='telegram'>Telegram</FormLabel>
          <Input 
            ref={register({ pattern: /.*\B@(?=\w{5,64}\b)[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*.*/gm, maxLength: 100})} 
            defaultValue={''}
            name='telegram' 
            id='telegram' 
            placeholder='@tagname' 
            mb='10px'
          />
          <FormErrorMessage>{errors.telegram && 'Введите данные в формате "@tagname"'}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.vk && true}>
          <FormLabel htmlFor='vk'>ВКонтакте</FormLabel>
          <Input 
            ref={register({ pattern: /^(https?:\/\/)?(www\.)?vk\.com\/(\w|\d)+?\/?$/, maxLength: 200 })} 
            defaultValue={''}
            name='vk' 
            id='vk' 
            placeholder='https://vk.com/id' 
            mb='10px' 
            />
          <FormErrorMessage>{errors.vk && 'Введите данные в формате "https://vk.com/id"'}</FormErrorMessage>
        </FormControl>
      </Flex>
      <Flex>
        <Button type='submit' loadingText='Сохранение...' ml='auto' leftIcon={MdSave} variantColor="blue" rounded='9999px'>
          Сохранить
        </Button>
      </Flex>
    </Box>
  )
}

export default ProfileForm