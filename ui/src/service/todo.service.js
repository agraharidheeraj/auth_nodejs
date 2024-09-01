import axiosInstance from "./url.service"


//create todos
export const createTodo = async(todoData) =>{
    try {
        const responce = await axiosInstance.post('/user/todos',todoData);
        return responce.data;
    } catch (error) {
        console.log('error while creating todos',error);
        throw error;
    }
}


//get todos by userId
export const getTodosByUserId = async() =>{
    try {
        const responce = await axiosInstance.get('/user/todos');
        return responce.data;
    } catch (error) {
        console.log('error while getting todos',error);
        throw error;
    }
}


//get update by userId
export const updateTodosByUserId = async(id,updateTodoData) =>{
    try {
        const responce = await axiosInstance.put(`/user/todos/${id}`,updateTodoData);
        return responce.data;
    } catch (error) {
        console.log('error while getting todos',error);
        throw error;
    }
}

//get delete by userId
export const deleteTodosByUserId = async(id) =>{
    try {
        const responce = await axiosInstance.delete(`/user/todos/${id}`);
        return responce.data;
    } catch (error) {
        console.log('error while getting todos',error);
        throw error;
    }
}