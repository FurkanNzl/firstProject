import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const TeamsIndex = () => {
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getTeams = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://myfakeapi.com/api/football/teams"
        );
        console.log(response.data.Teams);
        setTeams(response.data.Teams);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getTeams();
  }, []);

  useEffect(() => {
    const results = teams.filter((i) =>
      i.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTeams(results);
  }, [teams, searchTerm]);

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="text-red-500">WORLD CUP 2018 TEAMS</h1>
      <input
        type="text"
        placeholder="Search Team Name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "20px", width: "400px", marginBottom: "20px" }}
        className="border-solid md:border-dotted"
      />
      <div className="flex flex-wrap bg-red-500">
        {filteredTeams.map((i) => (
          <div
            key={i.id}
            className="m-2 border border-gray-300 p-2 bg-yellow-500"
            onClick={() => router.push(`/teamDetail/${i.name}`)}
          >
            <img src={i.flag} alt={i.name} className="w-24 h-24" />
            <p>{i.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsIndex;
