import { useRef, useState } from "react";

const API_KEY = "64e626fe8b145d97101593f9ec644de8";

const App = () => {
  const inputRef = useRef(null);
  const [apiData, setApiData] = useState(null);
  const [showWeather, setShowWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const Pogoda = [
    {
      type: "Clear",
      img: "https://th.bing.com/th/id/OIP.DPU3emY5zTkp5kavA7rIzwHaHa?pid=ImgDet&rs=1",
    },
    {
      type: "Rain",
      img: "https://th.bing.com/th/id/OIP.bETZSR2tWDodZhUuYUjoegHaHa?pid=ImgDet&rs=1",
    },
    {
      type: "Snow",
      img: "https://th.bing.com/th/id/R.2e1370294c841a3492128abedf000b93?rik=sgQPpsCnZYytew&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_553086.png&ehk=%2fV9q%2fBMl5DpmYEj6BlTUzrbevPXvJlp5wlag1idXUVU%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      type: "Clouds",
      img: "https://cdn.onlinewebfonts.com/svg/img_171.png",
    },
    {
      type: "Haze",
      img: "https://cdn.onlinewebfonts.com/svg/img_225415.png",
    },
    {
      type: "Smoke",
      img: "https://th.bing.com/th/id/R.e08b8d0f08d77a016d321e2d254f083b?rik=X33701KM7qeOlw&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_84958.png&ehk=L2JKwEZelACUoM8Kc%2f7UGzwqAPPbiCJ4eI2RVjH4fFY%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      type: "Mist",
      img: "https://th.bing.com/th/id/R.5d78c44ab814cd830789f329cb556717?rik=S1x7advSNvOqHA&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_541488.png&ehk=O0sENB4KII9K3X7G2q%2fdEbDxxe7LPzz2X3PPNSDdM0Q%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      type: "Drizzle",
      img: "https://th.bing.com/th/id/R.051ceefcf58cdcaf6138abd4dc7ebed6?rik=qndnj14Whev3Ew&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_541636.png&ehk=K6GlA%2beDhmQawQY5ZcDYRXaBSkVn6wPfpA8W9ei6VZw%3d&risl=&pid=ImgRaw&r=0",
    },
  ];

  const pobierz_dane_o_pogodzie = async () => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=metric&appid=${API_KEY}`;
    setLoading(true);
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setApiData(null);
        if (data.cod == 404 || data.cod == 400) {
          setShowWeather([
            {
              type: "Not Found",
              img: "https://cdn0.iconfinder.com/data/icons/tools-41/432/not-found-256.png",
            },
          ]);
        }
        setShowWeather(
          Pogoda.filter(
            (weather) => weather.type === data.weather[0].main
          )
        );
        console.log(data);
        setApiData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="bg-blue-200 h-screen grid place-items-center">
      <div className="bg-white w-1/3 p-4 rounded-xl">
        <div className="flex items-center justify-between">
          <input
            type="text"
            ref={inputRef}
            placeholder="Enter name of the city"
            className="text-xl border-b
          p-1 border-gray-200 font-mono uppercase flex-1"
          />
          <button onClick={pobierz_dane_o_pogodzie}>
            <img
              src="https://th.bing.com/th/id/OIP.Pbq-5uB7qR1pR1bp4VzJGwHaHa?pid=ImgDet&rs=1"
              alt="..."
              className="w-8"
            />
          </button>
        </div>
        <div
          className={`duration-300 delay-75  overflow-hidden
         ${showWeather ? "h-[27rem]" : "h-0"}`}
        >
          {loading ? (
            <div className="grid place-items-center h-full">
              <img
                src="https://cdn.onlinewebfonts.com/svg/img_339862.png"
                alt="..."
                className="w-14 mx-auto mb-2 animate-spin"
              />
            </div>
          ) : (
            showWeather && (
              <div className="text-center flex flex-col gap-6 mt-10">
                {apiData && (
                  <p className="text-xl font-mono">
                    {apiData?.name + "," + apiData?.sys?.country}
                  </p>
                )}
                <img
                  src={showWeather[0]?.img}
                  alt="..."
                  className="w-52 mx-auto"
                />
                <h3 className="text-2xl font-mono text-zinc-800">
                  {showWeather[0]?.type}
                </h3>

                {apiData && (
                  <>
                    <div className="flex justify-center">
                      <img
                        src="https://cdn0.iconfinder.com/data/icons/medical-344/32/thermometer-512.png"
                        alt="..."
                        className="h-9 mt-1"
                      />
                      <h2 className="text-4xl font-mono">
                        {apiData?.main?.temp}&#176;C
                      </h2>
                    </div>
                  </>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default App;




