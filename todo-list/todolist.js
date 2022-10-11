/*
Una Todo list, cioè una lista delle cose da fare, deve:
- Tenere traccia di un elenco di cose da fare, cioè una lista di stringhe
- Permettermi di aggiungere un elemento all'elenco
- Permettermi di marcare un elemento come "Done", come completato
- Permettermi di vedere l'elenco delle cose ancora da fare
- Permettermi di vedere l'elenco delle cose già fatte
*/

// La classe ricordiamo che è come uno stampino per creare oggetti, oggetti di quella classe



// Cosa succederebbe se noi creassimo l'ol dove visualizzare i task
// fuori dalla classe?
// 1) Non ne avrei una per ogni istanza, cioè, questa cosa non dipende più dal new, dalla TodoList
// 2) In questo caso, avrei varie todolist che aggiungono tasks alla stessa ol
// let tasksOl = document.createElement('ol')
// document.querySelector('body').appendChild(tasksOl)

class TodoList {
  // Qua, direttamente nella classe, posso definire:
  // - dei metodi, cioè delle funzionalità della mia classe
  // - delle proprietà, che sono le proprietà che avrà ogni oggetto di questa classe

  // Dichiarare proprietà qua, con un valore, è uguale
  // a farlo nel costruttore - questo è il loro valore iniziale
  tasksToDo = [] // Le cose ancora da fare
  tasksDone = [] // Le cose già fatte

  constructor(tagId) {
    // Queste due righe farebbero la stessa cosa
    // this.tasksToDo = []
    // this.tasksDone = []

    this.attachTo(tagId)
  }

  addTodo(task) {
    this.tasksToDo.push(task)
    this.visualizeAllTasks()
  }

  completeTodo(task) {
    // 1) Va prendere l'indice/la posizione del task da completare,
    //    nella lista dei tasks to do
    let index = this.tasksToDo.indexOf(task)

    // 2) Aggiunge l'elemento alla lista delle cose fatte
    let doneTask = this.tasksToDo[index]
    this.tasksDone.push(doneTask)

    // 3) Elimina dalla lista delle cose da fare
    this.tasksToDo.splice(index, 1)

    // 4) Visualizziamo di nuovo i task
    this.visualizeAllTasks()
  }

  visualizeAllTasks() {
    this.tasksOl.innerHTML = ''
    for (let task of this.tasksToDo) {
      let taskLi = document.createElement('li')
      taskLi.innerText = task
      taskLi.addEventListener('click', () => this.completeTodo(task))
      this.tasksOl.appendChild(taskLi)
    }

    // Nice to have per il futuro: visualizzare anche tutti i task completati
  }

  attachTo(tagId) {
    // 1) Abbiamo un ID, facciamo document.getElementById per prendere il tag
    let tagWhereToDisplay = document.getElementById(tagId)

    // 2) Creiamo i vari tag della nostra Todo List
    //    input per inserire un todo, etc.
    let taskInput = document.createElement('input')
    taskInput.type = "text"
    let addTaskButton = document.createElement('button')
    addTaskButton.innerText = "Add Task"
    this.tasksOl = document.createElement('ol')

    // Quando noi passiamo una funzione come valore, deve essere una funzione
    // che può essere richiamata in futuro. Solitamente una funzione che dovrà
    // essere richiamata si chiama callback.
    // Questa riga non funzionerebbe perché così io sto mettendo dentro a onclick
    // il valore di return della funzione addTodo, la sto chiamando qua.
    // addTaskButton.onclick = this.addTodo(taskInput.value)

    addTaskButton.onclick = () => this.addTodo(taskInput.value)
    // Stessa cosa:
    // addTaskButton.onclick = function () { this.addTodo(taskInput.value) }

    // 3) Li andiamo a visualizzare all'interno del tag che abbiamo selezionato
    tagWhereToDisplay.appendChild(taskInput)
    tagWhereToDisplay.appendChild(addTaskButton)
    tagWhereToDisplay.appendChild(this.tasksOl)
    tagWhereToDisplay.appendChild(document.createElement('hr'))
  }

}

