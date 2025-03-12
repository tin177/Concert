document.addEventListener("DOMContentLoaded", function() {
    var view = document.getElementById("viewRsrv");
    var signIn = document.getElementById("signIn");
    var viewButton = document.getElementById("viewButton");

    viewButton.addEventListener("click", function() {
        signIn.style.display = "none";
        view.style.display = "block";
    });
});
document.addEventListener("DOMContentLoaded", function() {
    var view = document.getElementById("viewRsrv");
    var signIn = document.getElementById("signIn");
    var doneButton = document.getElementById("doneButton");

    doneButton.addEventListener("click", function() {
        signIn.style.display = "block";
        view.style.display = "none";
    });
});

document.getElementById("startButton").addEventListener("click", async function(event) {
    event.preventDefault();

    var signIn = document.getElementById("signIn");
    var startButtonb = document.getElementById("startButton");
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

    try {
        let isExists = await checkIfExists(name, email);
        if (isExists) {
            alert("You have already made a reservation.");
            return;
        } 
            signIn.style.display = "none";
            rsrv.style.display = "block";
        
    } catch(error) {
        alert("An error occurred. Please try again later.");
    }
});

async function checkIfExists(name, email) {
    try {
        const response = await fetch(`/api/checkReservation?name=${name}&email=${email}`);
        const data = await response.json();
        console.log("API Response: ", data)
        return data.exists;
    } catch (error) {
        console.error("Error checking reservation:", error);
        return false;
    }
}
function getFormData() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const selectedDays = Array.from(document.querySelectorAll('input[name="day"]:checked'))
                              .map(checkbox => checkbox.value);

    return { name, email, days: selectedDays };
}
function saveFormData() {
    const formData = getFormData(); 
    localStorage.setItem("reservationData", JSON.stringify(formData));
    console.log("Data saved:", formData);
}
function submitReservation() {
    const formData = getFormData();

    fetch("/api/submitChoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Reservation successful!");
        } else {
            alert("Reservation failed." + data.message);
        }
    })
    .catch(error => {
        console.error("Error submitting reservation:", error);
        alert("An error occurred. Please try again.");
    });
}
document.getElementById("confirmation").addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = getFormData();
    
    if (!formData.name || !formData.email || formData.days.length === 0) {
        alert("Please fill in all fields and select at least one day.");
        return;
    }

    const userConfirmed = confirm("Are you sure you want to reserve tickets for " + formData.days.join(", ") + "?");
    if (!userConfirmed) return;

    saveFormData(); 
    submitReservation(); 
});