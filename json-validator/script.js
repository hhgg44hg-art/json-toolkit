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
            "Please enter JSON to validate.",
            "No JSON provided"
        );

        return;
    }

    try {

        JSON.parse(text);

        showValid();

    } catch (error) {

        const details = analyzeError(
            error.message,
            text
        );

        showInvalid(
            details.message,
            details.title
        );
    }
}


/*
 * Analyze common JSON parsing errors
 */
function analyzeError(error, text) {

    const positionMatch =
        error.match(/position (\d+)/);

    let position = null;

    if (positionMatch) {
        position = Number(positionMatch[1]);
    }

    let line = null;
    let column = null;

    const lineMatch =
        error.match(/line (\d+)/);

    const columnMatch =
        error.match(/column (\d+)/);

    if (lineMatch) {
        line = Number(lineMatch[1]);
    }

    if (columnMatch) {
        column = Number(columnMatch[1]);
    }


    /*
     * Missing comma
     */
    if (
        error.includes("Expected ',' or '}'") ||
        error.includes("Expected ',' or ']'")
    ) {

        return {
            title: "Missing comma",
            message:
                buildLocation(
                    "A comma may be missing between two JSON values.",
                    line,
                    column
                )
        };
    }


    /*
     * Unexpected token
     */
    if (
        error.includes("Unexpected token") ||
        error.includes("Unexpected character")
    ) {

        return {
            title: "Unexpected character",
            message:
                buildLocation(
                    "The JSON contains an unexpected character or value.",
                    line,
                    column
                )
        };
    }


    /*
     * Unexpected end
     */
    if (
        error.includes("Unexpected end") ||
        error.includes("Unexpected end of JSON")
    ) {

        return {
            title: "Incomplete JSON",
            message:
                buildLocation(
                    "The JSON appears to be incomplete. Check for a missing closing bracket or brace.",
                    line,
                    column
                )
        };
    }


    /*
     * Unterminated string
     */
    if (
        error.includes("Unterminated string")
    ) {

        return {
            title: "Unterminated string",
            message:
                buildLocation(
                    "A string appears to be missing its closing quotation mark.",
                    line,
                    column
                )
        };
    }


    /*
     * Generic error
     */
    return {
        title: "JSON syntax error",
        message:
            buildLocation(
                error,
                line,
                column
            )
    };
}


/*
 * Add line and column information
 */
function buildLocation(
    message,
    line,
    column
) {

    if (line !== null && column !== null) {

        return (
            message +
            "\n\nLocation: Line " +
            line +
            ", Column " +
            column
        );
    }

    return message;
}


/*
 * Valid result
 */
function showValid() {

    result.classList.remove("hidden");

    result.style.background =
        "#f0fdf4";

    result.style.borderColor =
        "#bbf7d0";

    resultIcon.textContent = "✓";

    resultIcon.style.background =
        "#16a34a";

    resultTitle.textContent =
        "Valid JSON";

    resultMessage.textContent =
        "Your JSON is valid and follows JSON syntax.";

    errorDetails.classList.add("hidden");
}


/*
 * Invalid result
 */
function showInvalid(
    message,
    title
) {

    result.classList.remove("hidden");

    result.style.background =
        "#fef2f2";

    result.style.borderColor =
        "#fecaca";

    resultIcon.textContent = "✕";

    resultIcon.style.background =
        "#dc2626";

    resultTitle.textContent =
        "Invalid JSON";

    resultMessage.textContent =
        title;

    errorDetails.classList.remove("hidden");

    errorMessage.textContent =
        message;
}


/*
 * Clear
 */
function clearAll() {

    input.value = "";

    result.classList.add("hidden");

    errorDetails.classList.add("hidden");
}


/*
 * Load example
 */
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


/*
 * Events
 */

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
