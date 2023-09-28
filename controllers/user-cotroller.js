import User from "../model/User.js";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find();

    } catch (err) {
        console.log(err);
    }
    if (!users) {
        return res.status(404).json({ message: "No user Found" });
    }
    return res.status(200).json({ users });
}


export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    // Check if the required fields are present in the request body
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    let existingUser;
    try {
        existingUser = await User.findOne({ email });

    } catch (err) {
        return console.log(err)
    }
    if (existingUser) {
        return res.status(400).json({ message: "User Already Exists . Login Instead " })
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs : [],
    });
    try {
        await user.save();
    } catch (err) {
        return console.log(err)
    }
    return res.status(201).json({ message: "Data is added succesfully", user })
}


export const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email });

    } catch (err) {
        console.log(err)
    }
    if (!existingUser) {
        return res.status(404).json({ message: "User does not Exists" });
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect Password" });
    }
    return res.status(200).json({ message: "Login Sucessfull." });
}
