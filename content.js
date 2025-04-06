function hideVideos(muteWords) {
    const selectors = [
        'ytd-video-renderer',
        'ytd-grid-video-renderer',
        'ytd-rich-item-renderer',
        'ytd-compact-video-renderer',
        '.ytp-videowall-still'
    ];

    const items = document.querySelectorAll(selectors.join(','));
    items.forEach(item => {
        const title = item.textContent.toLowerCase();
        if (muteWords.some(word => title.includes(word.toLowerCase()))) {
            item.style.display = 'none';
        }
    });
}

chrome.storage.sync.get('muteWords', data => {
    const muteWords = data.muteWords || [];

    hideVideos(muteWords);

    const observer = new MutationObserver(() => hideVideos(muteWords));
    observer.observe(document.body, { childList: true, subtree: true });
});
