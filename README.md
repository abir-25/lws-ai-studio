
# 🎨 LWS AI Studio
A dynamic React-based application that generates AI-powered images using user-provided text prompts. It communicates with the [Pollinations API](https://image.pollinations.ai) to create visually appealing images and displays them progressively in a stylish UI.




## 🚀 Features

- 🎯 **Prompt-based image generation** powered by AI
- 📑 **Prompt templates** are provided to enhance the user experience
- ⏳ **Progressive loading**: Images load one by one with delay
- 📸 **Custom aspect ratios** (1:1, 16:9, 4:3, 3:2)
- 💬 **Dynamic UI states**: idle, loading, and display
- 💾 **Download support** for generated images
- 🗂️ **Saved images** accessible from a separate component
- 🔒 **Duplicate handling**: Avoids adding the same image twice
- 🧠 **Error handling & fetch timeout**


## 🛠️ Tech Stack

- ⚛️ React (with Hooks and Context API)
- 💨 Tailwind CSS for UI styling
- 🌐 Fetch API with timeout utility
- 📦 State management with `useState`, `useEffect`
## 📂 Project Structure

```bash
src/
├── assets/
│   └── logo.svg
│
├── components/
│   ├── SVGIcons/
│   │   ├── DeleteIcon.jsx
│   │   ├── DownloadIcon.jsx
│   │   ├── ErrorIcon.jsx
│   │   ├── LoadingIcon.jsx
│   │   ├── QueueIcon.jsx
│   │   ├── SearchIcon.jsx
│   │   ├── SendIcon.jsx
│   │   ├── StopIcon.jsx
│   │   └── TemplateIcon.jsx
│   │
│   ├── BGGradient.jsx         # Background gradient visual
│   ├── HomePage.jsx           # Landing Page
│   ├── Header.jsx             # Top navigation section
│   ├── DownloadPage.jsx       # Downloaded image display section
│   ├── ImageContainer.jsx     # Generated images display here
│   ├── SearchInput.jsx        # Users Prompt section
│   └── SettingsPanel.jsx      # Advance settings goes here
│
├── context/
│   └── index.js         
│
├── hooks/
│   ├── useImage.js            # Custom hook that handle image gneration
│   └── index.js               # Exporting multiple hooks
│
├── providers/
│   ├── DownloadedImageProvider.jsx
│   ├── ImageProvider.jsx
│   ├── PageProvider.jsx
│   └── SearchProvider.jsx               
│
├── utils.js
├── App.jsx
├── Page.jsx
├── index.css
├── App.css
└── main.jsx

```
## Run Locally

Clone the project

```bash
git clone https://github.com/abir-25/lws-ai-studio.git
```

Go to the project directory

```bash
cd lws-ai-studio
```

Install dependencies

```bash
npm install
```

Run the project

```bash
npm run dev
```

App will run in 5173 port by default
## App Url

 - [http://localhost:5173/](http://localhost:5173/)
