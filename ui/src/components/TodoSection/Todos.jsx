import React, { useEffect, useState } from "react";
import {
  deleteTodosByUserId,
  getTodosByUserId,
  updateTodosByUserId,
} from "../../service/todo.service";
import { toast } from "react-toastify";
import ListTodos from "./ListTodos";

const Todos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const result = await getTodosByUserId();
        setTodos(result.data);
      } catch (error) {
        console.log("failed to get Todos", error);
      }
    };
    getTodos();
  }, []);

  const handleUpdateTodo = async (id, data) => {
    try {
      await updateTodosByUserId(id, data);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? { ...todo, ...data } : todo))
      );
      toast.success("Todos updated successfully");
    } catch (error) {
      console.log("failed to update Todos", error);
      toast.error("failed to update Todos");
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodosByUserId(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      toast.success("todo deleted successfully");
    } catch (error) {
      console.log("failed to delete Todo", error);
      toast.error("failed to delete Todo");
    }
  };
  return (
    <div className="container mx-auto  p-6">
      <ListTodos 
       todos={todos}
       onUpdate={handleUpdateTodo}
       onDelete= {handleDeleteTodo}
      />
    </div>
  );
};

export default Todos;
