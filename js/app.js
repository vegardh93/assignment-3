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

// Create a song card for each song.
for (const song of songs) { // Go through each song.
    const songCard = document.createElement("article"); // Create a song card.
    songCard.className = "songCard"; // Assign the song card's CSS class.
    const songCover = document.createElement("img"); // Create an image.
    songCover.className = "songCard__cover"; // Assign the image's CSS class.
    songCover.src = "./assets/covers/" + coverFiles[song.id]; // Set the album cover's file path.
    songCover.alt = "Album cover for " + song.title + " by " + song.artist; // Set the image's alternative text.
    songCard.appendChild(songCover); // Add the album cover to the song card.
    const songTitle = document.createElement("h3"); // Create new heading.
    songTitle.className = "songCard__title"; // Assign the heading's CSS class.
    songTitle.textContent = song.title; // Set the heading's text to the song's title.
    songCard.appendChild(songTitle); // Add the heading to the song card.
    songGrid.appendChild(songCard); // Add the song card to the song grid.
}