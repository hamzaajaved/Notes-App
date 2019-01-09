let notes = getSavedNotes();
const filter = {
    searchText: "",
    sortBy: "byEdited"
}
renderNotes(notes,filter);

document.querySelector("#filterNotes").addEventListener("input",function(e){
    filter.searchText = e.target.value;
    renderNotes(notes,filter);
})

document.querySelector("#filter-by").addEventListener("change",function(e){
   filter.sortBy = e.target.value;
   renderNotes(notes,filter);
});

document.querySelector("#create-note").addEventListener("click",function(e){
    e.preventDefault();
    const id  = uuidv4();
    const timeStamp = moment().valueOf();
    notes.push({
        id: id,
        title : "",
        body: "",
        createdAt: timeStamp,
        updatedAt: timeStamp
    });

    location.assign(`/edit.html#${id}`);
    SaveNotes(notes);
    e.target.elements.notesText.value = "";
    document.querySelector("#notes-text").focus();
    renderNotes(notes,filter);
});

window.addEventListener("storage", function(e){
    if(e.key == "notes"){
        notes = JSON.parse(e.newValue);
        renderNotes(notes,filter);
    }
})
