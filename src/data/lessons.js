import KET from '../dict/KET.json'
import PET from '../dict/PET.json'
import Oxford from '../dict/Oxford.json'
import TOEIC from '../dict/TOEIC.json'
import JapaneseBasic from '../dict/Japanese_basic.json'

// 將單字按照每章20個進行分組
const createChapters = (words) => {
  const chapters = []
  const wordsPerChapter = 20
  
  for (let i = 0; i < words.length; i += wordsPerChapter) {
    const chapterWords = words.slice(i, i + wordsPerChapter)
    chapters.push({
      name: `第 ${Math.floor(i / wordsPerChapter) + 1} 章`,
      description: `包含 ${chapterWords.length} 個單字`,
      words: chapterWords.map(word => ({
        text: word.name,
        translation: word.trans,
        usphone: word.usphone,
        ukphone: word.ukphone,
        notation: word.notation
      }))
    })
  }
  
  return chapters
}

// 字典配置
export const dictionaries = {
  KET: {
    name: 'KET',
    description: 'Key English Test',
    tag: "KET",
    cate: "English",
    totalWords: KET.length,
    chapters: createChapters(KET)
  },
  PET: {
    name: 'PET',
    description: 'Preliminary English Test',
    tag: "PET",
    cate: "English",
    totalWords: PET.length,
    chapters: createChapters(PET)
  },
  Oxford: {
    name: 'Oxford',
    description: 'Oxford',
    tag: "Oxford",
    cate: "English",
    totalWords: Oxford.length,
    chapters: createChapters(Oxford)
  },
  TOEIC: {
    name: 'TOEIC',
    description: 'TOEIC',
    tag: "TOEIC",
    cate: "English",
    totalWords: TOEIC.length,
    chapters: createChapters(TOEIC)
  },
  JapaneseBasic: {
    name: '日語常見詞',
    description: '日語常見詞',
    tag: "Japanese",
    cate: "Japanese",
    totalWords: JapaneseBasic.length,
    chapters: createChapters(JapaneseBasic)
  },
} 