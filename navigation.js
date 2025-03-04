document.getElementById("market").addEventListener("click", async () => {
    const response = await window.electronAPI.market();
});

document.getElementById("profile").addEventListener("click", async () => {
    const response = await window.electronAPI.profile();
});

