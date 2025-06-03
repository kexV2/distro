
// Firebase Config Placeholder (fill with your project credentials)
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxz4mbwdPsFrY4JhvGFELVYPww15DEAj8",
  authDomain: "hightable-5aa03.firebaseapp.com",
  projectId: "hightable-5aa03",
  storageBucket: "hightable-5aa03.firebasestorage.app",
  messagingSenderId: "381435054262",
  appId: "1:381435054262:web:bc90b673c48864e3d9fe17",
  measurementId: "G-MVBJSDLN2B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Utility to convert usernames to Firebase-compatible fake emails
function usernameToEmail(username) {
    return username.toLowerCase() + "@hightable.app";
}

// Login Logic using Firebase Auth
document.querySelector('.login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const email = usernameToEmail(username);

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            document.getElementById('currentUser').textContent = username;
            document.getElementById('loginPage').classList.add('hidden');
            document.getElementById('storePage').classList.remove('hidden');
            fetchProducts();
        })
        .catch((error) => {
            alert("Login failed: " + error.message);
        });
});

// Fetch products from Firestore
function fetchProducts() {
    const productGrid = document.getElementById('productGrid');
    db.collection("products").get().then(snapshot => {
        productGrid.innerHTML = '';
        snapshot.forEach(doc => {
            const data = doc.data();
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <h3>${data.name}</h3>
                <p>Price: $${data.price}</p>
                <button class="btn">Add to Cart</button>
            `;
            productGrid.appendChild(card);
        });
    });
}

// Navigation
function showStore() {
    document.getElementById('storeSection').style.display = 'block';
}

// Logout
function logout() {
    auth.signOut().then(() => {
        document.getElementById('storePage').classList.add('hidden');
        document.getElementById('loginPage').classList.remove('hidden');
    });
}
