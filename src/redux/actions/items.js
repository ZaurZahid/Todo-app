import * as actionTypes from "./actionTypes";

/* GET REQUEST FOR FETCHING TODOS */
export const setTodoStart = () => {
    return {
        type: actionTypes.TODO_START
    }
};

export const setTodoSuccess = (payload) => {
    return {
        type: actionTypes.SUCCESS_TODO,
        todos: payload
    }
};

export const setTodoError = () => {
    return {
        type: actionTypes.TODO_ERROR
    };
};

export const loadTodos = () => async (dispatch, getState) => {
    dispatch(setTodoStart());

    try {
        const response = await fetch('http://localhost:3001/items');
        const data = await response.json();
        dispatch(setTodoSuccess(data));
    } catch (e) {
        dispatch(setTodoError());
    }
};

/*POST REQUEST FOR CREATE TODOS */
export const createStart = () => {
    return {
        type: actionTypes.CREATE_START
    }
};

export const createSuccess = (todo) => {
    return {
        type: actionTypes.CREATE_SUCCESS,
        todo
    }
};

export const createErr = () => {
    return {
        type: actionTypes.CREATE_ERROR
    };
};

export const createNewTodo = ({ name, deadline }) => async dispatch => {
    dispatch(createStart());

    try {
        const rqData = {
            name: name.trim(),
            deadline,
            "is-completed": false
        }

        const response = await fetch(`http://localhost:3001/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rqData)
        });

        const createdTodo = await response.json();
        dispatch(createSuccess(createdTodo));
    } catch (e) {
        dispatch(createErr());
    }
};

/* PUT REQUEST FOR CHANGING TODOS */
export const setChangeTodoStart = () => {
    return {
        type: actionTypes.TODO_START_CHANGE
    }
};

export const setChangeTodoSuccess = (payload) => {

    return {
        type: actionTypes.SUCCESS_TODO_CHANGE,
        updated_field_data: payload
    }
};

export const setChangeTodoError = () => {
    return {
        type: actionTypes.TODO_ERROR_CHANGE
    };
};

export const changeField = (updatedField) => async (dispatch, getState) => {
    dispatch(setChangeTodoStart());

    try {
        const response = await fetch(`http://localhost:3001/items/${updatedField.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedField)
        });
        const updatedData = await response.json();
        setTimeout(() => {//for showing spinner request is so fast)
            dispatch(setChangeTodoSuccess(updatedData));
        }, 1000);
    } catch (e) {
        dispatch(setChangeTodoError());
    }
};

/* DELETE REQUEST FOR REMOVE TODO  */
export const deleteStart = () => {
    return {
        type: actionTypes.DELETE_START
    }
};

export const deleteSuccess = (id) => {
    return {
        type: actionTypes.DELETE_SUCCESS,
        deleted_todo: id
    }
};

export const deleteErr = () => {
    return {
        type: actionTypes.DELETE_ERROR
    };
};

export const deleteTodo = (id) => async dispatch => {
    dispatch(deleteStart());

    try {
        const response = await fetch(`http://localhost:3001/items/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            dispatch(deleteSuccess(id));
        }
    } catch (e) {
        dispatch(deleteErr());
    }
};
