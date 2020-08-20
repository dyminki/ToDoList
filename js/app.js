document.addEventListener("DOMContentLoaded", function () {
    //Showin and hiding form
    var newTask = document.getElementById("task-new");
    var taskForm = document.querySelector(".task-features")

    newTask.addEventListener("click", function(event){
        taskForm.classList.toggle("task-features-display");
    });

    //Priority - showing the stars
    var priority = document.getElementById("priority");
    var stars = document.querySelectorAll(".fa-star");
    var starCount;

    priority.addEventListener("change", function(){
        var starNumber = priority.value;
        if (starNumber < starCount){
            stars[starCount-1].classList.remove("checked");
        } else {
            for (var i = 0; i < starNumber; i++) {
            stars[i].classList.add("checked");
            }
        }
        starCount = priority.value;
    });

    //Adding new element to the list
    //Elements
    var addTask = document.getElementById("task-add");
    var taskList = document.getElementById("task-list");
    var task = document.getElementById("task");
    var date = document.getElementById("date");
    var priority = document.getElementById("priority");
    var description = document.getElementById("description");

    //Checking if something is in ls
    function checkLocalStorage() {
    var tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;  
    }
    //Validation condition
    function validation(value) {
        if (value.length > 2 && value.length < 100) {
            return true;
        } else {
            return false;
        }
    }

    addTask.addEventListener("click", function(event){
        //Validation
        if (validation(task.value) === false) {
            alert("Your task name has incorrect length. Please try again :)");
            e.stopImmediatePropagation();
        }
        //New elements
        var newLi           = document.createElement("li");
        var newTask         = document.createElement("h3");
        var newDate         = document.createElement("span");
        var newPriority     = document.createElement("div");
        var newDescription  = document.createElement("p");
        var newBtnDelete    = document.createElement("a");
        var newBtnComplete  = document.createElement("a");

        //Creating stars
        for (var i = 0; i < priority.value; i++){
            var newStar = document.createElement("span");
            newStar.classList.add("fa");
            newStar.classList.add("fa-star");
            newStar.classList.add("checked");
            newPriority.appendChild(newStar);
        }

        //Elements inside
        newTask.innerText           = task.value;
        newDate.innerText           = date.value;
        newDescription.innerText    = description.value;
        newBtnDelete.innerHTML      = '<i class="far fa-times-circle"></i>';
        newBtnComplete.innerHTML    = '<i class="far fa-check-circle"></i>';

        //Elements classes
        newDate.classList.add("till");
        newBtnDelete.classList.add("task-delete");
        newBtnComplete.classList.add("task-complete");
        newLi.classList.add("collection-item");
        newTask.classList.add("title");
        newPriority.classList.add("priority");
        newDescription.classList.add("remark");
        

        //Adding elements to li
        newLi.appendChild(newDate);
        newLi.appendChild(newBtnDelete);
        newLi.appendChild(newBtnComplete);
        newLi.appendChild(newTask);
        newLi.appendChild(newPriority);
        newLi.appendChild(newDescription);

        taskList.appendChild(newLi);

        //Geting inpute valuse for local storage
        var storageInfo = {title: task.value, date: date.value, priority: priority.value, description: description.value, isCompleted: false};
        storeTaskInLocalStorage(storageInfo);

        //Event for delete button
        newBtnDelete.addEventListener("click",  removeTask);

        //Event for completed button
        newBtnComplete.addEventListener("click", function () {
            newLi.classList.toggle("completed");
            changeCompletedInLocalStorage(this.parentElement);
        });

        //Hiding form after click
        taskForm.classList.toggle("task-features-display");

        //Cleaning the form
        task.value = "";
        date.value = "";
        priority.value = "";
        description.value = "";
    });

    //Puting data in ls
    function storeTaskInLocalStorage(task) {
        var tasks = checkLocalStorage();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    //Geting data form ls
    function getTasks() {
        var tasks = checkLocalStorage();
        //Looping through ls keys
        tasks.forEach(function(key){
            //New elements
            var newLi           = document.createElement("li");
            var newTask         = document.createElement("h3");
            var newDate         = document.createElement("span");
            var newPriority     = document.createElement("div");
            var newDescription  = document.createElement("p");
            var newBtnDelete    = document.createElement("a");
            var newBtnComplete  = document.createElement("a");

            //Creating the stars
            for (var i = 0; i < key.priority; i++){
                var newStar = document.createElement("span");
                newStar.classList.add("fa");
                newStar.classList.add("fa-star");
                newStar.classList.add("checked");
                newPriority.appendChild(newStar);
            }

            //Elements inside
            newTask.innerText           = key.title;
            newDate.innerText           = key.date;
            newDescription.innerText    = key.description;
            newBtnDelete.innerHTML      = '<i class="far fa-times-circle"></i>';
            newBtnComplete.innerHTML    = '<i class="far fa-check-circle"></i>';

            //Elements classes
            newLi.classList.add("collection-item");
            if(key.isCompleted === true){
                newLi.classList.add("completed");
            }
            newTask.classList.add("title");
            newDate.classList.add("till");
            newPriority.classList.add("priority");
            newDescription.classList.add("remark");
            newBtnDelete.classList.add("task-delete");
            newBtnComplete.classList.add("task-complete");

            //Adding elements to li
            newLi.appendChild(newDate);
            newLi.appendChild(newBtnDelete);
            newLi.appendChild(newBtnComplete);
            newLi.appendChild(newTask);
            newLi.appendChild(newPriority);
            newLi.appendChild(newDescription);

            taskList.appendChild(newLi);

            //Event for delete button
            newBtnDelete.addEventListener("click", removeTask);

            //Event for completed button
            newBtnComplete.addEventListener("click", function () {
                newLi.classList.toggle("completed");
                changeCompletedInLocalStorage(newLi);
            });
        });
    }

    //Activating function to get data form ls
    getTasks();

    //Deleting tasks one by one
    function removeTask(e) {
        if(e.target.parentElement.classList.contains('task-delete')) {
            e.target.parentElement.parentElement.remove();
            // removing from ls
            removeTaskFromLocalStorage(e.target.parentElement.parentElement); 
        }
    }

    //Function deleting tasks one by one from ls
    function removeTaskFromLocalStorage(removedTask) {
        var tasks = checkLocalStorage();

        tasks.forEach(function(task, index){
            if( task.title === removedTask.children[3].innerHTML && task.description === removedTask.children[5].innerHTML) {
                tasks.splice(index, 1);
            }
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function checking if task is completed
    function changeCompletedInLocalStorage(completedTask){
        var tasks = checkLocalStorage();

        tasks.forEach(function(task){
            if(task.title === completedTask.children[3].innerHTML && task.description === completedTask.children[5].innerHTML){
                if(task.isCompleted){
                    task.isCompleted = false;
                }else{
                    task.isCompleted = true;
                } 
            }
        })
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    //Filtering tasks by title
    filter.addEventListener("keyup", filterTasks);

    function filterTasks(e) {
        const text = e.target.value.toLowerCase();
        document.querySelectorAll('.collection-item').forEach(function(task){
            const item = task.querySelector(".title").textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        });
    }

    //function cleaning everything from ls
    function clearTasksFromLocalStorage() {
        localStorage.removeItem('tasks');
    }

    //Deleting Everything!
    var deleteTasks = document.getElementById("clear")

    deleteTasks.addEventListener("click", function(event){
        var allTasks = document.querySelectorAll(".collection-item");
        clearTasksFromLocalStorage()
        for (var i = 0; i < allTasks.length; i++) {
            allTasks[i].parentElement.removeChild(allTasks[i]);
        }
    });

});