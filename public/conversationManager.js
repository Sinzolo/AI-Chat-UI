import { debugMessage, sleep } from './main.js';
import { chatBox, conversationListElement } from './elements.js';
import { displayUserMessage, displayAssistantMessage } from './chat.js';
import { Conversation } from './conversation.js';
import { ConversationList } from './conversationList.js';

export class ConversationManager {
    constructor(conversationList = new ConversationList(), currentConversationId = null) {
        this.conversationList = conversationList
        this.currentConversationId = currentConversationId;
    }

    getCurrentConversation() {
        return this.conversationList.getConversation(this.currentConversationId) || new Conversation();
    }

    getSpecificConversation(conversationId) {
        return this.conversationList.getConversation(conversationId);
    }

    getConversationList() {
        return this.conversationList.getConversationList();
    }

    saveConversationListToLocalStorage() {
        debugMessage('Saving conversation list');
        let conversationList = this.conversationList.getConversationList();
        let jsonConversationList = [];
        for (let i = 0; i < conversationList.length; i++) {
            console.log("conversationList[i]: ", conversationList[i]);
            jsonConversationList[i] = conversationList[i].getConversationArray();
            console.log("jsonConversationList[i]: ", jsonConversationList[i]);
        } 
        localStorage.setItem('conversationList', JSON.stringify(jsonConversationList));
    }

    async loadConversationListFromLocalStorage() {
        debugMessage('Loading conversation list');
        let jsonConversationList = JSON.parse(localStorage.getItem('conversationList'));
        if (jsonConversationList === null) {
            return;
        }
        let conversationList = [];
        for (let i = 0; i < jsonConversationList.length; i++) {
            conversationList[i] = new Conversation(jsonConversationList[i]);
            await sleep(1);
        }
        this.conversationList = new ConversationList(conversationList);
    }

    startNewConversation() {
        if (this.currentConversationId === null) {
            debugMessage('Not starting new conversation, already in a new conversation window')
            return;
        }
        this.saveCurrentConversation();
        this.currentConversationId = null;
        chatBox.innerHTML = '';
        this.updateConversationList();
    }

    saveCurrentConversation(conversation) {
        console.log('Saving conversation', conversation);
        if (this.currentConversationId === null) {
            const newConversation = new Conversation();
            newConversation.setConversation(conversation);
            this.conversationList.addConversation(newConversation);
            this.currentConversationId = newConversation.getConversationId();
        }
        else {
            const currentConversation = this.conversationList.getConversation(this.currentConversationId);
            currentConversation.setConversation(conversation);
        }
        this.saveConversationListToLocalStorage();
    }

    loadConversationToScreen(conversationId) {
        debugMessage(`Loading conversation ${conversationId}`);
        this.currentConversationId = conversationId;
        const conversation = this.conversationList.getConversation(conversationId);
        chatBox.innerHTML = '';
        conversation.getConversationArray().forEach(message => {
            console.log("message: ", message);
            if (message.role === 'user') {
                displayUserMessage(message.content);
            } else {
                displayAssistantMessage(message.content);
            }
        });
    }

    updateConversationList() {
        debugMessage('Updating conversation list');
        conversationListElement.innerHTML = '';
        if (this.currentConversationId === null) {
            const nullListItem = document.createElement('option');
            nullListItem.textContent = 'null';
            nullListItem.value = null;
            conversationListElement.appendChild(nullListItem);
        }
        this.conversationList.getConversationList().forEach(conversation => {
            const listItem = document.createElement('option');
            listItem.textContent = `Conversation ${conversation.getConversationId()}`;
            listItem.value = conversation.getConversationId();
            conversationListElement.appendChild(listItem);
        });
    }
}