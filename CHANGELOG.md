# CHANGELOG

## 2026-11-18
- Cloudflare: решение пользователя — использовать тот же токен, что у numeroastral (хранить в /opt/pets-es/.env, chmod 600).
- Бренд: выбор открыт. Peludario, Peludopedia и Huellaycola отклонены как рекомендации из-за близких действующих доменов (peludiario.com, peludopedia.es, huellasycolas.com). Финалисты без найденных совпадений: Bigotario, Hocicario, Patas y Cía.
- Бренд: Bigotario снят с рекомендации (основное значение «bigote» — человеческие усы), Hocicario снят (на слух близко к «sicario»). Новая рекомендация: Ladrimiau (ladrimiau.com), ждёт решения пользователя.
- Бренд: у Ladrimiau найдены совпадения вне доменов: YouTube-канал @LadriMiau (6 видео, юмор о питомцах), магазины Ladramiau (Azuqueca de Henares, Испания) и Ladra Miau+ (ladramiau.mitiendanube.com). Товарные знаки не проверены: TMview отклонил автоматический запрос.
- Бренд: решение пользователя — Ladrimiau (ladrimiau.com). Домен покупает пользователь; проверка товарных знаков ladramiau на его стороне.
- Каркас Astro 7 собран локально: калькуляторы порции (собаки, кошки) и даты родов (собаки, кошки), чистые модули src/lib с тестами. Факторы: AAHA 2021; сроки беременности: Merck Veterinary Manual. Лимиты Cloudflare Free проверены: 20 000 файлов на сайт, 500 сборок в месяц. На *.pages.dev пока не публиковалось.
- Домен ladrimiau.com зарегистрирован пользователем 2026-11-18. DNS и привязка к Cloudflare Pages не настраивались, ждут отдельного «да».
- Превью не выложено: на сервере нет токена Cloudflare (numeroastral деплоится через Workers Builds из GitHub, в /opt/astro-es/.env токена нет, wrangler не авторизован). Нужен токен с правом Cloudflare Pages: Edit и Account ID в /opt/pets-es/.env. Wrangler 4.164.0 добавлен в devDependencies.
- Деплой как в numeroastral (решение пользователя): Cloudflare Workers + static assets, сборка из GitHub (Workers Builds), репозиторий alexanderklimin/ladrimiau, deploy key /root/.ssh/ladrimiau_deploy, алиас github-ladrimiau. Превью на *.workers.dev вместо *.pages.dev, токен Cloudflare на сервере не нужен.
- public/_headers: ВРЕМЕННО X-Robots-Tag noindex до запуска — удалить при публикации на ladrimiau.com, тогда же workers_dev=false.
