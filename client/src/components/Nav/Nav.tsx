import React from 'react'
import NavLinks from './NavLinks'
import metaData from '../../metaData'
import { Box } from '@chakra-ui/core'

const Nav: React.FC = () => {
  return (
    <Box display='block' position='fixed' left={0} right={0} top={0} width='100%' height='100%' maxWidth='18rem'>
      <Box top='4rem' position='relative' overflowY='auto' borderRightWidth={1}>
        <Box as='nav' height='calc(100vh - 4rem)' padding='1.5rem 1.2rem'>
          <NavLinks links={metaData.links} />
        </Box>
      </Box>
    </Box>
  )
}

export default Nav