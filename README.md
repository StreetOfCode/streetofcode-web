_Poznámka: README-čka v repozitároch sa väčšinou píšu po anglicky, ale keďže chceme, aby toto repo slúžilo aj na edukačné účely, píšeme README v slovenčine. Ak ti to vadí, prepáč, skús nas pochopiť. 🙈 Ak ťa to teší, nemáš začo. 😉_

V tomto repozitári nájdeš frontend k našej fantastickej stránke [streetofcode.sk](https://streetofcode.sk). Backend nájdeš [tu](https://github.com/StreetOfCode/streetofcode-web-api).

## Technológie

- Jazyk: Typescript
- Framework: [Next.js](https://nextjs.org/) a teda [React](https://reactjs.org/)
- Štýly: [Styled components](https://styled-components.com/)
- Komponenty: Väčšina sú [vlastné komponenty](src/components/core), trochu [Material UI](https://mui.com/)
- Monitoring: [Sentry](https://sentry.io/)
- Autentifikácia používateľov (login): [Firebase Authentication](https://firebase.google.com/docs/auth)
- Admin sekca: [React Admin](https://marmelab.com/react-admin/)
- Blog "engine": Wordpress, dáta ťaháme pomocou [WPGraphQL](https://www.wpgraphql.com/)
- Testy: nemáme 🤷🙈
- IDE: My používame [VS Code](https://code.visualstudio.com/) a snáď ti v ňom všetko bude fungovať, keď si nainštaluješ recommended extensions
- Formátovanie a lintovanie: [Prettier](https://prettier.io/) + [eslint](https://eslint.org/)
- CI: [GitHub Actions](https://github.com/features/actions)
- Deployment: [Railway.app](https://railway.app?referralCode=z8Ptaa) via GitHub hooks (referral link)

## Štruktúra projektu

Next.js nám viac menej nadiktoval celú štruktúru projektu. Čiže hlavná časť sú `src/_app.tsx` a potom `src/pages`. V `src/components` sa nachádzajú všetky naše komponenty, z ktorých vyskladávame stránku. V `src/components/core` sú základné komponenty, ktoré sú akokeby náhrada Material UI. V `src/hooks` máme zadefinovaných zopár vlasných hookov, ktoré využívame.

## Ako si to môžeš spustiť?

Vytvor si kópiu `.env.template` súboru:

```
cp .env.template .env
```

Na začiatok nemusíš ani nič upravovať a všetko by malo byť ok.

Nainicializuj yarn:

```
yarn
```

_Poznámka: Pred tým ako spustíš frontend, musíš mať spustený aj backend._

A spusti projekt:

```
yarn dev
```

To by malo byť všetko. Teraz sa v browseri môžeš navigovať na `localhost:3000` a mala by sa ti načítať naša stránka s nejakými dummy kurzami.

Ak chceš niečo iba rýchlo zmeniť, aby si videl/a, že to vieš editovať, tak kľudne uprav napr. [texty v hero section](/src/pages/index.tsx#L72) alebo [si zmeň accent color v src/theme/theme.ts](src/theme/theme.ts#L21).

## Ak náhodou chceš niečo nakódiť (Contributing)

Proste vytvor pull request. Ideálne v pull requeste aj popíš, čo daná zmena má robiť a prečo by sme ju mali chcieť. Za každú pomoc budeme radi, ale tiež ber prosím na vedomie, že nie každý PR musíme akceptovať.

## Ak si našiel alebo našla nejaký problém

Buď nám napíš cez [feedback formulár](https://streetofcode.sk/feedback), na [Discord](https://streetofcode.sk/discord), na mail (info@streetofcode.sk) alebo vytvor issue na GitHub-e.
