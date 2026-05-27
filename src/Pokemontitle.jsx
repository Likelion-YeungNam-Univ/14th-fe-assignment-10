import React from 'react'

const Pokemontitle = () => {
  return (
    //전체 타이틀
    <div className="w-[250px] h-[200px] rounded-lg p-1 gap-2 flex flex-col bg-[#77CC55] font-pixel">
      <div className="flex justify-between ">
        <p>no. 001</p>
        <p>이름: 파이리</p>
      </div>
      <div className="bg-white flex justify-center items-center h-full rounded-lg">
        <p>그림</p>
      </div>
      <div>
        <div>
          <p>타입: 불꽃</p>
        </div>
      </div>
    </div>
  )
}

export default Pokemontitle