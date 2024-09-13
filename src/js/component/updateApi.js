export const fetchTodos = async (setListValue) => {
    const response = await fetch('https://playground.4geeks.com/todo/users/Brayan2JZ')
    .then((resp) => {
        console.log("resp directly from API: ", resp)
        if (!resp.ok) {
            throw new Error("Failed to fetch todo list. Status: " + resp.status);
        }
        return resp.json();
    })
    .then((data) => {
        console.log("data after resp.json(): ", data);
        if (Array.isArray(data.todos)) {
            setListValue(data.todos);
        } else {
            console.error("Fetched data is not an array:", data.todos);
            setListValue([]);
        }
    })
    .catch((error) => {
        console.error("There has been a problem with your fetch operation:", error);
    });
}