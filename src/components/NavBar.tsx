// import { useApolloClient } from "@apollo/client";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  // const apolloClient = useApolloClient();
  const [{ data, fetching }] = useMeQuery();
  const bg = useColorModeValue("whitesmoke", "#16202a");
  const textColor = useColorModeValue("twitter.400", "twitter.400");
  let body = null;
  if (fetching) {
    //data is loading
  } else if (!data?.me) {
    body = (
      <Flex color={textColor} align="center">
        <NextLink href="/login">
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link mr={2}>Register</Link>
        </NextLink>
      </Flex>
    );
  } else {
    body = (
      <Flex color={textColor} align="center">
        <NextLink href="/create-post">
          <Button as={Link} mr={4}>
            Create Post
          </Button>
        </NextLink>
        <Box mr={2}>{data.me.username}</Box>
        <Button
          onClick={async () => {
            await logout();
            router.reload();
          }}
          isLoading={logoutFetching}
          variant="link"
        >
          Logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex position="sticky" zIndex={1} top={0} bg={bg} p={3}>
      <Flex align="center" flex={1} m="auto" maxW={1200}>
        <NextLink href="/">
          <Link>
            <Heading color={textColor}>SCENIUS</Heading>
          </Link>
        </NextLink>
        <Box ml={"auto"}>{body}</Box>
        <IconButton
          onClick={toggleColorMode}
          variant="unstyled"
          icon={colorMode !== "light" ? <SunIcon /> : <MoonIcon />}
          right={0}
          align="center"
          aria-label=""
          ml={2}
        ></IconButton>
      </Flex>
    </Flex>
  );
};
