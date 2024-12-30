// src/components/PlayerList.js

import React, { useState, useEffect } from "react";
import { deletePlayer, getPlayers } from "../services/PlayerService"; // Updated import
import AddPlayer from "./AddPlayer";

const PlayerList = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const playersData = await getPlayers(); // Use the updated getPlayers function

      // Check if data is wrapped in $values and unwrap it
      const playerArray = playersData.$values || playersData; // Unwrap if $values exists

      setPlayers(playerArray);  // Set players state with the fetched data
    };

    fetchPlayers();
  }, []);

  const handleDelete = async (playerId) => {
    const isDeleted = await deletePlayer(playerId); // Use the updated deletePlayer function
    if (isDeleted) {
      setPlayers(players.filter((player) => player.id !== playerId)); // Update player list after deletion
    }
  };

  const handlePlayerAdded = (newPlayer) => {
    setPlayers((prevPlayers) => [...prevPlayers, newPlayer]); // Add new player to list after successful creation
  };

  return (
    <div className="player-list">
      <h2>Player List</h2>
      <AddPlayer onPlayerAdded={handlePlayerAdded} />
      <ul>
        {players.length > 0 ? (
          players
            .sort((a, b) => a.userName.localeCompare(b.userName)) // Sort players by username
            .map((player) => (
              <li key={player.id}>
                {player.userName}
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
