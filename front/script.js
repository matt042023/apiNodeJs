const username = document.getElementById("username");
const password = document.getElementById("password");
const buttonSubmit = document.getElementById("buttonSubmit");

buttonSubmit.addEventListener('click', async () => {
    const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username.value, password: password.value }),
    })
    response.json().then(dataResponse => {
        console.log(dataResponse);
        localStorage.setItem("token", dataResponse.token)
    })
})

const requeteFetch = () => {
    fetch()
}