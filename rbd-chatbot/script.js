const chatbox = document.getElementById('chatbox');
const input = document.getElementById('userInput');

async function sendMessage() {
  const userText = input.value.trim();
  if (!userText) return;

  appendMessage('You', userText);
  input.value = '';

  appendMessage('RBD', 'Thinking...');

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta3/models/chat-bison-001:generateMessage?key=AIzaSyCqBqmrXC6GsVxHCwDVvaMRjMCerJ5yA7A', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: { messages: [{ author: 'user', content: userText }] },
        temperature: 0.7
      })
    });

    const data = await response.json();
    const botMessage = data?.candidates?.[0]?.content || 'Sorry, I didn’t get that.';
    
    chatbox.lastChild.remove(); // remove "Thinking..."
    appendMessage('RBD', botMessage);
  } catch (error) {
    chatbox.lastChild.remove();
    appendMessage('RBD', 'Error connecting to API.');
    console.error(error);
  }
}

function appendMessage(sender, message) {
  const msg = document.createElement('div');
  msg.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatbox.appendChild(msg);
  chatbox.scrollTop = chatbox.scrollHeight;
}
