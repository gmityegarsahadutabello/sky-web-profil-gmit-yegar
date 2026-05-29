# Web Profil KP — Run Instructions

# Web Profil KP

Simple instructions to install packages and run the project. Frontend and backend are separate.

## Frontend (static site)

- Serve the `frontend` folder with a static server.

Install and run (choose one):

- Using `npx http-server` (no global install required):

```bash
# from project root
npx http-server frontend -p 8080
```

- Or with Python 3 (built-in):

```bash
python -m http.server 8080 --directory frontend
```

Open http://localhost:8080 in your browser.

## Backend (Node.js)

- Install dependencies and start the backend located in the `backend` folder:

```bash
cd backend
npm install
npm start
```

If you prefer to run the file directly:

```bash
node server.js
```

The backend will print its listening port in the console. Use that port to access the API.
