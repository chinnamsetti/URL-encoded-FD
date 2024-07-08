import React, { useRef, useState } from 'react'
function UserData() {

  let firstNameInputRef=useRef();
  let lastNameInputRef=useRef();
  let ageInputRef=useRef();
  let emailInputRef=useRef();
  let passwordInputRef=useRef();
  let mobileNoInputRef=useRef();
  let profilePicInputRef=useRef();

  let[profilePic,setProfilePic]=useState("./images/no image.jpeg");

  let onSignUp=async()=>{

    let dataToSend={
      firstName:firstNameInputRef.current.value,
      lastName:lastNameInputRef.current.value,
      age:ageInputRef.current.value,
      email:emailInputRef.current.value,
      password:passwordInputRef.current.value,
      mobileNo:mobileNoInputRef.current.value,
      profilePic:profilePicInputRef.current.value,
    };
    console.log(dataToSend);

    let myHeader=new Headers();
    myHeader.append("content-type","application/json");
       let reqOptions={
        method:"POST",
        body:JSON.stringify(dataToSend),
        headers:myHeader,
       }
       let JSONData=await fetch("http://localhost:1405/signup",reqOptions);
       let JSOData=await JSONData.json();
       console.log(JSOData);
  };

  let onSignUpURLE=async()=>{
     let myHeader=new Headers();
     myHeader.append("content-type","application/x-www-form-urlencoded");

let dataToSend=new URLSearchParams();

dataToSend.append("firstName",firstNameInputRef.current.value);
dataToSend.append("lastName",lastNameInputRef.current.value);
dataToSend.append("age",ageInputRef.current.value);
dataToSend.append("email",emailInputRef.current.value);
dataToSend.append("password",passwordInputRef.current.value);
dataToSend.append("mobileNo",mobileNoInputRef.current.value);
dataToSend.append("profilePic",mobileNoInputRef.current.value);

      
    let reqOptions={
      method:"POST",
      headers:myHeader,
      body:dataToSend,
    };
    let JSONData=await fetch("http://localhost:1405/signup",reqOptions);

    let JSOData=await JSONData.json();
    console.log(JSOData);
  }
  let onSignUpFD=async()=>{
    let myHeader=new Headers();
    myHeader.append("content-type","multipart/form-data");

let dataToSend=new FormData();

dataToSend.append("firstName",firstNameInputRef.current.value);
dataToSend.append("lastName",lastNameInputRef.current.value);
dataToSend.append("age",ageInputRef.current.value);
dataToSend.append("email",emailInputRef.current.value);
dataToSend.append("password",passwordInputRef.current.value);
dataToSend.append("mobileNo",mobileNoInputRef.current.value);

for(let i=0;i<profilePicInputRef.current.files.length;i++){
  dataToSend.append("profilePic",profilePicInputRef.current.files[i]);
}
     
   let reqOptions={
     method:"POST",
     body:dataToSend,
   };
   let JSONData=await fetch("http://localhost:1405/signup",reqOptions);

   let JSOData=await JSONData.json();
   console.log(JSOData);
 }
  return (
    <form>
        <div>
          <h2>Sign Up</h2>
        <label>First Name</label>
        <input ref={firstNameInputRef}></input>
        </div>
        <div>
        <label>Last Name</label>
        <input ref={lastNameInputRef}></input>
        </div>
        <div>
        <label>Age</label>
        <input ref={ageInputRef}></input>
        </div>
        <div>
        <label>Email</label>
        <input ref={emailInputRef}></input>
        </div>
        <div>
        <label>Password</label>
        <input ref={passwordInputRef}></input>
        </div>
        <div>
        <label>Mobile No</label>
        <input ref={mobileNoInputRef}></input>
        </div>
        <div>
        <label>Profile Pic</label>
        <input ref={profilePicInputRef} type="file" multiple
        onChange={(eo)=>{
          let selectedImagePath=URL.createObjectURL(eo.target.files[0]);
          setProfilePic(selectedImagePath);
        }}></input>
        <br></br>
        <br></br>
        <img src={profilePic} className="picPreview"></img>
        </div>
        <button type="button" onClick={()=>{
          onSignUp();
        }}>SignUp</button>
        <button type="button"onClick={()=>{
          onSignUpURLE()
        }}>Signup(URLE)</button>
        <button type="button" onClick={()=>{
          onSignUpFD();
        }}>SignUp(FD)</button>
    </form>
  )
}
export default UserData