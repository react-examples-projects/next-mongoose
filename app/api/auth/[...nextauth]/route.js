import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const { id, name, email, image } = user;
        const { provider, type, providerAccountId } = account;
        console.log({
          id,
          name,
          email,
          profile_image: image,
          provider,
          type,
          providerAccountId,
        });
        const existsUser = await User.findOne({ email });
        if (!existsUser) {
          await User.create({
            id,
            name,
            email,
            profile_image: image,
            provider,
            type,
            providerAccountId,
          });
        }
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
