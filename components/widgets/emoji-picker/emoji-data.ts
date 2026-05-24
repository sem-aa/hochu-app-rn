export type EmojiCategory = {
  id: string;
  title: string;
  emojis: string[];
};

export const EMOJI_CATEGORIES: EmojiCategory[] = [
  {
    id: 'popular',
    title: 'Популярні',
    emojis: ['✨', '💫', '🎁', '🎉', '🎂', '❤️', '💖', '⭐', '🌟', '💝', '🫶', '🔥'],
  },
  {
    id: 'celebrations',
    title: 'Свята',
    emojis: ['🎈', '🎊', '🥳', '🍾', '💐', '🎀', '🕯️', '🪅', '🎇', '🎆', '🧁', '🍰'],
  },
  {
    id: 'hearts',
    title: 'Сердечка',
    emojis: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '💕', '💗', '💓', '💘'],
  },
  {
    id: 'travel',
    title: 'Подорожі та хобі',
    emojis: ['✈️', '🏖️', '🎮', '📚', '🎨', '🎵', '⚽', '🧘', '📷', '🎬', '🛍️', '🏕️'],
  },
  {
    id: 'food',
    title: 'Їжа та напої',
    emojis: ['🍕', '🍣', '☕', '🍷', '🍫', '🍩', '🍓', '🥂', '🧋', '🍔', '🌮', '🍉'],
  },
  {
    id: 'nature',
    title: 'Природа та тварини',
    emojis: ['🐱', '🐶', '🦄', '🐻', '🦋', '🌸', '🌈', '🌙', '☀️', '🌿', '🍀', '🐣'],
  },
];

export const ALL_EMOJIS = EMOJI_CATEGORIES.flatMap((category) => category.emojis);
