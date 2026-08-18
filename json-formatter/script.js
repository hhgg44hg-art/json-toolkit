const input = document.getElementById("jsonInput");
const output = document.getElementById("output");
const status = document.getElementById("status");

const formatBtn = document.getElementById("formatBtn");
const validateBtn = document.getElementById("validateBtn");
const clearBtn = document.getElementById("clearBtn");

const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");

const indentSelect = document.getElementById("indent");


function getIndentation() {

    const value = indentSelect.value;

    if (value === "tab") {
              return "\t";
    }

    return Number(value);
}


function parseJSON() {

    try {

          const data = JSON.parse(input.value);

          return {
                        valid: true,
                        data: data
          };

    } catch (error) {

          return {
                        valid: false,
                        error: error.message
          };

    }
}


function showError(message) {

    status.textContent = "Invalid JSON: " + message;

    output.textContent = "";
}


function formatJSON() {

    if (!input.value.trim()) {

          status.textContent = "Please enter JSON first.";

          output.textContent = "";

          return;
    }


    const result = parseJSON();


    if (!result.valid) {

          showError(result.error);

          return;
    }


    const formatted = JSON.stringify(
              result.data,
              null,
              getIndentation()
          );


    output.textContent = formatted;

    status.textContent = "Valid JSON ✓";
}


function validateJSON() {

    if (!input.value.trim()) {

          status.textContent = "Please enter JSON first.";

          return;
    }


    const result = parseJSON();


    if (!result.valid) {

          showError(result.error);

          return;
    }


    status.textContent = "Valid JSON ✓";

    output.textContent =
              "Your JSON is valid.";
}


function clearAll() {

    input.value = "";

    output.textContent = "";

    status.textContent = "";
}


async function copyResult() {

    if (!output.textContent) {

          status.textContent = "Nothing to copy.";

          return;
    }


    try {

          await navigator.clipboard.writeText(
                        output.textContent
                    );

          status.textContent =
                        "Copied to clipboard ✓";

    } catch {

          status.textContent =
                        "Could not copy automatically.";
    }
}


function downloadResult() {

    if (!output.textContent) {

          status.textContent =
                        "Format JSON before downloading.";

          return;
    }


    const blob = new Blob(
              [output.textContent],
      {
                    type: "application/json"
      }
          );


    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "formatted.json";

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);

    status.textContent =
              "JSON downloaded ✓";
}


formatBtn.addEventListener(
      "click",
      formatJSON
  );

validateBtn.addEventListener(
      "click",
      validateJSON
  );

clearBtn.addEventListener(
      "click",
      clearAll
  );

copyBtn.addEventListener(
      "click",
      copyResult
  );

downloadBtn.addEventListener(
      "click",
      downloadResult
  );


input.addEventListener(
      "input",
      () => {

          status.textContent = "";

      }
  );
