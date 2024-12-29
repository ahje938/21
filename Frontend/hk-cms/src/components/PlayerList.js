import React, { useState, useEffect } from "react";
import { deletePlayer, getPlayers } from "../services/PlayerService";
import AddPlayer from "./AddPlayer";

const PlayerList = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const playersData = await getPlayers();
      setPlayers(playersData);
    };

    fetchPlayers();
  }, []);

  const handleDelete = async (playerId) => {
    const isDeleted = await deletePlayer(playerId);
    if (isDeleted) {
      setPlayers(players.filter((player) => player.id !== playerId));
    }
  };

  const handlePlayerAdded = (newPlayer) => {
    setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
  };

  return (
    <div className="player-list">
      <h2>Player List</h2>
      <AddPlayer onPlayerAdded={handlePlayerAdded} />
      <ul>
        {players && players.length > 0 ? (
          players
            .sort((a, b) => a.username.localeCompare(b.username))
            .map((player) => (
              <li key={player.id}>
                {player.username}
                <button onClick={() => handleDelete(player.id)}>Delete</button>
              </li>
            ))
        ) : (
          <li>No players available.</li>
        )}
      </ul>
    </div>
  );
};

export default PlayerList;
