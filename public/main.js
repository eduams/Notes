var open;
//tamanho do último pacote de notas carregado
var lenght;

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
                list.appendChild(link);
                link.appendChild(text);
                link.setAttribute('id',i);
                notesObject[i]= data.groups[i];
                link.setAttribute('onclick', 'showNotes('+i+')');
                notesListdiv.appendChild(list);
                link.href = "#" + i;
            } catch (exceptionVar) {
                
              } finally {
                
          }          
        }
    }

function showNotes(i){
    //eliminar todas as notas carregadas
    try{
    var notesClass = document.getElementsByClassName('note');
    for(var x = 0; x < lenght;x++){
    notesClass[0].parentNode.removeChild(notesClass[0]);
    }
    }
    catch{}

    //carregar novas notas
    console.log(notesObject[i]);
    lenght = Object.keys(notesObject[i]['notes']).length;
    var allNotes = () => {

        var note = {};
        var noteText = {};
        for(var x = 0; x < lenght; x++){
        var content = document.getElementById('content');
        note[x] = document.createElement('div');
        note[x].setAttribute('class', 'note')
        note[x].setAttribute('id', 'note'+[x])
        content.appendChild(note[x]);
        noteText[x] = document.createTextNode(notesObject[i]['notes'][x]['note']);
        console.log(notesObject[i]['notes'][x])
        note[x].appendChild(noteText[x])
        }
    };

    allNotes();


    console.log(i)
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
