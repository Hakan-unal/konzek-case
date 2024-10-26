import { combineReducers } from "redux";
import { codexist } from "./codexist/reducers";

const reducers = combineReducers({
    codexist: codexist,
});

export default reducers;