import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const upload = document.querySelector("#upload-btn");
const login = document.querySelector("#login");
const logoutbtn = document.querySelector("#logout");
const userImg = document.querySelector("#userImg");
const uploadbtn = document.querySelector("#upload-btn");
const procontainer = document.querySelector(".product-container");
const moreinfo = document.querySelectorAll(".more-btn");

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
 
const userInfo =  await  getDataFromDB(uid , "users");
userImg.src = userInfo[0]?.profile || "default.jpg";
console.log(userInfo);

const allAds = await  getDataFromDB(null, "ads"); 
console.log(allAds);
   console.log("profile url" , userInfo.profile); 
allAds.map((item) => {
  procontainer.innerHTML += `
    <div class="card">
      <img src="${item.carImage}" alt="Product 1">
      <div class="card-content">
        <h3>${item.title}</h3>
        <div class="price">$${item.price}</div>
        <p>${item.discraption}</p>
        <a href="#" data-id="${item.docid}" class="more-btn">
          <i class="fa-solid fa-circle-info"></i> More Info
        </a>
      </div>
      <div class="card-footer">
        <div class="location"><i class="fa-solid fa-location-dot"></i> Lahore</div>
        <i class="fa-regular fa-heart favorite"></i>
      </div>
    </div>
  `;
});
  } else {
    login.style.display = "block";
    logoutbtn.style.display = "none";
    upload.style.display = "none";
    userImg.style.display = "block";
    console.log("user is not login");
  }
});








async function  getDataFromDB(uid, collections) {
  const userdata = [];
  const q = query(
    collection(db, collections), where("uid", "==", uid)
  );
  const querySnapshot = uid
    ? await getDocs(q)
    : await getDocs(collection(db, collections));
  querySnapshot.forEach((doc) => {
    // userImg.src = userData.profile;
    // userImg.style.display = "block";
            userdata.push({ ...doc.data(), docid: doc.id });

  });
  return userdata;
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




uploadbtn.addEventListener("click" , () =>{
window.location = "upload.html"; 
})