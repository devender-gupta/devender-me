<template>
  <div class="ai-assistant-wrapper">
    <button
      class="chat-toggle-btn"
      :aria-label="isOpen ? 'Close AI Assistant' : 'Open AI Assistant'"
      @click="toggleChat"
    >
      <Transition name="icon-swap" mode="out-in">
        <span v-if="!isOpen" key="open">💬</span>
        <span v-else key="close">✕</span>
      </Transition>
    </button>

    <Transition name="chat-window">
      <div v-show="isOpen" class="chat-window" aria-label="AI Assistant">
        <div class="chat-header">
          <h3>Devender's AI Assistant</h3>
          <p>Ask anything about his stack or experience</p>
        </div>

        <div ref="chatContainer" class="chat-messages">
          <TransitionGroup name="bubble" tag="div" class="bubble-list">
            <div
              v-for="(msg, index) in messages"
              :key="index"
              :class="['message-bubble', msg.role]"
            >
              <MDC v-if="msg.role === 'assistant'" :value="msg.content" tag="div" />
              <p v-else>{{ msg.content }}</p>
            </div>

            <div v-if="isLoading" key="loading" class="message-bubble assistant loading">
              <span class="dot" />
              <span class="dot" />
              <span class="dot" />
            </div>
          </TransitionGroup>
        </div>

        <form class="chat-input-area" @submit.prevent="sendMessage">
          <input
            ref="inputRef"
            v-model="userInput"
            type="text"
            placeholder="Ask something…"
            maxlength="300"
            :disabled="isLoading"
            @keydown.enter.prevent="sendMessage"
          >
          <button type="submit" :disabled="isLoading || !userInput.trim()" aria-label="Send">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </form>
      </div>
    </Transition>
  </div>
</template>

<script setup>
const isOpen = ref(false)
const isLoading = ref(false)
const userInput = ref("")
const chatContainer = ref(null)
const inputRef = ref(null)

const messages = ref([
  {
    role: "assistant",
    content:
      "Hi! I'm Devender's AI assistant. Ask me anything about his full-stack engineering background, technical experience, or projects!"
  }
])

const toggleChat = async () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    await nextTick()
    inputRef.value?.focus()
    scrollToBottom()
  }
}

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

  messages.value.push({ role: "user", content: userText })
  isLoading.value = true
  await scrollToBottom()

  try {
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
/* ── Layout ─────────────────────────────────────────── */
.ai-assistant-wrapper {
  position: fixed;
  bottom: var(--space-6);
  right: var(--space-6);
  z-index: 1000;
  font-family: var(--font-family-base);
}

/* ── Toggle button ───────────────────────────────────── */
.chat-toggle-btn {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-pill);
  background: var(--gradient-brand);
  color: #fff;
  border: none;
  font-size: 22px;
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
  transform: scale(1.08);
  box-shadow: var(--shadow-primary-hover);
}

/* icon swap inside button */
.icon-swap-enter-active,
.icon-swap-leave-active {
  transition: all 0.15s var(--easing-standard);
}

.icon-swap-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.6);
}

.icon-swap-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.6);
}

/* ── Chat window open/close ──────────────────────────── */
.chat-window {
  position: absolute;
  bottom: 72px;
  right: 0;
  width: 340px;
  height: 470px;
  background: var(--color-surface);
  border: var(--border-strong);
  border-radius: var(--radius-lg);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform-origin: bottom right;
}

.chat-window-enter-active {
  transition: all 0.25s var(--easing-standard);
}

.chat-window-leave-active {
  transition: all 0.2s var(--easing-standard);
}

.chat-window-enter-from,
.chat-window-leave-to {
  opacity: 0;
  transform: scale(0.85) translateY(16px);
}

/* ── Header ──────────────────────────────────────────── */
.chat-header {
  padding: var(--space-4);
  background: var(--color-bg);
  border-bottom: var(--border-strong);
  flex-shrink: 0;
}

.chat-header h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: var(--font-weight-semibold);
  background: var(--gradient-brand);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.chat-header p {
  margin: var(--space-1) 0 0;
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

/* ── Message list ────────────────────────────────────── */
.chat-messages {
  flex: 1;
  padding: var(--space-4);
  overflow-y: auto;
  scroll-behavior: smooth;
}

.bubble-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

/* bubble slide-in */
.bubble-enter-active {
  transition: all 0.22s var(--easing-standard);
}

.bubble-leave-active {
  transition: all 0.15s var(--easing-standard);
  position: absolute;
}

.bubble-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.bubble-leave-to {
  opacity: 0;
}

.message-bubble {
  max-width: 82%;
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

/* Markdown inside assistant bubbles */
.message-bubble.assistant :deep(p) {
  margin: 0 0 var(--space-2);
}

.message-bubble.assistant :deep(p:last-child) {
  margin-bottom: 0;
}

.message-bubble.assistant :deep(ul),
.message-bubble.assistant :deep(ol) {
  margin: var(--space-1) 0 var(--space-2) var(--space-4);
  padding: 0;
}

.message-bubble.assistant :deep(li) {
  margin-bottom: var(--space-1);
  line-height: 1.5;
}

.message-bubble.assistant :deep(strong) {
  font-weight: var(--font-weight-semibold);
  color: var(--color-heading);
}

.message-bubble.assistant :deep(code) {
  font-family: ui-monospace, monospace;
  font-size: 0.8rem;
  background: var(--color-surface-muted);
  padding: 0.1em 0.35em;
  border-radius: var(--radius-sm);
}

.message-bubble.assistant :deep(pre) {
  background: var(--color-surface-muted);
  border-radius: var(--radius-sm);
  padding: var(--space-3);
  overflow-x: auto;
  margin: var(--space-2) 0;
}

.message-bubble.assistant :deep(pre code) {
  background: none;
  padding: 0;
}

/* ── Typing indicator ────────────────────────────────── */
.loading {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: var(--space-3);
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: var(--radius-pill);
  background: var(--color-text-muted);
  animation: bounce 1.2s infinite ease-in-out;
}

.dot:nth-child(1) {
  animation-delay: 0s;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%,
  60%,
  100% {
    transform: translateY(0);
    opacity: 0.4;
  }

  30% {
    transform: translateY(-6px);
    opacity: 1;
  }
}

/* ── Input area ──────────────────────────────────────── */
.chat-input-area {
  padding: var(--space-3);
  background: var(--color-bg);
  border-top: var(--border-strong);
  display: flex;
  gap: var(--space-2);
  flex-shrink: 0;
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
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    opacity var(--duration-fast) var(--easing-standard),
    transform var(--duration-fast) var(--easing-standard);
}

.chat-input-area button:hover:not(:disabled) {
  transform: scale(1.05);
}

.chat-input-area button:disabled {
  background: var(--color-surface-muted);
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
