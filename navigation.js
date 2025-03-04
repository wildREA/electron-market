document.getElementById("market").addEventListener("click", async () => {
    const response = await window.electronAPI.market();
    console.log(response); // Should log "Response from main process!"
});

document.getElementById("profile").addEventListener("click", async () => {
    const response = await window.electronAPI.profile();
    console.log(response); // Should log "Response from main process!"
});

