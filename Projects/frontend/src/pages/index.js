import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { HomeComponents } from "../components/home.components";

export default function Home() {
  const router = useRouter();

  console.log(router.query.token);

  return <HomeComponents />;
}
