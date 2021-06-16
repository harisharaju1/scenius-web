import {
  Stack,
  Heading,
  Link,
  Button,
  Box,
  Image,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

export const HeroSection: React.FC<{}> = ({}) => {
  const textColor = useColorModeValue("twitter.400", "twitter.400");
  return (
    <Flex
      align="center"
      justify={{ base: "center", md: "space-around", xl: "space-between" }}
      direction={{ base: "column-reverse", md: "row" }}
      minH="80vh"
      px={8}
      mb={16}
    >
      <Stack
        spacing={4}
        w={{ base: "80%", md: "40%" }}
        align={["center", "center", "flex-start", "flex-start"]}
      >
        <Heading
          as="h1"
          size="4xl"
          fontWeight="bold"
          color="primary.800"
          textAlign={["center", "center", "left", "left"]}
        >
          SCENIUS
        </Heading>
        <Heading
          as="h2"
          size="md"
          color="primary.800"
          opacity="0.8"
          fontWeight="normal"
          lineHeight={1.5}
          textAlign="justify"
        >
          Like genius, but embedded in a scene rather than in genes. Scenius
          stands for the intelligence and the intuition of a whole cultural
          scene.
        </Heading>
        <Flex>
          <Link to="https://www.youtube.com/watch?v=m8v3jf8RVBk&t=573s">
            <Button
              colorScheme="primary"
              borderRadius="8px"
              py="4"
              px="4"
              lineHeight="1"
              size="md"
              color={textColor}
              variant="outline"
            >
              What is a scenius?
            </Button>
          </Link>
          <Link to="/posts/">
            <Button
              colorScheme="primary"
              borderRadius="8px"
              py="4"
              px="4"
              lineHeight="1"
              size="md"
              color={textColor}
              variant="outline"
              ml={3}
            >
              I want to be part of a scenius!
            </Button>
          </Link>
        </Flex>
      </Stack>
      <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
        <Image
          src="https://miro.medium.com/max/3300/1*Q7eMUXiJUzF36oYEy5AP8w.png"
          size="100%"
          rounded="1rem"
          shadow="2xl"
        />
      </Box>
    </Flex>
  );
};
