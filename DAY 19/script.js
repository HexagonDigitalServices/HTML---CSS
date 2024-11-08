const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

loginTab.addEventListener("click", () => {
    loginTab.classList.add("active");
    signupTab.classList.remove("active");
    loginForm.classList.add("active");
    signupForm.classList.remove("active");
});

signupTab.addEventListener("click", () => {
    signupTab.classList.add("active");
    loginTab.classList.remove("active");
    signupForm.classList.add("active");
    loginForm.classList.remove("active");
});

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Login Form Submitted", {
        email: loginForm.elements[0].value,
        password: loginForm.elements[1].value
    });
    loginForm.reset();
})

signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Signup Form Submitted", {
        name: signupForm.elements[0].value,
        email: signupForm.elements[1].value,
        password: signupForm.elements[2].value
    });
    signupForm.reset();
})