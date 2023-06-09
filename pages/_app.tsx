import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import Protect from "@/components/protected";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider>
        <Protect>
          <Component {...pageProps} />
        </Protect>
      </ChakraProvider>
    </SessionProvider>
  );
}
