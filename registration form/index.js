let form = document.getElementById("myform");
let Name = document.getElementById("name");
let email = document.getElementById("email");
let phone = document.getElementById("phone");


form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formDetail = {
        name: Name.value,
        email: email.value,
        phone: phone.value,
    };
    const key = "formData_" + Date.now();

    localStorage.setItem(key, JSON.stringify(formDetail));

});