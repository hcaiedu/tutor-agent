# Project Title
**Tutor Agent Frontend** by ***EDUHK LTTC Human Centric AI Group***

## Prerequisites
Requirements for **NodeJS**

## Project Setup
```sh
npm install
```

## Compile and Hot-Reload for Development
```sh
npm run dev
```

## Compile and Minify for Production
```sh
npm run build
```

## Project Structure
```
tutor-agent
├─ index.html
├─ jsconfig.json
├─ package-lock.json
├─ package.json
├─ public
│  └─ favicon.ico
├─ README.md
├─ src
│  ├─ api //APIs
│  │  ├─ request.js
│  │  ├─ roomApi.js //room API
│  │  └─ userApi.js //user API
│  ├─ App.vue
│  ├─ assets //Images used in this project
│  ├─ components //Vue components
│  │  ├─ ChatMessage.vue //Real time chat message component
│  │  ├─ LineChart.vue //line chart component
│  │  └─ Radar.vue //radar chart component
│  ├─ main.js //main entry
│  ├─ router
│  │  └─ index.js //url router
│  └─ views //main pages in this system
│     ├─ ChatView.vue //chat page
│     ├─ HomeView.vue //replaced by login page
│     ├─ LoginView.vue //login and register page
│     ├─ RoomCreate.vue //room create page
│     └─ RoomJoin.vue //room join page
└─ vite.config.js

```