import { useEffect, useState } from "react";
import { searchBooks } from "./api/bookApi";
import Header from "./components/Header";
import SearchBox from "./components/SearchBox";
import BookCard from "./components/BookCard";
import FavoriteBooks from "./components/FavoriteBooks";
import EmptyState from "./components/EmptyState";

const FAVORITE_BOOKS_KEY = "favoriteBooks";

const App = () => {
  const [keyword, setKeyword] = useState("");
  const [books, setBooks] = useState([]);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const savedFavoriteBooks = localStorage.getItem(FAVORITE_BOOKS_KEY);

    if (savedFavoriteBooks) {
      setFavoriteBooks(JSON.parse(savedFavoriteBooks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(FAVORITE_BOOKS_KEY, JSON.stringify(favoriteBooks));
  }, [favoriteBooks]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!keyword.trim()) {
      setErrorMessage("검색어를 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");
      setHasSearched(true);

      const result = await searchBooks(keyword);
      setBooks(result);
    } catch (error) {
      setErrorMessage(error.message);
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = (book) => {
    const isAlreadyFavorite = favoriteBooks.some(
      (favoriteBook) => favoriteBook.id === book.id
    );

    if (isAlreadyFavorite) {
      setFavoriteBooks((prev) =>
        prev.filter((favoriteBook) => favoriteBook.id !== book.id)
      );
    } else {
      setFavoriteBooks((prev) => [book, ...prev]);
    }
  };

  const isFavoriteBook = (bookId) => {
    return favoriteBooks.some((book) => book.id === bookId);
  };

  return (
    <div className="min-h-screen bg-[#F6F0E6] px-6 py-10 text-[#2F241D]">
      <div className="mx-auto max-w-7xl">
        <Header />

        <SearchBox
          keyword={keyword}
          setKeyword={setKeyword}
          onSearch={handleSearch}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />

        <main className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <section>
            {isLoading ? (
              <div className="rounded-3xl border border-[#D8C7AE] bg-[#FFFDF8] p-10 text-center text-[#5C4635] shadow-sm">
                책 정보를 불러오는 중입니다...
              </div>
            ) : books.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {books.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    isFavorite={isFavoriteBook(book.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            ) : hasSearched ? (
              <EmptyState type="noResult" />
            ) : (
              <EmptyState />
            )}
          </section>

          <FavoriteBooks
            favoriteBooks={favoriteBooks}
            onToggleFavorite={handleToggleFavorite}
          />
        </main>
      </div>
    </div>
  );
};

export default App;