let form = document.getElementById("myform");
let Name = document.getElementById("name");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let displayArea = document.getElementById("displayData");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formDetail = {
        name: Name.value,
        email: email.value,
        phone: phone.value,
    };

    // Generate a unique key using a timestamp
    const key = "formData_" + Date.now();

    // Store the form data with the unique key
    localStorage.setItem(key, JSON.stringify(formDetail));

    // Display the stored data
    displayStoredData();
});

function displayStoredData() {
    displayArea.innerHTML = "";

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const formData = JSON.parse(localStorage.getItem(key));

        const displayDataDiv = document.createElement("div");
        displayDataDiv.innerHTML = `
            <p>Name: ${formData.name}</p>
            <p>Email: ${formData.email}</p>
            <p>Phone: ${formData.phone}</p>
            <button class="delete-button" data-key="${key}">Delete</button>
        `;

        displayArea.appendChild(displayDataDiv);
    }

    // Add event listeners to the delete buttons
    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const keyToDelete = this.getAttribute("data-key");
            localStorage.removeItem(keyToDelete); // Remove from local storage
            this.parentElement.remove(); // Remove from display
        });
    });
}

// Display any existing stored data when the page loads
displayStoredData();
