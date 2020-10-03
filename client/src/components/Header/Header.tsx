import React from 'react';
import { Link } from 'react-router-dom'
import { MdSchool, MdNotifications, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { Flex, Box, Heading, Text, Avatar, Button, Popover, PopoverTrigger, PopoverHeader, PopoverContent, PopoverBody, PopoverArrow, PopoverCloseButton } from '@chakra-ui/core'

const Header: React.FC = () => {
  const [accountPopover, setAccountPopover] = React.useState(false)



  return (
    <Box as='header' position='fixed' top={0} left={0} right={0} borderBottomWidth={1} width='100%' height='4rem' zIndex={4}>
      <Flex justifyContent='space-between' width='100%' height='100%' alignItems='center' paddingLeft='1.5rem' paddingRight='1.5rem'>
        <Flex alignItems='center'>
          <Box as={MdSchool} size={10} color='blue.700' marginRight={4} />
          <Heading fontSize={32} color='gray.700'>
            educt
          </Heading>
        </Flex>
        <Flex alignItems='center'>
          <Button 
            marginRight={3} 
            variant='solid' 
            outline='none' 
            border='none' 
            _after={{ content: '"2"', display: 'block', position: 'absolute', top: '8px', right: '10px', background: '#E53E3E', color: '#fff', fontSize: '11px', width: '15px', height: '15px', borderRadius: '100%' }}
          >
            <Box as={MdNotifications} size='21px' />
          </Button>
          <Popover isOpen={accountPopover} onOpen={() => setAccountPopover(true)} onClose={() => setAccountPopover(false)}>
            <PopoverTrigger>
              <Button rightIcon={accountPopover ? MdKeyboardArrowUp : MdKeyboardArrowDown}><Avatar size="sm" name="user" src="https://bit.ly/broken-link" marginRight={3} />User</Button>
            </PopoverTrigger>
            <PopoverContent border={0} zIndex={4} color="white" bg="blue.800" borderColor="blue.800">
              <PopoverHeader pt={4} fontWeight="bold" border="0">
                Что вы хотите сделать?
              </PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody border={0}>
                <Text><Link to='/'>Редактировать аккаунт</Link></Text>
                <Text color='red.500'><Link to='/'>Выход</Link></Text>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Header