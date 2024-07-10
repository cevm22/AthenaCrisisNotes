////////////////////
////////////////////
//// Show the cords
////////////////////
////////////////////

function addDivsForMasks() {
    const divMasks2 = document.querySelectorAll('div[class^="mask"]');

    if (divMasks2.length === 0) {
        console.log("No divs with class starting with 'mask' found.");
        return;
    }

    divMasks2.forEach(maskDiv => {
        const className = maskDiv.className;

        // Extract X and Y values from the class name
        const match = className.match(/mask-(\d+)-(\d+)/);
        if (!match) {
            console.log("Class name does not match expected pattern.");
            return;
        }

        const X = parseInt(match[1]);
        const Y = parseInt(match[2]);

        // Only process divs where X = 1 or Y = 1
        if (X === 1 || Y === 1) {
            // Create the new div for X = 1
            if (X === 1) {
                const newDivX = createNewDiv(`${Y}`);
                positionNewDiv(newDivX, maskDiv, -34, 0);
                maskDiv.parentNode.insertBefore(newDivX, maskDiv);
            }

            // Create the new div for Y = 1
            if (Y === 1) {
                const newDivY = createNewDiv(`${X}`);
                positionNewDiv(newDivY, maskDiv, 0, -34);
                maskDiv.parentNode.insertBefore(newDivY, maskDiv);
            }
        }
    });

    // Manually add the 0,0 div with text "Y\X"
    addZeroZeroDiv(divMasks2[0].parentNode); // Pass the parent node of the first mask div
}

// Helper function to create a new div with common styles
function createNewDiv(textContent) {
    const newDiv = document.createElement('div');
    newDiv.textContent = textContent;
    newDiv.style.color = 'red';
    newDiv.style.fontSize = '16px'; // Set the font size to 16px
    newDiv.style.height = '24px';
    newDiv.style.width = '24px';
    newDiv.style.position = 'absolute';
    newDiv.style.zIndex = '80'; // Ensure it appears above other elements

    // Center the text within the div
    newDiv.style.display = 'flex';
    newDiv.style.alignItems = 'center';
    newDiv.style.justifyContent = 'center';
    newDiv.style.textAlign = 'center';

    return newDiv;
}

// Helper function to position the new div relative to the mask div
function positionNewDiv(newDiv, maskDiv, leftOffset, topOffset) {
    newDiv.style.left = (parseInt(maskDiv.style.left) + leftOffset) + 'px';
    newDiv.style.top = (parseInt(maskDiv.style.top) + topOffset) + 'px';
}

// Function to manually add the 0,0 div
function addZeroZeroDiv(parentNode) {
    const newDiv = createNewDiv('Y\\X');
    newDiv.style.left = '-30px';
    newDiv.style.top = '-30px';
    newDiv.style.fontSize = '12px'; // Set the font size to 16px
    parentNode.appendChild(newDiv);
}

function deleteDivsCreated() {
    // Select all divs created by addDivsForMasks based on their unique styles
    const createdDivs = document.querySelectorAll('div[style*="position: absolute"][style*="z-index: 80"]');

    // Remove each of the found divs
    createdDivs.forEach(div => div.remove());

}


////////////////////
////////////////////
////Top-Mid Btn
////////////////////
////////////////////

function injectNotesButton() {
    const notesButton = document.createElement('button');
    notesButton.textContent = 'NOTES';
    notesButton.id = 'notes-button'
    notesButton.style.width = '150px';
    notesButton.style.height = '30px';
    notesButton.style.position = 'fixed';
    notesButton.style.top = '0';
    notesButton.style.left = '50%';
    notesButton.style.transform = 'translateX(-50%)';
    notesButton.style.zIndex = '1000';
    notesButton.style.backgroundColor = 'rgba(50, 50, 50, 0.8)';
    notesButton.style.color = '#fff';
    notesButton.style.border = '1px solid #ccc';
    notesButton.style.borderRadius = '5px';
    notesButton.style.display = 'flex';
    notesButton.style.alignItems = 'center';
    notesButton.style.justifyContent = 'center';
    notesButton.style.textAlign = 'center';

    notesButton.onclick = function () {
        const sidebar = document.getElementById('notes-sidebar');

        // Check if sidebar exists
        if (!sidebar) {
            createSidebar(); // Create sidebar if it doesn't exist
            return;
        }

        // Toggle sidebar visibility
        if (sidebar.style.display === 'none' || sidebar.style.display === '') {
            sidebar.style.display = 'flex';
        } else {
            // remove and update all again
            sidebar.remove();
            createSidebar();
            return
        }
    };

    document.body.appendChild(notesButton);
}



////////////////////
////////////////////
//// SideBar
////////////////////
////////////////////

function createSidebar() {
    const currentUrl = window.location.href;
    let lastSegment = currentUrl.substring(currentUrl.lastIndexOf('/') + 1).toLowerCase();

    if (!lastSegment) {
        const urlWithoutLastSlash = currentUrl.substring(0, currentUrl.length - 1);
        lastSegment = urlWithoutLastSlash.substring(urlWithoutLastSlash.lastIndexOf('/') + 1).toLowerCase();
    }

    const sidebar = document.createElement('div');
    sidebar.id = 'notes-sidebar';
    sidebar.style.width = '500px';
    sidebar.style.height = '100vh';
    sidebar.style.position = 'fixed';
    sidebar.style.top = '0';
    sidebar.style.right = '0';
    sidebar.style.backgroundColor = 'rgba(50, 50, 50, 0.8)';
    sidebar.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    sidebar.style.padding = '8px';
    sidebar.style.overflow = 'hidden';
    sidebar.style.zIndex = '1000';
    sidebar.style.color = '#fff';
    sidebar.style.display = 'flex';
    sidebar.style.flexDirection = 'column';
    sidebar.style.justifyContent = 'space-between';
    sidebar.style.boxSizing = 'border-box';

    const sidebarContent = document.createElement('div');
    sidebarContent.style.flex = '1';
    sidebarContent.style.overflowY = 'auto';
    sidebarContent.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center;">
            <h1 style="margin-top: auto; margin-bottom: auto;">BATTLE NOTES</h1>
        </div>
        <div style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap;">
            <h3 style="overflow-wrap: break-word;">Notes of:</h3> 
            <span style="font-size: 18px; margin-left: 8px; overflow-wrap: break-word;">${lastSegment}</span>
        </div>
        <hr style="border-top: 1px solid #ccc; margin: 8px 0;">
    `;

    sidebar.appendChild(sidebarContent);

    const addButton = document.createElement('button');
    addButton.textContent = 'Add Note';
    addButton.style.width = '200px';
    addButton.style.height = '30px';
    addButton.style.alignSelf = 'center';
    addButton.style.marginBottom = '8px';
    addButton.style.fontSize = '16px';

    addButton.onclick = function () {
        const newText = '';
        const noteId = saveNoteToStorage(lastSegment, newText);
        const card = createTextCard(noteId, newText);
        sidebarContent.appendChild(card);
        scrollToBottom(sidebarContent);
    };

    const showCoordsButton = document.createElement('button');
    showCoordsButton.textContent = 'Show Coords';
    showCoordsButton.style.width = '200px';
    showCoordsButton.style.height = '30px';
    showCoordsButton.style.alignSelf = 'center';
    showCoordsButton.style.marginBottom = '8px';
    showCoordsButton.style.fontSize = '16px';

    let coordsVisible = false; // Track whether the coords are visible

    showCoordsButton.onclick = function () {
        if (coordsVisible) {
            deleteDivsCreated();
            showCoordsButton.textContent = 'Show Coords';
        } else {
            addDivsForMasks();
            showCoordsButton.textContent = 'Hide Coords';
        }
        coordsVisible = !coordsVisible;
    };

    sidebar.appendChild(addButton);
    sidebar.appendChild(showCoordsButton);

    sidebar.style.display = 'none';
    document.body.appendChild(sidebar);

    loadNotesFromStorage(lastSegment, sidebarContent);
}

function createTextCard(noteId, initialText, initialX = 0, initialY = 0) {
    const card = document.createElement('div');
    card.style.backgroundColor = '#333';
    card.style.color = '#fff';
    card.style.padding = '10px';
    card.style.marginTop = '10px';
    card.style.borderRadius = '5px';
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.flexGrow = '1';
    card.dataset.noteId = noteId;

    const textArea = document.createElement('textarea');
    textArea.value = initialText;
    textArea.style.width = '100%';
    textArea.style.minHeight = '80px';
    textArea.style.resize = 'none';
    textArea.style.padding = '10px';
    textArea.style.boxSizing = 'border-box';
    textArea.style.marginBottom = '10px';
    textArea.style.height = 'auto';

    textArea.addEventListener('input', function () {
        textArea.style.height = 'auto';
        textArea.style.height = (textArea.scrollHeight) + 'px';
        updateNoteInStorage(noteId, textArea.value, xInput.value, yInput.value);
    });

    const inputAndButtonsContainer = document.createElement('div');
    inputAndButtonsContainer.style.display = 'flex';
    inputAndButtonsContainer.style.flexWrap = 'wrap';
    inputAndButtonsContainer.style.alignItems = 'center';
    inputAndButtonsContainer.style.gap = '10px';
    inputAndButtonsContainer.style.marginLeft = 'auto';

    const inputContainer = document.createElement('div');
    inputContainer.style.display = 'flex';
    inputContainer.style.gap = '5px';
    inputContainer.style.alignItems = 'center';

    const xInput = document.createElement('input');
    xInput.type = 'number';
    xInput.min = '0';
    xInput.placeholder = 'X';
    xInput.style.width = '80px';
    xInput.value = initialX;

    xInput.addEventListener('input', function () {
        updateNoteInStorage(noteId, textArea.value, xInput.value, yInput.value);
    });

    const yInput = document.createElement('input');
    yInput.type = 'number';
    yInput.min = '0';
    yInput.placeholder = 'Y';
    yInput.style.width = '80px';
    yInput.value = initialY;

    yInput.addEventListener('input', function () {
        updateNoteInStorage(noteId, textArea.value, xInput.value, yInput.value);
    });

    inputContainer.appendChild(document.createTextNode('X: '));
    inputContainer.appendChild(xInput);
    inputContainer.appendChild(document.createTextNode(' Y: '));
    inputContainer.appendChild(yInput);

    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '10px';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () {
        const confirmed = confirm('Are you sure you want to delete this note?');
        if (confirmed) {
            card.remove();
            deleteNoteFromStorage(noteId);
        }
    };

    buttonContainer.appendChild(deleteButton);

    inputAndButtonsContainer.appendChild(inputContainer);
    inputAndButtonsContainer.appendChild(buttonContainer);
    card.appendChild(inputAndButtonsContainer);
    card.appendChild(textArea);

    return card;
}


function saveNoteToStorage(segment, note, x = 0, y = 0) {
    const notes = JSON.parse(localStorage.getItem('notes')) || {};
    if (!notes[segment]) {
        notes[segment] = [];
    }
    const noteId = Date.now(); // Use timestamp as a unique identifier
    notes[segment].push({ id: noteId, content: note, x: x, y: y });
    localStorage.setItem('notes', JSON.stringify(notes));
    return noteId;
}

function loadNotesFromStorage(segment, container) {
    const notes = JSON.parse(localStorage.getItem('notes')) || {};
    if (notes[segment]) {
        notes[segment].forEach(note => {
            const card = createTextCard(note.id, note.content, note.x, note.y);
            container.appendChild(card);
        });
    }
}

function deleteNoteFromStorage(noteId) {
    const currentUrl = window.location.href;
    let lastSegment = currentUrl.substring(currentUrl.lastIndexOf('/') + 1).toLowerCase();
    if (!lastSegment) {
        const urlWithoutLastSlash = currentUrl.substring(0, currentUrl.length - 1);
        lastSegment = urlWithoutLastSlash.substring(urlWithoutLastSlash.lastIndexOf('/') + 1).toLowerCase();
    }

    const notes = JSON.parse(localStorage.getItem('notes')) || {};
    if (notes[lastSegment]) {
        notes[lastSegment] = notes[lastSegment].filter(storedNote => storedNote.id !== noteId);
        localStorage.setItem('notes', JSON.stringify(notes));
    }
}

function updateNoteInStorage(noteId, newNote, newX, newY) {
    const currentUrl = window.location.href;
    let lastSegment = currentUrl.substring(currentUrl.lastIndexOf('/') + 1).toLowerCase();
    if (!lastSegment) {
        const urlWithoutLastSlash = currentUrl.substring(0, currentUrl.length - 1);
        lastSegment = urlWithoutLastSlash.substring(urlWithoutLastSlash.lastIndexOf('/') + 1).toLowerCase();
    }

    const notes = JSON.parse(localStorage.getItem('notes')) || {};
    if (notes[lastSegment]) {
        const noteIndex = notes[lastSegment].findIndex(note => note.id === noteId);
        if (noteIndex !== -1) {
            notes[lastSegment][noteIndex].content = newNote;
            notes[lastSegment][noteIndex].x = newX;
            notes[lastSegment][noteIndex].y = newY;
            localStorage.setItem('notes', JSON.stringify(notes));
        }
    }
}

function scrollToBottom(element) {
    element.scrollTop = element.scrollHeight;
}


createSidebar();
injectNotesButton();
