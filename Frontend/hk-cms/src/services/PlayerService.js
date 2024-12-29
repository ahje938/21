const baseURL = "https://tenk-kritisk.no/api"; 
// Fetch all players
export const getPlayers = async () => {
    try {
        const response = await fetch(`${baseURL}`);
        if (!response.ok) {
            throw new Error('Failed to fetch players');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

// Delete a player
export const deletePlayer = async (playerId) => {
    try {
        const response = await fetch(`${baseURL}/${playerId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete player');
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
