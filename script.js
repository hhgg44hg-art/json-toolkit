const input = document.getElementById("jsonInput");
const output = document.getElementById("output");
const status = document.getElementById("status");

function parseJSON() {
    try {
        const data = JSON.parse(input.value);

        return {
            success: true,
            data: data
        };

    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}


/* Format */

const formatBtn = document.getElementById("formatBtn");

if (formatBtn) {
    formatBtn.addEventListener("click", () => {

        const result = parseJSON();

        if (!result.success) {
            status.textContent =
                "Invalid JSON: " + result.error;

            output.textContent = "";
            return;
        }

        output.textContent =
            JSON.stringify(result.data, null, 2);

        status.textContent =
            "Valid JSON ✓";
    });
}


/* Minify */

const minifyBtn = document.getElementById("minifyBtn");

if (minifyBtn) {
    minifyBtn.addEventListener("click", () => {

        const result = parseJSON();

        if (!result.success) {
            status.textContent =
                "Invalid JSON: " + result.error;

            output.textContent = "";
            return;
        }

        output.textContent =
            JSON.stringify(result.data);

        status.textContent =
            "JSON minified successfully ✓";
    });
}


/* Validate */

const validateBtn = document.getElementById("validateBtn");

if (validateBtn) {
    validateBtn.addEventListener("click", () => {

        const result = parseJSON();

        if (!result.success) {
            status.textContent =
                "Invalid JSON: " + result.error;

            output.textContent = "";
            return;
        }

        status.textContent =
            "Valid JSON ✓";

        output.textContent =
            "Your JSON is valid.";
    });
}


/* Clear */

const clearBtn = document.getElementById("clearBtn");

if (clearBtn) {
    clearBtn.addEventListener("click", () => {

        input.value = "";
        output.textContent = "";
        status.textContent = "";
    });
}


/* Copy */

const copyBtn = document.getElementById("copyBtn");

if (copyBtn) {
    copyBtn.addEventListener("click", async () => {

        if (!output.textContent) {
            return;
        }

        try {

            await navigator.clipboard.writeText(
                output.textContent
            );

            status.textContent =
                "Copied to clipboard ✓";

        } catch (error) {

            status.textContent =
                "Unable to copy automatically.";

        }
    });
}
