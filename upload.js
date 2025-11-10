import {onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, addDoc} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const upload = document.querySelector("#upload-btn");
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    console.log(`User uid : ${uid}`);
  } else {
window.location = "login.html"
  }
});



const form = document.querySelector("#form");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const price = document.querySelector("#price");

form.addEventListener("submit" , async(event) =>{
event.preventDefault();
const carTitle = title.value;
const carDesc =   description.value;
const carPrice = price.value;

console.log(`title : ${carTitle}`);
console.log(`description : ${carDesc}`);
console.log(`price : $${carPrice}`);


  try {
    const docRef = await addDoc(collection(db, "ads"), {
    
    
    
    });
    console.log("Document written with ID: ", docRef.id);
    alert("ad published")
  } catch (e) {
    console.error("Error adding document: ", e);
  }
})

