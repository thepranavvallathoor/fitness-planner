const API_KEY = 'AIzaSyCYjU00d-5UMEQ7iah9NnI7H5yvNqfg50s';
const history = [];

async function sendMessage() {
  const input = document.getElementById('user-input');
  const message = input.value.trim();
  if (!message) return;

  addMessage('user', message);
  history.push({ role: 'user', parts: [{ text: message }] });
  input.value = '';

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: 'You are FitBot, a friendly AI fitness coach. Help users with workout tips, meal advice, motivation, and health questions. Keep answers short and encouraging.' }]
          },
          contents: history
        })
      }
    );

    const data = await response.json();
    const reply = data.candidates[0].content.parts[0].text;
    history.push({ role: 'model', parts: [{ text: reply }] });
    addMessage('bot', reply);
  } catch (err) {
    addMessage('bot', 'Sorry, something went wrong. Try again!');
    console.error(err);
  }
}

function addMessage(role, text) {
  const chat = document.getElementById('chat-box');
  const div = document.createElement('div');
  div.className = `message ${role}`;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}
