import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
import { db } from "./config.js";

const itemID = localStorage.getItem("itemID");
const container = document.getElementById("detail-container");

if (!container) {
  console.error("Error: detail-container element not found in HTML!");
}

if (!itemID) {
  container.innerHTML = `<p>No car selected.</p>`;
} else {

  async function getData() {
    try {
      const q = query(collection(db, "ads"), where("__name__", "==", itemID));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        container.innerHTML = `<p>Car not found.</p>`;
        return;
      }

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        container.innerHTML = `
          <h2>${data.carTitle}</h2>
          <img src="${data.carImage}" alt="${data.carTitle}">
          <p><strong>Description:</strong> ${data.carDescription}</p>
          <p><strong>Price:</strong> $${data.carPrice}</p>
          <p><strong>Location:</strong> ${data.location || "Unknown"}</p>
        `;
      });

    } catch (err) {
      console.error("Error fetching car details:", err);
      container.innerHTML = `<p>Error loading car details.</p>`;
    }
  }

  getData();
}
