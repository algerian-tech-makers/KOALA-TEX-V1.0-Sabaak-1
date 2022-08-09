import { Box, HStack } from "@chakra-ui/react";
import { LoginForm, LoginUi, SignupForm } from "../components/login.components";

const Login = () => {
  return (
    <HStack w="100%" h="90vh" mt="30px" justifyContent="space-between">
      <LoginUi />
      <SignupForm />
    </HStack>
  );
};

export default Login;
