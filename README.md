# Cervicare – Installation and Launch Guide

This project uses **Node.js v18.20.8** and Expo for development.

## Prerequisites

- Node.js v18.20.8 (LTS) installed: [https://nodejs.org](https://nodejs.org)
- npm (comes with Node.js)
- Expo CLI (used via `npx`, no global installation required)
- A smartphone with the Expo Go app (iOS or Android) for testing

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/nliith/cervcare.git
cd cervcare
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npx expo start
```

4. **Test the application**

- Scan the displayed QR code.
- Open the Expo Go app on your smartphone and scan the QR code.
- The app should launch on your phone.

---

## Notes

- If you encounter errors related to Node.js, make sure you are using version **18.20.8**.
- The project uses TypeScript, so type-related dependencies are installed automatically via `npm install`.
