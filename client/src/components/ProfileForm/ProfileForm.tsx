import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Heading,
  Button,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { MdAccountCircle, MdSave } from 'react-icons/md';
import { ContactsList, useCurrentUserDataQuery, useUpdateProfileMutation } from '../../__generated__/types';

/**
 *
 * ProfileForm component
 * Сomponent for update user profile through a form.
 *
 */

type FormTypes = {
  telegram: string;
  vk: string;
  [key: string]: string;
}

const ProfileForm: React.FC = () => {
  const toast = useToast();
  const { register, handleSubmit, errors } = useForm<FormTypes>();
  const { data, loading } = useCurrentUserDataQuery()
  const [updateProfile, updateProfileResult] = useUpdateProfileMutation({
    onCompleted: () => {
      toast({
        title: `Информация обновлена!`,
        description: 'Вы успешно изменили информацию о профиле.',
        status: 'success',
        duration: 2500,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: '❌ Произошла ошибка!',
        description: `${error.graphQLErrors[0].message}`,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    },
    update: (cache, user) => {
      cache.modify({
        id: `User:${data?.me.id}`,
        fields: {
          contacts() {
            return user.data?.user?.contacts;
          },
        },
      });
    },
  });

  /* Input options for register function */
  const inputRegisterOptions = {
    vk: {
      pattern: /^(https?:\/\/)?(www\.)?vk\.com\/(\w|\d)+?\/?$/,
      maxLength: 200,
    },
    telegram: {
      pattern: /.*\B@(?=\w{5,64}\b)[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*.*/gm,
      maxLength: 100,
    }
  }

  if (data?.me === null) {
    return null;
  }

  if (loading) {
    return (
      <Box ml="auto" mr="auto" mt="50px">
        <Spinner
          thickness="3px"
          speed="0.85s"
          emptyColor="gray.200"
          color="blue.500"
          size="lg"
        />
      </Box>
    );
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      const contacts = Object.keys(data)
        .filter((contact) => data[contact] !== '')
        .map((contact) => {
          const obj: { name: ContactsList; link: string } = {
            name: ContactsList.Telegram,
            link: '',
          };

          switch (contact.toUpperCase()) {
            case ContactsList.Telegram:
              obj.name = ContactsList.Telegram;
              obj.link = data[contact];
              break;
            case ContactsList.Vk:
              obj.name = ContactsList.Vk;
              obj.link = data[contact];
              break;
            default:
              break;
          }

          return obj;
        });

      await updateProfile({ variables: { input: { contacts } } });
    } catch (error) {
      console.log(error);
    }
  });

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
        <Box mr="5px" as={MdAccountCircle} boxSize="24px" />
        <Heading as="h3" fontSize="xl">
          Информация о профиле
        </Heading>
      </Flex>
      <Flex width="100%" mt="15px" flexDirection="column">
        <FormControl isReadOnly isRequired>
          <FormLabel>Логин</FormLabel>
          <Input isReadOnly value={`${data?.me.login}`} mb="10px" />
        </FormControl>
        <FormControl isReadOnly isRequired>
          <FormLabel>ФИО</FormLabel>
          <Input isReadOnly value={`${data?.me.fullname}`} mb="10px" />
        </FormControl>
        <FormControl isReadOnly isRequired>
          <FormLabel>Почта</FormLabel>
          <Input isReadOnly value={`${data?.me.email}`} mb="10px" />
        </FormControl>
        <FormControl isInvalid={errors.telegram && true}>
          <FormLabel htmlFor="telegram">Telegram</FormLabel>
          <Input
            ref={register(inputRegisterOptions.telegram)}
            defaultValue={`${
              data?.me.contacts?.find((contact) => contact?.name === 'telegram')
                ?.link || ''
            }`}
            name="telegram"
            id="telegram"
            placeholder="@tagname"
            mb="10px"
          />
          <FormErrorMessage>
            {errors.telegram && 'Введите данные в формате "@tagname"'}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.vk && true}>
          <FormLabel htmlFor="vk">ВКонтакте</FormLabel>
          <Input
            ref={register(inputRegisterOptions.vk)}
            defaultValue={`${
              data?.me.contacts?.find((contact) => contact?.name === 'vk')
                ?.link || ''
            }`}
            name="vk"
            id="vk"
            placeholder="https://vk.com/id"
            mb="10px"
          />
          <FormErrorMessage>
            {errors.vk && 'Введите данные в формате "https://vk.com/id"'}
          </FormErrorMessage>
        </FormControl>
      </Flex>
      <Flex mt="15px">
        <Button
          type="submit"
          isLoading={updateProfileResult.loading}
          loadingText="Сохранение..."
          ml="auto"
          leftIcon={<MdSave />}
          colorScheme="blue"
          rounded="9999px"
        >
          Сохранить
        </Button>
      </Flex>
    </Box>
  );
};

export default ProfileForm;
