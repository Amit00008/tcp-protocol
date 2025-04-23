# 🧠 TCP Chat Client-Server (Node.js)

A simple command-line chat application using **TCP sockets** in **Node.js**, built with a colorful and interactive CLI using [`chalk`](https://www.npmjs.com/package/chalk) and `readline`.

---

## 🚀 Features

- Bi-directional communication between client and server.
- Reconnect logic with exponential backoff on the client side.
- Clean CLI interface with colorful messages using `chalk`.
- Handles client disconnection and errors gracefully.

---

## 📦 Requirements

- Node.js (v16 or later)
- npm (Node Package Manager)

---

## 🛠 Installation

```bash
git clone https://github.com/Amit00008/tcp-protocol
cd tcp-protocol
npm install
```

---

## 🚦 Usage

### 1. Start the Server

```bash
node server.js
```

### 2. Start the Client (in a new terminal)

```bash
node client.js
```

---

## 📸 Preview

> Sample Output:

```
🚀 Server Started
✅ Client connected
📨 Client: Hello from client!
```

```
✅ Connected to the server!
📨 Server: Welcome!
```

---

## 🧱 Project Structure

```
.
├── client.js       # TCP client logic with reconnect strategy
├── server.js       # TCP server logic with input/output
├── package.json
└── README.md       # You're reading this 😉
```

---

## 📦 Dependencies

- [chalk](https://www.npmjs.com/package/chalk) — for CLI colors
- Node's built-in:
  - `net` — for TCP connection
  - `readline` — for CLI interaction

---

## 💡 Commands

- Type your messages and press `Enter` to send.
- Type `exit` to quit the client or server.

---

## 🧪 Development Tips

- You can open **two terminal tabs** to test communication between client and server.
- Adjust the port and host in `client.js` and `server.js` if needed.

---

## 📝 License

MIT — feel free to use and modify!
