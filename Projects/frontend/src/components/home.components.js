import { Button, Divider, HStack, Image, Text, VStack } from "@chakra-ui/react";
import nextImage from "next/image";
import { useRouter } from "next/router";
import homePic from "../public/homeStyle.svg";

export const HomeComponents = () => {
  const router = useRouter();

  return (
    <HStack alignItems="flex-start" justifyContent="space-between">
      <VStack alignItems="start" spacing="30px">
        <Divider h="50px" color="transparent" />
        <Text
          w="720px"
          color="red"
          fontSize="65px"
          fontFamily="head"
          fontWeight="bold"
        >
          take students experiance to the next level
        </Text>
        <Text w="500px" color="gray">
          we are tiem a tema of developers trying to give the students free
          sources to learn and lead the world, just any cours they wants between
          there hands
        </Text>
        <HStack>
          <Button
            color="white"
            bg="green"
            onClick={() => router.push("http://localhost:8080/auth/google")}
          >
            join now
          </Button>
          <Button
            color="green"
            onClick={() => router.push("http://localhost:3000/main")}
          >
            visite now
          </Button>
        </HStack>
      </VStack>
      <Image as={nextImage} src={homePic} />
    </HStack>
  );
};
