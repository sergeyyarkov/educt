import React from 'react';
import { DiGithubBadge } from 'react-icons/di'
import { Flex, Box } from '@chakra-ui/core'

const Nav: React.FC = () => {
  return (
    <Box display='block' position='fixed' left={0} right={0} top={0} width='100%' height='100%' maxWidth='18rem'>
      <Box top='4rem' position='relative' overflowY='auto' borderRightWidth={1}>
        <Box as='nav' height='calc(100vh - 4rem - 50px)' padding='1.5rem'>
          <Box>
            
          </Box>
        </Box>
        <Flex padding='1.5rem' paddingTop={0} paddingBottom='1rem'>
          <Box as={DiGithubBadge} size='32px' />
        </Flex>
      </Box>
    </Box>
  )
}

export default Nav