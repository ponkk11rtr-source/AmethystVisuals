# AmethystVisuals

Сайт лаунчера **AmethystVisuals** для Minecraft: визуалы, конфиги, ивенты FunTime и аккаунт Amethyst ID.

- **Сайт:** https://ponkk11rtr-source.github.io/AmethystVisuals/
- **Стек:** Astro 7, Tailwind CSS 4, TypeScript
- **Хостинг:** GitHub Pages (сборка через GitHub Actions)

## Локальный запуск

```bash
npm install
npm run dev
```

Сайт откроется на `http://localhost:4321`.

## Сборка

```bash
npm run build
```

Готовая статика собирается в `dist/`. Публикация происходит автоматически при пуше в `main` через workflow `.github/workflows/deploy.yml`.

## Аккаунты

Авторизация работает локально в браузере (`localStorage`) и предназначена для демонстрации интерфейса. Пароли хешируются через SHA-256.
