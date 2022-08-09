import { Box, Divider, HStack, Input, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react/cjs/react.production.min";
import logo from "../../public/logo1.svg";

export const Navbar = ({ children }) => {
  const router = useRouter();
  let isUser;
  useEffect(() => {
    typeof window !== "undefined"
      ? window.localStorage.getItem("token")
      : false;
  });

  return (
    <Box pos="relative" h="100px" w="90vw" left="5vw">
      <HStack
        pos="fixed"
        justifyContent="space-between"
        pt="5px"
        w="inherit"
        zIndex={20000000000000}
      >
        <Image src={logo} height="40px" width="120px" />
        <HStack
          alignItems="flex-end"
          spacing="30px"
          fontSize="18px"
          color="#626262"
        >
          <Input placeholder="search" border="none" />
          <Text cursor="pointer">blog</Text>
          <Text cursor="pointer">about us</Text>
          <Text cursor="pointer">lang</Text>
          {isUser ? (
            <Text cursor="pointer">profile</Text>
          ) : (
            <Text
              cursor="pointer"
              onClick={() => router.push("http://localhost:3000/login")}
            >
              login & signup
            </Text>
          )}
        </HStack>
      </HStack>
      <Divider h="50px" color="transparent" />
      {children}
    </Box>
  );
};
