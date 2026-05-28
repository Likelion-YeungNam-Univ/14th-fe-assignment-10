import React from "react";

const SearchBox = ({
    keyword,
    setKeyword,
    onSearch,
    isLoading,
    errorMessage,
}) => {
    return (
        <section className="rounded-3xl border border-[#D8C7AE] bg-[#FFFDF8] p-5 shadow-sm">
            <form onSubmit={onSearch} className="grid gap-3 md:grid-cols-[1fr_auto]">
                <input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="책 제목을 입력하세요."
                    className="w-full rounded-2xl border border-[#D8C7AE] bg-[#FAF7F0] px-5 py-4 text-[#2F241D] outline-none placeholder:text-[#A89175] focus:border-[#8B6F47] focus:ring-4 focus:ring-[#8B6F47]/10"
                />

                <button
                    type="submit"
                    className="rounded-2xl bg-[#5C4033] px-8 py-4 font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#4A3329]"
                >
                    {isLoading ? "검색 중..." : "책 검색"}
                </button>
            </form>

            {errorMessage && (
                <p className="mt-4 rounded-2xl bg-[#B85C4A] px-5 py-3 text-sm font-semibold text-white">
                    {errorMessage}
                </p>
            )}
        </section>
    );
};

export default SearchBox;