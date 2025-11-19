
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";


let uploadImage = null;

const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: "dptuo3qjf", 
    uploadPreset: "user_img",
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Image uploaded:", result.info.secure_url);
      uploadImage = result.info.secure_url;
      Swal.fire({
        icon: "success",
        text: "Profile image uploaded successfully!",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  }
);

document.getElementById("upload_profile").addEventListener("click", () => {
  myWidget.open();
})
const registerForm = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  
  if (!email.value || !password.value) {
    return Swal.fire({
      icon: "warning",
      text: "Please fill in all fields.",
    });
  }

  if (!uploadImage) {
    return Swal.fire({
      icon: "warning",
      text: "Please upload a profile image before registering.",
    });
  }

  try {

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    const user = userCredential.user;
    console.log(" User created:", user.uid);
    await addDoc(collection(db, "users"), {
      email: email.value,
      profile: uploadImage,
      uid: user.uid,
    })
    await Swal.fire({
      icon: "success",
      title: "Registration Successful!",
      text: "Your account has been created.",
      confirmButtonText: "Go to Login",
    });

    window.location = "login.html";
  } catch (error) {
    console.error("Error:", error.message);

    Swal.fire({
      icon: "error",
      title: "Registration Failed",
      text:
        error.code === "auth/email-already-in-use"
          ? "This email is already registered."
          : error.message,
    });
  }
});
