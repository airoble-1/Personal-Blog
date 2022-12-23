import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "../../../server/db/client";
// Prisma adapter for NextAuth, optional and can be removed
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { prisma } from "../../../server/db/client";
// import { env } from "../../../env/server.mjs";
// import Credentials from "next-auth/providers/credentials";

// export const authOptions: NextAuthOptions = {
//   // Include user.id on session
//   callbacks: {
//     session({ session, user }) {
//       if (session.user) {
//         session.user.id = user.id;
//       }
//       return session;
//     },
//   },
//   // Configure one or more authentication providers
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     // ...add more providers here
//   ],
// };

// export default NextAuth(authOptions);

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 60 * 60 * 8,
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          const user = await prisma.user.findUnique({
            where: {
              email,
            },
          });

          if (!user) return null;

          const isPasswordValid = bcrypt.compareSync(
            password,
            user.passwordHash
          );
          if (!isPasswordValid) return null;

          //throw new Error("Email or Password is incorrect");

          return {
            id: user.id,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage,
            firstName: user.firstName,
            lastName: user.lastName,
          };
        } catch (error) {
          console.log("Authorize error:", error);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, user, token }) {
      session.user = { ...token };
      return session;
    },
  },
});
