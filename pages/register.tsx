import Head from "next/head";
import RegisterForm from "@/components/register-form";

export default function Register() {
  return (
    <>
      <div>
        <Head>
          <title>Register Page</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <RegisterForm />
        </main>
      </div>
    </>
  );
}
