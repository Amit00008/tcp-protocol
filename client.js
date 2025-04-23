import { createConnection } from "node:net";
import readline from 'readline';
import chalk from 'chalk';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: chalk.magentaBright("Client: ")
});

class MyProtocol {
  constructor(port, host) {
    this.port = port;
    this.host = host;
    this.client = null;
    this.connected = false;
    this.reconnecting = false;
    this.retryDelay = 3000;

    this.connect();
    this.handleInput();
  }

  connect() {
    if (this.reconnecting || this.connected) return;

    this.reconnecting = true;

    const socket = createConnection({ port: this.port, host: this.host });

    socket.once("connect", () => {
      console.log(chalk.greenBright("✅ Connected to the server!"));
      this.client = socket;
      this.connected = true;
      this.reconnecting = false;
      this.retryDelay = 3000;
      rl.prompt();

      socket.on("data", (data) => {
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        console.log(chalk.blueBright("📨 Server: ") + data.toString());
        rl.prompt();
      });

      socket.on("close", () => {
        console.log(chalk.redBright("❌ Connection closed."));
        this.connected = false;
        this.client = null;
        this.retry();
      });

      socket.on("error", (err) => {
        console.log(chalk.yellow("⚠️ Socket error after connection:"), chalk.gray(err.message));
      });
    });

    socket.once("error", (err) => {
      if (err.code === "ECONNREFUSED") {
        console.log(chalk.red("🚫 Connection refused. Retrying..."));
      } else {
        console.log(chalk.yellow("⚠️ Connection error:"), chalk.gray(err.message));
      }
      socket.destroy();
      this.retry();
    });
  }

  retry() {
    this.reconnecting = false;
    console.log(chalk.cyan(`🔁 Retrying in ${this.retryDelay / 1000}s...`));
    setTimeout(() => this.connect(), this.retryDelay);
    this.retryDelay = Math.min(this.retryDelay * 2, 30000);
  }

  handleInput() {
    rl.on("line", (input) => {
      if (input.trim().toLowerCase() === "exit") {
        console.log(chalk.magenta("👋 Exiting..."));
        if (this.client) this.client.end();
        rl.close();
      } else if (!this.connected) {
        console.log(chalk.yellow("🔁 Not connected. Please wait..."));
      } else {
        this.client.write(input);
        rl.prompt();
      }
    });
  }
}

const a = new MyProtocol(5001, 'localhost');
