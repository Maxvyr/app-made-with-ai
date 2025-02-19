const apiKey = "YOUR_API_KEY_HERE"; // Replace with your OpenAI API key

async function generateImage() {
  const prompt = document.getElementById("prompt").value.trim();
  const status = document.getElementById("status");
  const imageElement = document.getElementById("generated-image");

  if (!prompt) {
    status.textContent = "Please enter a prompt!";
    return;
  }

  status.textContent = "Generating image...";
  imageElement.style.display = "none";

  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
        response_format: "url",
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const imageUrl = data.data[0].url;

    imageElement.src = imageUrl;
    imageElement.style.display = "block";
    status.textContent = "Image generated successfully!";
  } catch (error) {
    status.textContent = `Error: ${error.message}`;
    console.error("Error generating image:", error);
  }
}
