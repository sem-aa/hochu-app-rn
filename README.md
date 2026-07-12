# Хочу

Мобільний застосунок для створення та ведення персональних wish-list — списків бажань.

## Ідея

«Хочу» допомагає зберігати речі, які хочеться отримати або купити, і легко ділитися списками з друзями та близькими. Замість здогадок про подарунок можна просто надіслати посилання на свій вішліст.

## Основні сценарії

1. **Створення wish-list** — вхід у застосунок → новий список → додавання бажань → редагування.
2. **Додавання товару** — посилання з магазину → автоматичне підтягування назви, фото та ціни → збереження в список.
3. **Поширення списку** — генерація посилання → перегляд близькими → вибір подарунку.

## Ключові функції

- створення та керування списками бажань;
- додавання товарів за посиланням або вручну;
- автоматичне отримання даних про товар;
- шеринг списків;
- позначення бажань як виконаних;
- авторизація через Google, Apple або email.

## Мета продукту

Зробити створення та обмін списками бажань простим, сучасним і зручним для щоденного використання — з мінімальною кількістю кроків, інтуїтивною навігацією та акцентом на візуальному контенті.

## Запуск проєкту

У проєкті підключені нативні модулі (Google Sign-In тощо) — **Expo Go не підійде**.
Симулятор збирайте й запускайте через **Xcode**; для Metro — `expo start --dev-client` і відкривайте застосунок **hochuApp**, не Expo Go.

```bash
npm install
npx expo start --dev-client
```

Стек: React Native, Expo Router, TypeScript.

## Оптимізація продуктивності

### Анімація (Reanimated)

Поле вводу `shared/ui/inputs/base-input.tsx` анімує колір рамки при фокусі/блюрі через
`useSharedValue` + `useAnimatedStyle` + `withTiming` (`interpolateColor`). Анімація видима при
кожному тапі по інпуту.

### Зменшення зайвих ререндерів (memo / useMemo / useCallback)

- `entities/wish/ui/wish-card.tsx` — обгорнуто в `React.memo`; пропс `onPress` змінено на
  `(wishId) => void`, щоб батьківський колбек був стабільним.
- `screens/wishlist/components/wishlist-slide-content.tsx` — `cardStyle` через `useMemo`,
  `openWishInfo` / `renderItem` / `keyExtractor` через `useCallback`. Тепер `FlatList` не
  перестворює елементи, а `WishCard` не перемальовується даремно під час скролу/оновлень.
- `screens/wishlist/components/wishlist-pagination.tsx` і
  `screens/profile/components/profile-avatar.tsx` — обгорнуто в `React.memo`.

### Зменшення ваги застосунку (заміна залежності + аналіз бандлу)

Замінено `@expo/vector-icons/FontAwesome` (повний шрифт + glyphmap заради одного гліфа `apple`)
на нативний SF Symbol `apple.logo` з `expo-symbols`.

| Метрика | До | Після |
| --- | ---: | ---: |
| JS-бандл iOS | 2.56 MB | 2.53 MB (−30 KB) |
| Шрифти-ассети | `FontAwesome.ttf` (162 KB) | прибрано |

Сумарно ≈ **192 KB** менше. Деталі та treemap — у [`docs/bundle-analysis.md`](./docs/bundle-analysis.md).

```bash
npm run bundle:ios     # експорт бандлу з source maps
npm run analyze:ios    # аналіз через source-map-explorer
```
