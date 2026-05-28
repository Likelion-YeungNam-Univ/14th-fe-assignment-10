import React from "react";

const BookCard = ({ book, isFavorite, onToggleFavorite }) => {
    return (
        <article className="overflow-hidden rounded-3xl border border-[#D8C7AE] bg-[#FFFDF8] shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex h-72 items-center justify-center bg-[#E8DDCB]">
                {book.coverUrl ? (
                    <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="px-6 text-center text-[#8B6F47]">
                        <div className="text-5xl">📚</div>
                        <p className="mt-3 text-sm">No Cover</p>
                    </div>
                )}
            </div>

            <div className="p-5">
                <h3 className="min-h-14 text-xl font-black text-[#2F241D]">
                    {book.title}
                </h3>

                <p className="mt-2 text-sm text-[#7A5C3E]">{book.author}</p>

                <p className="mt-2 text-sm text-[#9A8267]">{book.year}</p>

                <button
                    onClick={() => onToggleFavorite(book)}
                    className={`mt-5 w-full rounded-2xl px-4 py-3 font-bold transition ${isFavorite
                        ? "bg-[#A94438] text-white hover:bg-[#923A31]"
                        : "bg-[#EFE3D0] text-[#5C4033] hover:bg-[#E1D0B8]"
                        }`}
                >
                    {isFavorite ? "♥ 서재에서 빼기" : "♡ 내 서재에 담기"}
                </button>
            </div>
        </article>
    );
};

export default BookCard;