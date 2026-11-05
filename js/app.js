// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("todo-form");
    const input = document.getElementById("todo-input");
    const list = document.getElementById("todo-list");
    const error = document.getElementById("error-msg");
    const counter = document.getElementById("counter");

    let currentFilter = "all";

    // Update the number of remaining tasks
    function updateCounter() {
        const remaining = list.querySelectorAll(
            "li:not(.completed)"
        ).length;

        counter.textContent = remaining + " items left";
    }

    // Show tasks according to the selected filter
    function applyFilter() {
        const items = list.querySelectorAll("li");

        items.forEach(function (item) {
            const completed = item.classList.contains("completed");

            if (currentFilter === "all") {
                item.classList.remove("hidden");
            }
            else if (currentFilter === "active") {
                item.classList.toggle("hidden", completed);
            }
            else if (currentFilter === "done") {
                item.classList.toggle("hidden", !completed);
            }
        });
    }

    // Add a new task
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const task = input.value.trim();

        if (task === "") {
            error.classList.remove("hidden");
            return;
        }

        error.classList.add("hidden");

        const li = document.createElement("li");
        const span = document.createElement("span");
        const button = document.createElement("button");

        span.className = "item-text";
        span.textContent = task;

        button.className = "delete-btn";
        button.textContent = "Delete";
        button.type = "button";

        li.appendChild(span);
        li.appendChild(button);

        list.appendChild(li);

        input.value = "";

        applyFilter();
        updateCounter();
    });

    // Complete or delete a task using event delegation
    list.addEventListener("click", function (event) {
        const item = event.target.closest("li");

        if (!item || !list.contains(item)) {
            return;
        }

        if (event.target.closest(".delete-btn")) {
            item.remove();
        }
        else {
            item.classList.toggle("completed");
        }

        applyFilter();
        updateCounter();
    });

    // Show all tasks
    document.getElementById("filter-all")
        .addEventListener("click", function () {
            currentFilter = "all";
            applyFilter();
        });

    // Show active tasks
    document.getElementById("filter-active")
        .addEventListener("click", function () {
            currentFilter = "active";
            applyFilter();
        });

    // Show completed tasks
    document.getElementById("filter-done")
        .addEventListener("click", function () {
            currentFilter = "done";
            applyFilter();
        });

    updateCounter();

});
