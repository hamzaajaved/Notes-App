const noteTitle = document.querySelector("#note-title");
const noteArea = document.querySelector("#note-area");
const removeElement = document.querySelector("#remove-note");
const updateTime = document.querySelector("#updateTime");
const notesId = location.hash.substring(1);

let notes = getSavedNotes();

let note = notes.find(function(note){
    return note.id === notesId;
});

if(note === undefined){
    location.assign("/index.html");
}
noteTitle.value = note.title;
noteArea.value = note.body;
updateTime.textContent = generateLastEdited(note.updatedAt);

noteTitle.addEventListener("input",function(e){
    note.title = e.target.value;
    note.updatedAt = moment().valueOf();
    updateTime.textContent = generateLastEdited(note.updatedAt);
    SaveNotes(notes);
})

noteArea.addEventListener("input",function(e){
    note.body = e.target.value;
    note.updatedAt = moment().valueOf();
    updateTime.textContent = generateLastEdited(note.updatedAt);
    SaveNotes(notes);
})

removeElement.addEventListener("click", function(){
    remoNote(note.id);
    SaveNotes(notes);
    location.assign("/index.html");
});

window.addEventListener("storage", function(e){
    if(e.key === 'notes'){
        notes = JSON.parse(e.newValue);
        note = notes.find(function(note){
            return note.id === notesId;
        })

        if(note === undefined){
            location.assign("/index.html");
        }
        noteTitle.value = note.title;
        noteArea.value = note.body;
        updateTime.textContent = generateLastEdited(note.updatedAt);
    }
});
