// Get the container for the song cards.
const songGrid = document.getElementById("songGrid");

// Create a song card for each song.
for (const song of songs) { // Go through each song.
    const songCard = document.createElement("article"); // Create a song card.
    songCard.className = "songCard"; // Assign the song card's CSS class.
    const songtitle = document.createElemenet("h3"); // Create new heading.
    songtitle.className = "songCard__title"; // Assign the heading's CSS class.
    songtitle.textContent = song.title; // Set the heading's text to the song's title.
    songCard.appendChild(songTitle); // Add the heading to the song card.
    songCard.appendChild(songCard); // Add the song card to the song grid.
}