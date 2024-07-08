import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Index = () => {
  const router = useRouter();
  console.log(router);
  const { query } = router;
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleData = async () => {
    setLoading(true);
    try {
      console.log("first");
      const response = await axios.get(
        `https://myfakeapi.com/api/football/teams/name/${query.name}`
      );

      if (response.data.Team == null) {
        router.push("/error");
      }
      setTeam(response.data.Team);
    } catch (error) {
      router.push("/error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (query.name) {
      handleData();
    }
  }, [query.name]);
  return loading ? (
    <div>Loadingggg....</div>
  ) : (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6">
        <img className="w-full" src={team.flag} alt={team.name} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{team.name}</div>
          <p className="text-green-700 text-base">FIFA Code: {team.fifaCode}</p>
          <p className="text-green-700 text-base">ISO2: {team.iso2}</p>
          <p className="text-green-700 text-base">Emoji: {team.emojiString}</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
