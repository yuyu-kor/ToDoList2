// 유저가 값을 입력한다
// + 버튼을 클릭하면, 할일이 추가된다
// check 버튼을 누르면 할일이 끝나면서 밑줄 처리된다
// 1. check 버튼을 클릭하는 순간, true false
// 2. true면 끝난 거로 간주하고 밑줄
// 3. false면 안 끝난 거로 간주하고 그대로
// delete 버튼을 누르면 할 일이 삭제된다
// ing, done 탭을 누르면 언더바가 이동한다
// done 탭은 끝난 아이템만, ing 탭은 진행 중인 아이템만
// 전체탭을 누르면 다시 전체아이템으로 돌아옴 


let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = 'all';
let filterList = [];

addButton.addEventListener("click", addTask);

for(let i=1;i<tabs.length;i++) {
    tabs[i].addEventListener("click", function(event) {
        filter(event);
    })
}

function addTask () {
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }

    // 입력값이 없을 땐 alert 창 뜨게 하고, 아이템 추가도 안 됨
    if (taskInput.value === '') {
        alert('할 일을 입력해주세요!');
        return;
    }

    taskList.push(task);
    // 할일을 입력하면 입력창 자동 초기화
    taskInput.value = '';
    render();
}

function render () {
    // 1. 선택한 탭에 따라
    let list = [];
    if (mode === "all") {
        list = taskList;
    }else {
        list = filterList;
    }
    // 2. 리스트를 달리 보여준다

    
    let resultHTML = "";
    
    for (let i=0;i<list.length;i++){
        if (list[i].isComplete == true) {
            resultHTML += `<div class="task">
                    <div class="task-done">${list[i].taskContent}</div>
                    <div>
                        <button onclick="toggleComplete('${list[i].id}')">check</button>
                        <button onclick="deleteTask('${list[i].id}')">delete</button>
                    </div>
                </div>`;
        } else {
            resultHTML += `<div class="task">
                    <div>${list[i].taskContent}</div>
                    <div>
                        <button onclick="toggleComplete('${list[i].id}')">check</button>
                        <button onclick="deleteTask('${list[i].id}')">delete</button>
                    </div>
                </div>`;
        }
        
    }

    

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete (id) {
    for (let i=0;i<taskList.length;i++) {
        if(taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
}

function deleteTask (id) {
    for (let i=0;i<taskList.length;i++) {
        if(taskList[i].id == id) {
            taskList.splice(i,1)
            break;
        }
    }
    if (mode === "ongoing") {
        filterList = taskList.filter(function(task){
            return !task.isComplete;
        });
    } else if (mode === "done") {
        filterList = taskList.filter(function(task) {
            return task.isComplete;
        })
    }
    render();
}

function filter (event) {
    mode = event.target.id;
    filterList = [];
    if(mode === "all"){
        // 전체 리스트를 보여준다
        render();
    } else if (mode === "ongoing") {
        // 진행 중인 아이템을 보여준다
        // task.isComplete = false
        for (let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i]);
            }
        }
        render();
        // console.log("진행중", filterList);
    } else if(mode === "done") {
        // 끝나는 케이스
        // task.isComplete = true
        for (let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i]);
            }
        }
        render();
    }
}

// Enter 키 눌렀을 때도 할 일 추가
taskInput.addEventListener("keydown", function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

function randomIDGenerate() {
    return Math.random().toString(36).substr(2, 16);
}