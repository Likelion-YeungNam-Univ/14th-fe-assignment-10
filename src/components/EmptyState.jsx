import React from "react";

const EmptyState = ({ type }) => {
    return (
        <div className="rounded-3xl border border-[#D8C7AE] bg-[#FFFDF8] p-10 text-center shadow-sm">
            <div className="text-6xl">📖</div>

            <h2 className="mt-5 text-2xl font-black text-[#2F241D]">
                {type === "noResult" ? "검색 결과가 없습니다" : "책을 검색해보세요"}
            </h2>

            <p className="mt-3 text-[#6B5A49]">
                {type === "noResult"
                    ? "다른 책 제목으로 다시 검색해보세요."
                    : "Harry Potter, Little Prince, Clean Code처럼 입력해보세요."}
            </p>
        </div>
    );
};

export default EmptyState;