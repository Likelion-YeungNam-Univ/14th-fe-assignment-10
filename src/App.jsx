import { useState } from "react";

function App() {
  const [dogUrl, setDogUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const getDog = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://random.dog/woof.json"
      );

      const data = await response.json();

      setDogUrl(data.url);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-100 to-yellow-200 flex items-center justify-center p-10">
      
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 text-center">
        
        <h1 className="text-5xl font-bold mb-4">
          랜덤으로 강아지를 뽑아드릴게용!!
        </h1>

        <p className="text-gray-700 mb-8">
          버튼을 누르면 랜덤 강아지를 보여용~~
        </p>

        <button
          onClick={getDog}
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-2xl text-lg font-semibold transition"
        >
          강아지 뽑기
        </button>

        {loading && (
          <p className="mt-6 text-gray-700">
            불러오는 중...
          </p>
        )}

        {dogUrl && (
          <div className="mt-8">
            
            {dogUrl.endsWith(".mp4") ? (
              <video
                src={dogUrl}
                controls
                autoPlay
                className="rounded-2xl w-full shadow-lg"
              />
            ) : (
              <img
                src={dogUrl}
                alt="random dog"
                className="rounded-2xl w-full shadow-lg"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;