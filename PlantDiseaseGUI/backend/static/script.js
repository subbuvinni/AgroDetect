function predict() {
    const input = document.getElementById("imageInput");
    const result = document.getElementById("result");
    const preview = document.getElementById("preview");

    result.innerText = ""; // clear old text

    if (!input || !input.files || input.files.length === 0) {
        alert("Please select an image first");
        return;
    }

    const file = input.files[0];

    // preview image
    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";

    const formData = new FormData();
    formData.append("image", file); // MUST be 'image'

    result.innerText = "Predicting...";

    fetch("/predict", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                // show backend error
                return response.text().then(text => {
                    throw new Error(text);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log("Server response:", data);
            result.innerHTML =
                `🌿 Disease: <b>${data.disease}</b><br>
         🔍 Confidence: <b>${data.confidence}%</b>`;
        })
        .catch(error => {
            console.error("Fetch error:", error);
            result.innerText = "JS Error: " + error.message;
        });
}