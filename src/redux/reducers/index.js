import { combineReducers } from "redux";
import { i18nReducer } from 'react-redux-i18n';

import TodoItems from "./items";

const rootReducer = combineReducers({
    todoState: TodoItems,
    i18n: i18nReducer
});

export default rootReducer;
