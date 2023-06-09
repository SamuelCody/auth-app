import NextAuth from "next-auth";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
let userAccount: any = null;

const prisma = new PrismaClient();

const confirmPasswordHash = (plainPassword: string, hashedPassword: string) => {
  return new Promise((resolve) => {
    bcrypt.compare(
      plainPassword,
      hashedPassword,
      function (err: Error | undefined, res: any) {
        resolve(res);
      }
    );
  });
};

const configuration: any = {
  cookie: {
    secure: process.env.NODE_ENV && process.env.NODE_ENV === "production",
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {},
      async authorize(
        credentials: any,
        req: Pick<any, "body" | "query" | "headers" | "method">
      ) {
        try {
          const user: any = await prisma.user.findFirst({
            where: {
              email: credentials?.email,
            },
          });

          if (user !== null) {
            //Compare the hash
            const res = await confirmPasswordHash(
              credentials.password,
              user.password
            );
            if (res === true) {
              userAccount = {
                id: user.id,
                email: user.email,
              };
              return userAccount;
            } else {
              // console.log("Hash not matched logging in");
              return null;
            }
          } else {
            return null;
          }
        } catch (err) {
          console.log("Authorize error:", err);
        }
      },
    }),
  ],
  callbacks: {
    async signIn(user: any) {
      try {
        //the user object is wrapped in another user object so extract it
        user = user.user;
        // console.log("Sign in callback", user);
        // console.log("User id: ", user.id);
        if (typeof user.id !== typeof undefined) {
          return user;
        } else {
          console.log("User id was undefined");
          return false;
        }
      } catch (err) {
        return err;
      }
    },
    async session(session: any, token: any) {
      if (userAccount !== null) {
        //session.user = userAccount;
        session.user = {
          userId: userAccount.id,
          email: userAccount.email,
        };
      } else if (
        typeof token.user !== typeof undefined &&
        (typeof session.user === typeof undefined ||
          (typeof session.user !== typeof undefined &&
            typeof session.user.id === typeof undefined))
      ) {
        session.user = token.user;
      } else if (typeof token !== typeof undefined) {
        session.token = token;
      }
      return session;
    },
    async jwt(token: any, user: any) {
      // console.log(token);
      // console.log("JWT callback. Got User: ", user);
      if (typeof user !== typeof undefined) {
        token.user = user;
      }
      return token;
    },
  },
};

const Auth = (req: any, res: any) => NextAuth(req, res, configuration);
export default Auth;
