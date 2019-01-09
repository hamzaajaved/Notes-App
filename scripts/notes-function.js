const getSavedNotes = function () {
    const Savednotes = localStorage.getItem("notes");
    if (Savednotes !== null) {
        return JSON.parse(localStorage.getItem("notes"));
    } else {
        return [];
    }
}
// Save Notes to the localStorage
const SaveNotes = function(notes){
    localStorage.setItem("notes",JSON.stringify(notes));
}

const remoNote = function(id){
    const index = notes.findIndex(function(note){
        return note.id === id;
    });

    if(index > -1){
        notes.splice(index,1);
    }
}

// Generate the DOM structure for a note
const generateNoteDOM = function(note){
    const rootEl = document.createElement("a");
    const textEl = document.createElement("p");
    const statusEl = document.createElement("p");

    // Setup text Element
    if(note.title.length > 0){
        textEl.textContent = note.title;
    }else{
        textEl.textContent = "Un-Named Note";
    }
    textEl.classList.add("list-item__title");
    rootEl.appendChild(textEl);

    // Setup the link
    rootEl.setAttribute("href",`/edit.html#${note.id}`);
    rootEl.classList.add("list-item");

    // Setup the status
    statusEl.textContent = generateLastEdited(note.updatedAt);
    statusEl.classList.add("list-item__subtitle");
    rootEl.appendChild(statusEl);

    return rootEl;
}

const sortNotes = function(notes,sortBy){
    if(sortBy === 'byEdited'){
        return notes.sort(function(a,b){
            if(a.updatedAt > b.updatedAt){
                return -1;
            }else if(a.updatedAt < b.updatedAt){
                return 1;
            }else{
                return 0;
            }
        })
    }else if(sortBy === 'byCreated'){
        return notes.sort(function(a,b){
            if(a.createdAt > b.createdAt){
                return -1;
            }else if(a.createdAt < b.createdAt){
                return 1;
            }else{
                return 0;
            }
        })
    }else if(sortBy === 'alphabetical'){
        return notes.sort(function(a,b){
            if(a.title.toLowerCase() < b.title.toLowerCase()){
                return -1;
            }else if(b.title.toLowerCase() < a.title.toLowerCase()){
                return 1;
            }else{
                return 0;
            }
        })
    }else{
        return notes;
    }
}

const renderNotes = function(notes,filter){
    const notesEl = document.querySelector("#notes");
    notes = sortNotes(notes,filter.sortBy);
    // filterNotes contains that array which you search in filterText
    let filterNotes = notes.filter(function(note) {
        return note.title.toLowerCase().includes(filter.searchText.toLowerCase());
    })
    notesEl.innerHTML = "";

    if(filterNotes.length > 0){
        filterNotes.forEach(function(note){
            const noteEl = generateNoteDOM(note);
            notesEl.appendChild(noteEl);
        })
    }else{
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "No Notes to Show!";
        emptyMessage.classList.add("empty-message");
        notesEl.appendChild(emptyMessage);
    }

 
}


// Generate the last edited message
const generateLastEdited = function(timeStamp){
    return  `Last Edited: ${moment(timeStamp).fromNow()}`;
}
