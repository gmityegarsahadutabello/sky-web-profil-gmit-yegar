# Web Profil KP — Run Instructions

This project is a static website. Below are simple ways to run it locally and debug with VS Code.

Options (choose one):

- npm (recommended if you have Node.js):

  1. Install dependencies:

     ```powershell
     npm install
     ```

  2. Start the static server (serves at `http://localhost:8080`):

     ```powershell
     npm start
     ```

  3. In VS Code, open the Run and Debug view and choose the configuration `Launch Chrome (http://localhost:8080)` then press Start. It will open `Beranda.html` on the server.

- Python (if you have Python installed):

  1. From the project root run:

     ```powershell
     python -m http.server 8080
     ```

  2. Open `http://localhost:8080/Beranda.html` in Chrome.

  3. In VS Code choose the `Launch Chrome (http://localhost:8080)` debug configuration.

- Live Server VS Code extension:

  1. Install the `Live Server` extension.
  2. Right-click `Beranda.html` and choose `Open with Live Server`.
  3. Use the `Launch Chrome (http://localhost:8080)` config or the `Launch Chrome (open Beranda.html)` config to debug.

Notes:
- The `package.json` includes `http-server` as a dev dependency. Run `npm install` once to install it.
- If you prefer to attach to an already-running Chrome, start Chrome with remote debugging:

  ```powershell
  Start-Process -FilePath "C:\Program Files\Google\Chrome\Application\chrome.exe" -ArgumentList "--remote-debugging-port=9222"
  ```

  Then use the `Attach to Chrome (requires Chrome started with --remote-debugging-port=9222)` configuration.

Quick one-click debug (already configured):

- Open Run and Debug in VS Code.
- Select `Launch Chrome (with remote debugging)` and press Start.
  - VS Code will run the `Start Python Server` task (serves the site at `http://localhost:5500`), launch Chrome with `--remote-debugging-port=9222`, and attach the debugger automatically.

If launching fails because `chrome` isn't on your PATH, either install Chrome or set the absolute `runtimeExecutable` path in `.vscode/launch.json`. I also added an `Attach to Chrome (9222)` configuration if you prefer to start Chrome manually with the `--remote-debugging-port=9222` flag and then attach.
# Web Profil KP — Run Instructions

This project is a static website. Below are simple ways to run it locally and debug with VS Code.

Options (choose one):

- npm (recommended if you have Node.js):

  1. Install dependencies:

     ```powershell
     npm install
     ```

  2. Start the static server (serves at `http://localhost:8080`):

     ```powershell
     npm start
     ```

  3. In VS Code, open the Run and Debug view and choose the configuration `Launch Chrome (http://localhost:8080)` then press Start. It will open `Beranda.html` on the server.

- Python (if you have Python installed):

  1. From the project root run:

     ```powershell
     python -m http.server 8080
     ```

  2. Open `http://localhost:8080/Beranda.html` in Chrome.

  3. In VS Code choose the `Launch Chrome (http://localhost:8080)` debug configuration.

- Live Server VS Code extension:

  1. Install the `Live Server` extension.
  2. Right-click `Beranda.html` and choose `Open with Live Server`.
  3. Use the `Launch Chrome (http://localhost:8080)` config or the `Launch Chrome (open Beranda.html)` config to debug.

Notes:
- The `package.json` includes `http-server` as a dev dependency. Run `npm install` once to install it.
- If you prefer to attach to an already-running Chrome, start Chrome with remote debugging:

  ```powershell
  Start-Process -FilePath "C:\Program Files\Google\Chrome\Application\chrome.exe" -ArgumentList "--remote-debugging-port=9222"
  ```

  Then use the `Attach to Chrome (requires Chrome started with --remote-debugging-port=9222)` configuration.

If you want, I can run `npm install` for you here (if network access is allowed) or switch the `launch.json` `type` values from `pwa-chrome` to `chrome` for compatibility with older Debugger for Chrome extensions. Which would you prefer?