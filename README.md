# Simple Contact Form

## Tech Stack Used:

- **MongoDB**
- **Node.js**
- **Express.js**
- **React.js**
- **TailwindCSS**

## Functionality:

- **A simple UI that allows to create contact**
- **Shows error if validation is failed**
- **Validation is done in both the client and the server side**
- **Global error handling done in the backend**
- **The list of contacts in frontend gets updated without refreshing**
- **User can delete the contact as well**
- **Responsive UI made using TailwindCSS**
- **Provides basic sorting either by date or name**

## Environment Setup

### Clone the repository

```bash
git clone https://github.com/T-Lak23/contact.git
cd contact
```

### Install dependencies

**Backend**
_Note: Install Nodemon Separately or change the "dev" script in package.json_

```bash
cd server
npm install
```

**Frontend**

```bash
cd client
npm install
```

### Create `.env` in `backend/`

```env
PORT=3000 || your_port
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=frontend_url
NODE_ENV=development or production
```

### Create `.env` in `frontend/`

```env
VITE_SERVER_URL=backend_url
```

### Run both servers

**Backend**

```bash
cd backend
npm run dev
```

**Frontend**

```bash
cd frontend
npm run dev
```

Then Visit 👉 **[http://localhost:5173](http://localhost:5173)**

## 🪪 License

## This project is licensed under the MIT License.
