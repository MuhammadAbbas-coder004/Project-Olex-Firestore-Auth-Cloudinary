import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { auth } from "./config.js";
import { 
  collection, 
  addDoc } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
import { db } from "./config.js";
let currantuid;
let uploadimg;
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid
    console.log(uid);
    currantuid = uid;
  }else{
   window.location = "login.html";
   console.log("login nii hie");
   

  }
}); 
const form = document.querySelector("#form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const priceInput = document.getElementById("price");

  const carTitle = titleInput.value;
  const carDescription = descriptionInput.value;
  const carPrice = priceInput.value;

  console.log("Car Title:", carTitle);
  console.log("Description:", carDescription);
  console.log("Price:", carPrice);

  try {
    const docRef = await addDoc(collection(db, "ads"), {
      carTitle , carDescription , carPrice,
      carImage : uploadimg, 
    });
    console.log("Document written with ID: ", docRef.id);
    alert("ad published")
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});
