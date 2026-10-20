import { getPermalink, getAsset } from './utils/permalinks';

import type { CallToAction } from './types';

export const headerData = {
  links: [
    { text: 'Возможности', href: getPermalink('/#features') },
    { text: 'Визуалы', href: getPermalink('/#visuals') },
    { text: 'Тарифы', href: getPermalink('/#pricing') },
    { text: 'FAQ', href: getPermalink('/#faq') },
    { text: 'Блог', href: getPermalink('/blog') },
  ],
  actions: [{ text: 'Скачать', href: getPermalink('/#download'), variant: 'amethyst' }] as Array<CallToAction>,
};

export const footerData = {
  links: [
    {
      title: 'Продукт',
      links: [
        { text: 'Возможности', href: getPermalink('/#features') },
        { text: 'Визуалы', href: getPermalink('/#visuals') },
        { text: 'Тарифы', href: getPermalink('/#pricing') },
        { text: 'Скачать', href: getPermalink('/#download') },
      ],
    },
    {
      title: 'Поддержка',
      links: [
        { text: 'Чат поддержки', href: '#support' },
        { text: 'FAQ', href: getPermalink('/#faq') },
        { text: 'Статус сервисов', href: '#' },
        { text: 'Сообщество', href: '#' },
      ],
    },
    {
      title: 'Аккаунт',
      links: [
        { text: 'Войти', href: getPermalink('/account') },
        { text: 'Регистрация', href: getPermalink('/account#register') },
        { text: 'Облачная синхронизация', href: getPermalink('/#account') },
        { text: 'Восстановление доступа', href: getPermalink('/account') },
      ],
    },
    {
      title: 'Компания',
      links: [
        { text: 'О нас', href: getPermalink('/about') },
        { text: 'Блог', href: getPermalink('/blog') },
        { text: 'Контакты', href: getPermalink('/contact') },
        { text: 'Сотрудничество', href: '#' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Условия', href: getPermalink('/terms') },
    { text: 'Конфиденциальность', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'Discord', icon: 'tabler:brand-discord', href: '#' },
    { ariaLabel: 'Telegram', icon: 'tabler:brand-telegram', href: '#' },
    { ariaLabel: 'YouTube', icon: 'tabler:brand-youtube', href: '#' },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: '#' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
    © 2026 AmethystVisuals. Не связан с Mojang или Microsoft.
  `,
};
