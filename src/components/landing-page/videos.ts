type Video = {
  name: string
  imageUrl: string // 16:9 aspect-ratio
  youtubeUrl: string
}

export const youtubeDarkImageUrl =
  'http://streetofcode.sk/wp-content/uploads/2022/06/youtube.png'
export const youtubeLightImageUrl =
  'http://streetofcode.sk/wp-content/uploads/2022/08/youtube-white.png'
export const youtubeUrl =
  'https://www.youtube.com/channel/UCzt3kHgfLwGGPcTk6jP1_Cg'

export const videos: Video[] = [
  {
    name: 'CSS Battle s Bokšim (senior FE developer)',
    imageUrl: '/images/cssBattleSBoksim.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=jbrWtQ_UzGw&t=1s',
  },
  {
    name: 'Programuj so mnou | 60 minút | Lo-Fi',
    imageUrl: '/images/Thumbnail.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=rRioho__Rd0',
  },
  {
    name: 'Úvahy programátora - Išiel by som znova na vysokú školu?',
    imageUrl: '/images/isielBySomZnovaNaVysoku.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=aiBH1_9AU80',
  },
  {
    name: 'C# Tutoriál - Piškvorky',
    imageUrl: '/images/piskvorkyC.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=JbMNQcY9ZbM',
  },
  {
    name: 'Macbook vs Thinkpad | porovnanie notebookov za 1900€',
    imageUrl: '/images/macVsthinkpad.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=Jj-55jH5Uys',
  },
  {
    name: 'Takto sa naučíš Frontend',
    imageUrl: '/images/akoSaNaucisFrontend.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=IxS5OSoz6b8',
  },
  {
    name: 'Úvahy programátora - Refaktorovanie',
    imageUrl: '/images/uvahyRefaktorovanie.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=2MsFT72oOpc',
  },
  {
    name: 'Pohyb hadíka - Pohovorové úlohy',
    imageUrl: '/images/pohybHadika.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=6dOS1Qo-otc',
  },
  {
    name: 'Pohovorové úlohy - Horiace laná',
    imageUrl: '/images/horiaceLana.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=QhFiu2mS5tY',
  },
]
