document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const userInput = document.querySelector("textarea").value;
  const spinner = document.querySelector("#spinner");
  const output = document.querySelector("#output");

  spinner.style.display = "block";
  output.textContent = "";

  try {
    const response = await fetch("/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: userInput }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    output.textContent = data.translation;
  } catch (error) {
    console.error("Error fetching translation:", error);
    output.textContent = "Error fetching translation.";
  } finally {
    spinner.style.display = "none";
  }
});
const textarea = document.querySelector("textarea");

textarea.addEventListener("input", () => {
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
});

textarea.dispatchEvent(new Event("input"));
