document.addEventListener("DOMContentLoaded", function() {
    var view = document.getElementById("viewRsrv");
    var signIn = document.getElementById("signIn");
    var viewButton = document.getElementById("viewButton");

    viewButton.addEventListener("click", function() {
        signIn.style.display = "none";
        view.style.display = "block";
    });
});
    // fetch('/getUserData')  
    // .then(response => {
    //     if (!response.ok) {
    //         throw new Error("Network response was not ok");
    //     }
    //     return response.json();
    // })
    // .then(data => {
    //     document.getElementById("nameLabel").innerText = "Name: " + (data.name || "N/A");
    //     document.getElementById("emailLabel").innerText = "Email: " + (data.email || "N/A");
    //     document.getElementById("daysLabel").innerText = "Selected Days: " + (data.selectedDays?.join(", ") || "None");
    // })
    // .catch(error => {
    //     console.error("Error fetching data:", error);
    //     alert("Failed to load reservation details. Please try again.");
    // });



document.addEventListener("DOMContentLoaded", function() {
    var view = document.getElementById("viewRsrv");
    var signIn = document.getElementById("signIn");
    var doneButton = document.getElementById("doneButton");

    doneButton.addEventListener("click", function() {
        signIn.style.display = "block";
        view.style.display = "none";
    });
});

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("startButton").addEventListener("click", async function(event) {
    event.preventDefault();

    var signIn = document.getElementById("signIn");
    var startButton = document.getElementById("startButton");
    var rsrv = document.getElementById("rsrv");
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const emailError = document.getElementById("emailError");

    if (!name || !email) {
        alert("Both Name and Email are required.");
        return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        emailError.style.display = "block";
        return;
    } else {
        emailError.style.display = "none";
    }

    // try {
    //     let isExists = await checkIfExists(name, email);
    //     if (isExists) {
    //         alert("You have already made a reservation.");
    //         return;
    //     } 
            signIn.style.display = "none";
            rsrv.style.display = "block";
        
//     } catch(error) {
//         alert("An error occurred. Please try again later.");
//     }
});
});

// async function checkIfExists(name, email) {
//     try {
//         const response = await fetch(`/api/checkReservation?name=${name}&email=${email}`);
//         const data = await response.json();
//         console.log("API Response: ", data)
//         return data.exists;
//     } catch (error) {
//         console.error("Error checking reservation:", error);
//         return false;
//     }
// }
function getFormData() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const selectedDays = Array.from(document.querySelectorAll('input[name="day"]:checked'))
                              .map(checkbox => checkbox.value);

    return { name, email, day: selectedDays };
}
function saveFormData() {
    const formData = getFormData(); 
    localStorage.setItem("reservationData", JSON.stringify(formData));
    console.log("Data saved:", formData);
}
function submitReservation(event) {
    event.preventDefault(); 
    saveFormData();
    const formData = getFormData();
    console.log("Sending data:", formData); 

    fetch("https://getloudtix-production.up.railway.app/api/submitChoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Response from backend:", data);
        if (data.success) {
            console.log("Response from backend:", data);
            alert("Reservation successful!");
        } else {
            alert("Reservation failed. js f" + data.message);
        }
    })
    .catch(error => {
        console.error("Error submitting reservation:", error);
        alert("An error occurred. Please try again." +error.message);
    });
}
document.getElementById("confirmation").addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = getFormData();
    
    if (!formData.name || !formData.email || formData.day.length === 0) {
        alert("Please fill in all fields and select at least one day.");
        return;
    }

    const userConfirmed = confirm("Are you sure you want to reserve tickets for " + formData.day.join(", ") + "?");
    if (!userConfirmed) return;

    saveFormData(); 
    submitReservation(event); 
});