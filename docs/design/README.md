# Макети Audiparts

Вихідні файли канвасів (формат Design Artifact, `*.dc.html`), з яких опубліковані погоджені макети. Окремо в браузері вони не рендеряться повністю — їм потрібен рантайм канвасу (`support.js`), але розмітка, тексти, кольори й розміри читаються як є.

Статус — на 2026-10-11.

## redesign/ — перший канвас «Audiparts — редизайн сайту»

Відтворений з історії сесії (усі записи й правки макетів); `canvas.json` — початкова розкладка полотна. Фото товарів посилались на `/_blob/…` канвасу й локально не відкриються.

- `Now-*` — як сайт виглядав ДО редизайну (точка відліку).
- Картка товару (Main, Desktop), «Купити в 1 клік» (Oneclick-*), «Додано в кошик» (Cart-sheet, Cart-drawer-desktop), оформлення (Checkout-*, Success-mobile) — на проді.
- Category-mobile, Category-desktop, AllCats-mobile, Filters-sheet — сторінка категорії; не почато.
- Card, TabBar — картка в списку й нижня панель вкладок; не почато.
- Home-*, ModelPicker-*, Menu-*, Search-* — перші варіанти; їх замінили макети з `home/`.
- Flow — шлях покупця.

## home/ — головна, пошук, шапка й футер

| Макет | Що | Статус |
| --- | --- | --- |
| Menu-mobile | Мобільне меню | на проді |
| Header-desktop | Шапка + мега-меню каталогу | на проді (без блоку «для вашої Audi» і лічильників) |
| Footer-mobile, Footer-desktop | Футер | на проді |
| Main | Головна, телефон | далі в роботі |
| Home-desktop | Головна / список, комп'ютер | далі в роботі |
| Home-desktop-model | Вибір моделі, комп'ютер | далі в роботі |
| Model-series-mobile, Model-gen-mobile | Вибір моделі: серія → покоління | далі в роботі |
| Sort-filter-mobile | Сортування й фільтри | далі в роботі |
| Search-suggest-mobile, Search-suggest-desktop | Підказки пошуку | не почато |
| Search-results-mobile, Search-results-desktop | Результати пошуку | не почато |
| Search-oe-mobile | Точний збіг за OE-номером | не почато |
| Search-empty-mobile | Нічого не знайдено + заявка | не почато |

## account/ — вхід і кабінет

Main, Login-desktop, Login-code-mobile, Account-mobile, Account-desktop, Favorites-mobile, Orders-mobile — не почато.

## cart/ — кошик

Main, Cart-sheet-mobile, Cart-drawer-desktop, Cart-desktop, Product-qty-mobile — на проді.
