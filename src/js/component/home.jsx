import React, { useState, useEffect } from "react";


//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [taskList, setTaskList] = useState([]);


	useEffect(() => {
		fetchTodos(setTaskList);

	}, []);

	const fetchTodos = (setTaskList) => {
		fetch('https://playground.4geeks.com/todo/users/Brayan2JZ')
			.then((resp) => {
				console.log("resp directly from API: ", resp)
				if (!resp.ok) {
					throw new Error("Failed to fetch todo list. Status: " + resp.status);
				}
				return resp.json();
			})
			.then((userObject) => {
				console.log("data after resp.json(): ", userObject);
				if (Array.isArray(userObject.todos)) {
					setTaskList(userObject.todos);
				} else {
					console.error("Fetched data is not an array:", userObject.todos);
					setTaskList([]);
				}
			})
			.catch((error) => {
				console.error("There has been a problem with your fetch operation:", error);
			});
	}

	const handleAddTodo = (event) => {
		if (event.key === "Enter" && inputValue.trim() !== "") {
			fetch('https://playground.4geeks.com/todo/todos/Brayan2JZ', {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					label: inputValue.trim(),
					is_done: false
				})
			})
				.then((resp) => {
					if (resp.ok) {
						console.log("New todo added to Api: ", inputValue.trim());
						fetchTodos(setTaskList);
					}
				})
				.catch((error) => console.error("add task failed", error));
			setInputValue("");
		}
	}
	const deleteTodo = (index) => {
		let deletedTodo = taskList[index].label;
		let todoID = taskList[index].id;

		fetch(`https://playground.4geeks.com/todo/todos/${todoID}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
		})
			.then((resp) => {
				if (resp.ok) {
					console.log("Todo has been deleted: ", deletedTodo)
					fetchTodos(setTaskList);
				}
			})
			.catch((error) => console.error("failed to delete todo", error));
	}

	const handleClearTasks = () => {
		// setTaskList([])
		fetch('https://playground.4geeks.com/todo/users/Brayan2JZ', {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then((resp) => {
				if (resp.ok) {
					console.log("User and Todos have been cleared from API");
					alert("Your schedule is free");
					setTaskList([]);
				}
			})
			.catch((error) => console.error("failed to clear all", error));
	}

	const handleCreateUser = () => {
		fetch('https://playground.4geeks.com/todo/users/Brayan2JZ', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then((resp) => {
			if (resp.ok) {
				console.log("User has been added to API");
				alert("Get back to work!! --User has been Created, Tasks are able to be saved in API");
			}
		})
		.catch((error) => console.error("failed to create user in API", error));
	}

	return (
		<div className="todo-list">
			<h1>My Todo List</h1>
			<ul>
				<li key={taskList.id}>
					<input type="text"
						onChange={(entry) => setInputValue(entry.target.value)}
						value={inputValue}
						onKeyDown={handleAddTodo}
						placeholder="Things to do before the world ends"></input>
				</li>
				{taskList.map((item, index) => (
					<li className="task" key={item.id}>
						{item.label} <i className="fas fa-trash-alt ms-2" onClick={() => deleteTodo(index)}></i>
					</li>
				))}
			</ul>
			<div className="d-flex justify-content-center">
				<button className="btn btn-danger" onClick={handleClearTasks}>i dont feel like doing anything today</button>
				<button className="btn btn-success ms-2" onClick={handleCreateUser}>Nevermind i have to be responsible</button>
			</div>
		</div>
	);
};

export default Home;
