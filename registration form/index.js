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
        axios.post("https://crudcrud.com/api/2ecac696aa5b4ec7bdda39d0ee4683dd/appointmentData", formDetail)
            .then((res) => {
                console.log(res);
                // Refresh the displayed data
                displayStoredData();
            })
            .catch((err) =>
                console.log(err));
    }

    // Reset the form fields
    form.reset();
});

function displayStoredData() {
    displayArea.innerHTML = "";

    // Fetch data using axios.get
    axios.get("https://crudcrud.com/api/2ecac696aa5b4ec7bdda39d0ee4683dd/appointmentData")
        .then((res) => {
            console.log(res);
            res.data.forEach((formData) => {
                const displayDataDiv = document.createElement("div");
                displayDataDiv.innerHTML = `
                    <p>Name: ${formData.name}</p>
                    <p>Email: ${formData.email}</p>
                    <p>Phone: ${formData.phone}</p>
                    <button class="edit-button" data-key="${formData._id}">Edit</button>
                    <button class="delete-button" data-key="${formData._id}">Delete</button>
                `;
                displayArea.appendChild(displayDataDiv);
            });

            // Add event listeners to the edit buttons
            const editButtons = document.querySelectorAll(".edit-button");
            editButtons.forEach((button) => {
                button.addEventListener("click", function (e) {
                    e.preventDefault();

                    // Set editKey using the data-key attribute
                    editKey = this.getAttribute("data-key");
                    const formData = res.data.find(data => data._id === editKey);

                    // Populate the form with data for editing
                    Name.value = formData.name;
                    email.value = formData.email;
                    phone.value = formData.phone;

                    // Reset editKey after handling the edit
                    editKey = null;
                });
            });

            // Add event listeners to the delete buttons
            const deleteButtons = document.querySelectorAll(".delete-button");
            deleteButtons.forEach((button) => {
                button.addEventListener("click", function () {
                    const keyToDelete = this.getAttribute("data-key");

                    axios.delete(`https://crudcrud.com/api/2ecac696aa5b4ec7bdda39d0ee4683dd/appointmentData/${keyToDelete}`)
                        .then((res) => {
                            console.log(res);
                            displayStoredData();
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                });
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

// Display any existing stored data when the page loads
displayStoredData();
