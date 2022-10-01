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
    imageUrl: '/images/ep86-landing-1.jpg',
    podcastUrl: 'https://streetofcode.sk/podcast/school-42/',
  },
  {
    title: 'Ep 85',
    name: 'Príbeh Learn2Code, a prečo sa mení na Skillmea',
    imageUrl: '/images/ep85-landing-1.jpg',
    podcastUrl: 'https://streetofcode.sk/podcast/skillmea/',
  },
  {
    title: 'Ep 83',
    name: 'Ako môže samouk programátor zaujať firmu?',
    imageUrl: '/images/ep83-landing-1.jpg',
    podcastUrl: 'https://streetofcode.sk/podcast/ako-moze-samouk-zaujat-firmu/',
  },
  {
    title: 'Ep 82',
    name: 'Dievčatá a ženy v IT – Aj Ty v IT',
    imageUrl: '/images/ep82-landing-1.jpg',
    podcastUrl: 'https://streetofcode.sk/podcast/dievcata-a-zeny-v-it/',
  },
  {
    title: 'Ep 91',
    name: 'Najväčšie výzvy samoukov (junior.guru)',
    imageUrl: '/images/ep91-landing-1.jpg',
    podcastUrl: 'https://streetofcode.sk/podcast/juniorguru/',
  },
  {
    title: 'Ep 87',
    name: 'Aké je to byť frontend freelancer?',
    imageUrl: '/images/ep87-landing-1.jpg',
    podcastUrl: 'https://streetofcode.sk/podcast/o-zivote-ako-takom/',
  },
]
