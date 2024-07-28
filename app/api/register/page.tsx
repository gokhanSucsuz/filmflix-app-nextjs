import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

const RegisterPage = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method !== "POST") return res.status(405).end();
		const { email, name, password } = req.body;
		const exitingUser = await prismadb.user.findUnique({
			where: {
				email
			}
		});
		if (exitingUser) {
			return res.status(422).json({
				errror: "Email do not use!"
			});
		}

		const hashedPassword = await bcrypt.hash(password, 12);
		const user = await prismadb.user.create({
			data: {
				email,
				name,
				hashedPassword,
				image: "",
				emailVerified: new Date()
			}
		});
		return res.status(200).json(user);
	} catch (error) {
		return res.status(400).json({ errror: `Somthing went wrong: ${error}` });
	}
};

export default RegisterPage;
