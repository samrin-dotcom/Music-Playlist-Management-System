// =========================================
// MUSIC PLAYLIST MANAGER
// JavaScript Functionality
// =========================================


// ---------- Song Data ----------

let songs = [
    {
        name: "Perfect",
        artist: "Ed Sheeran",
        duration: "4:23",
        favorite: true
    },
    {
        name: "Believer",
        artist: "Imagine Dragons",
        duration: "3:24",
        favorite: false
    },
    {
        name: "Faded",
        artist: "Alan Walker",
        duration: "3:32",
        favorite: true
    },
    {
        name: "Shape of You",
        artist: "Ed Sheeran",
        duration: "3:53",
        favorite: false
    }
];

let currentSongIndex = 0;
let isPlaying = false;


// ---------- Get HTML Elements ----------

const searchInput = document.getElementById("searchInput");

const totalSongs = document.getElementById("totalSongs");

const totalFavorites = document.getElementById("totalFavorites");

const totalArtists = document.getElementById("totalArtists");

const currentSong = document.getElementById("currentSong");

const currentArtist = document.getElementById("currentArtist");

const playBtn = document.getElementById("playBtn");

const previousBtn = document.getElementById("previousBtn");

const nextBtn = document.getElementById("nextBtn");

const addSongBtn = document.getElementById("addSongBtn");

const addSongSection = document.getElementById("addSongSection");

const songForm = document.getElementById("songForm");

const cancelBtn = document.getElementById("cancelBtn");

const songNameInput = document.getElementById("songName");

const artistNameInput = document.getElementById("artistName");

const songDurationInput = document.getElementById("songDuration");


// ---------- Update Statistics ----------

function updateStatistics() {

    totalSongs.textContent = songs.length;

    const favorites = songs.filter(song => song.favorite);

    totalFavorites.textContent = favorites.length;

    const artists = new Set(
        songs.map(song => song.artist)
    );

    totalArtists.textContent = artists.size;
}


// ---------- Display Playlist ----------

function displayPlaylist(songList = songs) {

    const playlistContainer =
        document.querySelector(".playlist-container");

    playlistContainer.innerHTML = `
        <div class="playlist-heading">
            <span>#</span>
            <span>Song</span>
            <span>Artist</span>
            <span>Duration</span>
            <span>Action</span>
        </div>
    `;


    if (songList.length === 0) {

        playlistContainer.innerHTML += `
            <div class="empty-message">
                <p>No songs found.</p>
            </div>
        `;

        return;
    }


    songList.forEach((song, index) => {

        const originalIndex = songs.indexOf(song);

        const row = document.createElement("div");

        row.className = "song-row";

        row.dataset.song = song.name;

        row.dataset.artist = song.artist;


        row.innerHTML = `

            <span class="song-number">
                ${String(index + 1).padStart(2, "0")}
            </span>

            <div class="song-info">

                <div class="small-album">
                    🎵
                </div>

                <div>
                    <h4>${song.name}</h4>
                    <p>${song.artist}</p>
                </div>

            </div>

            <span class="artist-name">
                ${song.artist}
            </span>

            <span class="duration">
                ${song.duration}
            </span>

            <div class="song-actions">

                <button
                    class="favorite-btn ${song.favorite ? "active" : ""}"
                    onclick="toggleFavorite(${originalIndex})">

                    ${song.favorite ? "♥" : "♡"}

                </button>

                <button
                    class="play-song-btn"
                    onclick="playSong(${originalIndex})">

                    ▶

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteSong(${originalIndex})">

                    🗑

                </button>

            </div>
        `;

        playlistContainer.appendChild(row);
    });
}


// ---------- Play Selected Song ----------

function playSong(index) {

    if (index < 0 || index >= songs.length) {
        return;
    }

    currentSongIndex = index;

    currentSong.textContent =
        songs[index].name;

    currentArtist.textContent =
        songs[index].artist;

    isPlaying = true;

    playBtn.textContent = "⏸";

    updatePlayingStatus();

}


// ---------- Play / Pause ----------

playBtn.addEventListener("click", function () {

    if (songs.length === 0) {
        return;
    }

    isPlaying = !isPlaying;

    if (isPlaying) {

        playBtn.textContent = "⏸";

    } else {

        playBtn.textContent = "▶";

    }

    updatePlayingStatus();
});


// ---------- Previous Song ----------

previousBtn.addEventListener("click", function () {

    if (songs.length === 0) {
        return;
    }

    currentSongIndex--;

    if (currentSongIndex < 0) {

        currentSongIndex =
            songs.length - 1;
    }

    playSong(currentSongIndex);
});


// ---------- Next Song ----------

nextBtn.addEventListener("click", function () {

    if (songs.length === 0) {
        return;
    }

    currentSongIndex++;

    if (currentSongIndex >= songs.length) {

        currentSongIndex = 0;
    }

    playSong(currentSongIndex);
});


// ---------- Playing Status ----------

function updatePlayingStatus() {

    const status =
        document.querySelector(".playing-status");

    if (isPlaying) {

        status.textContent = "● Playing";

        status.style.color = "#22c55e";

    } else {

        status.textContent = "● Paused";

        status.style.color = "#f59e0b";
    }
}


// ---------- Delete Song ----------

function deleteSong(index) {

    if (index < 0 || index >= songs.length) {
        return;
    }

    const deletedSong =
        songs[index].name;

    const confirmDelete =
        confirm(
            `Do you want to delete "${deletedSong}"?`
        );

    if (!confirmDelete) {
        return;
    }


    songs.splice(index, 1);


    if (songs.length === 0) {

        currentSong.textContent = "No Song";

        currentArtist.textContent = "Playlist is empty";

        isPlaying = false;

        playBtn.textContent = "▶";

    } else {

        if (currentSongIndex >= songs.length) {

            currentSongIndex =
                songs.length - 1;
        }

        playSong(currentSongIndex);
    }


    updateStatistics();

    displayPlaylist();
}


// ---------- Favorite Song ----------

function toggleFavorite(index) {

    if (index < 0 || index >= songs.length) {
        return;
    }

    songs[index].favorite =
        !songs[index].favorite;

    updateStatistics();

    displayPlaylist();
}


// ---------- Search Songs ----------

searchInput.addEventListener("input", function () {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    if (searchText === "") {

        displayPlaylist();

        return;
    }


    const filteredSongs =
        songs.filter(song =>

            song.name
                .toLowerCase()
                .includes(searchText)

            ||

            song.artist
                .toLowerCase()
                .includes(searchText)

        );


    displayPlaylist(filteredSongs);
});


// ---------- Show Add Song Form ----------

addSongBtn.addEventListener("click", function () {

    addSongSection.classList.add("show");

    addSongSection.scrollIntoView({
        behavior: "smooth"
    });

    songNameInput.focus();
});


// ---------- Cancel Add Song ----------

cancelBtn.addEventListener("click", function () {

    songForm.reset();

    addSongSection.classList.remove("show");
});


// ---------- Add New Song ----------

songForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const name =
        songNameInput.value.trim();

    const artist =
        artistNameInput.value.trim();

    const duration =
        songDurationInput.value.trim();


    if (
        name === "" ||
        artist === "" ||
        duration === ""
    ) {

        alert("Please fill all fields.");

        return;
    }


    const existingSong =
        songs.some(song =>
            song.name.toLowerCase() ===
            name.toLowerCase()
        );


    if (existingSong) {

        alert("This song already exists.");

        return;
    }


    const newSong = {

        name: name,

        artist: artist,

        duration: duration,

        favorite: false

    };


    songs.push(newSong);


    updateStatistics();

    displayPlaylist();


    songForm.reset();

    addSongSection.classList.remove("show");


    alert("Song added successfully!");
});


// ---------- Volume Slider ----------

const volumeSlider =
    document.getElementById("volumeSlider");

volumeSlider.addEventListener("input", function () {

    const value =
        volumeSlider.value;

    console.log("Volume:", value);
});


// ---------- Progress Bar Demo ----------

const progress =
    document.getElementById("progress");

let progressValue = 35;


setInterval(function () {

    if (!isPlaying || songs.length === 0) {
        return;
    }

    progressValue += 0.2;

    if (progressValue >= 100) {
        progressValue = 0;
    }

    progress.style.width =
        progressValue + "%";

}, 100);


// ---------- Initial Display ----------

updateStatistics();

displayPlaylist();

playSong(0);s
