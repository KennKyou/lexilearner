import KET from '../dict/KET.json'
import PET from '../dict/PET.json'
import Oxford from '../dict/Oxford.json'
import TOEIC from '../dict/TOEIC.json'
import SAT from '../dict/SAT.json'
import JapaneseBasic from '../dict/Japanese_basic.json'
import JapaneseN5 from '../dict/Japanese_N5.json'
import JapaneseN4 from '../dict/Japanese_N4.json'
import JapaneseN3 from '../dict/Japanese_N3.json'
import JapaneseN2 from '../dict/Japanese_N2.json'
import JapaneseN1 from '../dict/Japanese_N1.json'

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
  SAT: {
    name: 'SAT',
    description: 'SAT',
    tag: "SAT",
    cate: "English",
    totalWords: SAT.length,
    chapters: createChapters(SAT)
  },
  JapaneseBasic: {
    name: '日語常見詞',
    description: '日語常見詞',
    tag: "Japanese",
    cate: "Japanese",
    totalWords: JapaneseBasic.length,
    chapters: createChapters(JapaneseBasic)
  },
  JapaneseN5: {
    name: 'N5',
    description: 'N5',
    tag: "JLPT",
    cate: "Japanese",
    totalWords: JapaneseN5.length,
    chapters: createChapters(JapaneseN5)
  },
  JapaneseN4: {
    name: 'N4',
    description: 'N4',
    tag: "JLPT",
    cate: "Japanese",
    totalWords: JapaneseN4.length,
    chapters: createChapters(JapaneseN4)
  },
  JapaneseN3: {
    name: 'N3',
    description: 'N3',
    tag: "JLPT",
    cate: "Japanese",
    totalWords: JapaneseN3.length,
    chapters: createChapters(JapaneseN3)
  },
  JapaneseN2: {
    name: 'N2',
    description: 'N2',
    tag: "JLPT",
    cate: "Japanese",
    totalWords: JapaneseN2.length,
    chapters: createChapters(JapaneseN2)
  },
  JapaneseN1: {
    name: 'N1',
    description: 'N1',
    tag: "JLPT",
    cate: "Japanese",
    totalWords: JapaneseN1.length,
    chapters: createChapters(JapaneseN1)
  },
} 