import Router, { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";

export default function Main() {
  const router = useRouter();

  console.log("router.query");
  const token = router.query.token;
  console.log("token");
  console.log(token);

  if (token) {
    Router.push({ pathname: "/main" });
  }

  return <Box>main page</Box>;
}
