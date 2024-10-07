<div align="center">
  <img src="https://github.com/user-attachments/assets/7afad85a-b285-4bd0-b36a-43f7558e2838" alt="todo app">
</div>

# Frontend examples

The objective of this repository is to showcase examples of Manifest implementations with popular frontend frameworks.

The application is a slightly modified version of the popular [TodoMVC](https://todomvc.com/) that connects to a backend instead of keeping the logic in the frontend.

All frontends share the common Manifest backend API and use the Manifest JS SDK.

## Folder structure

```
├── manifest
│   ├── backend.yml
│   ├── backend.db
├── examples
│   ├── nextjs
│   │   ├── **
│   ├── react
│   │   ├── **
│   ├── svelte
│   │   ├── **
│   ├── **
│   │   ├── **
├── README.md
├── package.json
└── **

```

## Getting started

To launch both the backend and a frontend, run those commands:

```
npm install
npm install --workspaces

npm run dev
```
