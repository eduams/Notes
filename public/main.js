var open;

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
        for(var i = 0; i < 9; i++){
            try {
                var notesListdiv = document.getElementById('links');
                var list = document.createElement('li');
                var link = document.createElement('a');
                var text = document.createTextNode(data.groups[i]['title']);
                list.appendChild(link);
                link.appendChild(text);
                notesListdiv.appendChild(list);
                link.href = "#" + i;    
            } catch (exceptionVar) {
                
              } finally {
                
              }
              
        }


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
