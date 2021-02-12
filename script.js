window.addEventListener('load', () => {
  window.myToDoList = new ToDoList();
  //Date function
  let dateElement = document.querySelector('.date');
  const options = {weekday: "long", month:"short", day:"numeric"};
  const today = new Date()
  dateElement.innerHTML = today.toLocaleDateString("en-FR", options);
})

class ToDoList {

  constructor() {
    this.input = document.querySelector('input');
    this.addBtn = document.querySelector('.addBtn');
    this.clearBtn = document.querySelector('.clearBtn');
    this.badge = document.querySelector('.badge');
    this.list = document.querySelector('.taskList');
    this.btnList = document.querySelector('.btnList');

    // Clic management
    this.addBtn.addEventListener('click', () => {
        this.addTask();
        this.setStorage();
    });
    
    //Keyboard management
    window.addEventListener('keyup', (e) => {
      if (e.key == 'Enter' && this.input.value != '') {
        this.addTask();
        this.setStorage();
      }
    });
    
    //Clear button management
    this.clearBtn.addEventListener('click', () => {
      this.removeAllTasks();
    });
    
  }
  
  setStorage() { 
    localStorage.setItem('TEXT', JSON.stringify(this.text)); 
}

  addTask() {
    //variables
    let text = this.input.value;
   // text = "";
    const task = document.createTextNode(text);
    const span = document.createElement('span');
    const div1 = document.createElement('DIV');
    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    //Adding a task
    span.appendChild(task);
    div1.appendChild(span);
    //Adding buttons edit and delete
    editBtn.className = 'far fa-edit btn-sm';
    deleteBtn.className = 'far fa-trash-alt btn-sm';
    div1.appendChild(editBtn);
    div1.appendChild(deleteBtn);
    //Adding all to the list
    this.list.appendChild(div1);
    //Task complete
    span.addEventListener('click', () => {
      span.classList.toggle('overlined');
    });
  
    //Edit Btn fonctionality
    editBtn.addEventListener('click', () => {
      span.contentEditable = "true";
      span.style.backgroundColor = "#dddbdb";
    });

    // Clear Btn fonctionality
    deleteBtn.addEventListener('click', () => {
      div1.parentNode.removeChild(div1);
      //task count down
      this.badge.textContent = parseInt(this.badge.textContent) - 1;
    });

    //Task count up
    this.badge.textContent = parseInt(this.badge.textContent) + 1;
  }

  removeAllTasks() {
    while(this.list.hasChildNodes()) {
      this.list.removeChild(this.list.firstChild);
    }
    //setting the count to 0 and clear input
    this.badge.textContent = 0;
    this.input.textContent = " ";
  }
}