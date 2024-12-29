import React, { useState, useEffect } from 'react';
import { deletePlayer, getPlayers } from '../services/PlayerService'; // We'll define these functions in PlayerService.js

const PlayerList = () => {
    const [players, setPlayers] = useState([]);

    // Fetch players on component mount
    useEffect(() => {
        const fetchPlayers = async () => {
            const playersData = await getPlayers();
            setPlayers(playersData);
        };

        fetchPlayers();
    }, []);

    // Handle player deletion
    const handleDelete = async (playerId) => {
        const isDeleted = await deletePlayer(playerId);
        if (isDeleted) {
            // Remove the player from the local state after deletion
            setPlayers(players.filter(player => player.id !== playerId));
        }
    };

    return (
        <div className="player-list">
            <h2>Player List</h2>
            <ul>
                {players.sort((a, b) => a.username.localeCompare(b.username)).map(player => (
                    <li key={player.id}>
                        {player.username}
                        <button onClick={() => handleDelete(player.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlayerList;
