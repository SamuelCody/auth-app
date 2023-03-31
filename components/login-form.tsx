import { Formik } from "formik";
import * as Yup from "yup";
import { Box, Heading, Flex, useToast } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginForm() {
  const router = useRouter();
  const toast = useToast();
  const [loginError, setLoginError] = useState<string>();
  const onSubmit = (values: any, { resetForm }: any) => {
    signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: `${window.location.origin}/dashboard`,
      redirect: false,
    }).then(function (result: any) {
      if (result.error !== null) {
        if (result.status === 401) {
          toast({
            title:
              "Your email/password combination was incorrect. Please try again",
            status: "error",
            isClosable: true,
            duration: 3000,
          });
          resetForm();
          return;
        } else {
          toast({
            title: "Error trying to login",
            status: "error",
            isClosable: true,
          });
        }
      } else {
        router.push(result.url);
      }
    });
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("It must be a valid email")
      .required("Provide a valid email"),
    password: Yup.string()
      .min(6, "Minimum of 6 characters")
      .required("Provide a strong password"),
  });
  return (
    <>
      <Flex
        justifyContent={"center"}
        alignItems="center"
        flexDirection={"column"}
        height="100vh"
        gap="10px"
      >
        <Heading as="h1" size="xl" textAlign="center">
          Login Page
        </Heading>
        <Box as="p" textAlign="center">
          Do not have an account?
          <Link
            href="/register"
            color="blue.400"
            _hover={{ color: "blue.500" }}
          >
            {" "}
            Register
          </Link>
        </Box>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ handleSubmit, values, errors }) => (
            <Flex
              borderWidth="1px"
              rounded="lg"
              shadow="1px 1px 3px rgba(0,0,0,0.3)"
              maxWidth={400}
              p={6}
              w="100%"
              m="10px auto"
              flexDirection={"column"}
              gap="10px"
              as="form"
              onSubmit={handleSubmit as any}
            >
              <InputControl name="email" label="Email address" />
              <InputControl
                name="password"
                inputProps={{ type: "password" }}
                label="Password"
              />

              <SubmitButton>Submit</SubmitButton>
            </Flex>
          )}
        </Formik>
      </Flex>
    </>
  );
}
