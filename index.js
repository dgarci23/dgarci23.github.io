let id = 1;
let curr_id = 0;
/* Prevents multiple slides at the same time */
let run = true;
/* Project Cards */
const projects = document.querySelectorAll(".project-card");

function changeLeft() {
    projects.forEach((item, index) => {
        item.classList.remove("move-left");
        item.style.left = `${(index-id)*77}vw`;
        if (Math.abs(id - index) === 1) {
            item.classList.add("side-card");
        } else {
            item.classList.remove("side-card");
        }
    });
    id = curr_id;
    run = true;
}
function changeRight() {
    projects.forEach((item, index) => {
        item.classList.remove("move-right");
        item.style.left = `${(- id + index + 2)*77}vw`;
        if (Math.abs(id - index) === 1) {
            item.classList.add("side-card");
        } else {
            item.classList.remove("side-card");
        }
    });
    id = curr_id;
    run = true;
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("project-card") && run) {
        if (e.target.id == id) {
            console.log("nothing...same id");
        } else {
            run = false;
            if (id > Number(e.target.id)) {
                projects.forEach((item) => {item.classList.add("move-right")});
                setTimeout(changeRight,1800);
                curr_id = Number(e.target.id);
            } else {
                projects.forEach((item) => {item.classList.add("move-left")});
                setTimeout(changeLeft,1800);
                curr_id = Number(e.target.id);
            }
        }
    }
});

