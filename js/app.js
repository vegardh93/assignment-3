// Album covers.
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

// DOM elements and playlist state.
const songGrid = document.getElementById("songGrid");
const resultsCount = document.getElementById("resultsCount");
const collectionEmpty = document.getElementById("collectionEmpty");
const searchInput = document.getElementById("searchInput");
const genreFilter = document.getElementById("genreFilter");
const sortSelect = document.getElementById("sortSelect");
const playlistItems = document.getElementById("playlistItems");
const playlistCount = document.getElementById("playlistCount");
const playlistEmpty = document.getElementById("playlistEmpty");
const playlistDuration = document.getElementById("playlistDuration");
const clearPlaylistButton = document.getElementById("clearPlaylistButton");
const playlist = [];

// Render the songs.
function renderSongs(songList) {
    songGrid.innerHTML = "";
    resultsCount.textContent = songList.length + " of " + songs.length + " songs";
    // Show the empty message when no songs are available.
    if (songList.length === 0) {
        collectionEmpty.hidden = false;
    } else {
        collectionEmpty.hidden = true;
    }
    // Create a song card for each song.
    for (const song of songList) {
        const songCard = document.createElement("article");
        songCard.className = "songCard";
        // Cover.
        const songCover = document.createElement("img");
        songCover.className = "songCard__cover";
        songCover.src = "./assets/covers/" + coverFiles[song.id];
        songCover.alt = "Album cover for " + song.title + " by " + song.artist;
        songCard.appendChild(songCover);
        // Song title.
        const songTitle = document.createElement("h3");
        songTitle.className = "songCard__title";
        songTitle.textContent = song.title;
        songCard.appendChild(songTitle);
        // Artist.
        const songArtist = document.createElement("p");
        songArtist.className = "songCard__artist";
        songArtist.textContent = song.artist;
        songCard.appendChild(songArtist);
        // Genre.
        const songGenre = document.createElement("p");
        songGenre.className = "songCard__genre";
        songGenre.textContent = song.genre;
        songCard.appendChild(songGenre);
        // Song duration.
        const songDuration = document.createElement("p");
        songDuration.className = "songCard__duration";
        songDuration.textContent = formatDuration(song.duration);
        songCard.appendChild(songDuration);
        // Add to playlist button.
        const addToPlaylistButton = document.createElement("button");
        addToPlaylistButton.className = "songCard__addButton";
        addToPlaylistButton.type = "button";
        // Check if the song is already in the playlist.
        const songAlreadyAdded = playlist.some(function (playlistSong) {
            return playlistSong.id === song.id;
        })
        // Add the selected song to the playlist.
        addToPlaylistButton.addEventListener("click", function () {
            addSongToPlaylist(song);
        });
        addToPlaylistButton.disabled = songAlreadyAdded;
        addToPlaylistButton.textContent = songAlreadyAdded ? "Added to Playlist" : "Add to Playlist";
        songCard.appendChild(addToPlaylistButton);
        // Add the song card to the song grid.
        songGrid.appendChild(songCard);
    }
}

// Display all songs when the application starts.
renderSongs(songs);

// Convert seconds to minutes and seconds.
function formatDuration(durationInSeconds) {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    let formattedSeconds = seconds;
    if (seconds < 10) {
        formattedSeconds = "0" + seconds;
    }
    return minutes + ":" + formattedSeconds;
}

// Save the playlist to local storage.
function savePlaylist() {
    localStorage.setItem("musicPlaylist", JSON.stringify(playlist));
}

// Load the playlist from local storage.
function loadPlaylist() {
    const savedPlaylist = localStorage.getItem("musicPlaylist");
    if (savedPlaylist) {
        const savedSongs = JSON.parse(savedPlaylist);
        for (const song of savedSongs) {
            addSongToPlaylist(song);
        }
    }
}

// Add a song to the playlist.
function addSongToPlaylist(song) {
    const songAlreadyAdded = playlist.some(function (playlistSong) {
        return playlistSong.id === song.id;
    });
    if (songAlreadyAdded) {
        return;
    }
    playlist.push(song);
    savePlaylist();
    // Playlist item.
    const playlistItem = document.createElement("li");
    playlistItem.className = "playlist__item";
    // Song information container.
    const songInfo = document.createElement("div");
    songInfo.className = "playlist__songInfo";
    // Album cover.
    const songCover = document.createElement("img");
    songCover.className = "playlist__songCover";
    songCover.src = "./assets/covers/" + coverFiles[song.id];
    songCover.alt = "Album cover for " + song.title + " by " + song.artist;
    songInfo.appendChild(songCover);
    // Song title and artist.
    const songText = document.createElement("span");
    songText.className = "playlist__songText";
    songText.textContent = song.title + " - " + song.artist;
    songInfo.appendChild(songText);
    playlistItem.appendChild(songInfo);
    // Remove button.
    const removeButton = document.createElement("button");
    removeButton.className = "playlist__removeButton";
    removeButton.type = "button";
    removeButton.textContent = "Remove";
    // Remove the selected song when the button is clicked.
    removeButton.addEventListener("click", function () {
        removeSongFromPlaylist(song.id, playlistItem);
    });
    playlistItem.appendChild(removeButton);
    playlistItems.appendChild(playlistItem);
    playlistCount.textContent = playlist.length + (playlist.length === 1 ? " song" : " songs");
    playlistEmpty.hidden = true;
    clearPlaylistButton.disabled = false;
    updatePlaylistDuration();
    updateCollection();
}

// Remove a song from the playlist.
function removeSongFromPlaylist(songId, playlistItem) {
    const songIndex = playlist.findIndex(function (playlistSong) {
        return playlistSong.id === songId;
    });
    if (songIndex === -1) {
        return;
    }
    playlist.splice(songIndex, 1);
    savePlaylist();
        playlistItem.remove();
        playlistCount.textContent = playlist.length + (playlist.length === 1 ? " song" : " songs");
        playlistEmpty.hidden = playlist.length !== 0;
        clearPlaylistButton.disabled = playlist.length === 0;
        updatePlaylistDuration();
        updateCollection();
}
// Clear the playlist when the button is clicked.
clearPlaylistButton.addEventListener("click", clearPlaylist);

// Clear all songs from the playlist.
function clearPlaylist() {
    playlist.length = 0;
    savePlaylist();
    playlistItems.innerHTML = "";
    playlistCount.textContent = "0 songs";
    playlistEmpty.hidden = false;
    clearPlaylistButton.disabled = true;
    updatePlaylistDuration();
    updateCollection();
}

// Update the playlist's total duration.
function updatePlaylistDuration() {
    let totalDuration = 0;
    for (const song of playlist) {
        totalDuration += song.duration;
    }
    playlistDuration.textContent = formatDuration(totalDuration);
}

// Update the song collection based on search, genre and sorting.
function updateCollection() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedGenre = genreFilter.value;
    const selectedSort = sortSelect.value;
    // Find songs matching the search text and selected genre.
    const matchingSongs = songs.filter(function (song) {
        const songTitle = song.title.toLowerCase();
        const songArtist = song.artist.toLowerCase();
        const matchesSearch = songTitle.includes(searchTerm) || songArtist.includes(searchTerm);
        const matchesGenre = selectedGenre === "all" || song.genre === selectedGenre;
        return matchesSearch && matchesGenre;
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

// Event listeners and initialization.
searchInput.addEventListener("input", updateCollection);
genreFilter.addEventListener("change", updateCollection);
sortSelect.addEventListener("change", updateCollection);
loadPlaylist();
