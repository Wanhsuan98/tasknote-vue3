# 📝 TaskNote — Vue3 + TypeScript 任務筆記 App

一個以 **Vue3 + TypeScript + Vite + Pinia + Tailwind CSS** 打造的任務管理應用。  

目標是建立乾淨、可維護、模組化的前端架構，作為前端工程師 Side Project 與作品集展示用。

---

## 🚀 專案特色

- ⚡ 使用 **Vite** 建置與開發  
- 🧩 前端框架：**Vue 3 (Composition API)**  
- 💾 狀態管理：**Pinia**  
- 🎨 樣式系統：**Tailwind CSS（自訂主題色）**  
- 🧹 程式風格：**ESLint + Prettier**  
- 🧱 TypeScript 強型別開發  
- 📁 結構清晰、方便擴充  

---

## 🧰 技術棧

| 類別 | 技術 |
|------|------|
| 前端框架 | Vue 3 + Vite |
| 語言 | TypeScript |
| 狀態管理 | Pinia |
| 樣式 | Tailwind CSS |
| 程式規範 | ESLint + Prettier |
| 套件管理 | npm |

---

## 🪜 安裝與執行

### 1️⃣ 安裝依賴

```bash
npm install
```

### 2️⃣ 啟動開發伺服器

```bash
npm run dev
```

開啟瀏覽器並前往：

```
http://localhost:5173/
```

### 3️⃣ 建置正式版（Production）

```bash
npm run build
```

### 4️⃣ 預覽建置結果

```bash
npm run preview
```

---

## 🏗️ 專案結構

```
tasknote/
├─ src/
│  ├─ assets/          # 靜態資源（CSS、圖片）
│  ├─ components/      # 可重用元件
│  │  └─ HelloWorld.vue
│  ├─ pages/           # 頁面
│  │  └─ Home.vue
│  ├─ stores/          # Pinia 狀態管理
│  │  └─ taskStore.ts
│  ├─ types/           # TypeScript 型別定義
│  │  └─ task.ts
│  ├─ styles/          # 樣式檔案
│  │  └─ style.css
│  ├─ App.vue          # 入口元件
│  ├─ main.ts          # 程式進入點
│  └─ vite-env.d.ts    # Vite 環境型別聲明
│
├─ public/             # 公開靜態資源
├─ index.html
├─ package.json
├─ package-lock.json
├─ vite.config.ts
├─ tailwind.config.js
├─ postcss.config.js
├─ tsconfig.json
├─ tsconfig.app.json
├─ tsconfig.node.json
├─ .eslintrc.js
├─ .prettierrc.json
├─ .vscode/
│  ├─ settings.json
│  ├─ css_custom_data.json
│  └─ extensions.json
├─ .gitignore
└─ README.md
```

---

## 🎨 自訂主題色（Tailwind）

在 `tailwind.config.js` 中定義：

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#4f46e5',
          foreground: '#ffffff',
        },
        surface: '#0f172a',
        foreground: '#e2e8f0',
        'muted-foreground': '#94a3b8',
      },
    },
  },
}
```

使用範例：

```vue
<h1 class="text-brand">TaskNote</h1>
<p class="text-muted-foreground">簡單任務筆記 App</p>
```

---

## 🧑‍💻 開發者資訊

- **Author**: Jenny
- **Role**: Front-End Engineer
- **Tech Focus**: Vue3 / TypeScript / Frontend Architecture / UI Engineering

---

## 🛠️ 指令速查

| 指令 | 說明 |
|------|------|
| `npm run dev` | 啟動開發伺服器 |
| `npm run build` | 建置正式版 |
| `npm run preview` | 預覽建置結果 |
| `npm run lint` | 執行 ESLint 檢查 |

---

## 📜 License

MIT License © 2025 Jenny
