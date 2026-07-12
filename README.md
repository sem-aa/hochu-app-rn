# Хочу

**Фінальний проєкт** курсу React Native.

Мобільний застосунок для створення та ведення персональних wish-list — списків бажань. Допомагає зберігати речі, які хочеться отримати або купити, і легко ділитися ними з друзями та близькими. Замість здогадок про подарунок — просто надішли посилання на свій вішліст.

---

## Зміст

- [Ідея та сценарії](#ідея-та-сценарії)
- [Ключові функції](#ключові-функції)
- [Скріншоти](#скріншоти)
- [Як працює застосунок](#як-працює-застосунок)
- [Архітектура](#архітектура)
- [Управління станом](#управління-станом)
- [API та інтеграція з бекендом](#api-та-інтеграція-з-бекендом)
- [Нововведення фінального проєкту](#нововведення-фінального-проєкту)
- [Оптимізація продуктивності](#оптимізація-продуктивності)
- [Шлях розробки (курс)](#шлях-розробки-курс)
- [Технологічний стек](#технологічний-стек)
- [Запуск проєкту](#запуск-проєкту)
- [Структура проєкту](#структура-проєкту)

---

## Ідея та сценарії

### Основні user flows

1. **Створення wish-list** — вхід у застосунок → новий список → додавання бажань → редагування.
2. **Додавання товару** — назва, фото, ціна, посилання на магазин → збереження в обраний список.
3. **Поширення списку** — генерація публічного посилання → перегляд у браузері (навіть без застосунку) → вибір подарунку.

### Мета продукту

Зробити створення та обмін списками бажань простим, сучасним і зручним для щоденного використання — з мінімальною кількістю кроків, інтуїтивною навігацією та акцентом на візуальному контенті.

---

## Ключові функції

- створення та керування списками бажань (назва, emoji);
- додавання бажань вручну (фото, ціна, посилання, кількість, нотатка);
- **редагування** бажань і вішлістів;
- **два режими перегляду** вішлістів: горизонтальний слайдер і сітка всіх списків;
- **шеринг** публічного посилання — отримувач без застосунку бачить HTML-сторінку з бекенда;
- позначення бажань як виконаних;
- профіль користувача (аватар, імʼя);
- авторизація через Google (Apple та email підготовлені в коді).

---

## Скріншоти

> Додайте скріншоти ключових екранів у папку `docs/screenshots/` і вставте їх сюди перед здачею в LMS.

| Екран | Опис |
| --- | --- |
| Авторизація | Welcome-екран з Google Sign-In |
| Головний (слайдер) | Горизонтальний перегляд вішлістів із сіткою бажань |
| Сітка вішлістів | Огляд усіх списків у 2-колоночному режимі |
| Деталі бажання | Модалка з фото, ціною та посиланням |
| Редагування | Форми редагування бажання / вішліста |
| Шеринг | Bottom sheet «Поділитися вішлістом» |
| Публічна сторінка | HTML-відображення вішліста в браузері (бекенд) |
| Профіль | Аватар, імʼя, вихід із акаунту |

Приклад вставки:

```markdown
![Головний екран](./docs/screenshots/wishlist-main.png)
![Сітка вішлістів](./docs/screenshots/wishlist-grid.png)
```

---

## Як працює застосунок

### Авторизація

1. Користувач відкриває застосунок → екран `Auth`.
2. Натискає **Увійти через Google** → нативний Google Sign-In повертає `idToken`.
3. Клієнт надсилає `POST /auth/google` → отримує access/refresh токени (зберігаються в `expo-secure-store`).
4. Redux slice `auth` оновлює `user` і `isAuthenticated` → навігація на головний екран вішлістів.

### Робота з вішлістами

**Режим слайдера** (`screens/wishlist/index.tsx`):

- горизонтальний `ScrollView` з `pagingEnabled` — кожен вішліст = окремий слайд;
- останній слайд — «Ще один список?» для створення нового;
- у шапці: кнопка профілю та кнопка переходу до сітки всіх списків.

**Режим сітки** (`screens/wishlist/all-wishlists.tsx`):

- `FlatList` у 2 колонки з картками `WishlistGridCard`;
- тап по картці → повернення до слайдера на обраний вішліст.

### Бажання

- у кожному вішлісті бажання відображаються в **2-колоночній сітці** (`WishCard`);
- тап по картці → модалка з деталями (`wish-info`);
- кнопка «⋯» → bottom sheet: редагувати або видалити;
- кнопка «Хочу» → форма додавання нового бажання.

### Шеринг без застосунку

1. У меню вішліста → **Поділитися вішлістом**.
2. Клієнт викликає `POST /wishlists/:id/share` → отримує `shareUrl`.
3. Системний `Share.share()` відкриває нативний шит поділу.
4. Отримувач відкриває посилання в браузері → бекенд рендерить HTML-сторінку `/s/:slug` зі списком бажань, фото та цінами.

Це дозволяє ділитися вішлістом з людьми, у яких немає застосунку.

---

## Архітектура

Проєкт організований за методологією **FSD** (Feature-Sliced Design). Залежності спрямовані зверху вниз:

```
app → screens → features / entities → shared
```

| Шар | Призначення |
| --- | --- |
| `app/` | Тонкі роути Expo Router, налаштування навігації |
| `screens/` | Екрани та їх UI (auth, wishlist, profile) |
| `features/` | Користувацькі сценарії (auth, uploads, share-wishlist) |
| `entities/` | Доменні сущності (user, wish, wishlist) + API |
| `shared/` | UI-kit, store, api-клієнт, хуки, утиліти |
| `constants/` | Дизайн-токени, маршрути, тема |

### Навігація (Expo Router)

Використовується **Stack-навігація** без табів:

```
/ (index)              → Auth
/wishlist-page         → Stack вішлістів + модалки
/profile-page          → Stack профілю + модалки
```

Модалки (додавання, редагування, деталі, bottom sheets) — окремі роути з `presentation: 'modal'` або `'transparentModal'`. Маршрути винесені в константи `constants/routes.ts`.

---

## Управління станом

### Redux Toolkit + RTK Query

| Що керує | Де |
| --- | --- |
| Сесія користувача (`user`, `isAuthenticated`) | `features/auth/model/auth.slice.ts` |
| Серверні дані (вішлісти, бажання, профіль) | RTK Query (`shared/api/api.ts`) |
| Кеш, invalidation, auto-refetch | RTK Query tag types: `User`, `Wishlist`, `Wish` |

**Чому Redux, а не Context API для даних:**

- вішлісти та бажання — складний серверний стан з CRUD-операціями, кешуванням і синхронізацією;
- RTK Query інкапсулює запити, завантаження, помилки та інвалідацію кешу в одному місці;
- auth slice тримає мінімальний локальний стан сесії, незалежний від кешу API.

### Тема (light / dark)

Інтерфейс адаптується до системної теми через `useColorScheme()` і семантичні токени (`constants/color-tokens.ts`). Компоненти `ThemedText` / `ThemedView` автоматично підлаштовують кольори.

---

## API та інтеграція з бекендом

Бекенд — Node.js (Fastify) + PostgreSQL + Prisma. Клієнт спілкується через REST API.

**Base URL:** `EXPO_PUBLIC_API_URL` (за замовчуванням `http://localhost:4001/api/v1`).

| Група | Ендпоінти |
| --- | --- |
| Auth | `POST /auth/google`, `/auth/login`, `/auth/register`, `/auth/logout`, `/auth/refresh` |
| User | `GET/PATCH/DELETE /users/me` |
| Wishlists | `GET/POST /wishlists`, `PATCH/DELETE /wishlists/:id`, `POST /wishlists/:id/share` |
| Wishes | `POST /wishes/wishlists/:id/wishes`, `PATCH/DELETE /wishes/:id` |
| Uploads | `POST /uploads/sign` (signed URL для фото) |

Запити виконуються через RTK Query з автоматичним `Bearer`-токеном і reauth при 401.

---

## Нововведення фінального проєкту

### 1. Редагування бажань

- bottom sheet `wish-more` → «Відредагувати»;
- форма `wish-edit` з попередньо заповненими полями;
- `PATCH /wishes/:id`, завантаження та видалення фото.

### 2. Редагування вішлістів

- bottom sheet `wishlist-more` → «Відредагувати імʼя вішліста»;
- форма `wishlist-edit` з emoji picker;
- `PATCH /wishlists/:id`.

### 3. Два режими відображення

- **Слайдер** — швидке гортання між вішлістами (основний екран);
- **Сітка** — огляд усіх списків (`all-wishlists`), кнопка `square.grid.2x2.fill` у шапці;
- бажання завжди у 2-колоночній сітці з адаптивною шириною карток.

### 4. Шеринг для користувачів без застосунку

- `POST /wishlists/:id/share` → публічне посилання;
- бекенд рендерить HTML-сторінку `/s/:slug` з адаптивним дизайном;
- отримувач бачить вішліст у браузері та може обрати подарунок.

### 5. UX-покращення

- bottom sheets з haptic feedback для контекстних меню;
- `MenuActionIcon` для дій edit / share / delete;
- модульні форми через `FormInput` widget;
- плавна анімація рамки інпутів (Reanimated).

---

## Оптимізація продуктивності

### Анімація (Reanimated)

Поле вводу `shared/ui/inputs/base-input.tsx` анімує колір рамки при фокусі/блюрі через `useSharedValue` + `useAnimatedStyle` + `withTiming` (`interpolateColor`).

### Зменшення зайвих ререндерів (memo / useMemo / useCallback)

- `entities/wish/ui/wish-card.tsx` — `React.memo`, стабільний `onPress(wishId)`;
- `screens/wishlist/components/wishlist-slide-content.tsx` — `useMemo` для `cardStyle`, `useCallback` для `renderItem` / `keyExtractor`;
- `screens/wishlist/components/wishlist-pagination.tsx`, `screens/profile/components/profile-avatar.tsx` — `React.memo`;
- `screens/wishlist/all-wishlists.tsx` — мемоізація для `FlatList`.

### Зменшення ваги застосунку

Замінено `@expo/vector-icons/FontAwesome` (повний шрифт заради одного гліфа `apple`) на нативний SF Symbol `apple.logo` з `expo-symbols`.

| Метрика | До | Після |
| --- | ---: | ---: |
| JS-бандл iOS | 2.56 MB | 2.53 MB (−30 KB) |
| Шрифти-ассети | `FontAwesome.ttf` (162 KB) | прибрано |

Сумарно ≈ **192 KB** менше. Деталі — у [`docs/bundle-analysis.md`](./docs/bundle-analysis.md).

```bash
npm run bundle:ios     # експорт бандлу з source maps
npm run analyze:ios    # аналіз через source-map-explorer
```

---

## Шлях розробки (курс)

| Етап | Що зроблено |
| --- | --- |
| **Cross Assignment 1** | Аналіз вимог, user flows, wireframe основних екранів у Figma |
| **Cross Assignment 2** | Високодетальний дизайн на базі Mobile Apps – Prototyping Kit |
| **Cross Assignment 3** | UI-компоненти в React Native: кнопки, картки, інпути, списки |
| **Cross Assignment 4** | Навігація: Stack + модалки через Expo Router |
| **Cross Assignment 5** | Інтеграція REST API, FlatList, обробка завантаження та помилок |
| **Cross Assignment 6** | Redux Toolkit + RTK Query для глобального стану та серверних даних |
| **Cross Assignment 7** | Reanimated-анімації, memo/useMemo/useCallback, аналіз та зменшення бандлу |
| **Фінальний проєкт** | Редагування бажань/вішлістів, сітка перегляду, HTML-шеринг, UX-покращення |

---

## Технологічний стек

| Категорія | Технології |
| --- | --- |
| Runtime | React 19, React Native 0.81 |
| Framework | Expo SDK 54, Expo Router 6 |
| Стан | Redux Toolkit, RTK Query, React-Redux |
| Навігація | Expo Router (Stack), React Navigation |
| Auth | Google Sign-In, expo-secure-store |
| UI | expo-image, expo-symbols, Geologica font, дизайн-токени |
| Анімації | react-native-reanimated 4 |
| Мова | TypeScript (strict) |

---

## Запуск проєкту

### Вимоги

- Node.js 20+
- Xcode (для iOS-симулятора)
- npm
- Запущений бекенд (`back/`) з PostgreSQL

> У проєкті підключені нативні модулі (Google Sign-In тощо) — **Expo Go не підійде**.
> Симулятор збирайте й запускайте через **Xcode** або `npx expo run:ios`.
> Для Metro — `expo start --dev-client`, відкривайте застосунок **hochuApp**, не Expo Go.

### 1. Встановлення залежностей

```bash
cd hochuApp
npm install
```

### 2. Налаштування середовища

Створіть `.env` у корені `hochuApp/`:

```env
EXPO_PUBLIC_API_URL=http://localhost:4001/api/v1
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=<your-ios-client-id>
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=<your-web-client-id>
```

### 3. Запуск бекенда

```bash
cd ../back
npm install
npm run dev
```

### 4. Запуск мобільного клієнта

**Варіант A — через Expo (рекомендовано для розробки):**

```bash
cd hochuApp
npx expo start --dev-client
```

Потім відкрийте застосунок на симуляторі або пристрої.

**Варіант B — нативна збірка iOS:**

```bash
npx expo run:ios
```

Або відкрийте `ios/hochuApp.xcworkspace` у Xcode і запустіть на симуляторі.

### 5. Корисні команди

```bash
npm run lint          # перевірка ESLint
npm run format        # форматування Prettier
npm run bundle:ios    # експорт iOS-бандлу
npm run analyze:ios   # аналіз розміру бандлу
```

---

## Структура проєкту

```
hochuApp/
├── app/                    # Expo Router — роути та layouts
│   ├── index.tsx           # Auth
│   ├── wishlist-page/      # Вішлісти + модалки
│   └── profile-page/       # Профіль + модалки
├── screens/                # Екрани та їх компоненти
│   ├── auth/
│   ├── wishlist/
│   └── profile/
├── features/               # Сценарії (auth, uploads, share-wishlist)
├── entities/               # Домен (user, wish, wishlist)
├── shared/                 # UI-kit, store, api, hooks, lib
├── constants/              # Дизайн-токени, routes, theme
├── assets/                 # SVG, зображення
└── docs/                   # Аналіз бандлу, скріншоти
```

---

## Ліцензія

Навчальний проєкт. Всі права захищені.
