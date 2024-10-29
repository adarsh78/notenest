import TodoModel from "../Models/Todos.js";

// create a new todo
export const createTodo = async (req, res) => {

    const { title, description } = req.body;
    const userId = req.user._id;   // User ID from JWT
    try {
        const newTodo = await TodoModel.create({ userId, title, description });
        res.status(201).json({ success: true, data: newTodo})
    } catch (error) {
        console.error(`Error occurred while creating a todo: ${error.message}`);
        res.status(500).json({ success: false, message: "Interval Server Error"});
    }
}

// get all the todos
export const getTodo = async (req, res) => {
    try {
        const todos = await TodoModel.find({ userId: req.user._id});
        res.status(200).json({ success: true, data: todos });
        
    } catch (error) {
        console.error(`Error occurred while fetching the todos: ${error.message}`);
        res.status(500).json({ success: false, message: "Internal Server Error"})
    }
}

// update a todo by id
export const updateTodo = async (req, res) => {

    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const updatedTodo = await TodoModel.findByIdAndUpdate(id, { title, description }, { new: true });
        if(!updatedTodo) return res.status(404).json({ success: false, message: "Todo not found" })
        res.status(200).json({ success: true, data: updatedTodo });

    } catch (error) {
        console.error(`Error occurred while updating a todo: ${error.message}`);
        res.status(500).json({ success: false, message: "Internal Server Error"});
    }
}

// delete a todo by id
export const deleteTodo = async (req, res) => {

    const { id } = req.params;

    try {
        const deletedTodo = await TodoModel.findByIdAndDelete(id);
        if(!deletedTodo) return res.status(404).json({ success: false, message: "Todo not found"});
        res.status(200).json({ success: true, message: "Todo deleted successfully" });
    } catch (error) {
        console.error(`Error occurred while deleting a todo: ${error.message}`);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}