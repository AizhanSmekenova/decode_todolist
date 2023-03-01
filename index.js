function createAppTitle(title) {
    try {

        if (title && /[а-яА-Я1-9a-zA-Z]/.test(title)) {
            let appTitle = document.createElement('h2');
            appTitle.innerHTML = title
            return appTitle
        }

        else throw 'header is null'

    }
    catch (error) {
        console.log(error);
    }
}

function createToDoItem() {
    let row = document.createElement('div');
    let form = document.createElement('form');
    let inputWrapper = document.createElement('div');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3', 'd-flex', 'flex-row', 'align-items-center');
    inputWrapper.classList.add('w-75', 'pr-2');
    input.classList.add('form-control');
    input.placeholder = 'Введите название задачи';
    buttonWrapper.classList.add('w-25');
    button.classList.add('btn', 'btn-primary');
    button.innerHTML = 'Добавить';

    inputWrapper.append(input);
    buttonWrapper.append(button);

    form.append(inputWrapper, buttonWrapper);
    row.append(form);

    return {
        form,
        input,
        button
    };
}



function createToDoList() {
    let list = document.createElement('ul')
    list.classList.add('list-group')

    return list
}
let tasksFromStorage = []
if (localStorage.getItem('todo')) {
    tasksFromStorage = JSON.parse(localStorage.getItem('todo'))
}

function draw() {
    let container = document.getElementById('todo-app')
    let title = createAppTitle('Список задач')
    let toDoItem = createToDoItem()
    let toDoList = createToDoList()
    container.append(title)
    container.append(toDoItem.form)
    container.append(toDoList)
    let tasks = []
    if (tasksFromStorage.length) {
        // localStorage.removeItem('todo')
        tasksFromStorage.forEach((item, index) => {
            let task = createToDoListItem(item.title)
            if (item.done === true) {
                task.item.classList.add('list-group-item-success')
            }
            task.doneButton.addEventListener('click', () => {
                task.item.classList.toggle('list-group-item-success')
                tasksFromStorage[index].done = !tasksFromStorage[index].done
                localStorage.removeItem('todo')
                localStorage.setItem('todo', JSON.stringify(tasksFromStorage))
            })

            task.deleteButton.addEventListener('click', () => {
                if (confirm('Вы уверенны?')) {
                    task.item.remove()
                    tasksFromStorage.splice(index, 1)
                    localStorage.removeItem('todo')
                    localStorage.setItem('todo', JSON.stringify(tasksFromStorage))
                }
            })
            toDoList.append(task.item);
            localStorage.setItem('todo', JSON.stringify(tasksFromStorage))
        })
    }

    else {


        fetch("https://jsonplaceholder.typicode.com/todos")
            .then(resp => resp.json())
            .then(json =>
                json.forEach((item, index) => {
                    let task = createToDoListItem(item.title)

                    tasks.push({ title: item.title, done: false })
                    task.doneButton.addEventListener('click', () => {
                        task.item.classList.toggle('list-group-item-success')
                        tasks[index].done = !tasks[index].done
                        localStorage.removeItem('todo')
                        localStorage.setItem('todo', JSON.stringify(tasks))
                    })

                    task.deleteButton.addEventListener('click', () => {
                        if (confirm('Вы уверенны?')) {
                            task.item.remove()
                            tasks.splice(index, 1)
                            localStorage.removeItem('todo')
                            localStorage.setItem('todo', JSON.stringify(tasks))
                        }
                    })
                    toDoList.append(task.item);
                    localStorage.setItem('todo', JSON.stringify(tasks))
                })

            )
            .catch(e => console.log(e))
    }




    toDoItem.form.addEventListener('submit', (e) => {
        e.preventDefault()
        try {
            if (toDoItem.input.value) {
                let task = createToDoListItem(toDoItem.input.value)
                tasksFromStorage.push({ title: toDoItem.input.value, done: false })
                localStorage.removeItem('todo')
                localStorage.setItem('todo', JSON.stringify(tasksFromStorage))
                task.doneButton.addEventListener('click', () => {
                    task.item.classList.toggle('list-group-item-success')
                    tasksFromStorage[index].done = !tasksFromStorage[index].done
                    localStorage.removeItem('todo')
                    localStorage.setItem('todo', JSON.stringify(tasksFromStorage))
                })

                task.deleteButton.addEventListener('click', () => {
                    if (confirm('Вы уверенны?')) {
                        task.item.remove()
                        tasksFromStorage.splice(index, 1)
                        localStorage.removeItem('todo')
                        localStorage.setItem('todo', JSON.stringify(tasksFromStorage))
                    }
                })

                toDoList.append(task.item)
                toDoItem.input.value = ""
            } else throw "input value is null"
        }
        catch (e) {
            console.log(e);
        }

    })

}

function createToDoListItem(name) {
    try {
        if (name) {
            let item = document.createElement('li')
            let buttonGroup = document.createElement('div')
            let doneButton = document.createElement('button')
            let deleteButton = document.createElement('button')

            item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')
            item.textContent = name

            buttonGroup.classList.add('btn-group', 'btn-group-sm')
            doneButton.classList.add('btn', 'btn-success')
            doneButton.textContent = 'Done'
            deleteButton.classList.add('btn', 'btn-danger')
            deleteButton.textContent = 'Delete'

            buttonGroup.append(doneButton)
            buttonGroup.append(deleteButton)
            item.append(buttonGroup)
            return {
                item,
                doneButton,
                deleteButton
            }
        }
        else throw "todo's title is null"
    }
    catch (e) {
        console.log(e);
    }
}
draw()
