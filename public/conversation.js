export class Conversation {
    constructor(conversation = [], conversationId = Date.now().toString()) {
        this.conversation = conversation;
        this.conversationId = conversationId;
    }

    setConversation(conversation) {
        this.conversation = conversation;
    }

    setConversationId(conversationId) {
        this.conversationId = conversationId;
    }

    getConversationArray() {
        return this.conversation;
    }

    getConversationId() {
        return this.conversationId;
    }
}