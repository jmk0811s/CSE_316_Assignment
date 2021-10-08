
let currentNoteID = 0;
let initflag = 0;
let lastUpID = 0;
let sortFlag = 0;

let noteArray = [
    {
        "noteText": "CSE 316 Assignment 1 - Minki Jeon",
        "date": "9/23/2021",
        "ID": "note-1",
        "lastUpdate": "9/23/2021/0/00/00"
    },
    {
        "noteText": "This is a note with a long line of text",
        "date": "8/17/2021",
        "ID": "note-2",
        "lastUpdate": "8/17/2021/0/00/00"
    },
    {
        "noteText": "CSE 316",
        "date": "8/17/2021",
        "ID": "note-3",
        "lastUpdate": "8/17/2021/0/00/00"
    },
    {
        "noteText": "CSE 416",
        "date": "7/15/2021",
        "ID": "note-4",
        "lastUpdate": "7/15/2021/0/00/00"
    },
];


document.addEventListener('DOMContentLoaded', function() {
    insertHTML();

    document.getElementById('add').onclick = function () {
        let textarea = document.getElementById('noteBody');
        textarea.readOnly=false;
        insertHTML();
        let note = document.getElementById('note-1');
        note.focus();
        notePreview(note.id);
    };

    document.getElementById('del').onclick = function () {
        if (currentNoteID == 0) return;
        deleteNote();
        let note = document.getElementById('note-1');
        let textarea = document.getElementById('noteBody');
        if (note == null) {
            console.log("no note");
            textarea.value = "There is no note. Please create a new note.";
            textarea.readOnly=true;
        }
        else {
            note.focus();
            notePreview(note.id);
        }
    };

    document.getElementById('profile').onclick = function (event) {
        if (event.target === document.getElementById('profile')) {
            document.getElementById('profile').style.display = 'none'
        }
    };

}, false);

//console.log("This gets run immediately upon the JavaScript file being loaded");

function insertHTML() {
    let today = new Date();
    let date = "" + (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
    let lastUpdate = date + '/' + today.getHours() + '/' + today.getMinutes() + '/' + today.getSeconds();

    let newNote = {
        "noteText": "New Note",
        "date": date,
        "ID": "note-" + (noteArray.length + 1),
        "lastUpdate": lastUpdate
    };

    if (initflag == 1) {
        noteArray.push(newNote);
        lastUpID = noteArray.length;
    }
    resetNoteID();

    let newHTML = document.getElementById("noteContainer");

    for(let i=0; i<noteArray.length; i++) {
        newHTML += `<div id="note-${i+1}" class="note" tabindex="0">` +
            `<p class="noteText">` + Object.values(noteArray[i])[0] + `</p>` +
            `<p class="date">` + Object.values(noteArray[i])[1] + `</p>` +
            `</div>`;

    }
    let noteContainer = document.getElementById("noteContainer");


    while (noteContainer.firstChild) {
        noteContainer.firstChild.remove();
    }

    noteContainer.insertAdjacentHTML("afterbegin", newHTML);

    noteContainer.firstChild.remove();

    for(let i=0; i<noteArray.length; i++) {
        let note = document.getElementById("note-"+(i+1));
        note.addEventListener('click', function(){
            notePreview(note.id);
        });

    }

    initflag = 1;
}

let deleteNote = (event) => {
    console.log("Delete Note");
    let note = document.getElementById(currentNoteID);
    let noteContainer = document.getElementById("noteContainer");
    note.remove();
    for (let i = 0; i < noteArray.length; i++) {
        //console.log(noteArray[i].ID == currentNoteID);
        if (noteArray[i].ID == currentNoteID && i < noteArray.length) {
            for (let j = i; j < noteArray.length - 1; j++) {
                noteArray[j + 1].ID = "note-" + (noteArray[j + 1].ID.split('-')[1] - 1);
                noteArray[j] = noteArray[j + 1];
            }
            noteArray.pop();
            break;
        }
    }
    let textarea = document.getElementById("noteBody");
    textarea.innerText = "";
    currentNoteID = 0;
    sortFlag = 0;
    initflag = 0;
    insertHTML();
}

let resetNoteID = () => {

    sortNoteArray();

    console.log("reset id");
    let noteContainer = document.getElementById("noteContainer");
    for (let i = 0; i < noteContainer.children.length; i++) {
        noteContainer.children[i].id = "note-" + (i + 1);
        noteArray[i].ID = "note-" + (i + 1);
    }
}

let notePreview = (id) => {
	console.log("Load Note");
    currentNoteID = id;
    let note = document.getElementById(currentNoteID);
    let textarea = document.getElementById("noteBody");
    textarea.value = note.children[0].textContent;
}

let saveNote = () => {
    console.log("Save Note");
    let textarea = document.getElementById("noteBody");
    let note = document.getElementById(currentNoteID);
    let today = new Date();
    let date = "" + (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
    let lastUpdate = date + '/' + today.getHours() + '/' + today.getMinutes() + '/' + today.getSeconds();
    note.children[0].textContent = textarea.value;
    note.children[1].textContent = date;
    noteArray[currentNoteID.split('-')[1] - 1].noteText = textarea.value;
    noteArray[currentNoteID.split('-')[1] - 1].date = date;
    noteArray[currentNoteID.split('-')[1] - 1].lastUpdate = lastUpdate;
    lastUpID = currentNoteID.split('-')[1];
    initflag = 0;
    insertHTML();
}

let sortNoteArray = () => {
    if (sortFlag == 0) {
        sortFlag = 1;
        return;
    }
    if (lastUpID == 1) {
        return;
    }

    console.log("Sorting NoteArray");
    //console.log("lastUpID = " + lastUpID);

    if (lastUpID == 0) return;

    let upNote = noteArray[lastUpID - 1];
    //console.log("upnote: " + upNote.ID);
    let temp = {
        "noteText": noteArray[0].noteText,
        "date": noteArray[0].date,
        "ID": noteArray[0].ID,
        "lastUpdate": noteArray[0].lastUpdate
    };
    noteArray[0] = upNote;


    let index = lastUpID - 2;

    for (let i = index; i >= 0; i--) {
        noteArray[i + 1] = noteArray[i];
    }
    noteArray[1] = temp;
}














