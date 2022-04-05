var tehtävälista = {
  // Alusta muistilista
  järjestys : [],
  Add : null, // html add item tekstikenttä
  Template : null, // html item row template
  List : null, // html to do list
  alusta : function() {
    // (A1) INIT LOCALSTORAGE
    if (localStorage.JustuksenTehtävälista == undefined) { localStorage.JustuksenTehtävälista = "[]"; }

    // (A2) RESTORE PREVIOUS SESSION
    tehtävälista.järjestys = JSON.parse(localStorage.JustuksenTehtävälista);

    // (A3) GET HTML ELEMENTS
    tehtävälista.Add = document.getElementById("todo-item");
    tehtävälista.Template = document.getElementById("todo-template").content;
    tehtävälista.List = document.getElementById("todo-list");

    // (A4) "ENABLE" ADD ITEM FORM
    document.getElementById("todo-add").onsubmit = tehtävälista.add;

    // (A5) DRAW TO DO LIST
    tehtävälista.draw();
  },

  // (B) DRAW TO DO LIST
  draw : function() {
    // (B1) RESET LIST
    tehtävälista.List.innerHTML = "";

    // (B2) LOOP & GENERATE ROWS
    if (tehtävälista.järjestys.length>0) { for (let id in tehtävälista.järjestys) {
      let row = tehtävälista.Template.cloneNode(true);
      row.querySelector(".todo-item").textContent = tehtävälista.järjestys[id][0];
      row.querySelector(".todo-done").onclick = () => { tehtävälista.toggle(id); };
      row.querySelector(".todo-del").onclick = () => { tehtävälista.del(id); };
      if (tehtävälista.järjestys[id][1]) {
        row.querySelector(".todo-item").classList.add("todo-ok");
      }
      tehtävälista.List.appendChild(row);
    }}
  },

  // (C) HELPER - SAVE DATA INTO LOCAL STORAGE
  save: function() {
    localStorage.JustuksenTehtävälista = JSON.stringify(tehtävälista.järjestys);
    tehtävälista.draw();
  },

  // (D) ADD A NEW ITEM TO THE LIST
  add : function() {
    tehtävälista.järjestys.push([tehtävälista.Add.value, false]);
    tehtävälista.Add.value = "";
    tehtävälista.save();
    return false;
  },

  // (E) UPDATE TODO ITEM DONE/NOT YET
  toggle: (id) => {
    tehtävälista.järjestys[id][1] = !tehtävälista.järjestys[id][1];
    tehtävälista.save();
  },

  // (F) DELETE ITEM
  del: (id) => { 
    if (confirm("Poista listalta?")) {
    tehtävälista.järjestys.splice(id, 1);
    tehtävälista.save();
  }}
};

// (G) PAGE INIT
window.addEventListener("load", tehtävälista.alusta);
