import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const upload = document.querySelector("#upload-btn");
const login = document.querySelector("#login");
const logoutbtn = document.querySelector("#logout");
const userImg = document.querySelector("#userImg");

login.addEventListener("click", (event) => {
  event.preventDefault();
  window.location = "login.html";
});

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    console.log(`User uid : ${uid}`);
    login.style.display = "none";
    logoutbtn.style.display = "block";
    upload.style.display = "block";
    userImg.style.display = "block";
    await readformdata(uid);
  } else {
    login.style.display = "block";
    logoutbtn.style.display = "none";
    upload.style.display = "none";
    userImg.style.display = "block";
    console.log("user is not login");
  }
});
async function readformdata(uid) {
  const q = query(
    collection(db, "users"),
    where("uid", "==", uid)
  );
 const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const userData = doc.data()
    if (userData.profile) {
    userImg.src = userData.profile;
        userImg.style.display = "block";
        console.log("profile url" , userData.profile);
        
    }
  });
}
logoutbtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      window.location = "index.html";
    })
    .catch((error) => {
      console.log(error, "error");
    });
});





