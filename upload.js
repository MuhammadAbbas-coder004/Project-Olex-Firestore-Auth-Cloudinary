import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { auth } from "./config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
import { db } from "./config.js";

let currantuid;
let uploadimg;
const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: "dptuo3qjf",
    uploadPreset: "user_img",
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      uploadimg = result.info.secure_url;
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Image uploaded successfully!",
        timer: 1500,
        showConfirmButton: false,
      });
    } else if (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error uploading image!",
      });
      console.error("Cloudinary error:", error);
    }
  }
);
const fileInput = document.getElementById("image");
if(fileInput){
  fileInput.addEventListener("click", () => {
    myWidget.open();
  });
}
onAuthStateChanged(auth, (user) => {
  if (user) {
    currantuid = user.uid;
    console.log("Logged in UID:", currantuid);
  } else {
    window.location = "login.html";
  }
});
const form = document.getElementById("form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!uploadimg) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Please upload a car image first!",
    });
    return;
  }

  const carTitle = document.getElementById("title").value;
  const carDescription = document.getElementById("description").value;
  const carPrice = document.getElementById("price").value;
  const carLocation = document.getElementById("location").value;

  try {
    const docRef = await addDoc(collection(db, "ads"), {
      carTitle,
      carDescription,
      carPrice,
      location: carLocation,
      carImage: uploadimg,
      uid: currantuid,
      createdAt: new Date()
    });

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Ad published successfully!",
    });

    form.reset();
    uploadimg = null;

  } catch (e) {
    console.error("Error adding document:", e);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Error publishing ad!",
    });
  }
});
