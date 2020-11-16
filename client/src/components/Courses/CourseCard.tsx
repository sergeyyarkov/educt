import React from 'react';
import { Flex, Box, Image, Text, Link, Badge } from '@chakra-ui/react'
import { MdSupervisorAccount, MdComment } from 'react-icons/md'
import { FcLike } from 'react-icons/fc'

const CourseCard: React.FC = () => {
  return (
    <Box mb="40px" mr="15px" maxW="100%">
      <Box h="210px">
        <Image
          h="100%"
          w="100%"
          objectFit="cover"
          borderTopRightRadius="lg"
          borderTopLeftRadius="lg"
          src="https://ares.decipherzone.com/blog-manager/uploads/banner_webp_da06d145-93f9-4df9-8c7e-1e2c332c3a4a.webp"
        />
      </Box>
      <Box
        pt="15px"
        pl="10px"
        pr="10px"
        pb="10px"
        borderBottomRightRadius="lg"
        borderBottomLeftRadius="lg"
        borderWidth="1px"
      >
        <Flex align="baseline">
          <Badge color="blue.600">Разработка</Badge>
        </Flex>
        <Text
          mt="10px"
          fontSize="xl"
          fontWeight="semibold"
          lineHeight="short"
        >
          <Link>
            Fullstack курс веб-разработки на ReactJS/NodeJS
          </Link>
        </Text>
        <Flex mt="30px" align="center">
          <Flex alignItems="center">
            <Box as={MdSupervisorAccount} />
            <Text fontSize="sm" ml="5px">
              1278 учеников
            </Text>
          </Flex>
          <Flex alignItems="center" ml="10px">
            <Box as={MdComment} />
            <Text fontSize="sm" ml="5px">
              48 комментариев
            </Text>
          </Flex>
          <Flex alignItems="center" ml="10px">
            <Box as={FcLike} />
            <Text fontSize="sm" ml="5px">
              245 понравилось
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}

export default CourseCard