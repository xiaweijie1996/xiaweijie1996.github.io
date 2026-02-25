document.addEventListener('DOMContentLoaded', () => {
    const noteLists = document.querySelectorAll('.auto-note-list');

    noteLists.forEach((list) => {
        const noteItems = list.querySelectorAll('li');

        noteItems.forEach((item, index) => {
            const link = item.querySelector('a');

            if (!link) {
                return;
            }

            const originalTitle = link.textContent.trim();
            const displayIndex = String(index + 1).padStart(2, '0');
            const updatedDate = item.dataset.updated ? item.dataset.updated.trim() : 'N/A';

            link.textContent = `${displayIndex}. ${originalTitle}`;

            let updatedTag = item.querySelector('.updated-time');
            if (!updatedTag) {
                updatedTag = document.createElement('span');
                updatedTag.className = 'updated-time';
                item.appendChild(updatedTag);
            }

            updatedTag.textContent = `Updated: ${updatedDate}`;
        });
    });
});
