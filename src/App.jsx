import { useState, useEffect } from 'react';
// 1. 작성한 API 서비스를 import 합니다.
import { adviceService } from './api/adviceService';
import QuoteCard from './components/QuoteCard';
import BookmarkList from './components/BookmarkList';

const App = () => {
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(false);

  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('advice_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  // API 호출부 코드가 훨씬 직관적으로 변합니다.
  const fetchAdvice = async () => {
    try {
      setLoading(true);
      // 2. 외부 서비스 레이어에서 데이터를 쏙 가져옵니다.
      const data = await adviceService.getRandomAdvice();
      setAdvice(data);
    } catch (error) {
      console.error('명언을 가져오는 중 오류 발생:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  useEffect(() => {
    localStorage.setItem('advice_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = () => {
    if (!advice) return;
    const isAlreadyBookmarked = bookmarks.some((b) => b.message === advice.message);

    if (isAlreadyBookmarked) {
      setBookmarks(bookmarks.filter((b) => b.message !== advice.message));
    } else {
      setBookmarks([...bookmarks, advice]);
    }
  };

  const removeBookmark = (messageToRemove) => {
    setBookmarks(bookmarks.filter((b) => b.message !== messageToRemove));
  };

  const isCurrentBookmarked = advice && bookmarks.some((b) => b.message === advice.message);

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100 flex flex-col items-center justify-center p-6 md:p-12 selection:bg-cyan-500 selection:text-slate-900">
      <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 max-w-5xl w-full">
        
        <QuoteCard 
          advice={advice}
          loading={loading}
          fetchAdvice={fetchAdvice}
          toggleBookmark={toggleBookmark}
          isCurrentBookmarked={isCurrentBookmarked}
        />

        <BookmarkList 
          bookmarks={bookmarks}
          removeBookmark={removeBookmark}
        />

      </div>

      <p className="mt-8 text-[11px] font-mono text-gray-600 tracking-widest">
        SYSTEM READY
      </p>
    </div>
  );
};

export default App;