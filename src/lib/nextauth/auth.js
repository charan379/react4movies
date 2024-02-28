import CredentialsProvider from "next-auth/providers/credentials"
import { AppConfig } from "@/app.config";


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
            credentials: {
                username: { label: "Username", type: "text"},
                password: { label: "Password", type: "password"}
            },

            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied

                const { username, password } = credentials;

                const res = await fetch(`${AppConfig.MOVIEBUNKERS_API}/auth/token-auth`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userName: username,
                        password: password
                    })
                })

                if (res?.status === 400) {
                    throw new Error('Invalid username or password');
                }

                const user = await res.json();

                if (res.ok && user) {
                    return user;
                } else {
                    return null;
                }
            }
        })
        // ...add more providers here
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.userId = user?.userId,
                    token.userName = user?.userName,
                    token.email = user?.email,
                    token.role = user?.role,
                    token.status = user?.status,
                    token.updatedAt = user?.updatedAt,
                    token.createdAt = user?.createdAt,
                    token.accessToken = user?.token
                token.loginDate = new Date();
            }
            return token;
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.auth = {
                token: token.accessToken
            };

            session.user = {
                userId: token?.userId,
                userName: token?.userName,
                email: token?.email,
                role: token?.role,
                status: token?.status,
                updatedAt: token?.updatedAt,
                createdAt: token?.createdAt,
                loginDate: token?.loginDate
            }

            return session;
        },
    },

    session: {
        strategy: "jwt",
        //maxAge: 30 * 24 * 60 * 60, // 30 days
        // maxAge: 1 * 60,  // 1 mins
       maxAge: 8 * 60 * 60 // 8 hours
    },

    pages: {
        signIn: "/login",
    },
};