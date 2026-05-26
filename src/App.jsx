import React, { useState } from "react";

const App = () => {
  const [stationName, setStationName] = useState("")
  const [stationList, setStationList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errMessage, setErrMessage] = useState("")

  const searchStation = async () => {
    if (stationName.trim() === "") {
      setErrMessage("정류장 이름을 입력해주세요.")
      setStationList([])
      return
    }

    try {
      setIsLoading(true)
      setErrMessage("")

      const response = await fetch(`http://localhost:4000/api/stations?name=${stationName}`)

      if (!response.ok) {
        throw new Error("정류장 검색 실패")
      }

      const data = await response.json()

      setStationList(data)
    } catch (error) {
      setErrMessage("정류장 정보를 불러오지 못했습니다.")
      setStationList([])
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div id="Main" className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div id="box" className="p-8 min-w-[900px] min-h-[650px] bg-white rounded-2xl border-4 border-gray-200">
        <div className="flex flex-col gap-5">
          <div className="font-black text-6xl text-blue-600">대구 버스 도착 알리미</div>
          <div className="font-medium text-xl text-blue-900">정류장 이름으로 버스 도착 정보를 확인하는 서비스입니다.</div>

          <div className="mt-8 flex gap-8">
            <input
              value={stationName}
              onChange={(e) => setStationName(e.target.value)}
              placeholder="정류장 이름을 입력하세요."
              className="flex-1 px-5 py-4 border-2 border-gray-200 rounded-xl outline-none text-lg focus:border-blue-500"
            />

            <button type="button" onClick={searchStation} className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700">
              검색
            </button>
          </div>

          {isLoading && (
            <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl text-blue-700 font-bold">정류장 정보를 불러오는 중입니다.</div>
          )}

          {errMessage && (
            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-600 font-bold">{errMessage}</div>
          )}

        </div>
      </div>
    </div>
  );
};

export default App;