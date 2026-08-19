const input = document.getElementById("jsonInput");

const minifyBtn = document.getElementById("minifyBtn");
const clearBtn = document.getElementById("clearBtn");
const exampleBtn = document.getElementById("exampleBtn");
const copyBtn = document.getElementById("copyBtn");

const result = document.getElementById("result");
const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");

const outputSection =
    document.getElementById("outputSection");

const output =
    document.getElementById("output");

const errorDetails =
    document.getElementById("errorDetails");

const errorMessage =
    document.getElementById("errorMessage");

const originalSize =
    document.getElementById("originalSize");

const minifiedSize =
    document.getElementById("minifiedSize");

const savedSize =
    document.getElementById("savedSize");


function getByteSize(text) {

    return new Blob([text]).size;

}


function minifyJSON() {

    const text = input.value.trim();

    if (!text) {

        showError(
            "Please enter JSON to minify."
        );

        return;
    }


    try {

        const data = JSON.parse(text);

        const minified =
            JSON.stringify(data);


        output.value = minified;


        const originalBytes =
            getByteSize(text);

        const minifiedBytes =
            getByteSize(minified);


        let saved = 0;

        if (originalBytes > 0) {

            saved =
                ((originalBytes - minifiedBytes)
                / originalBytes) * 100;

        }


        originalSize.textContent =
            formatBytes(originalBytes);

        minifiedSize.textContent =
            formatBytes(minifiedBytes);

        savedSize.textContent =
            saved.toFixed(1) + "%";


        result.classList.remove("hidden");

        resultTitle.textContent =
            "JSON Minified Successfully";

        resultMessage.textContent =
            "Unnecessary whitespace and formatting have been removed.";


        errorDetails.classList.add("hidden");

        outputSection.classList.remove("hidden");

    } catch (error) {

        showError(error.message);

    }

}


function showError(message) {

    result.classList.add("hidden");

    outputSection.classList.add("hidden");

    errorDetails.classList.remove("hidden");

    errorMessage.textContent =
        message;

}


function clearAll() {

    input.value = "";

    output.value = "";

    result.classList.add("hidden");

    outputSection.classList.add("hidden");

    errorDetails.classList.add("hidden");

}


function loadExample() {

    input.value = `{
  "name": "Hamoud",
  "age": 22,
  "city": "Benghazi",
  "skills": [
    "Pharmacy",
    "Robotics"
  ],
  "active": true,
  "profile": {
    "website": "example.com",
    "verified": false
  }
}`;

    result.classList.add("hidden");

    outputSection.classList.add("hidden");

    errorDetails.classList.add("hidden");

}


async function copyOutput() {

    if (!output.value) {

        return;
    }


    try {

        await navigator.clipboard.writeText(
            output.value
        );

        copyBtn.textContent =
            "Copied ✓";


        setTimeout(() => {

            copyBtn.textContent =
                "Copy";

        }, 1500);


    } catch (error) {

        copyBtn.textContent =
            "Copy failed";

    }

}


function formatBytes(bytes) {

    if (bytes < 1024) {

        return bytes + " bytes";

    }

    return (
        (bytes / 1024).toFixed(2) +
        " KB"
    );

}


minifyBtn.addEventListener(
    "click",
    minifyJSON
);


clearBtn.addEventListener(
    "click",
    clearAll
);


exampleBtn.addEventListener(
    "click",
    loadExample
);


copyBtn.addEventListener(
    "click",
    copyOutput
);


input.addEventListener(
    "input",
    function () {

        result.classList.add("hidden");

        outputSection.classList.add("hidden");

        errorDetails.classList.add("hidden");

    }
);
