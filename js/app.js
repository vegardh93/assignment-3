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

// Get the empty collection message.
const collectionEmpty = document.getElementById("collectionEmpty");

// Get the search input.
const searchInput = document.getElementById("searchInput");

// Get the genre filter.
const genreFilter = document.getElementById("genreFilter");

// Get the sorting menu.
const sortSelect = document.getElementById("sortSelect");

// Get the playlist elements.
const playlistItems = document.getElementById("playlistItems");
const playlistCount = document.getElementById("playlistCount");
const playlistEmpty = document.getElementById("playlistEmpty");

// Get the playlist duration element.
const playlistDuration = document.getElementById("playlistDuration");

// Get the clear playlist button.
const clearPlaylistButton = document.getElementById("clearPlaylistButton");

// Store the songs added to the playlist.
const playlist = [];

// Render the songs.
function renderSongs(songList) {
    songGrid.innerHTML = ""; // Remove previously displayed song cards.
    resultsCount.textContent = songList.length + " of " + songs.length + " songs"; // Update the song count.
    // Show the empty message when no songs are available.
    if (songList.length === 0) {
        collectionEmpty.hidden = false; // Show the empty message.
    } else {
        collectionEmpty.hidden = true; // Hide the empty message.
    }
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
        // Check if the song is already in the playlist.
        const songAlreadyAdded = playlist.some(function (playlistSong) {
            return playlistSong.id === song.id; // Compare the song IDs.
        })
        addToPlaylistButton.addEventListener("click", function () {
            addSongToPlaylist(song); // Add the selected song to the playlist.
        });
        addToPlaylistButton.disabled = songAlreadyAdded; // Disable the button if the song is already added.
        addToPlaylistButton.textContent = songAlreadyAdded ? "Added to Playlist" : "Add to Playlist"; // Set the button's text.
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

// Save the playlist to local storage.
function savePlaylist() {
    localStorage.setItem("musicPlaylist", JSON.stringify(playlist)); // Save the playlist as a JSON string.
}

// Load the playlist from local storage.
function loadPlaylist() {
    const savedPlaylist = localStorage.getItem("musicPlaylist"); // Get the saved playlist.
    if (savedPlaylist) {
        const savedSongs = JSON.parse(savedPlaylist); // Convert the JSON string into an array.
        for (const song of savedSongs) {
            addSongToPlaylist(song); // Restore each song to the playlist.
        }
    }
}

// Add a song to the playlist.
function addSongToPlaylist(song) {
    const songAlreadyAdded = playlist.some(function (playlistSong) {
        return playlistSong.id === song.id; // Check if the song already exists.
    });
    if (songAlreadyAdded) {
        return; // Prevent duplicate songs.
    }
    playlist.push(song); // Add the song to the playlist.
    savePlaylist(); // Save the updated playlist.
    // Playlist item.
    const playlistItem = document.createElement("li"); // Create a playlist item.
    playlistItem.className = "playlist__item"; // Assign the item's CSS class.
    // Song information container.
    const songInfo = document.createElement("div"); // Create a container.
    songInfo.className = "playlist__songInfo"; // Assign the container's CSS class.
    // Album cover.
    const songCover = document.createElement("img"); // Create an image.
    songCover.className = "playlist__songCover"; // Assign the image's CSS class.
    songCover.src = "./assets/covers/" + coverFiles[song.id]; // Set the album cover's file path.
    songCover.alt = "Album cover for " + song.title + " by " + song.artist; // Set the image's alternative text.
    songInfo.appendChild(songCover); // Add the image to the container.
    // Song title and artist.
    const songText = document.createElement("span"); // Create a text element.
    songText.className = "playlist__songText"; // Assign the text element's CSS class.
    songText.textContent = song.title + " - " + song.artist; // Set the song information.
    songInfo.appendChild(songText); // Add the text to the container.
    playlistItem.appendChild(songInfo); // Add the song information to the playlist item.
    // Remove button.
    const removeButton = document.createElement("button"); // Create a button.
    removeButton.className = "playlist__removeButton"; // Assign the button's CSS class.
    removeButton.type = "button"; // Set the button's type.
    removeButton.textContent = "Remove"; // Set the button's text.
    // Remove the selected song when the button is clicked.
    removeButton.addEventListener("click", function () {
        removeSongFromPlaylist(song.id, playlistItem);
    });
    playlistItem.appendChild(removeButton); // Add the button to the playlist item.
    playlistItems.appendChild(playlistItem); // Display the playlist item.
    playlistCount.textContent = playlist.length + (playlist.length === 1 ? " song" : " songs"); // Update the song count.
    playlistEmpty.hidden = true; // Hide the empty playlist message.
    clearPlaylistButton.disabled = false; // Enable the clear playlist button.
    updatePlaylistDuration(); // Update the playlist's total duration.
    updateCollection(); // Update the song card buttons.
}

// Remove a song from the playlist.
function removeSongFromPlaylist(songId, playlistItem) {
    // Find the song by its ID.
    const songIndex = playlist.findIndex(function (playlistSong) {
        return playlistSong.id === songId;
    });
    if (songIndex === -1) {
        return; // Stop if the song does not exist.
    }
    playlist.splice(songIndex, 1); // Remove the song from the array.
    savePlaylist(); // Save the updated playlist.
        playlistItem.remove(); // Remove the playlist item from the page.
        playlistCount.textContent = playlist.length + (playlist.length === 1 ? " song" : " songs"); // Update the song count.
        playlistEmpty.hidden = playlist.length !== 0; // Show the empty message when needed.
        clearPlaylistButton.disabled = playlist.length === 0; // Disable the button when the playlist is empty.
        updatePlaylistDuration(); // Update the total duration.
        updateCollection(); // Update the song card buttons.
}

// Clear the playlist when the button is clicked.
clearPlaylistButton.addEventListener("click", clearPlaylist);

// Clear all songs from the playlist.
function clearPlaylist() {
    playlist.length = 0; // Remove all songs from the playlist array.
    savePlaylist(); // Save the empty playlist.
    playlistItems.innerHTML = ""; // Remove all playlist items from the page.
    playlistCount.textContent = "0 songs"; // Reset the song count.
    playlistEmpty.hidden = false; // Show the empty playlist message.
    clearPlaylistButton.disabled = true; // Disable the clear playlist button.
    updatePlaylistDuration(); // Reset the total duration.
    updateCollection(); // Enable the song card buttons.
}

// Update the playlist's total duration.
function updatePlaylistDuration() {
    let totalDuration = 0; // Store the total duration in seconds.
    // Calculate the total duration of all playlist songs.
    for (const song of playlist) {
        totalDuration += song.duration; // Add the song's duration.
    }
    playlistDuration.textContent = formatDuration(totalDuration); // Display the formatted total duration.
}

// Update the song collection based on search, genre and sorting.
function updateCollection() {
    const searchTerm = searchInput.value.toLowerCase().trim(); // Normalize the search text.
    const selectedGenre = genreFilter.value; // Get the selected genre.
    const selectedSort = sortSelect.value; // Get the selected sorting option.
    // Find songs matching the search text and selected genre.
    const matchingSongs = songs.filter(function (song) {
        const songTitle = song.title.toLowerCase(); // Normalize the song title.
        const songArtist = song.artist.toLowerCase(); // Normalize the artist name.
        const matchesSearch = songTitle.includes(searchTerm) || songArtist.includes(searchTerm); // Check the title or artist.
        const matchesGenre = selectedGenre === "all" || song.genre === selectedGenre; // Check the selected genre.
        return matchesSearch && matchesGenre; // Include songs matching both conditions.
    });
    // Sort songs by the selected option.
    if (selectedSort === "titleAscending") {
        matchingSongs.sort(function (firstSong, secondSong) {
            return firstSong.title.localeCompare(secondSong.title); // Sort titles from A to Z.
        });
    } else if (selectedSort === "titleDescending") {
        matchingSongs.sort(function (firstSong, secondSong) {
            return secondSong.title.localeCompare(firstSong.title); // Sort titles from Z to A.
        });
    } else if (selectedSort === "artistAscending") {
        matchingSongs.sort(function (firstSong, secondSong) {
            return firstSong.artist.localeCompare(secondSong.artist); // Sort artists from A to Z.
        });
    } else if (selectedSort === "artistDescending") {
        matchingSongs.sort(function (firstSong, secondSong) {
            return secondSong.artist.localeCompare(firstSong.artist); // Sort artists from Z to A.
        });
    } else if (selectedSort === "durationAscending") {
        matchingSongs.sort(function (firstSong, secondSong) {
            return firstSong.duration - secondSong.duration; // Sort from shortest to longest.
        });
    } else if (selectedSort === "durationDescending") {
        matchingSongs.sort(function (firstSong, secondSong) {
            return secondSong.duration - firstSong.duration; // Sort from longest to shortest.
        });
    }
    // Display the matching and sorted songs.
    renderSongs(matchingSongs);
}

// Update the collection when the user types.
searchInput.addEventListener("input", updateCollection);

// Update the collection when the selected genre changes.
genreFilter.addEventListener("change", updateCollection);

// Update the collection when the sorting option changes.
sortSelect.addEventListener("change", updateCollection);

// Restore the playlist when the application starts.
loadPlaylist();