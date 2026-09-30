/* =====================================================
   BLOOM DIARY
   Complete JavaScript
===================================================== */


/* ================= AUTH ================= */

function showLogin() {

    document.getElementById("loginBox").classList.remove("hidden");
    document.getElementById("signupBox").classList.add("hidden");
    document.getElementById("forgotBox").classList.add("hidden");

}


function showSignup() {

    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("signupBox").classList.remove("hidden");
    document.getElementById("forgotBox").classList.add("hidden");

}


function showForgot() {

    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("signupBox").classList.add("hidden");
    document.getElementById("forgotBox").classList.remove("hidden");

    document.getElementById("resetEmailStep").classList.remove("hidden");
    document.getElementById("resetPasswordStep").classList.add("hidden");

}


/* ================= SIGNUP ================= */

function signup() {

    const username = document
        .getElementById("signupUsername")
        .value
        .trim();

    const email = document
        .getElementById("signupEmail")
        .value
        .trim()
        .toLowerCase();

    const password =
        document.getElementById("signupPassword").value;

    const confirmPassword =
        document.getElementById("signupConfirmPassword").value;


    /* Validation */

    if (!username) {
        alert("🌸 Please enter a username.");
        return;
    }

    if (username.length < 3) {
        alert("🌸 Username must contain at least 3 characters.");
        return;
    }

    if (!email) {
        alert("📧 Please enter your email.");
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        alert("📧 Please enter a valid email address.");
        return;
    }

    if (!password) {
        alert("🔐 Please create a password.");
        return;
    }

    if (password.length < 6) {
        alert("🔐 Password must contain at least 6 characters.");
        return;
    }

    if (password !== confirmPassword) {
        alert("❌ Passwords do not match.");
        return;
    }


    /* Check existing account */

    const existingUser =
        JSON.parse(localStorage.getItem("bloomUser"));


    if (existingUser) {

        if (
            existingUser.username.toLowerCase()
            === username.toLowerCase()
        ) {
            alert("🌸 This username is already registered.");
            return;
        }

        if (
            existingUser.email.toLowerCase()
            === email
        ) {
            alert("📧 This email is already registered.");
            return;
        }

    }


    /* Create user */

    const user = {

        username: username,
        email: email,
        password: password,

        createdAt: new Date().toISOString()

    };


    localStorage.setItem(
        "bloomUser",
        JSON.stringify(user)
    );


    /* Login user automatically */

    localStorage.setItem(
        "bloomLoggedIn",
        "true"
    );


    alert(
        "🎉 Account created successfully!\n\nWelcome to Bloom Diary, "
        + username
        + " 🌸"
    );


    openApp();

}


/* ================= LOGIN ================= */

function login() {

    const username =
        document.getElementById("loginUsername")
            .value
            .trim();

    const password =
        document.getElementById("loginPassword")
            .value;


    if (!username || !password) {

        alert(
            "🌸 Please enter your username and password."
        );

        return;
    }


    const user =
        JSON.parse(localStorage.getItem("bloomUser"));


    if (!user) {

        alert(
            "🌸 No account found.\n\nPlease create an account first."
        );

        showSignup();

        return;
    }


    if (
        user.username.toLowerCase()
        !== username.toLowerCase()
        ||
        user.password !== password
    ) {

        alert(
            "❌ Incorrect username or password."
        );

        return;
    }


    localStorage.setItem(
        "bloomLoggedIn",
        "true"
    );


    openApp();

}


/* ================= FORGOT PASSWORD ================= */

function verifyEmail() {

    const email =
        document.getElementById("resetEmail")
            .value
            .trim()
            .toLowerCase();


    if (!email) {

        alert("📧 Please enter your email.");

        return;
    }


    const user =
        JSON.parse(localStorage.getItem("bloomUser"));


    if (!user) {

        alert(
            "🌸 No Bloom Diary account exists yet."
        );

        return;
    }


    if (user.email.toLowerCase() !== email) {

        alert(
            "❌ This email is not registered."
        );

        return;
    }


    document
        .getElementById("resetEmailStep")
        .classList.add("hidden");

    document
        .getElementById("resetPasswordStep")
        .classList.remove("hidden");


    alert(
        "💌 Email verified!\n\nCreate your new password."
    );

}


function resetPassword() {

    const newPassword =
        document.getElementById("newPassword")
            .value;

    const confirmPassword =
        document.getElementById("confirmNewPassword")
            .value;


    if (!newPassword || !confirmPassword) {

        alert(
            "🌸 Please fill in both password fields."
        );

        return;
    }


    if (newPassword.length < 6) {

        alert(
            "🔐 Password must contain at least 6 characters."
        );

        return;
    }


    if (newPassword !== confirmPassword) {

        alert(
            "❌ Passwords do not match."
        );

        return;
    }


    const user =
        JSON.parse(localStorage.getItem("bloomUser"));


    if (!user) {

        alert("❌ Account not found.");

        return;
    }


    user.password = newPassword;


    localStorage.setItem(
        "bloomUser",
        JSON.stringify(user)
    );


    alert(
        "🎉 Password changed successfully!"
    );


    document.getElementById("resetEmail").value = "";
    document.getElementById("newPassword").value = "";
    document.getElementById("confirmNewPassword").value = "";


    showLogin();

}


/* ================= OPEN APP ================= */

function openApp() {

    document
        .getElementById("authPage")
        .classList.add("hidden");

    document
        .getElementById("appPage")
        .classList.remove("hidden");


    loadUser();
    loadJournal();
    loadGrowth();
    loadGallery();
    loadTravel();
    loadProfile();
    loadTheme();
    updateStats();
    showDailyQuote();

}


/* ================= LOAD USER ================= */

function loadUser() {

    const user =
        JSON.parse(localStorage.getItem("bloomUser"));


    if (!user) {
        logout();
        return;
    }


    document.getElementById("welcomeUser").textContent =
        "Hello, " + user.username + " 🌷";


    document.getElementById("profileUsername").textContent =
        user.username;


    document.getElementById("profileEmail").textContent =
        user.email;

}


/* ================= LOGOUT ================= */

function logout() {

    localStorage.removeItem("bloomLoggedIn");


    document
        .getElementById("appPage")
        .classList.add("hidden");


    document
        .getElementById("authPage")
        .classList.remove("hidden");


    showLogin();


    document.getElementById("loginUsername").value = "";
    document.getElementById("loginPassword").value = "";

}


/* ================= NAVIGATION ================= */

function openSection(sectionName) {

    const sections =
        document.querySelectorAll(".section");

    sections.forEach(section => {
        section.classList.remove("active-section");
    });


    const selected =
        document.getElementById(sectionName);


    if (selected) {
        selected.classList.add("active-section");
    }


    const navButtons =
        document.querySelectorAll(".nav-btn");


    navButtons.forEach(button => {
        button.classList.remove("active");
    });


    navButtons.forEach(button => {

        if (
            button.getAttribute("onclick")
                ?.includes("'" + sectionName + "'")
        ) {
            button.classList.add("active");
        }

    });


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* ================= DATE ================= */

function updateDate() {

    const date =
        new Date();


    const formatted =
        date.toLocaleDateString(
            "en-IN",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );


    document.getElementById("journalDate")
        .textContent = formatted;

}


/* ================= MOOD ================= */

let selectedMood = "";


function selectMood(mood) {

    selectedMood = mood;

    document.getElementById("selectedMood")
        .textContent =
        "Today's mood: " + mood;

}


/* ================= JOURNAL ================= */

function saveJournal() {

    const text =
        document.getElementById("journalText")
            .value
            .trim();


    if (!text) {

        alert(
            "🌸 Write something in your diary first."
        );

        return;
    }


    const entry = {

        date: new Date().toISOString(),

        mood: selectedMood,

        text: text

    };


    const entries =
        JSON.parse(
            localStorage.getItem("bloomJournals")
        ) || [];


    entries.push(entry);


    localStorage.setItem(
        "bloomJournals",
        JSON.stringify(entries)
    );


    alert(
        "💗 Your diary entry has been saved!"
    );


    updateStats();

}


function loadJournal() {

    const entries =
        JSON.parse(
            localStorage.getItem("bloomJournals")
        ) || [];


    if (entries.length === 0) {
        return;
    }


    const latest =
        entries[entries.length - 1];


    document.getElementById("journalText")
        .value = latest.text || "";


    if (latest.mood) {

        selectedMood = latest.mood;

        document.getElementById("selectedMood")
            .textContent =
            "Today's mood: " + latest.mood;

    }

}


function clearJournal() {

    document.getElementById("journalText")
        .value = "";

    selectedMood = "";

    document.getElementById("selectedMood")
        .textContent =
        "Choose your mood";

}


/* ================= GROWTH ================= */

function saveGrowth() {

    const growth = {

        proud:
            document.getElementById("proudText").value,

        learned:
            document.getElementById("learnedText").value,

        goal:
            document.getElementById("goalText").value

    };


    localStorage.setItem(
        "bloomGrowth",
        JSON.stringify(growth)
    );


    alert(
        "🌱 Your growth has been saved!"
    );


    updateStats();

}


function loadGrowth() {

    const growth =
        JSON.parse(
            localStorage.getItem("bloomGrowth")
        );


    if (!growth) {
        return;
    }


    document.getElementById("proudText")
        .value = growth.proud || "";


    document.getElementById("learnedText")
        .value = growth.learned || "";


    document.getElementById("goalText")
        .value = growth.goal || "";

}


/* ================= TEMPLATES ================= */

function useTemplate(type) {

    const templates = {

        morning:
`Good morning, Dear Diary 🌸

Today I feel...

Today I want to...

Three things I am grateful for:

1.
2.
3.

Today's intention:
`,

        night:
`Dear Diary 🌙

Today was...

The best part of today was...

Something difficult today was...

Tomorrow I want to...
`,

        love:
`Things I love about my life 💕

Today I appreciate...

Someone who made me smile...

Something beautiful I noticed...

A reason I am grateful:
`,

        growth:
`My Growth 🌱

Something I learned...

Something I improved...

A challenge I faced...

What I want to work on next...

I am proud of myself because...
`

    };


    if (templates[type]) {

        openSection("journal");

        document.getElementById("journalText")
            .value = templates[type];

    }

}


/* ================= GALLERY ================= */

function addPhoto(event) {

    const file =
        event.target.files[0];


    if (!file) {
        return;
    }


    if (!file.type.startsWith("image/")) {

        alert(
            "📸 Please choose an image file."
        );

        return;
    }


    const reader =
        new FileReader();


    reader.onload = function(e) {

        const photos =
            JSON.parse(
                localStorage.getItem("bloomGallery")
            ) || [];


        photos.push(e.target.result);


        localStorage.setItem(
            "bloomGallery",
            JSON.stringify(photos)
        );


        loadGallery();
        updateStats();


        alert(
            "🖼️ Photo added to your memories!"
        );

    };


    reader.readAsDataURL(file);


    event.target.value = "";

}


function loadGallery() {

    const gallery =
        document.getElementById("galleryGrid");


    gallery.innerHTML = "";


    const photos =
        JSON.parse(
            localStorage.getItem("bloomGallery")
        ) || [];


    photos.forEach(photo => {

        const item =
            document.createElement("div");


        item.className = "gallery-item";


        const img =
            document.createElement("img");


        img.src = photo;


        item.appendChild(img);

        gallery.appendChild(item);

    });

}


/* ================= TRAVEL ================= */

function addTravel() {

    const place =
        document.getElementById("travelPlace")
            .value
            .trim();

    const date =
        document.getElementById("travelDate")
            .value;

    const memory =
        document.getElementById("travelMemory")
            .value
            .trim();


    if (!place) {

        alert(
            "✈️ Please enter the place name."
        );

        return;
    }


    const travel = {

        place: place,

        date: date,

        memory: memory

    };


    const travels =
        JSON.parse(
            localStorage.getItem("bloomTravel")
        ) || [];


    travels.push(travel);


    localStorage.setItem(
        "bloomTravel",
        JSON.stringify(travels)
    );


    document.getElementById("travelPlace")
        .value = "";

    document.getElementById("travelDate")
        .value = "";

    document.getElementById("travelMemory")
        .value = "";


    loadTravel();
    updateStats();


    alert(
        "✈️ Travel memory added!"
    );

}


function loadTravel() {

    const list =
        document.getElementById("travelList");


    list.innerHTML = "";


    const travels =
        JSON.parse(
            localStorage.getItem("bloomTravel")
        ) || [];


    travels.forEach(travel => {

        const card =
            document.createElement("div");


        card.className = "travel-card";


        const title =
            document.createElement("h3");


        title.textContent =
            "📍 " + travel.place;


        const date =
            document.createElement("small");


        date.textContent =
            travel.date || "";


        const memory =
            document.createElement("p");


        memory.textContent =
            travel.memory || "A beautiful memory ✨";


        card.appendChild(title);
        card.appendChild(date);
        card.appendChild(memory);


        list.appendChild(card);

    });

}


/* ================= PROFILE ================= */

function changeProfile(event) {

    const file =
        event.target.files[0];


    if (!file) {
        return;
    }


    if (!file.type.startsWith("image/")) {

        alert(
            "📷 Please choose an image."
        );

        return;
    }


    const reader =
        new FileReader();


    reader.onload = function(e) {

        localStorage.setItem(
            "bloomProfileImage",
            e.target.result
        );


        loadProfile();


        alert(
            "🌸 Profile picture updated!"
        );

    };


    reader.readAsDataURL(file);

}


function loadProfile() {

    const image =
        localStorage.getItem(
            "bloomProfileImage"
        );


    const img =
        document.getElementById("profileImage");


    if (image) {

        img.src = image;

    } else {

        img.src =
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                viewBox="0 0 200 200">
                <rect width="200" height="200"
                rx="100"
                fill="#ffe8f0"/>
                <text x="100" y="120"
                text-anchor="middle"
                font-size="80">🌸</text>
                </svg>
            `);

    }

}


/* ================= STATISTICS ================= */

function updateStats() {

    const journals =
        JSON.parse(
            localStorage.getItem("bloomJournals")
        ) || [];


    const gallery =
        JSON.parse(
            localStorage.getItem("bloomGallery")
        ) || [];


    const travel =
        JSON.parse(
            localStorage.getItem("bloomTravel")
        ) || [];


    const growth =
        localStorage.getItem("bloomGrowth");


    document.getElementById("journalCount")
        .textContent = journals.length;


    document.getElementById("photoCount")
        .textContent = gallery.length;


    document.getElementById("travelCount")
        .textContent = travel.length;


    document.getElementById("growthCount")
        .textContent =
        growth ? "1" : "0";

}


/* ================= QUOTES ================= */

function showDailyQuote() {

    const quotes = [

        "You are growing beautifully. 🌸",

        "Small steps every day become big changes. 🌱",

        "Be gentle with yourself. You are learning. 💗",

        "Your story is still being written. ✨",

        "You deserve the life you dream about. 🌷",

        "Progress doesn't have to be perfect. 💕",

        "Keep blooming at your own pace. 🌼",

        "Believe in the person you are becoming. 🦋"

    ];


    const day =
        new Date().getDate();


    const quote =
        quotes[day % quotes.length];


    document.getElementById("dailyQuote")
        .textContent = quote;

}


/* ================= THEME ================= */

function toggleTheme() {

    document.body.classList.toggle("dark");


    const dark =
        document.body.classList.contains("dark");


    localStorage.setItem(
        "bloomDarkMode",
        dark ? "true" : "false"
    );

}


function loadTheme() {

    const dark =
        localStorage.getItem(
            "bloomDarkMode"
        );


    if (dark === "true") {

        document.body.classList.add("dark");

    }

}


/* ================= START APP ================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateDate();


        const loggedIn =
            localStorage.getItem(
                "bloomLoggedIn"
            );


        const user =
            localStorage.getItem(
                "bloomUser"
            );


        if (loggedIn === "true" && user) {

            openApp();

        } else {

            showLogin();

        }

    }
);