
import User from "../models/user.models.js";

export const userSignup = async(req,res) => {
    try {

        const exist = await User.findOne({username:req.body.username})

        if(exist) {
            return res.status(401).json({message:'username already exists'});
        }

        const user = req.body;
        const newUser = new User(user);
        await newUser.save();

        res.status(200).json({message:user});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


export const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username, password });

        if (user) {
            return res.status(200).json({data:user});
        }

        return res.status(401).json({
            message: "Invalid username or password"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
