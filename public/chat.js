import { chatBox, userInputElement, strongUserElement, strongAssistantElement } from './elements.js';
import { debugMessage } from './main.js';


// Function to display user messages
export function displayUserMessage(userInput) {
    const userMessage = document.createElement('p');
    userMessage.classList.add('user-message');
    userMessage.appendChild(strongUserElement.cloneNode(true));
    userMessage.appendChild(document.createTextNode(userInput));
    chatBox.appendChild(userMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to display assistant messages
export function displayAssistantMessage(assistantResponse) {
    const assistantMessage = document.createElement('p');
    assistantMessage.classList.add('assistant-message');
    assistantMessage.appendChild(strongAssistantElement.cloneNode(true));
    assistantResponse.split('\n').forEach((text) => {
        assistantMessage.appendChild(document.createTextNode(text));
        assistantMessage.appendChild(document.createElement('br'));
    });
    chatBox.appendChild(assistantMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to fetch assistant response
async function fetchAssistantResponse(currentConversation) {
    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messages: currentConversation }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error fetching assistant response:', error);
        return 'Sorry, there was an error processing your request.';
    }
}

// Function to handle sending a message
export async function sendMessage(currentConversation) {
    console.log("sendMessage called", currentConversation);
    const userInput = userInputElement.value.trim();
    userInputElement.value = '';
    if (userInput === '') return;

    if (userInput.toLowerCase().startsWith("prompt:")) {
        currentConversation = currentConversation.filter(msg => msg.role !== 'system');
        currentConversation.push({ role: 'system', content: userInput.substring(7) });
        return currentConversation;
    }

    // Add user message to conversation history
    currentConversation.push({ role: 'user', content: userInput });

    // Display user message
    displayUserMessage(userInput);

    // Fetch and display assistant response
    const assistantResponse = await fetchAssistantResponse(currentConversation);
    currentConversation.push({ role: 'assistant', content: assistantResponse });

    // Display assistant message
    displayAssistantMessage(assistantResponse);

    return currentConversation;
}
