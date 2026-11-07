// Album cover filenames matched to song IDs.
const coverFiles = {
    1: "darudeSandstorm.webp",
    2: "queenBohemianRhapsody.webp",
    3: "taylorSwiftAntiHero.webp",
    4: "metallicaEnterSandman.webp",
    5: "louisArmstrongWhatAWonderfulWorld.webp",
    6: "duaLipaLevitating.webp",
    7: "eaglesHotelCalifornia.webp",
    8: "eiffel65Blue.webp",
    9: "motorheadAceOfSpades.webp",
    10: "edSheeranShapeOfYou.webp",
    11: "daveBrubeckQuartetTakeFive.webp",
    12: "nirvanaSmellsLikeTeenSpirit.webp",
    13: "daftPunkOneMoreTime.webp",
    14: "ironMaidenRunToTheHills.webp",
    15: "harryStylesAsItWas.webp",
    16: "oasisWonderwall.webp",
    17: "theWeekndBlindingLights.webp",
    18: "blackSabbathParanoid.webp",
    19: "martinGarrixAnimals.webp",
    20: "frankSinatraFlyMeToTheMoon.webp",
    21: "gunsNRosesSweetChildOMine.webp",
    22: "markRonsonFtBrunoMarsUptownFunk.webp",
    23: "aviciiLevels.webp"
};

// Get the container for the song cards.
const songGrid = document.getElementById("songGrid");

// Get the song count element.
const resultsCount = document.getElementById("resultsCount");

// Render the songs.
function renderSongs(songList) {
    songGrid.innerHTML = ""; // Remove previously displayed song cards.
    resultsCount.textContent = songList.length + " of " + songs.length + " songs"; // Update the song count.
    // Create a song card for each song.
    for (const song of songList) { // Go through each song.
        const songCard = document.createElement("article"); // Create a song card.
        songCard.className = "songCard"; // Assign the song card's CSS class.
        // Cover.
        const songCover = document.createElement("img"); // Create an image.
        songCover.className = "songCard__cover"; // Assign the image's CSS class.
        songCover.src = "./assets/covers/" + coverFiles[song.id]; // Set the album cover's file path.
        songCover.alt = "Album cover for " + song.title + " by " + song.artist; // Set the image's alternative text.
        songCard.appendChild(songCover); // Add the album cover to the song card.
        // Song title.
        const songTitle = document.createElement("h3"); // Create new heading.
        songTitle.className = "songCard__title"; // Assign the heading's CSS class.
        songTitle.textContent = song.title; // Set the heading's text to the song's title.
        songCard.appendChild(songTitle); // Add the heading to the song card.
        // Artist.
        const songArtist = document.createElement("p"); // Create a paragraph.
        songArtist.className = "songCard__artist"; // Assign the paragraph's CSS class.
        songArtist.textContent = song.artist; // Set the paragraph's text to the artist's name.
        songCard.appendChild(songArtist); //Add the artist to the song card.
        // Genre.
        const songGenre = document.createElement("p"); // Create a paragraph.
        songGenre.className = "songCard__genre"; // Assign the paragraph's CSS class.
        songGenre.textContent = song.genre; // Set the paragraph's text to the song's genre.
        songCard.appendChild(songGenre); // Add the genre to the song card.
        // Song duration.
        const songDuration = document.createElement("p"); // Create a paragraph.
        songDuration.className = "songCard__duration"; // Assign the paragraph's CSS class.
        songDuration.textContent = formatDuration(song.duration); // Set the paragraph's text to the formatted duration.
        songCard.appendChild(songDuration); // Add the duration to the song card.
        // Add to playlist button.
        const addToPlaylistButton = document.createElement("button"); // Create a button.
        addToPlaylistButton.className = "songCard__addButton"; // Assign the button's CSS class.
        addToPlaylistButton.type = "button"; // Set the button's type.
        addToPlaylistButton.textContent = "Add to Playlist"; // Set the button's text.
        songCard.appendChild(addToPlaylistButton); // Add the button to the song card.
        // Add the song card to the song grid.
        songGrid.appendChild(songCard);
    }
}

// Display all songs when the application starts.
renderSongs(songs);

// Convert seconds to minutes and seconds.
function formatDuration(durationInSeconds) {
    const minutes = Math.floor(durationInSeconds / 60); // Calculate the number of whole minutes.
    const seconds = durationInSeconds % 60; // Calculate the remaining seconds.
    let formattedSeconds = seconds; // Store the remaining seconds.
    if (seconds < 10) {
        formattedSeconds = "0" + seconds; // Add a leading zero when needed.
    }
    return minutes + ":" + formattedSeconds; // Return the formatted duration.
}