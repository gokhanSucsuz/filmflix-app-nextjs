import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prismadb from "@/libs/prismadb";
import { compare } from "bcrypt";

export const authOptions: AuthOptions = {
	providers: [
		Credentials({
			id: "credentials",
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "text"
				},
				password: {
					label: "Password",
					type: "password"
				}
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) {
					throw new Error("Email or Password required");
				}

				const user = await prismadb.user.findUnique({
					where: {
						email: credentials.email
					}
				});

				if (!user || !user.hashedPassword) {
					throw new Error("Email does not exist");
				}

				const isCorrectPassword = await compare(
					credentials.password,
					user.hashedPassword
				);

				if (!isCorrectPassword) {
					throw new Error("Incorrect Password");
				}

				return user;
			}
		})
	]
};
