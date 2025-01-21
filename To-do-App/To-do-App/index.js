 // Function to add a new task to the list
 function addTask() {
     const taskInput = document.getElementById("taskInput"); // Get input field
     const taskList = document.getElementById("taskList"); // Get task list container
     // Alert if the input is empty
     if (taskInput.value.trim() === "") {
         alert("Please enter your task.");
         return;
     }
     // Create a new list item for the task
     const li = document.createElement("li");
     li.textContent = taskInput.value;
     // Toggle 'completed' class when a task is clicked
     li.addEventListener("click", () => {
         li.classList.toggle("completed");
     });
     // Create a delete button for the task
     const deleteButton = document.createElement("button");
     deleteButton.textContent = "Delete";
     deleteButton.style.marginLeft = "20px";
     // Remove the task when the delete button is clicked
     deleteButton.onclick = () => li.remove();
     // Append the delete button to the list item
     li.appendChild(deleteButton);
     // Add the list item to the task list
     taskList.appendChild(li);
     // Clear the input field after adding the task
     taskInput.value = "";
 }