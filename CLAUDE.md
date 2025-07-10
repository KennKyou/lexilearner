# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev`
- **Build for production**: `npm run build`
- **Preview production build**: `npm run preview`
- **Install dependencies**: `npm install`

## Architecture Overview

LexiLearner is a Vue 3 vocabulary learning application built with Vite. The app helps users study vocabulary from various dictionaries (English: KET, PET, Oxford, TOEIC, SAT; Japanese: N1-N5, Basic).

### Core Structure

- **Vue 3 + Composition API**: Uses `<script setup>` syntax throughout
- **Pinia**: State management for progress tracking, error statistics, themes, and data export
- **Vue Router**: SPA routing with 5 main views
- **Vite**: Build tool with hot-reload development

### Key Stores (src/stores/)

- `progress.js`: Tracks completed chapters per dictionary using localStorage
- `errorStats.js`: Manages incorrect answers and error statistics
- `theme.js`: Handles light/dark theme switching
- `exportData.js`: Manages data import/export functionality

### Dictionary System (src/dict/ + src/data/lessons.js)

- Vocabulary data stored as JSON files in `src/dict/`
- `lessons.js` imports all dictionaries and organizes them into chapters of 20 words each
- Each dictionary has completion progress tracked separately
- Translation status noted in comments (some Japanese dictionaries partially translated)

### Views Structure

- **DictionaryView**: Main landing page showing available dictionaries with progress indicators
- **VocabularyView**: Core learning interface for studying words within a chapter (`/vocabulary/:dict/:chapter`)
- **ErrorBookView**: Review interface for previously incorrect answers
- **StatsView**: Progress and performance statistics
- **SettingsView**: Theme toggle and data import/export functionality

### Routing

Default route redirects to `/dictionary`. The vocabulary learning route uses dynamic parameters for dictionary and chapter selection.

### Styling

CSS custom properties handle theming with automatic dark/light mode support. Theme state persists via localStorage.

### Data Persistence

All user progress and settings stored in localStorage:
- Completed chapters per dictionary
- Error statistics
- Theme preference
- Export/import data functionality available