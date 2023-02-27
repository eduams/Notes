var open;
var lenght; //tamanho do último pacote de notas carregado
var addButtonDiv = document.getElementById('addButton_div');
var addButton = document.getElementById('addButton');
var addButton_selected = false;
var currentNotesSize = 0;

const router = async () => {

    const routes = [
        {path: "/1", view: () => console.log("Group1")},
    ];

}
//vai carregar os notes
    notes = fetch("notes.json")
    .then(response => response.json())
    .then(data => showInfo(data))

    function showInfo(data){
        notesObject = {
                    
        } 
        for(var i = 0; i < 9; i++){

            try {
                var notesListdiv = document.getElementById('links');
                var list = document.createElement('li');
                var link = document.createElement('a');
                var text = document.createTextNode(data.groups[i]['title']);
                var deleteIcon = document.createElement('i');
                deleteIcon.style.display = 'none'
                deleteIcon.setAttribute('class', 'fa fa-trash');
                list.appendChild(link);
                link.appendChild(text);
                notesListdiv.appendChild(deleteIcon);
                link.setAttribute('id',i);
                notesObject[i]= data.groups[i];
                link.setAttribute('onclick', 'showNotes('+i+')');
                link.setAttribute('onmouseenter', 'showDeleteIcon('+i+')');
                notesListdiv.appendChild(list);
                link.href = "#" + i;
            } catch (exceptionVar) {
                
              } finally {
          }          
        }
    }

function addNoteGroup(){

    //.setAttribute('contenteditable','true')
}

function showNotes(i){
    currentNotesSize = 0;
    //eliminar todas as notas carregadas
    try{
    var notesClass = document.getElementsByClassName('note');
    for(var x = 0; x < lenght;x++){
    notesClass[0].parentNode.removeChild(notesClass[0]);
    }
    }
    catch{}

    //adiciona o onclick com a variável i no botão de adicionar notas
    addButton.setAttribute('onclick', 'addNote('+i+')');

    //carregar novas notas
    lenght = Object.keys(notesObject[i]['notes']).length ;
    var allNotes = () => {

            var content = document.getElementById('content');
            var note = {};
            var noteText = {};
            for(var x = 0; x < lenght; x++){
                try{
                if(notesObject[i]['notes'][x]['note'] === null){
                    break
                }
                else{
                noteText[x] = document.createTextNode(notesObject[i]['notes'][x]['note']);
                note[x] = document.createElement('div');
                note[x].setAttribute('class', 'note')
                note[x].setAttribute('id', 'note'+[x])
                note[x].setAttribute('onclick', 'deleteNote'+'('+x+','+i+')')
                content.appendChild(note[x]);
                note[x].appendChild(noteText[x])
                currentNotesSize++;
            }
                }
                catch{
                    console.log('Erro ao ler nota. Pulando...')
                }
        }
    };
    allNotes();
    console.log(currentNotesSize);
}

function deleteNote(x,i){
    console.log(x,i);
    console.log(currentNotesSize);
    if (currentNotesSize == 1){
    notesObject[i]['notes'][x] = {'note': null};
    }
    else{
    notesObject[i].notes.splice(x, 1);
    }

    console.log(notesObject)

    notesObjectwithGroups = {groups: notesObject};
    fetch("/post",
    {
        method: "POST",    
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(notesObjectwithGroups)
    })

    console.log(notesObject);
    showNotes(i);
    }

function autoHide(){
    let sidebar = document.getElementById("sidebar");
    var sidebarSize = sidebar.offsetWidth;
    sidebar.style.marginLeft = -(sidebarSize).toString()+"px";
    open = false;
}

function openbar(){
    if(open==false){
        let sidebar = document.getElementById("sidebar");
        var sidebarSize = sidebar.offsetWidth;
        sidebar.style.marginLeft = "0px";
        open = true;
        return;
    }
    if(open==true){
        let sidebar = document.getElementById("sidebar");
        var sidebarSize = sidebar.offsetWidth;
        sidebar.style.marginLeft = (-sidebarSize).toString()+"px";
        open = false;
        return;
    }
    }

function addNote(i){
    if(addButton_selected == false){
    addButton.setAttribute('contenteditable','true')
    addButton.focus();
    saveNoteButton = document.createElement('div');
    saveNoteButton.setAttribute('id', 'saveNote_button')
    addButtonDiv.appendChild(saveNoteButton);
    saveNoteButton.setAttribute('onclick','saveNote('+i+')')
    addButton_selected = true;
    }
}

function saveNote(i){
    deletedSearch = null;
    var y;

    for (y = 0;deletedSearch !== undefined; 0){
        noteString = notesObject[i]['notes'][y]['note'];
        if(noteString === '/deleted'){
            break
        }
        y++;
        deletedSearch = notesObject[i]['notes'][y];
        console.log(deletedSearch);
    }

    console.log(notesObject)

    newNote = {note: document.getElementById('addButton').textContent};

    if(deletedSearch === undefined){
        newNotePlace = currentNotesSize;
        notesObject[i]['notes'][newNotePlace] = newNote;
        currentNotesSize++;
    }
    else{
        notesObject[i]['notes'][y] = newNote;
    }

    notesObjectwithGroups = {groups: notesObject};
    
    fetch("/post",
    {
        method: "POST",    
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(notesObjectwithGroups)
    })

    addButton.setAttribute('contenteditable','false')
    saveNoteButton.remove();
    addButton_selected = false;
    showNotes(i);
}