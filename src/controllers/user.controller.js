import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message : "ok"
    })

    const {fullname, email , username , password} = req.body
    console.log('email' , email)

    if(
        [fullname, email, username, password].some( (field) => field?.trim() === ""))
    {
        throw new ApiError(400, "all fields are required")
    }

    const exitedUser =  User.findOne({
        $or: [{username }, { email }]
    })

    if (exitedUser) {
        throw new ApiError( 409 , "user with email or username already exists");       
        }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLoacalPath) {
        throw new ApiError(400, "avatar file is required")
        
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverimage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatarLocalPath){
        throw new ApiError(400, "avatar file is required ")
    }


    const user = await User.create({
        fullname,
        avatar : avatar.url,
        coverimage : coverimage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500, "something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "user registered Successfully")
    )
})

export { 
    registerUser,
}