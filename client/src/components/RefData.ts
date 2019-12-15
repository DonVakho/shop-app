
interface IDictionary {
    [key: string] : string[]
}

export const CATEGORIES: string[] = ['all', 'stickers', 'toys', 'T-shirt', 'accessories']
export const GENERAL_THEMATICS: string[] = ['all', 'anime', 'music bands', 'movies']
const ANIME_LIST = ['all','boruto', 'naruto']
const BANDS_LIST = ['all', 'nirvana', 'placebo', 'pink floyd']
const MOVIES_LIST = ['all', 'pulp fiction', 'interstelar', 'avengers']
export const NARROW_THEMATICS: IDictionary = {
    'anime': ANIME_LIST,
    'music bands': BANDS_LIST,
    'movies': MOVIES_LIST
}
