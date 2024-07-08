const mongoose=require("mongoose");
const express=require("express");
const cors=require("cors");
const multer=require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
      cb(null,`${Date.now()}_${profilePics}`);
    },
    filename: (req, file, cb) =>{
        console.log(file);
      cb(null, file.originalname);
    }
  })
  
  const upload = multer({ storage: storage })

app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

let userSchema=new mongoose.Schema({
  firstName:{
      type: String,
      validate: {
        validator: function(v) {
          return /^[A-Za-z ]{2,20}$/.test(v);
        },
        message: props => `${props.value} is not a valid First Name!`
      },
      required: [true, 'User First Name required']
    },
  lastName:{
      type: String,
      validate: {
        validator: function(v) {
          return /^[A-Za-z]{2,20}$/.test(v);
        },
        message: props => `${props.value} is not a valid Last Name!`
      },
      required: [true, 'User Last Name required']
    },
  age:{
      type:Number,
      min:[13,"Too early to create an Account"],
      max:[70,"Too late to create an Account"],
      required:[true,"Age is mandatory"],
  },
  email:{
      type: String,
      validate: {
        validator: function(v) {
          return /[a-zA-Z0-9._%+-]+@gmail\.com$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
      },
      required: [true, 'User email required']
    },
  password:{
      type: String,
      validate: {
        validator: function(v) {
          return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
      },
      required: [true, 'User email required']
    },
  mobileNo:{
      type: String,
      validate: {
        validator: function(v) {
          return /^\+91[\s-]?\d{10}$|^\+91[\s-]?\d{3}[\s-]?\d{3}[\s-]?\d{4}$/.test(v);
        },
        message: props => `${props.value} is not a valid MobileNo!`
      },
      required: [true, ' user MobileNo required']
    },
    profilePic:String,
});    
let User=new mongoose.model("users",userSchema);
app.post("/signup",upload.array("profilePic"),async(req,res)=>{
    console.log(req.body);
    console.log(req.files);

    try{
        let signedupDetails=new User({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            age:req.body.age,
            email:req.body.email,
            password:req.body.password,
            mobileNo:req.body.mobileNo,
            profilePic:req.body.profilePic,
        }); 
        await User.insertMany([signedupDetails]);
        res.json({status:"success",msg:"your account created successfully"});
    }catch(err){
        res.json({status:"failure ",msg:"unable to create an account",error:err});
    }
  })
app.listen(1405,()=>{
    console.log(`Listening to the port 1405`);
})
let connectToMDB=async()=>{
    try{
        await mongoose.connect("mongodb+srv://akhilchinnamsetti:akhilch1405@batch2403.derqdcc.mongodb.net/Amazone?retryWrites=true&w=majority&appName=batch2403");
        console.log("Successfully Conneted to MDB");
       }catch(err){
         console.log("Unable to connect to MDB")
         console.log(err);
    }
}
connectToMDB();
