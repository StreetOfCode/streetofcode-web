type Podcast = {
  title: string
  name: string
  imageUrl: string // 1:1 aspect-ratio
  podcastUrl: string
}

export const spotifyImageUrl =
  'http://streetofcode.sk/wp-content/uploads/2022/06/listenOnSpotify.png'
export const spotifyUrl = 'https://open.spotify.com/show/1nBhViArymuLrxuU4XkwRP'

export const podcasts: Podcast[] = [
  {
    title: 'Ep 86',
    name: 'School 42 – bezplatná škola programovania',
    imageUrl: 'http://streetofcode.sk/wp-content/uploads/2022/06/Ep86.png',
    podcastUrl: 'https://streetofcode.sk/podcast/school-42/',
  },
  {
    title: 'Ep 85',
    name: 'Príbeh Learn2Code, a prečo sa mení na Skillmea',
    imageUrl: 'http://streetofcode.sk/wp-content/uploads/2022/05/Ep85.png',
    podcastUrl: 'https://streetofcode.sk/podcast/skillmea/',
  },
  {
    title: 'Ep 83',
    name: 'Ako môže samouk programátor zaujať firmu?',
    imageUrl: 'http://streetofcode.sk/wp-content/uploads/2022/04/Ep-83.png',
    podcastUrl: 'https://streetofcode.sk/podcast/ako-moze-samouk-zaujat-firmu/',
  },
  {
    title: 'Ep 82',
    name: 'Dievčatá a ženy v IT – Aj Ty v IT',
    imageUrl: 'http://streetofcode.sk/wp-content/uploads/2022/04/Ep82.png',
    podcastUrl: 'https://streetofcode.sk/podcast/dievcata-a-zeny-v-it/',
  },
  {
    title: 'Ep 81',
    name: 'Testovanie softvéru s Matejom Kukučkom zo SANAE',
    imageUrl: 'http://streetofcode.sk/wp-content/uploads/2022/03/Ep-81.png',
    podcastUrl:
      'https://streetofcode.sk/podcast/ep-81-testovanie-softveru-rozhovor/',
  },
  {
    title: 'Ep 80',
    name: 'O živote ako takom – ako sa máme, čo robíme a prečo to robíme',
    imageUrl:
      'http://streetofcode.sk/wp-content/uploads/2022/03/Artboard-1-copy-2.png',
    podcastUrl: 'https://streetofcode.sk/podcast/o-zivote-ako-takom/',
  },
  {
    title: 'Ep 79',
    name: 'Prečo sú algoritmy dôležité?',
    imageUrl: 'http://streetofcode.sk/wp-content/uploads/2022/02/Ep.79.png',
    podcastUrl:
      'https://streetofcode.sk/podcast/ep-79-preco-su-algoritmy-dolezite/',
  },
]
