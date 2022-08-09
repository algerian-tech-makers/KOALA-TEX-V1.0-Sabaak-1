import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Highlight,
  HStack,
  Image,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import nextImage from "next/image";
import logo from "../public/logo2.svg";
import googleIcon from "../public/googleicon.png";
import { useState } from "react";
import { useRouter } from "next/router";

export const LoginUi = () => {
  return (
    <VStack
      h="full"
      w="50%"
      bg="green"
      rounded="30px"
      p="70px"
      py="70px"
      alignItems="flex-start"
      justifyContent="space-between"
    >
      <VStack alignItems="flex-start" spacing="40px">
        <Image as={nextImage} src={logo} h="100px" w="100px" />
        <Text color="white" fontSize="50px" fontWeight="bold" lineHeight="50px">
          Let us help you in find the best resources
        </Text>
        <Text color="white" fontSize="18px">
          descover our solution for poor resources from our universites and
          collect your favorit source or link or whatever you find is fit for
          you
        </Text>
      </VStack>
      <VStack
        h="200px"
        w="full"
        bg="#306655"
        rounded="15px"
        p="30px"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <HStack alignItems="flex-end">
          <Box h="50px" w="50px" bg="gray" rounded="10px" />
          <Box fontSize="20px" lineHeight="22px" color="white">
            tahar
            <Text /> belghitri
          </Box>
        </HStack>
        <Text fontSize="18px" color="#D8D8D8" lineHeight="20px">
          descover our solution for poor resources from our universites and
          collect your favorit source or link or whatever you find is fit for
          you
        </Text>
      </VStack>
    </VStack>
  );
};

export const LoginForm = () => {
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });
  const [err, useErr] = useState({ email: false, password: false });
  const router = useRouter();

  const loginFun = async () => {
    await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginState),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.err) {
          console.log(res);

          const errType = res.err.split(".")[0];
          const errValue = res.err.split(".")[1];
          const errObject = JSON.parse(`{"${errType}" : "${errValue}"}`);

          if (errType === "email" || errType === "password") {
            useErr({ ...err, ...errObject });
          } else {
          }
        } else if (res.token) {
          localStorage.setItem("token", res.token);
          router.push("/main");
        }
      })

      .catch((err) => {});
  };

  return (
    <VStack alignItems="center" justifyContent="center" h="full" w="50%">
      <VStack alignItems="flex-start" spacing="30px" fontSize="18px">
        <Text fontSize="30px" color="red" fontWeight="bold">
          login
        </Text>
        <Text
          fontSize="18px"
          onClick={() => router.push("http://localhost:3000/signup")}
        >
          <Highlight
            query="create one"
            styles={{ color: "blue", cursor: "pointer" }}
          >
            you don't have an acount ? create one
          </Highlight>
        </Text>

        <FormControl isInvalid={err.email}>
          <FormLabel>email</FormLabel>
          <Input
            onChange={({ target: { value } }) =>
              setLoginState({ ...loginState, email: value })
            }
            value={loginState.email}
            colorScheme="blue"
          />

          <FormErrorMessage color="red">{err.email}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={err.password}>
          <FormLabel>password</FormLabel>
          <Input
            onChange={({ target: { value } }) =>
              setLoginState({ ...loginState, password: value })
            }
            value={loginState.password}
            colorScheme="blue"
            type="password"
          />

          <FormErrorMessage color="red">{err.password}</FormErrorMessage>
        </FormControl>

        <Button
          w="full"
          bg="blue"
          color="white"
          p="10px"
          onClick={() => loginFun()}
        >
          login now
        </Button>
        <VStack w="full">
          <Text fontSize="18px"> or </Text>
        </VStack>
        <Button w="full" border="2px solid blue" p="20px">
          <Image as={nextImage} src={googleIcon} />
          <Text
            pl="20px"
            onClick={() => router.push("http://localhost:8080/auth/google")}
          >
            login with goolge
          </Text>
        </Button>
      </VStack>
    </VStack>
  );
};

export const SignupForm = () => {
  const [signupState, setSignupSTate] = useState({
    email: "",
    name: "",
    confirmPassowrd: "",
    password: "",
  });
  const [err, useErr] = useState({
    email: false,
    name: false,
    confirmPassowrd: false,
    password: false,
  });

  const router = useRouter();

  const signuFun = async () => {
    await fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupState),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.err) {
          console.log(res);

          const errType = res.err.split(".")[0];
          const errValue = res.err.split(".")[1];
          const errObject = JSON.parse(`{"${errType}" : "${errValue}"}`);

          if (
            errType === "email" ||
            errType === "password" ||
            errType === "name" ||
            errType === "confirmPassowrd"
          ) {
            useErr({ ...err, ...errObject });
          } else {
          }
        } else if (res.token) {
          localStorage.setItem("token", res.token);
          router.push("/main");
        }
      })

      .catch((err) => {});
  };

  return (
    <VStack alignItems="center" justifyContent="center" h="full" w="50%">
      <VStack alignItems="flex-start" spacing="30px" fontSize="18px">
        <Text fontSize="30px" color="red" fontWeight="bold">
          signup
        </Text>
        <Text
          fontSize="18px"
          onClick={() => router.push("http://localhost:3000/login")}
        >
          <Highlight
            query="login now"
            styles={{ color: "blue", cursor: "pointer" }}
          >
            you already have an acount ? login now
          </Highlight>
        </Text>

        <FormControl isInvalid={err.name}>
          <FormLabel>name</FormLabel>
          <Input
            value={signupState.name}
            onChange={({ target: { value } }) =>
              setSignupSTate({ ...signupState, name: value })
            }
            colorScheme="blue"
          />
          <FormErrorMessage color="red">unvalid name</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={err.email}>
          <FormLabel>email</FormLabel>
          <Input
            value={signupState.email}
            onChange={({ target: { value } }) =>
              setSignupSTate({ ...signupState, email: value })
            }
            colorScheme="blue"
          />
          <FormErrorMessage color="red">{err.email}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={err.password}>
          <FormLabel>password</FormLabel>
          <Input
            value={signupState.password}
            onChange={({ target: { value } }) =>
              setSignupSTate({ ...signupState, password: value })
            }
            colorScheme="blue"
            type="password"
          />
          <FormErrorMessage color="red">{err.password}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={err.confirmPassowrd}>
          <FormLabel>confirm password</FormLabel>
          <Input
            value={signupState.confirmPassowrd}
            onChange={({ target: { value } }) =>
              setSignupSTate({ ...signupState, confirmPassowrd: value })
            }
            colorScheme="blue"
            type="password"
          />
          <FormErrorMessage color="red">{err.confirmPassowrd}</FormErrorMessage>
        </FormControl>

        <Button
          w="full"
          bg="blue"
          color="white"
          p="10px"
          onClick={() => signuFun()}
        >
          sginup now
        </Button>
        <VStack w="full">
          <Text fontSize="18px"> or </Text>
        </VStack>
        <Button
          w="full"
          border="2px solid blue"
          p="20px"
          onClick={() => router.push("http://localhost:8080/auth/google")}
        >
          <Image as={nextImage} src={googleIcon} />
          <Text pl="20px">signun with goolge</Text>
        </Button>
      </VStack>
    </VStack>
  );
};
