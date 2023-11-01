import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
      CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Credentials",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {},
        async authorize(credentials, req) {
          // Add logic here to look up the user from the credentials supplied
          //const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
          
          const res = await fetch(process.env.NEXT_PUBLIC_JWT_BASE + '/token', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {'Content-Type': 'application/json'}
          })
          const user = await res.json()

          if (user.token) {
            // Any object returned will be saved in `user` property of the JWT
            const loggedinUser = { 
              name: user.user_display_name, 
              email: user.user_email,
              token: user.token
            }
            return loggedinUser
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null
          }
        }
      })
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if(user) {
        token.accessToken = user.token
      }
      return token
    },
    async session({ session, token, user}) {
      if(token) {
        session.user.accessToken = token.accessToken
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
  }
}

export default NextAuth(authOptions)