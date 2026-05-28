const BASE_URL = "https://openlibrary.org/search.json";

export const searchBooks = async (keyword) => {
    const response = await fetch(
        `${BASE_URL}?title=${encodeURIComponent(keyword)}&limit=20`
    );

    if (!response.ok) {
        throw new Error("책 정보를 불러오지 못했습니다.");
    }

    const data = await response.json();

    return data.docs.map((book) => ({
        id: book.key,
        title: book.title,
        author: book.author_name ? book.author_name.join(", ") : "저자 정보 없음",
        year: book.first_publish_year || "출판연도 정보 없음",
        coverUrl: book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : null,
    }));
};