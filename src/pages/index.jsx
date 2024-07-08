import Image from "next/image";
import { Inter } from "next/font/google";
import axios from "axios";
const inter = Inter({ subsets: ["latin"] });
import { useEffect, useState } from "react";

export default function Home() {
  const [userData, setData] = useState([]);

  const handleData = async () => {
    const data = await axios.get("https://fakestoreapi.com/products");
    setData(data.data);
  };
  useEffect(() => {
    handleData();
  }, []);

  return (
    <>
      <button className="bg-red-500 p-5 ml20">Buton</button>
      <div className="flex-grow-0 flex p-5 justify-between">
        <ul>
          {userData.map((i) => (
            <a
              href="#"
              class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <img
                class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                src={i.image}
                alt=""
              />
              <div class="flex flex-col justify-between p-4 leading-normal">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {i.title}
                </h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {i.desription}
                </p>
              </div>
            </a>
          ))}
        </ul>
      </div>
    </>
  );
}
