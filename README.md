# Backend - Aplikacja Remontowa

API serwer dla aplikacji do zarządzania dokumentacją remontu.

## 🚀 Szybki start

### Wymagania
- Node.js 18+
- Supabase

### Setup

1. **Zainstaluj zależności**
```bash
   npm install
```

2. **Przygotuj `.env`**
```bash
   cp .env.example .env
   # Edytuj .env z właściwymi wartościami
```

3. **Setup bazy danych**
```bash
   npm run migrate
   npm run seed
```

4. **Uruchom dev server**
```bash
   npm run dev
```

   Server będzie dostępny na: `http://localhost:5000`

### API Endpoints

- `GET /api/health` - Health check
- `GET /api/projects` - Lista projektów
- `POST /api/projects` - Stwórz projekt
- `GET /api/estimates/:projectId` - Wyceny projektu
- `POST /api/ai/questions` - Generuj pytania dla fachowca

## 🧪 Testing
```bash
npm run test
```

## 📦 Deployment
```bash
npm run build
npm start
```

## 🔑 Environment variables

Patrz: `.env.example`

## 🤝 Contributing

1. Fork
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit (`git commit -am 'Add feature'`)
4. Push (`git push origin feature/amazing-feature`)
5. Pull Request

## 📝 License

MIT