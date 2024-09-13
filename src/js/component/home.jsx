import React, { useState, useEffect } from "react";


//create your first component
const Home = () => {
	const [ inputValue, setInputValue ] = useState ("");
	const [ taskList, setTaskList ] = useState([]);


	useEffect(() => {
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
	}, []); 


	return (
		<div className="todo-list">
			<h1>My Todo List</h1>
			<ul>
				<li  key={taskList.id}>
					<input type="text"
					onChange={(entry) => setInputValue(entry.target.value)}
					value={inputValue}
					onKeyDown={(entry) => {
						if (entry.key === "Enter") {
							setTaskList(taskList.concat([inputValue]));
							setInputValue("");
					}
				}
			}
					placeholder="Things to do before the world ends"></input>
				</li>
				{taskList.map((item, index) => (
					<li className="task" key={item.id}>
						{item.label}{" "} <i className="fas fa-trash-alt" onClick={() =>
							setTaskList(taskList.filter((x, currentIndex) => index != currentIndex))}></i>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Home;
