"use client";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import InputComponent from "../components/Input";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const AuthPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [variant, setVariant] = useState("login");

	const router = useRouter();
	const toggleVariant = useCallback(() => {
		setVariant((currentVariant) =>
			currentVariant === "login" ? "register" : "login"
		);
	}, []);
	const register = useCallback(async () => {
		try {
		} catch (error) {}
	}, []);
	const login = useCallback(async () => {
		try {
			await signIn("credentials", {
				email,
				password,
				redirect: false,
				callbackUrl: "/"
			});
			router.push("/profile");
		} catch (error) {
			console.log(error);
		}
	}, [email, password, router]);
	return (
		<div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-cover">
			<div className="bg-black h-full w-full bg-opacity-45">
				<nav className="px-12 py-6">
					<Image
						className="h-12 w-40"
						src="/images/logo.png"
						alt="logo"
						height="100"
						width="100"
					/>
				</nav>
				<div className="flex justify-center">
					<div className="bg-black bg-opacity-85 p-20 self-center mt-2 sm:w-3/5 lg:w-2/5 rounded-xl w-full">
						<h2 className="text-white text-3xl mb-8 font-bold">
							{variant === "login" ? "Login" : "Register"}
						</h2>
						<div className="flex flex-col gap-4 ">
							{variant === "register" && (
								<InputComponent
									id="fullName"
									value={name}
									label="Full Name"
									onChange={(e: any) => setName(e.target.value)}
									type="text"
								/>
							)}
							<InputComponent
								id="email"
								value={email}
								label="Email"
								onChange={(e: any) => setEmail(e.target.value)}
								type="text"
							/>
							<InputComponent
								id="password"
								value={password}
								label="Password"
								onChange={(e: any) => setPassword(e.target.value)}
								type="text"
							/>
						</div>
						<button
							onClick={variant === "login" ? login : register}
							className="bg-red-600 text-white p-3 rounded-lg my-4 w-full hover:bg-red-800 transition">
							{variant === "login" ? "Login" : "Signup"}
						</button>
						<div className="flex flex-row items-center justify-center gap-4">
							<div className="cursor-pointer rounded-full p-1">
								<FcGoogle size={20} />
							</div>
							<div className="cursor-pointer rounded-full bg-white text-black p-1">
								<FaGithub size={20} />
							</div>
						</div>
						<p className="text-neutral-600 my-8 ">
							{variant === "login"
								? "First time using Filmflix?"
								: "Already have an account"}
							<span
								onClick={toggleVariant}
								className="text-white ml-2 cursor-pointer
							hover:underline transition
							">
								{variant === "login" ? "Create an account" : "Login"}
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthPage;
