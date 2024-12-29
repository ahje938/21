const baseURL = "https://tenk-kritisk.no/api"; 
// Fetch all players
export const getPlayers = async () => {
    try {
        const response = await fetch(`${baseURL}/Players`); // Ensure you're fetching from the correct endpoint
        if (!response.ok) {
            throw new Error(`Failed to fetch players: ${response.status} ${response.statusText}`);
        }

        // Handle unexpected non-JSON responses
        const text = await response.text();
        let players = [];
        try {
            const jsonResponse = JSON.parse(text);
            players = jsonResponse.$values || jsonResponse; // Check for $values if present
        } catch {
            throw new Error("Invalid JSON response from server.");
        }

        // Ensure the response is an array
        if (!Array.isArray(players) || players.length === 0) {
            return []; // Return an empty array if no players exist
        }

        return players;
    } catch (error) {
        console.error("Error fetching players:", error.message);
        return []; // Return an empty array in case of an error
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
        // Log the response for debugging if the status is not OK
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error('Failed to add player');
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error in createPlayer:', error.message);
      return null;
    }
  };
  


