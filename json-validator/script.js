const input = document.getElementById("jsonInput");

const validateBtn = document.getElementById("validateBtn");
const clearBtn = document.getElementById("clearBtn");
const exampleBtn = document.getElementById("exampleBtn");

const result = document.getElementById("result");
const resultIcon = document.getElementById("resultIcon");
const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");

const errorDetails = document.getElementById("errorDetails");
const errorMessage = document.getElementById("errorMessage");


function validateJSON() {

    const text = input.value.trim();

    if (!text) {

        showInvalid(
            "Please enter JSON to validate."
        );

        return;
    }


    try {

        JSON.parse(text);

        showValid();

    } catch (error) {

        showInvalid(
            error.message
        );

    }

}


function showValid() {

    result.classList.remove("hidden");

    result.style.background = "#f0fdf4";
    result.style.borderColor = "#bbf7d0";

    resultIcon.textContent = "✓";

    resultIcon.style.background = "#16a34a";

    resultTitle.textContent =
        "Valid JSON";

    resultMessage.textContent =
        "Your JSON is valid and follows JSON syntax.";

    errorDetails.classList.add("hidden");

}


function showInvalid(message) {

    result.classList.remove("hidden");

    result.style.background = "#fef2f2";
    result.style.borderColor = "#fecaca";

    resultIcon.textContent = "✕";

    resultIcon.style.background = "#dc2626";

    resultTitle.textContent =
        "Invalid JSON";

    resultMessage.textContent =
        "The JSON contains a syntax error.";

    errorDetails.classList.remove("hidden");

    errorMessage.textContent = message;

}


function clearAll() {

    input.value = "";

    result.classList.add("hidden");

    errorDetails.classList.add("hidden");

}


function loadExample() {

    input.value = `{
  "name": "Hamoud",
  "age": 22,
  "skills": [
    "Pharmacy",
    "Robotics"
  ],
  "active": true
}`;

    result.classList.add("hidden");

    errorDetails.classList.add("hidden");

}


validateBtn.addEventListener(
    "click",
    validateJSON
);


clearBtn.addEventListener(
    "click",
    clearAll
);


exampleBtn.addEventListener(
    "click",
    loadExample
);


input.addEventListener(
    "input",
    function () {

        result.classList.add("hidden");

        errorDetails.classList.add("hidden");

    }
);
