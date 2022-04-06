var tehtävälista = {
 
  // Alusta muistilista
  järjestys : [],
  Add : null, 
  Template : null, 
  List : null, 
  alusta : function() {
    
    if (localStorage.JustuksenTehtävälista == undefined) { localStorage.JustuksenTehtävälista = "[]"; }

    //Jos ei ole tyhjä
    tehtävälista.järjestys = JSON.parse(localStorage.JustuksenTehtävälista);

    // HTML elementit
    tehtävälista.Add = document.getElementById("todo-item");
    tehtävälista.Template = document.getElementById("todo-template").content;
    tehtävälista.List = document.getElementById("todo-list");

    // Lisää item
    document.getElementById("todo-add").onsubmit = tehtävälista.add;

    
    tehtävälista.draw();
  },

  
  draw : function() {
    // Resetoi lista
    tehtävälista.List.innerHTML = "";

    //  Luo rivejä
    if (tehtävälista.järjestys.length > 0) { for (let id in tehtävälista.järjestys) {
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

  // Tallenna tietoa localstorageen
  save: function() {
    localStorage.JustuksenTehtävälista = JSON.stringify(tehtävälista.järjestys);
    tehtävälista.draw();
  },

  // Lisää uusi item listaan
  add : function() {
    tehtävälista.järjestys.push([tehtävälista.Add.value, false]);
    tehtävälista.Add.value = "";
    tehtävälista.save();
    return false;
  },

  // Päivitä Tehtävä tehdyksi/Ei tehdyksi
  toggle: (id) => {
    tehtävälista.järjestys[id][1] = !tehtävälista.järjestys[id][1];
    tehtävälista.save();
  },

  // Poista
  del: (id) => { 
    if (confirm("Poista listalta?")) {
    tehtävälista.järjestys.splice(id, 1);
    tehtävälista.save();
  }}
};

// Sivun alustus ladatessa
window.addEventListener("load", tehtävälista.alusta);
