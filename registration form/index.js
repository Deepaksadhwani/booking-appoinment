let form = document.getElementById("myform");
let Name = document.getElementById("name");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let displayArea = document.getElementById("displayData");

let editKey = null;

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (editKey !== null) {
        // If in edit mode, update the existing data
        const formData = JSON.parse(localStorage.getItem(editKey));
        formData.name = Name.value;
        formData.email = email.value;
        formData.phone = phone.value;
        localStorage.setItem(editKey, JSON.stringify(formData));
        editKey = null;
    } else {
        // If not in edit mode, create a new entry
        const formDetail = {
            name: Name.value,
            email: email.value,
            phone: phone.value,
        };

        // Generate a unique key using a timestamp
        const key = "formData_" + Date.now();

        // Store the form data with the unique key
        localStorage.setItem(key, JSON.stringify(formDetail));
    }

    // Reset the form fields
    form.reset();

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
            <button class="edit-button" data-key="${key}">Edit</button>
            <button class="delete-button" data-key="${key}">Delete</button>
        `;

        displayArea.appendChild(displayDataDiv);
    }

    // Add event listeners to the edit buttons
   // Add event listeners to the edit buttons
const editButtons = document.querySelectorAll(".edit-button");
editButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
        e.preventDefault();

        // Set editKey using the data-key attribute
        editKey = this.getAttribute("data-key");
        const formData = JSON.parse(localStorage.getItem(editKey));

        // Populate the form with data for editing
        Name.value = formData.name;
        email.value = formData.email;
        phone.value = formData.phone;

        // Remove the entry from localStorage and the display
        localStorage.removeItem(editKey);
        this.parentElement.remove();

        // Reset editKey after handling the edit
        editKey = null;
    });
});


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
