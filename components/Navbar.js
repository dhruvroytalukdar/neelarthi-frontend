import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  Icon,
  Text,
  IconButton,
  useToast,
  useColorMode,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaUserAlt } from "react-icons/fa";
import { BiExit } from "react-icons/bi";
import { useAuth } from "../hooks/contextHooks";

export default function Navbar() {
  const { authUser, signMeOut, loading } = useAuth();
  const router = useRouter();
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      px={{ lg: "10rem", md: "5rem", sm: "1.5rem" }}
      h="10vh"
      align="center"
      bg={colorMode == "light" ? "gray.200" : "gray.700"}
      justify="space-between"
    >
      <Heading as="h1" fontSize="3xl">
        Navbar
      </Heading>
      <Flex align="center" justify="space-between">
        <Button
          onClick={() => router.push("/")}
          variant="link"
          aria-label="Sign In"
          colorScheme="black"
        >
          <Text fontSize="lg">Home</Text>
        </Button>
        <Button
          variant="link"
          aria-label="Sign In"
          ml={{ lg: "45px", sm: "10px" }}
          colorScheme="black"
          onClick={() => router.push("/about")}
        >
          <Text fontSize="lg">About</Text>
        </Button>
        <IconButton
          aria-label="website theme"
          ml={{ lg: "45px", sm: "10px" }}
          onClick={toggleColorMode}
          icon={colorMode == "light" ? <MoonIcon /> : <SunIcon />}
        />
        {!authUser ? (
          loading ? (
            <Button
              isLoading
              aria-label="Loading"
              ml={{ lg: "45px", sm: "10px" }}
              colorScheme="teal"
              variant="solid"
            ></Button>
          ) : (
            <IconButton
              aria-label="Sign In"
              ml={{ lg: "45px", sm: "10px" }}
              onClick={() => router.push("/login")}
              icon={<Icon as={FaUserAlt} />}
            />
          )
        ) : (
          <IconButton
            aria-label="Sign In"
            ml={{ lg: "45px", sm: "10px" }}
            onClick={() => {
              signMeOut();
              toast({
                title: "Logged Out Successfully.",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
            }}
            icon={<Icon w={5} h={5} as={BiExit} />}
          />
        )}
      </Flex>
    </Flex>
  );
}
