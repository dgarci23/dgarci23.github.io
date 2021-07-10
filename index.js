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
        if (e.target.id !== id) {
            run = false;
            if (id > Number(e.target.id)) {
                projects.forEach((item) => {item.classList.add("move-right")});
                setTimeout(changeRight,1100);
                curr_id = Number(e.target.id);
            } else {
                projects.forEach((item) => {item.classList.add("move-left")});
                setTimeout(changeLeft,1100);
                curr_id = Number(e.target.id);
            }
        }
    }
});


// https://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android

const projectsCard = document.querySelector(".project-cards");
let xDown = null;
let yDown = null;

function getTouches(e) {
    return e.touches;
}

function touchStartHandler(e) {
    run = false;
    const first = getTouches(e)[0];
    xDown = first.clientX;
    yDown = first.clientY;
}

function touchMoveHandler(e) {
    if (!xDown || !yDown) {
        return;
    }

    let xUp = e.touches[0].clientX;
    let yUp = e.touches[0].clientY;

    let xDiff = xUp - xDown;
    let yDiff = yUp - yDown;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 4 && id > 1) {
            projects.forEach((item) => {item.classList.add("move-right")});
            setTimeout(changeRight,1100);
            curr_id = id - 1;
        } else if (xDiff < -4 && id < 5) {
            projects.forEach((item) => {item.classList.add("move-left")});
            setTimeout(changeLeft,1100);
            curr_id = id + 1
        }
    }

    xDown = null;
    yDown = null;

    run = true;
}

document.addEventListener("touchstart", (e) => {
    if (projectsCard.contains(e.target) || run) {
        touchStartHandler(e);
    }
});
document.addEventListener("touchmove", (e) => {
    if (projectsCard.contains(e.target)) {
        touchMoveHandler(e);
    }
});
