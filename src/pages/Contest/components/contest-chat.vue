<template>
    <div class="chat-container">
        <div class="chat-header">Chat</div>
        <div class="chat-messages">
            <div
                v-for="message in messages"
                :key="message.id"
                class="message"
                :class="{ 'my-message': message.isMine }"
            >
                <div class="message-sender">{{ message.sender }}</div>
                <div class="message-text">{{ message.text }}</div>
            </div>
        </div>
        <div class="chat-input">
            <input
                type="text"
                v-model="newMessage"
                class="input-field"
                placeholder="Type a message"
                @keydown.enter="sendMessage"
            />
            <button class="send-button" @click="sendMessage">Send</button>
        </div>
    </div>
</template>

<script>
import io from "socket.io-client";

export default {
    name: "contest-chat",
    data() {
        return {
            socket: null,
            messages: [],
        };
    },
    computed: {
        user() {
            return this.$store.getters["user/getUser"];
        },
    },
    mounted() {
        this.socket = io("https://tournament-production.up.railway.app/");
        this.socket.on("message", this.handleMessage);
    },
    beforeUnmount() {
        this.socket.off("message", this.handleMessage);
        this.socket.disconnect();
    },
    methods: {
        sendMessage(message) {
            this.socket.emit("message", {
                message,
                userId: this.user.id,
                contestId: this.$route.params.contest_id,
            });
        },
        handleMessage(message) {
            this.messages.push(message);
        },
    },
};
</script>

<style scoped>
.chat-container {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.chat-header {
    padding: 16px;
    background-color: #333;
    color: #fff;
    font-size: 18px;
}

.chat-messages {
    flex-grow: 1;
    overflow-y: scroll;
    padding: 16px;
}

.message {
    margin-bottom: 8px;
    padding: 8px;
    border-radius: 8px;
    background-color: #f1f1f1;
}

.my-message {
    align-self: flex-end;
    background-color: #007bff;
    color: #fff;
}

.message-sender {
    font-weight: bold;
}

.message-text {
    margin-top: 4px;
}

.chat-input {
    display: flex;
    align-items: center;
    padding: 8px;
    background-color: #f1f1f1;
}

.input-field {
    flex-grow: 1;
    padding: 8px;
    border-radius: 4px;
    border: none;
}

.send-button {
    margin-left: 8px;
    padding: 8px;
    border-radius: 4px;
    border: none;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
}
</style>
