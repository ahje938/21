const baseURL = "https://tenk-kritisk.no/api"; 
// Fetch all players
export const getPlayers = async () => {
    try {
        const response = await fetch(`${baseURL}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch players: ${response.status} ${response.statusText}`);
        }
        
        // Handle unexpected non-JSON responses
        const text = await response.text();
        try {
            return JSON.parse(text); // Attempt to parse JSON
        } catch {
            throw new Error("Invalid JSON response from server.");
        }
    } catch (error) {
        console.error("Error fetching players:", error.message);
        return []; // Return an empty array to prevent app crashes
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

// Add this function to handle POST requests
export const createPlayer = async (playerData) => {
    try {
        const response = await fetch(`${baseURL}/Players`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(playerData),
        });
        if (!response.ok) {
            throw new Error('Failed to add player');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

