var inputBox = document.getElementById("task");
var add = document.getElementById("add");
var del = document.getElementById("clearAll");
var quantity = document.getElementById("qnt");
var list = document.getElementById("list");
var noTask = document.querySelector(".noTask");

showList();

add.onclick = function(){
  if (inputBox.value.trim() == "") {
    inputBox.value = ""; inputBox.focus();
  }
  else {
    var newTask = inputBox.value;
    var glsd = localStorage.getItem("todo");
    if(glsd == null){
      listStorage = [];
    }else{
      listStorage = JSON.parse(glsd);
    }

    listStorage.push(newTask);
    localStorage.setItem("todo", JSON.stringify(listStorage));
    showList();
  }
}


function showList(){
  var glsd = localStorage.getItem("todo");
  if(glsd == null){
    listStorage = [];
  }else{
    listStorage = JSON.parse(glsd);
  }

  if(listStorage.length == 1){
    noTask.style.display = "none";
    quantity.innerText = "1 Task To Do";
  }
  else if(listStorage.length < 1){
    noTask.style.display = "flex";
    quantity.innerText = "0 Tasks To Do";
  }
  else{
    noTask.style.display = "none";
    quantity.innerText = listStorage.length + " Tasks To Do";
  }

  var li = "";

  listStorage.forEach((elm, index) => {
    var title = elm;
    if(elm.length > 30){elm = elm.substr(0,28) + "...";}
    li += "<li title='" + title + "'>" + elm + "<span id='remove' onclick='remove(" + index + ")'>✕</span></li>";
  });
  list.innerHTML = li;
  inputBox.value = "";
}


function remove(index){
  var glsd = localStorage.getItem("todo");
  listStorage = JSON.parse(glsd);
  listStorage.splice(index, 1);
  localStorage.setItem("todo", JSON.stringify(listStorage));
  showList();
}



del.onclick = function(){
  listStorage = [];
  localStorage.setItem("todo", JSON.stringify(listStorage));
  showList();
}
