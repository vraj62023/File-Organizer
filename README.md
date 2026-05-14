# Auto File Organizer 🚀

A blazing fast and zero-dependency Node.js CLI tool to automatically clean up your messy folders. It sorts files by type, organizes them into date-based subfolders and deletes annoying duplicates.

## ✨ Features

* 📂 **Smart Categorization:** Automatically moves files into `Images`, `Documents`, `Videos`, etc.
* 📅 **Date Sorting:** Groups files by their creation month and year (e.g., `Documents/May-2026/`).
* 🗑️ **Duplicate Cleanup:** Automatically detects and deletes downloaded duplicates like `resume (1).pdf`.
* 📝 **Action Log:** Generates a clean `organize_log.txt` receipt of everything it moved or deleted.

## 🚀 Installation

Install it globally via npm so you can use it anywhere on your computer:

```bash
npm install -g @vraj62023/file-organizer
```

## 💻 Usage

Navigate to any messy folder in your terminal and simply type:

```bash
organize .
```

Want to organize a folder from somewhere else? Just provide the path:

```bash
organize "C:/Users/YourName/Downloads"
```

## 🛠️ Tech Stack
Built entirely with vanilla Node.js using native modules (`fs`, `path`, `process`). No external dependencies!
