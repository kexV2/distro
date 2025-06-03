
// Firebase v10 CDN-based initialization (works on GitHub Pages)
// Make sure you include these in your index.html BEFORE this script:
// <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js"></script>
// <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js"></script>
// <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js"></script>

const firebaseConfig = {
  apiKey: "AIzaSyDxz4mbwdPsFrY4JhvGFELVYPww15DEAj8",
  authDomain: "hightable-5aa03.firebaseapp.com",
  projectId: "hightable-5aa03",
  storageBucket: "hightable-5aa03.appspot.com",
  messagingSenderId: "381435054262",
  appId: "1:381435054262:web:bc90b673c48864e3d9fe17",
  measurementId: "G-MVBJSDLN2B"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

function usernameToEmail(username) {
    return username.toLowerCase() + "@hightable.app";
}

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

function fetchProducts() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    db.collection("products").get().then(snapshot => {
        productGrid.innerHTML = '';
        snapshot.forEach(doc => {
            const data = doc.data();
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-name">${data.name}</div>
                <div class="product-price">$${data.price}</div>
                <div class="quantity-selector">
                    <button class="quantity-btn">-</button>
                    <span class="quantity-display">1</span>
                    <button class="quantity-btn">+</button>
                </div>
                <button class="add-to-cart btn">Add to Cart</button>
            `;
            productGrid.appendChild(card);
        });
    });
}

function showStore() {
    document.getElementById('storeSection').style.display = 'block';
    document.getElementById('ordersSection').style.display = 'none';
    document.querySelectorAll('.nav-btn')[0].classList.add('active');
    document.querySelectorAll('.nav-btn')[1].classList.remove('active');
}

function showOrders() {
    document.getElementById('storeSection').style.display = 'none';
    document.getElementById('ordersSection').style.display = 'block';
    document.querySelectorAll('.nav-btn')[0].classList.remove('active');
    document.querySelectorAll('.nav-btn')[1].classList.add('active');
}

function logout() {
    auth.signOut().then(() => {
        document.getElementById('loginPage').classList.remove('hidden');
        document.getElementById('storePage').classList.add('hidden');
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    });
}
