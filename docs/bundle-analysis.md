# Аналіз бандлу (cross_assignment_7)

Інструмент: [`source-map-explorer`](https://github.com/danvk/source-map-explorer).
Платформа: iOS, production-експорт без Hermes-байткоду (`--no-bytecode`), щоб мапа лягала на читабельний JS.

## Як відтворити

```bash
npm run bundle:ios     # expo export --platform ios --source-maps --no-bytecode --output-dir dist
npm run analyze:ios    # source-map-explorer на dist/_expo/static/js/ios/*.js (+ .map), HTML-treemap
```

Готовий treemap-звіт оптимізованої збірки: [`docs/bundle-after.html`](./bundle-after.html).

## Замінена залежність

`@expo/vector-icons/FontAwesome` у `shared/ui/buttons/apple-button.tsx` тягнув повний шрифт
`FontAwesome.ttf` + glyphmap (≈700 іконок) заради **одного** гліфа `apple`.
Замінено на нативний SF Symbol `apple.logo` через `expo-symbols` (вже є в залежностях,
використовується в `icon-symbol.ios.tsx`). На iOS це нуль JS-glyphmap і нуль шрифтів-ассетів.

## Результати (до / після)

| Метрика | До (FontAwesome) | Після (expo-symbols) | Різниця |
| --- | ---: | ---: | ---: |
| JS-бандл (iOS, не мініфікований hbc вимкнено) | 2 682 762 B (2.56 MB) | 2 651 655 B (2.53 MB) | **−31 107 B (−30.4 KB, −1.16%)** |
| Ассети (шрифти) | 1 × `.ttf` (`FontAwesome.ttf`, 165 548 B) | 0 | **−1 файл, −162 KB** |
| Внесок `@expo/vector-icons` у JS | 8.2 KB (+ glyphmap) | **0 KB** | повністю прибрано з iOS-бандлу |
| Кількість ассетів у маніфесті | 32 (30 png + 1 ttf + 1 svg) | 31 (30 png + 1 svg) | −1 |

**Сумарне зменшення payload застосунку: ≈ 192 KB** (≈30 KB JS + ≈162 KB шрифт).

## Найважчі модулі після оптимізації (top-10)

| KB | Модуль |
| ---: | --- |
| 117.7 | react-native · ReactNativeRenderer-prod |
| 115.3 | react-native · ReactFabric-prod |
| 62.7 | expo · virtual/streams |
| 42.8 | @reduxjs/toolkit · rtk-query |
| 28.8 | @reduxjs/toolkit · redux-toolkit.modern |
| 27.1 | react-native · VirtualizedList |
| 23.7 | react-native-reanimated · Zoom |
| 21.2 | react-native-reanimated · animation/util |
| 21.1 | immer |
| 20.4 | buffer |

Решта ваги — ядро `react-native` + `expo` (зменшити без зміни рантайму неможливо).
`@reduxjs/toolkit` лишається, бо на ньому побудований увесь шар даних (RTK Query) —
заміна потребує повного рефакторингу і виходить за межі ДЗ.
