import React, { useState } from "react";

//create your first component
const Home = () => {
	const [ inputValue, setInputValue ] = useState ("");
	const [ listValue, setListValue ] = useState([]);
	return (
		<div className="todo-list">
			<h1>My Todo List</h1>
			<ul>
				<li>
					<input type="text"
					onChange={(entry) => setInputValue(entry.target.value)}
					value={inputValue}
					onKeyDown={(entry) => {
						if (entry.key === "Enter") {
							setListValue(listValue.concat([inputValue]));
							setInputValue("");
					}
				}
			}
					placeholder="Things to do before the world ends"></input>
				</li>
				{listValue.map((item, index) => (
					<li>
						{item}{" "} <i class="fas fa-trash-alt" onClick={() =>
							setListValue(listValue.filter((x, currentIndex) => index != currentIndex))}></i>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Home;
