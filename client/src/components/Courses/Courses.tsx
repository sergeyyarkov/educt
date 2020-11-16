import React from 'react';
import { Grid, Flex, Box, Button } from '@chakra-ui/react'

const Courses: React.FC = ({ children }) => {
  return (
    <Box>
      <Grid templateColumns="repeat(2, 1fr)" gap="5px">
        {children}
      </Grid>
      <Flex justifyContent="center">
        <Button colorScheme="blue" variant="outline">
          Смотерть все курсы
        </Button>
      </Flex>
    </Box>
  )
}

export default Courses