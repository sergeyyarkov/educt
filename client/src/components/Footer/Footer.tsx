import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import { ReactComponent as LogoIcon } from '../../images/logo.svg';
import config from '../../config';

/**
 *
 * Footer component
 *
 */

const Footer: React.FC = () => {
  return (
    <Box
      position="fixed"
      bottom="0"
      right="0"
      left="0"
      marginLeft="18rem"
      borderTop="1px solid #E2E8F0"
      backgroundColor="#fff"
    >
      <Flex
        as="footer"
        alignItems="center"
        justifyContent="space-between"
        padding="10px 0"
        paddingLeft={5}
        paddingRight={5}
        maxWidth="85rem"
        marginLeft="auto"
        marginRight="auto"
        textAlign="right"
      >
        <Box>
          <iframe
            src="https://ghbtns.com/github-btn.html?user=sergeyyarkov&repo=educt&type=star&count=true"
            frameBorder="0"
            scrolling="0"
            width="150"
            height="20"
            title="GitHub"
          />
        </Box>
        <Flex alignItems="center">
          <Text>
            • {config.app.name} - {config.app.description}
          </Text>
          <Box as={LogoIcon} marginLeft={2} boxSize="18px" />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
