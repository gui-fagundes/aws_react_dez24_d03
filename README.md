# 🧥 **Outsider**

**Outsider** is an e-commerce platform specialized in vestuary. Create an account, browse the catalog, place orders. All with a responsive and modern design.

---

## 💫 **Features**

The main features include:

- ✅ **User registration with authentication**
- 🌏 **Google auth api integration**
- 🛒 **Clothes Catalog browsing**
- 📱 **Responsive layout**
- 💳 **Order Placing**
- 📋 **Order History**


---

## 💻 **Technologies Used**

This project was developed using the following technologies:

- **[React](https://react.dev/)**: For building interactive and dynamic user interfaces.
- **[Tailwind CSS](https://tailwindcss.com/)**: For fast and responsive styling.
- **[TypeScript](https://www.typescriptlang.org/)**: To ensure greater code safety.
- **[Json-Server](https://www.npmjs.com/package/json-server/v/0.17.4)**: To simulate a backend with a RESTful API.
- **[Clerk](https://clerk.com/)**: For authentication.
- **[Redux](https://redux.js.org/)**: For Global State Manipulation
- **[viaCep API](https://viacep.com.br/)**: For address auto-complete


## 📖 About the Development

This project was developed in 15 days during the twelfth and thirteenth weeks of the front-end development scholarship program with React by **[Compass UOL](https://compass.uol/)**.

## 🛠️ Installation and Setup

You will need Node.js and npm installed globally on your machine.

You will also need an API Key from [Clerk](https://clerk.com/).

*Check the bottom section of this document for a step-by-step on how to configure your clerk api key in order for this app to work as intended*


1. Clone this repo

```bash
git clone https://github.com/gui-fagundes/aws_react_dez24_d03
```

2. Install the packages and dependencies using npm

```bash
npm install
```

3. Enter your API Key in .env file

```
VITE_CLERK_PUBLISHABLE_KEY=your-key-here
```

4. Start the Json-Server

```bash
npx json-server --watch db.json
```

5. Start the application server

```bash
npm run dev
```

6. Visit the app at

```
localhost:5173
```
    
## 🥇 Authors

This project was developed solely by [Guilherme Fagundes](https://github.com/gui-fagundes) according to the specifications given by [Compass Uol](https://compass.com)


## ⚙️ Clerk Configurations

### Note

In order for the authentication api to work properly :
 - Enable email link verification in your clerk authentication configs
 - Follow [Clerk Google auth steps](https://clerk.com/docs/authentication/social-connections/google) to configure your google client and clerk integration
  - Disable **Bot sign-up protection** in Configure > Attack protection

