import KET from '../dict/KET.json'

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
        ukphone: word.ukphone
      }))
    })
  }
  
  return chapters
}

// 字典配置
export const dictionaries = {
  KET: {
    name: 'KET',
    description: 'KET 等級單字練習',
    totalWords: KET.length,
    chapters: createChapters(KET)
  },
}

// 為了向後兼容，同時導出 lessons
export const lessons = {
  vocabulary: {
    name: 'KET',
    description: 'KET',
    chapters: dictionaries.KET.chapters
  }
} 