import React from "react";

const FavoriteBooks = ({ favoriteBooks, onToggleFavorite }) => {
    if (favoriteBooks.length === 0) {
        return (
            <aside className="rounded-3xl border border-[#D8C7AE] bg-[#FFFDF8] p-6 shadow-sm">
                <h2 className="text-2xl font-black text-[#2F241D]">나의 서재</h2>

                <p className="mt-4 text-sm leading-6 text-[#6B5A49]">
                    아직 저장한 책이 없습니다. 마음에 드는 책을 서재에 담아보세요.
                </p>
            </aside>
        );
    }

    return (
        <aside className="rounded-3xl border border-[#D8C7AE] bg-[#FFFDF8] p-6 shadow-sm">
            <h2 className="text-2xl font-black text-[#2F241D]">나의 서재</h2>

            <div className="mt-5 space-y-4">
                {favoriteBooks.map((book) => (
                    <div
                        key={book.id}
                        className="flex gap-4 rounded-2xl border border-[#E3D4BD] bg-[#FAF7F0] p-3"
                    >
                        <div className="h-20 w-14 shrink-0 overflow-hidden rounded-xl bg-[#E8DDCB]">
                            {book.coverUrl ? (
                                <img
                                    src={book.coverUrl}
                                    alt={book.title}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-xl">
                                    📚
                                </div>
                            )}
                        </div>

                        <div className="min-w-0 flex-1">
                            <h3 className="text-sm font-bold text-[#2F241D]">
                                {book.title}
                            </h3>

                            <p className="mt-1 text-xs text-[#7A5C3E]">{book.author}</p>

                            <button
                                onClick={() => onToggleFavorite(book)}
                                className="mt-2 text-xs font-bold text-[#A94438] hover:text-[#7F2F27]"
                            >
                                삭제하기
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default FavoriteBooks;