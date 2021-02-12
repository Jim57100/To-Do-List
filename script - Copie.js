window.addEventListener('load', () => {
  window.myToDoList = new ToDoList();
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
    /*this.days = ["1", "2", "3","4","5","6"];
    this.months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];*/

    this.addBtn.addEventListener('click', () => {
        this.addTask();

    });
    
    window.addEventListener('keyup', (e) => {
      if (e.key == 'Enter' && this.input.value != '') {
        e.preventDefault();
        this.addTask();
      }
    });
    
    this.clearBtn.addEventListener('click', () => {
      this.removeAllTasks();
    });
    
  }
  
  addTask() {
    let text = document.createTextNode(this.input.value);
    let span = document.createElement('span');
    let div1 = document.createElement('DIV');
    this.input.value = "";
    span.appendChild(text);
    div1.appendChild(span);
    this.list.appendChild(div1);

    span.addEventListener('click', () => {
      span.classList.toggle('overlined');
    });
  
    // in-line Btn 
    let div2 = document.createElement('DIV');
    let editBtn = document.createElement('button');
    this.btnList.appendChild(div2);
    div2.appendChild(editBtn);
    editBtn.className = 'far fa-edit-md';
    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'far fa-trash-alt-md';
    div2.appendChild(deleteBtn);
    
    //Edit Btn fonctionality
    editBtn.addEventListener('click', () => {
      span.contentEditable = "true";
      span.style.backgroundColor = "#dddbdb";
    });

    // Clear Btn fonctionality
    deleteBtn.addEventListener('click', () => {
      li.parentNode.removeChild(li);
      this.badge.textContent = parseInt(this.badge.textContent) - 1;
    });

    //badge
    this.badge.textContent = parseInt(this.badge.textContent) + 1;
    console.log(this.badge);
  }

  removeAllTasks() {
    while (this.list.hasChildNodes() || this.btnList.hasChildNodes()) {
      this.list.removeChild(this.list.firstChild);
      this.btnList.removeChild(this.btnList.firstChild);
    }
    this.badge.textContent = 0;
    this.input.textContent = " ";
  }
}