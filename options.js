chrome.storage.sync.get('muteWords', data => {
    if (data.muteWords) {
        document.getElementById('muteWords').value = data.muteWords.join('\n');
    }
});

function save() {
    const words = document.getElementById('muteWords').value
        .split('\n')
        .map(w => w.trim())
        .filter(w => w.length > 0);

    chrome.storage.sync.set({ muteWords: words }, () => {
        alert('保存しました');
    });
}

document.getElementById('save').addEventListener('click', () => save());

document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        save();
    }
});
