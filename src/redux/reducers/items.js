import * as actionTypes from "../actions/actionTypes";

const initialState = {
    todos: null,
    error: false,
    loading: true,
    field_loading: false,
    field_error: false
};
/* fetch */
const todoStart = (state, action) => {
    return {
        ...state,
        loading: true
    };
};

const todoSuccess = (state, action) => {
    return {
        ...state,
        todos: action.todos,
        loading: false,
        error: false
    };
};

const todoFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: true
    };
};

/* create */
const todoStartCreate = (state, action) => {
    return {
        ...state,
        field_loading: true
    };
};

const todoSuccessCreate = (state, action) => {
    let newData = [...state.todos, action.todo]

    return {
        ...state,
        todos: newData,
        field_loading: false,
        field_error: false
    };
};

const todoFailCreate = (state, action) => {
    return {
        ...state,
        field_loading: false,
        field_error: true
    };
};

/* change */
const todoStartChange = (state, action) => {
    return {
        ...state,
        field_loading: true
    };
};

const todoSuccessChange = (state, action) => {
    let clonedData = [...state.todos]
    const findIndex = clonedData.findIndex(el => el.id == action.updated_field_data.id)
    clonedData[findIndex] = action.updated_field_data;

    return {
        ...state,
        todos: clonedData,
        field_loading: false,
        field_error: false
    };
};

const todoFailChange = (state, action) => {
    return {
        ...state,
        field_loading: false,
        field_error: true
    };
};


/* delete */
const todoStartDelete = (state, action) => {
    return {
        ...state,
        field_loading: true
    };
};

const todoSuccessDelete = (state, action) => {
    let clonedData = [...state.todos]
    clonedData = clonedData.filter(el => el.id != action.deleted_todo)

    return {
        ...state,
        todos: clonedData,
        field_loading: false,
        field_error: false
    };
};

const todoFailDelete = (state, action) => {
    return {
        ...state,
        field_loading: false,
        field_error: true
    };
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TODO_START:
            return todoStart(state, action);
        case actionTypes.SUCCESS_TODO:
            return todoSuccess(state, action);
        case actionTypes.TODO_ERROR:
            return todoFail(state, action);

        case actionTypes.CREATE_START:
            return todoStartCreate(state, action);
        case actionTypes.CREATE_SUCCESS:
            return todoSuccessCreate(state, action);
        case actionTypes.CREATE_ERROR:
            return todoFailCreate(state, action);

        case actionTypes.TODO_START_CHANGE:
            return todoStartChange(state, action);
        case actionTypes.SUCCESS_TODO_CHANGE:
            return todoSuccessChange(state, action);
        case actionTypes.TODO_ERROR_CHANGE:
            return todoFailChange(state, action);

        case actionTypes.DELETE_START:
            return todoStartDelete(state, action);
        case actionTypes.DELETE_SUCCESS:
            return todoSuccessDelete(state, action);
        case actionTypes.DELETE_ERROR:
            return todoFailDelete(state, action);
        default:
            return state;
    }
};
export default reducer;