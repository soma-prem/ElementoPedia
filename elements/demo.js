

async function sendPrompt() {

    const keyResponse = await fetch("gemini.php");
    const keyData = await keyResponse.json();
    const apiKey = keyData.apiKey; // now you have the key

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const userInput = document.getElementById("prompt").value;
    const responseBox = document.getElementById("response");
    const progressBar = document.getElementById("progress-bar");

    // Clear previous response
    responseBox.innerHTML = "";

    // Reset and show progress bar
    progressBar.style.display = "block";
    progressBar.style.width = "0%";

    // Animate progress bar to full in 6 seconds
    setTimeout(() => {
        progressBar.style.width = "100%";
    }, 10);

    const promptText = `You are EleMind, an AI assistant used on a website called Elementopedia that answers questions related to the periodic table, elements, atomic structure, their history, discovery, properties, uses, and chemistry in general.
If the user's question is about any element, chemical properties, atomic number, discovery, or anything related to chemistry or science education, give an accurate answer.
If the question is completely unrelated to chemistry, atomic science, or elements (like about movies, sports, or food), reply: "EleMind here! I can only answer questions related to the periodic table and chemistry. That question is outside my element!"
Now answer this question: ${userInput}`;

    const requestBody = {
        contents: [
            {
                parts: [
                    { text: promptText }
                ]
            }
        ]
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        const result = await response.json();

        setTimeout(() => {
            progressBar.style.display = "none";
            responseBox.innerHTML =
                result.candidates?.[0]?.content?.parts?.[0]?.text || "No response text found. Try Again!";
        }, 2000);

    } catch (error) {
        setTimeout(() => {
            progressBar.style.display = "none";
            responseBox.innerHTML = `Request failed: ${error.message}`;
        }, 2000);
    }
}
