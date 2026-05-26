<template>
  <div class="ai-assistant-wrapper">
    <button class="chat-toggle-btn" aria-label="Toggle AI Assistant" @click="isOpen = !isOpen">
      <span v-if="!isOpen">💬</span>
      <span v-else>✕</span>
    </button>

    <div v-if="isOpen" class="chat-window">
      <div class="chat-header">
        <h3>Devender's AI Assistant</h3>
        <p>Ask anything about my stack or history</p>
      </div>

      <div ref="chatContainer" class="chat-messages">
        <div v-for="(msg, index) in messages" :key="index" :class="['message-bubble', msg.role]">
          <p>{{ msg.content }}</p>
        </div>
        <div v-if="isLoading" class="message-bubble assistant loading">
          <p>Typing...</p>
        </div>
      </div>

      <form class="chat-input-area" @submit.prevent="sendMessage">
        <input
          v-model="userInput"
          type="text"
          placeholder="e.g., Does he know Node.js?"
          :disabled="isLoading"
        >
        <button type="submit" :disabled="isLoading || !userInput.trim()">Send</button>
      </form>
    </div>
  </div>
</template>

<script setup>
const isOpen = ref(false)
const isLoading = ref(false)
const userInput = ref("")
const chatContainer = ref(null)

const messages = ref([
  {
    role: "assistant",
    content:
      "Hi! I'm Devender's AI assistant. Ask me anything about his full-stack engineering background, technical experience, or projects!"
  }
])

// Auto-scroll logic to focus on fresh replies
const scrollToBottom = async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value) return

  const userText = userInput.value.trim()
  userInput.value = ""

  // Push user message to UI track
  messages.value.push({ role: "user", content: userText })
  isLoading.value = true
  await scrollToBottom()

  try {
    // Send full conversational chain structure up to our server handler
    const data = await $fetch("/api/chat", {
      method: "POST",
      body: {
        messages: messages.value.map((m) => ({ role: m.role, content: m.content }))
      }
    })

    if (data?.message) {
      messages.value.push({ role: "assistant", content: data.message })
    }
  } catch {
    messages.value.push({
      role: "assistant",
      content: "Sorry, I hit a slight connection glitch. Please try asking again!"
    })
  } finally {
    isLoading.value = false
    await scrollToBottom()
  }
}
</script>

<style scoped>
.ai-assistant-wrapper {
  position: fixed;
  bottom: var(--space-6);
  right: var(--space-6);
  z-index: 1000;
  font-family: var(--font-family-base);
}

.chat-toggle-btn {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-pill);
  background: var(--gradient-brand);
  color: #fff;
  border: none;
  font-size: 24px;
  cursor: pointer;
  box-shadow: var(--shadow-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    transform var(--duration-fast) var(--easing-standard),
    box-shadow var(--duration-fast) var(--easing-standard);
}

.chat-toggle-btn:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-primary-hover);
}

.chat-window {
  position: absolute;
  bottom: 72px;
  right: 0;
  width: 340px;
  height: 450px;
  background: var(--color-surface);
  border: var(--border-strong);
  border-radius: var(--radius-lg);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  padding: var(--space-4);
  background: var(--color-bg);
  border-bottom: var(--border-strong);
}

.chat-header h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: var(--font-weight-semibold);
  background: var(--gradient-brand);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.chat-header p {
  margin: var(--space-1) 0 0;
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.chat-messages {
  flex: 1;
  padding: var(--space-4);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.message-bubble {
  max-width: 80%;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--color-text);
}

.message-bubble.user {
  background: var(--color-primary);
  color: #fff;
  align-self: flex-end;
  border-bottom-right-radius: 2px;
}

.message-bubble.assistant {
  background: var(--color-surface-soft);
  align-self: flex-start;
  border-bottom-left-radius: 2px;
}

.message-bubble p {
  margin: 0;
}

.loading {
  color: var(--color-text-dim);
  font-style: italic;
}

.chat-input-area {
  padding: var(--space-3);
  background: var(--color-bg);
  border-top: var(--border-strong);
  display: flex;
  gap: var(--space-2);
}

.chat-input-area input {
  flex: 1;
  background: var(--color-surface-soft);
  border: var(--border-strong);
  border-radius: var(--radius-sm);
  padding: var(--space-2) var(--space-3);
  color: var(--color-text);
  font-size: 0.875rem;
  font-family: var(--font-family-base);
  transition: border-color var(--duration-fast) var(--easing-standard);
}

.chat-input-area input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.chat-input-area button {
  background: var(--gradient-brand);
  color: #fff;
  border: none;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  font-weight: var(--font-weight-medium);
  font-family: var(--font-family-base);
  cursor: pointer;
  transition: opacity var(--duration-fast) var(--easing-standard);
}

.chat-input-area button:disabled {
  background: var(--color-surface-muted);
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
