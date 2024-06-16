document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('form');
    const input = document.querySelector('input[type="url"]');
    const button = document.querySelector('button');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const url = input.value.trim();
        if (url !== '') {
            downloadFile(url);
        }
    });

    function downloadFile(url) {
        button.textContent = 'Downloading...';
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob();
            })
            .then(blob => {
                const filename = url.substring(url.lastIndexOf('/') + 1);
                const a = document.createElement('a');
                a.href = window.URL.createObjectURL(blob);
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                button.textContent = 'Download File';
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
                button.textContent = 'Download File';
            });
    }
});
