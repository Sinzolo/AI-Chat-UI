export class ConversationList {
    constructor(conversationList = []) {
        this.conversationList = conversationList
    }

    getConversationList() {
        return this.conversationList;
    }

    addConversation(conversation) {
        this.conversationList.push(conversation);
    }

    removeConversation(conversationIdToDelete) {
        this.conversationList = this.conversationList.filter(conversation => conversation.conversationId !== conversationIdToDelete);
    }

    // getConversationText(conversationId) {
    //     const conversation = this.conversationList.find(conversation => conversation.conversationId === conversationId);
    //     if (conversation === undefined) {
    //         return [];
    //     }
    //     return conversation.getConversation();
    // }

    getConversation(conversationId) {
        return this.conversationList.find(conversation => conversation.conversationId === conversationId) || null;
    }
}