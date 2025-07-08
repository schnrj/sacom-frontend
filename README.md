# SACOM Frontend

A modular, professional frontend built for an LLM wrapper application. This UI connects seamlessly with a Django backend via REST APIs and WebSockets to deliver real-time chat, speech interaction, domain-specific knowledge access, and extensible LLM tooling.

---

## 🚀 Features

### 1. 💬 Chat and Speech Interface
- Real-time chat with AI responses
- Microphone support for speech-to-text  
  → `POST /api/v1/speech/process/`
- Optional audio playback (text-to-speech)
- Message history (user & AI)
- Typing indicator while awaiting responses
- Message handling via  
  → `POST /api/v1/chat/message/send/`  
  → WebSocket: `ws://localhost:8000/ws/chat/{session_id}/`

---

### 2. 📚 Knowledge Domain Selector
- Select domain (e.g., Biblical Texts, Buddhist Teachings, etc.)
- Fetch domains → `GET /api/v1/content/domains/`
- Switch domain → `POST /api/v1/content/domain/switch/`
- Upload `.txt` file for custom domain (if backend supports it)

---

### 3. 🧠 Response Type Configuration
- Choose interaction styles:
  - Daily Guidance/Quotes
  - Interpretation
  - Conversation
  - Therapeutic Dialogue
- Selected type passed to  
  → `POST /api/v1/chat/session/create/`

---

### 4. ⚙️ LLM Provider and Settings Panel
- Dynamic settings sidebar/modal
- Fetch providers → `GET /api/v1/llm/providers/`
- Select provider, adjust temperature, max tokens, etc.
- Show provider status, errors, and logs (if any)

---

### 5. 🧩 Plugin Architecture Demonstration
- Plugins UI for demo purposes
- Activate/deactivate plugins (UI only)
- Placeholder for "Add Plugin" feature (extensibility)

---

### 6. 🔍 Context and Content Preview
- Context preview from selected domain
- Expandable panel for domain snippets
- (Optional) Search within domain (calls backend if available)

---

### 7. 🌐 API Integration Readiness
- Modular state management (easy backend binding)
- Full API lifecycle: loading, success, and error states
- Real-time chat support via WebSocket  
  → `ws://localhost:8000/ws/chat/{session_id}/`

---

### 8. 🧑‍💻 Professional & Accessible Design
- Modern, responsive UI (mobile + desktop)
- ARIA support and keyboard navigation
- Color schemes for domain and response types
- Tooltips and help icons for guided usage

---

### 9. 📖 Documentation & Extensibility
- "Help" modal explaining architecture
- Placeholder UI for:
  - Advanced context injection
  - Plugin marketplace
- Components structured for:
  - Future domain additions
  - New LLM providers
  - Plugin configuration

---

## 🔧 Tech Stack

- **Frontend**: React + TailwindCSS (via lovable.dev)
- **State Management**: Context API / Custom hooks
- **API Integration**: REST + WebSocket (via Django backend)
- **Speech-to-Text**: Backend-powered via `/api/v1/speech/process/`

---

## 🛠 Development Setup

```bash
# Clone the repository
git clone https://github.com/schnrj/sacom-frontend.git
cd sacom-frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

---


## 🧪 Backend Endpoints Reference

| Feature | Method | Endpoint |
|--------|--------|----------|
| Send Chat Message | POST | `/api/v1/chat/message/send/` |
| Start Session | POST | `/api/v1/chat/session/create/` |
| Process Speech | POST | `/api/v1/speech/process/` |
| Fetch Domains | GET | `/api/v1/content/domains/` |
| Switch Domain | POST | `/api/v1/content/domain/switch/` |
| Fetch LLM Providers | GET | `/api/v1/llm/providers/` |
| WebSocket Chat | WS | `ws://localhost:8000/ws/chat/{session_id}/` |

---

## 📦 Future Improvements

- Advanced context injection and search
- Upload and manage custom domain content
- Plugin marketplace UI
- User accounts and session history

---

## 🤝 Contributing

1. Fork the repo
2. Create a new branch (`feat/your-feature`)
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under [MIT License](LICENSE).

---

## 🙋 Help

Use the built-in **Help modal** in the UI for architectural guidance and backend integration comments.
