import {StaticImageData} from 'next/image'
import cssBatleSBoksim from '../../../public/images/cssBattleSBoksim.jpg'
import Thumbnail from '../../../public/images/Thumbnail.jpg'
import isielBySomZnovaNaVysoku from '../../../public/images/isielBySomZnovaNaVysoku.jpg'
import piskvorkyC from '../../../public/images/piskvorkyC.jpg'
import macVsthinkpad from '../../../public/images/macVsthinkpad.jpg'
import akoSaNaucisFrontend from '../../../public/images/akoSaNaucisFrontend.jpg'
import uvahyRefaktorovanie from '../../../public/images/uvahyRefaktorovanie.jpg'
import pohybHadika from '../../../public/images/pohybHadika.jpg'
import horiaceLana from '../../../public/images/horiaceLana.jpg'
import coJeToNodeJs from '../../../public/images/coJeToNodeJs.jpg'
import pythonBackendInterview from '../../../public/images/pythonBackendInterview.jpg'

type Video = {
  name: string
  imageUrl: string // 16:9 aspect-ratio
  image: StaticImageData
  youtubeUrl: string
}

export const youtubeDarkImageUrl =
  'http://wp.streetofcode.sk/wp-content/uploads/2022/06/youtube.png'
export const youtubeLightImageUrl =
  'http://wp.streetofcode.sk/wp-content/uploads/2022/08/youtube-white.png'

export const videos: Video[] = [
  {
    name: 'CSS Battle s Bokšim (senior FE developer)',
    imageUrl: '/images/pythonBackendInterview.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=jbrWtQ_UzGw',
    image: cssBatleSBoksim,
  },
  {
    name: 'Python pohovorová úloha',
    imageUrl: '/images/cssBattleSBoksim.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=s0KoATbm2Ds',
    image: pythonBackendInterview,
  },
  {
    name: 'Programuj so mnou | 60 minút | Lo-Fi',
    imageUrl: '/images/Thumbnail.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=rRioho__Rd0',
    image: Thumbnail,
  },
  {
    name: 'Úvahy programátora - Išiel by som znova na vysokú školu?',
    imageUrl: '/images/isielBySomZnovaNaVysoku.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=aiBH1_9AU80',
    image: isielBySomZnovaNaVysoku,
  },
  {
    name: 'C# Tutoriál - Piškvorky',
    imageUrl: '/images/piskvorkyC.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=JbMNQcY9ZbM',
    image: piskvorkyC,
  },
  {
    name: 'Takto sa naučíš Frontend',
    imageUrl: '/images/akoSaNaucisFrontend.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=IxS5OSoz6b8',
    image: akoSaNaucisFrontend,
  },
  {
    name: 'Čo je to Node.js?',
    imageUrl: '/images/coJeToNodeJs.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=1xIKJ2kLTPg',
    image: coJeToNodeJs,
  },
  {
    name: 'Macbook vs Thinkpad | porovnanie notebookov za 1900€',
    imageUrl: '/images/macVsthinkpad.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=Jj-55jH5Uys',
    image: macVsthinkpad,
  },
  {
    name: 'Úvahy programátora - Refaktorovanie',
    imageUrl: '/images/uvahyRefaktorovanie.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=2MsFT72oOpc',
    image: uvahyRefaktorovanie,
  },
  {
    name: 'Pohyb hadíka - Pohovorové úlohy',
    imageUrl: '/images/pohybHadika.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=6dOS1Qo-otc',
    image: pohybHadika,
  },
  {
    name: 'Pohovorové úlohy - Horiace laná',
    imageUrl: '/images/horiaceLana.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=QhFiu2mS5tY',
    image: horiaceLana,
  },
]
