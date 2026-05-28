import React from "react";

const Header = () => {
    return (
        <header className="mb-10 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#8B6F47]">
                Library
            </p>

            <h1 className="text-5xl font-black tracking-tight text-[#2F241D] sm:text-6xl">
                Book Shelf
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#6B5A49]">
                책 제목을 검색하고 마음에 드는 책을 나만의 서재에 저장해보세요.
            </p>
        </header>
    );
};

export default Header;