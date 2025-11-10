import {  createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { auth } from "./config.js";
import {collection,
addDoc
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js"; 
import { db } from "./config.js";


let uploadImage;
var myWidget = cloudinary.createUploadWidget({
  cloudName: 'dptuo3qjf', 
  uploadPreset: 'user_img',
}, 
  (error, result) => { 
    if (!error && result && result.event === "success") { 
      console.log('Done! Here is the image info: ', result.info); 
      uploadImage = result.info.secure_url
    }
  }
)

document.getElementById("upload_profile").addEventListener(
  "click", 
  function(){
    myWidget.open();
  }, false);





const regsterForm = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

regsterForm.addEventListener("submit" , (event)=>{
event.preventDefault();
createUserWithEmailAndPassword(auth, email.value, password.value)
.then(async(userCredential) => {
    const user = userCredential.user;
    console.log(user);
          try { 
        const docRef = await addDoc(collection(db, "users"), {
         email : email.value,
         password : password.value,
         profile : uploadImage,
          uid: user.uid,
        });
        console.log("Document written with ID: ", docRef.id);
        window.location = "login.html"
      } 
      
      catch (e) {
        console.error("Error adding document: ", e);
      }
    })
    
    Swal.fire({
  text: "Your Email Regestred",
  icon: "success"
});
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "This Email Already Registred",
});
  });
