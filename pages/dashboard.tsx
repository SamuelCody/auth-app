import Head from "next/head";
import RegisterForm from "@/components/register-form";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { signOut } from "next-auth/react";

export default function Dashboard() {
  return (
    <>
      <div>
        <Head>
          <title>Dashboard Page</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <Flex
            justifyContent={"center"}
            alignItems="center"
            flexDirection={"column"}
            height="100vh"
            gap="10px"
          >
            <Heading as="h1" size="xl" textAlign="center">
              You are logged in!
            </Heading>
            <Box as="p" textAlign="center">
              <Text
                color="blue.400"
                _hover={{ color: "blue.500" }}
                onClick={() => {
                  signOut();
                }}
                cursor="pointer"
              >
                Log out
              </Text>
            </Box>
          </Flex>
        </main>
      </div>
    </>
  );
}
