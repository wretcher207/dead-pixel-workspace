/**
 * AI Receptionist Chat Widget
 * Connects to n8n webhook for AI-powered business chat.
 * No dependencies — vanilla JS.
 */

(function () {
  'use strict';

  // ─── Configuration ───────────────────────────────────────
  // Change this to your n8n webhook URL after setup
  const WEBHOOK_URL = 'http://localhost:5678/webhook/receptionist-chat';

  // How long to wait for a response before showing an error (ms)
  const TIMEOUT_MS = 30000;

  // ─── Session ─────────────────────────────────────────────
  function getSessionId() {
    let id = localStorage.getItem('receptionist_session_id');
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem('receptionist_session_id', id);
    }
    return id;
  }

  const sessionId = getSessionId();

  // ─── DOM References ──────────────────────────────────────
  const messagesEl = document.getElementById('messages');
  const inputEl = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');

  // ─── State ───────────────────────────────────────────────
  let isWaiting = false;

  // ─── Message Rendering ───────────────────────────────────
  function addMessage(text, sender) {
    const wrapper = document.createElement('div');
    wrapper.className = `message ${sender}`;

    const avatar = document.createElement('div');
    avatar.className = 'msg-avatar';
    avatar.textContent = sender === 'bot' ? 'A' : 'Y';

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = text;

    wrapper.appendChild(avatar);
    wrapper.appendChild(bubble);
    messagesEl.appendChild(wrapper);
    scrollToBottom();
  }

  function showTyping() {
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.id = 'typing';
    indicator.innerHTML = '<span></span><span></span><span></span>';
    messagesEl.appendChild(indicator);
    scrollToBottom();
  }

  function hideTyping() {
    const el = document.getElementById('typing');
    if (el) el.remove();
  }

  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  // ─── API Communication ───────────────────────────────────
  async function sendMessage(text) {
    if (isWaiting || !text.trim()) return;

    isWaiting = true;
    sendBtn.disabled = true;
    addMessage(text, 'user');
    inputEl.value = '';
    autoResizeInput();
    showTyping();

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          session_id: sessionId,
          timestamp: new Date().toISOString()
        }),
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      hideTyping();
      addMessage(data.response || 'Sorry, I didn\'t get a response. Please try again.', 'bot');
    } catch (err) {
      clearTimeout(timeout);
      hideTyping();

      if (err.name === 'AbortError') {
        addMessage('Sorry, the response took too long. Please try again in a moment.', 'bot');
      } else if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        addMessage('I\'m having trouble connecting right now. Make sure the server is running and try again.', 'bot');
      } else {
        addMessage('Something went wrong. Please try again.', 'bot');
        console.error('Chat error:', err);
      }
    } finally {
      isWaiting = false;
      sendBtn.disabled = false;
      inputEl.focus();
    }
  }

  // ─── Input Handling ──────────────────────────────────────
  function autoResizeInput() {
    inputEl.style.height = 'auto';
    inputEl.style.height = Math.min(inputEl.scrollHeight, 120) + 'px';
  }

  inputEl.addEventListener('input', autoResizeInput);

  inputEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputEl.value);
    }
  });

  sendBtn.addEventListener('click', function () {
    sendMessage(inputEl.value);
  });

  // ─── Greeting ────────────────────────────────────────────
  // Show the AI greeting after a short delay (feels more natural)
  setTimeout(function () {
    addMessage('Hi! This is Amy at Aroostook Family Dental. How can I help you today?', 'bot');
  }, 600);

  // ─── New Session Button (optional — double-click header) ─
  document.querySelector('.chat-header').addEventListener('dblclick', function () {
    if (confirm('Start a new conversation? This will clear chat history.')) {
      localStorage.removeItem('receptionist_session_id');
      messagesEl.innerHTML = '';
      location.reload();
    }
  });

})();
