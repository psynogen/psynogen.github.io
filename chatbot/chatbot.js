const chatHistory = document.getElementById('chat-history');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Replace with your actual OpenAI API key
const apiKey = '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';

sendButton.addEventListener('click', handleUserInput);

function handleUserInput() {
  const userMessage = userInput.value;
  appendMessage('User', userMessage);

  getAIResponse(userMessage)
    .then(response => {
      const aiMessage = response.choices[0].text;
	  
      appendMessage('AI', aiMessage);
    })
    .catch(error => {
      console.error('Error fetching AI response:', error);
    });

  userInput.value = '';
}

async function getAIResponse(userMessage) {
  const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ${apiKey}'
    },
    body: JSON.stringify({
      prompt: userMessage,
      max_tokens: 50
    })
  });

  return response.json();
}

function appendMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add(sender.toLowerCase());
  messageElement.textContent = `${sender}: ${message}`;
  chatHistory.appendChild(messageElement);
  chatHistory.scrollTop = chatHistory.scrollHeight;
}