// import { chatBox, strongUserElement, strongAssistantElement } from './elements.js';

// Modify the sendMessage function to accumulate all messages in a conversation history array
// const conversationHistory = [];
// let currentConversationId = null;
// let conversationHistories = JSON.parse(localStorage.getItem('conversationHistories')) || {};








import { userInputElement, sendButton, conversationListElement, newConversationButton } from './elements.js';
import { sendMessage } from './chat.js';
import { ConversationManager } from './conversationManager.js';

const debugMessages = true;

const conversationManager = new ConversationManager();

// Function to log debug messages
export function debugMessage(string) {
    if (debugMessages) console.log(string);
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function processAndManageConversation() {
    const currentConversation = await sendMessage(conversationManager.getCurrentConversation().getConversationArray());
    console.log("currentConversation: gotten from sendmessage", currentConversation);
    conversationManager.saveCurrentConversation(currentConversation);
    conversationManager.updateConversationList();
}

document.addEventListener('DOMContentLoaded', async () => {
    await conversationManager.loadConversationListFromLocalStorage();
    conversationManager.updateConversationList();

    sendButton.addEventListener('click', () => {
        processAndManageConversation();
    });
    userInputElement.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            processAndManageConversation();
        }
    });

    newConversationButton.addEventListener('click', () => {
        conversationManager.startNewConversation();
    });
    conversationListElement.addEventListener('change', (event) => {
        conversationManager.loadConversationToScreen(event.target.value);
    });
});














// async function sendMessage() {
//     const userInputElement = document.getElementById('user-input');
//     const userInput = userInputElement.value;
//     userInputElement.value = '';
//     if (userInput.trim() === '') return;
//     if (userInput.startsWith("prompt:") || userInput.startsWith("Prompt:")) {
//         for (let i = 0; i < conversationHistory.length; i++) {
//             if (conversationHistory[i].role === 'system') {
//                 conversationHistory.splice(i, 1);
//                 break;
//             }
//         }
//         conversationHistory.push({ role: 'system', content: userInput.substring(7) });
//         return;
//     }

//     // Add user message to conversation history
//     conversationHistory.push({ role: 'user', content: userInput });
//     // console.log("conversationHistory: ", conversationHistory);

//     // Displaying the user's message
//     const userMessage = document.createElement('p');
//     userMessage.classList.add('user-message');
//     userMessage.appendChild(strongUserElement.cloneNode(true));
//     userMessage.appendChild(document.createTextNode(userInput));
//     chatBox.appendChild(userMessage);
//     chatBox.scrollTop = chatBox.scrollHeight;

//     const response = await fetch('/chat', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             messages: conversationHistory, // Send entire conversation history
//         }),
//     });

//     const data = await response.json();
//     const assistantResponse = data.choices[0].message.content;

//     // Add assistant message to conversation history
//     conversationHistory.push({ role: 'assistant', content: assistantResponse });
//     // Save the updated conversationHistory to localStorage
//     localStorage.setItem('conversationHistory', JSON.stringify(conversationHistory));

//     // Displaying the assistant's message
//     const assistantMessage = document.createElement('p');
//     assistantMessage.classList.add('assistant-message');
//     assistantMessage.appendChild(strongAssistantElement.cloneNode(true));
//     // assistantMessage.appendChild(document.createTextNode(assistantResponse));
//     assistantResponse.split('\n').forEach((text) => {
//         assistantMessage.appendChild(document.createTextNode(text));
//         assistantMessage.appendChild(document.createElement('br'));
//     });
//     chatBox.appendChild(assistantMessage);
//     chatBox.scrollTop = chatBox.scrollHeight;
// }