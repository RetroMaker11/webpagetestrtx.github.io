let playlist = [];

function searchVideos() {
    const query = document.getElementById("search-bar").value;
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=YOUR_API_KEY`)
        .then(response => response.json())
        .then(data => {
            const videoResults = document.getElementById("video-results");
            videoResults.innerHTML = '';
            data.items.forEach(item => {
                const videoItem = document.createElement("div");
                videoItem.className = "video-item";
                videoItem.innerHTML = `
                    <h3>${item.snippet.title}</h3>
                    <button onclick="addToPlaylist('${item.id.videoId}', '${item.snippet.title}')">Agregar a Playlist</button>
                `;
                videoResults.appendChild(videoItem);
            });
        })
        .catch(error => console.error('Error:', error));
}

function addToPlaylist(videoId, title) {
    playlist.push({ videoId, title });
    renderPlaylist();
}

function renderPlaylist() {
    const playlistVideos = document.getElementById("playlist-videos");
    playlistVideos.innerHTML = '';
    playlist.forEach((video, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = video.title;
        playlistVideos.appendChild(listItem);
    });
}

function playPlaylist(order) {
    if (order === 'shuffle') {
        playlist = playlist.sort(() => Math.random() - 0.5);
    }
    // Aquí se podría implementar la lógica de reproducción usando el reproductor de YouTube embebido
    alert(`Reproduciendo playlist en orden: ${order}`);
}
