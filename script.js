const input = document.getElementById("jsonInput");
const output = document.getElementById("output");
const status = document.getElementById("status");

function parseJSON() {
    try {
        const data = JSON.parse(input.value);
        return { success: true, data };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}

document.getElementById("formatBtn").addEventListener("click", () => {

    const result = parseJSON();

    if (!result.success) {
        status.textContent = "Invalid JSON: " + result.error;
        output.textContent = "";
        return;
    }

    output.textContent = JSON.stringify(result.data, null, 2);
    status.textContent = "Valid JSON ✓";
});

document.getElementById("minifyBtn").addEventListener("click", () => {

    const result = parseJSON();

    if (!result.success) {
        status.textContent = "Invalid JSON: " + result.error;
        output.textContent = "";
        return;
    }

    output.textContent = JSON.stringify(result.data);
    status.textContent = "JSON minified successfully ✓";
});

document.getElementById("validateBtn").addEventListener("click", () => {

    const result = parseJSON();

    if (!result.success) {
        status.textContent = "Invalid JSON: " + result.error;
        output.textContent = "";
        return;
    }

    status.textContent = "Valid JSON ✓";
    output.textContent = "Your JSON is valid.";
});

document.getElementById("clearBtn").addEventListener("click", () => {

    input.value = "";
    output.textContent = "";
    status.textContent = "";
});

document.getElementById("copyBtn").addEventListener("click", async () => {

    if (!output.textContent) return;

    await navigator.clipboard.writeText(output.textContent);

    status.textContent = "Copied to clipboard ✓";
});