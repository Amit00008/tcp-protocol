import { createServer } from "node:net";
import readline from 'readline';
import chalk from 'chalk';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: chalk.cyanBright("Server: ")
});

class MyServer {
  constructor(port, host) {
    this.server = createServer((socket) => {
      console.log(chalk.green("✅ Client connected"));
      rl.prompt();
      this.handleInput();
      this.socket = socket;

      this.listenData();

      socket.on("end", () => {
        rl.close();
        console.log(chalk.redBright("❌ Client disconnected!!"));
      });

      socket.on("error", (err) => {
        rl.close();
        console.log(chalk.yellow("⚠️ Socket error:"), chalk.gray(err.message));
      });
    });

    this.server.listen(port, host, () => {
      console.log(chalk.magentaBright("🚀 Server Started"));
    });
  }

  listenData() {
    this.socket.on('data', (data) => {
      readline.clearLine(process.stdout, 0);
      readline.cursorTo(process.stdout, 0);
      console.log(chalk.blueBright("📨 Client:"), data.toString());
      rl.prompt();
    });
  }

  handleInput() {
    rl.on("line", (input) => {
      if (input.trim().toLowerCase() === "exit") {
        console.log(chalk.magenta("👋 Server shutting down..."));
        this.socket.end();
        rl.close();
      } else {
        this.socket.write(input);
        rl.prompt();
      }
    });
  }
}

const a = new MyServer(5001, 'localhost');
