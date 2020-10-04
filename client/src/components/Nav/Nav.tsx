import React from 'react'
import NavLinks from './NavLinks'
import metaData from '../../metaData'
import { Flex, Box } from '@chakra-ui/core'

const Nav: React.FC = () => {
  return (
    <Box display='block' position='fixed' left={0} right={0} top={0} width='100%' height='100%' maxWidth='18rem'>
      <Box top='4rem' position='relative' overflowY='auto' borderRightWidth={1}>
        <Box as='nav' height='calc(100vh - 4rem - 50px)' padding='1.5rem 1.2rem'>
          <NavLinks links={metaData.links} />
        </Box>
      </Box>
      <Flex padding='1.5rem' position='fixed' bottom={0} paddingTop={0} paddingBottom='1rem' alignItems='center'>
          <iframe src="https://ghbtns.com/github-btn.html?user=sergeyyarkov&repo=educt&type=star&count=true" frameBorder="0" scrolling="0" width="150" height="20" title="GitHub" />
      </Flex>
    </Box>
  )
}

export default Nav