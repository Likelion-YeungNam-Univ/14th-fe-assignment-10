import React from 'react';

const Navbar = () => {
  return (
    <nav className="w-full bg-[#6F9E4B] border-b-4 border-black p-4 shadow-[0_4px_0px_rgba(0,0,0,0.15)] sticky top-0 z-50">
      <div className="max-w-[800px] mx-auto flex justify-between items-center font-pixel text-white">
        {/* 로고 영역 */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-6 h-6 bg-white rounded-full border-2 border-black relative after:content-[''] after:absolute after:w-2 after:after:h-2 after:bg-black after:rounded-full after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2"></div>
          <p className="text-xl font-bold tracking-wider">포켓몬 도감</p>
        </div>
        
        {/* 메뉴 영역 */}
        <div className="flex gap-6 text-sm">
          <p className="hover:text-yellow-300 cursor-pointer font-bold">1세대</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;