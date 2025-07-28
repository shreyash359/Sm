const API_KEY = "AIzaSyBSXNeOX13IqqE0idIZb7vVZMQvB1gQjrw";

async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  addMessage("You", message, "user");

  input.value = "";

  try {
    const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_KEY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }]
      })
    });

    const data = await res.json();
    const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand.";
    addMessage("RBD", botReply, "bot");
  } catch (err) {
    console.error(err);
    addMessage("RBD", "Something went wrong!", "bot");
  }
}

function addMessage(sender, text, className) {
  const chat = document.getElementById("chat");
  const messageDiv = document.createElement("div");
  messageDiv.className = "message " + className;
  messageDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chat.appendChild(messageDiv);
  chat.scrollTop = chat.scrollHeight;
}
