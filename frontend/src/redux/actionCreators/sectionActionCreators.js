import * as types from "../types/sectionTypes";
import { setError, logoutUser } from "./authActionCreator";
import axios from 'axios';

const setClass = ( data ) => ({
    type:types.SET_ITEM,
    payload:data
})
const setSection = ( data ) => ({
    type:types.ADD_ITEM,
    payload:data
})
const resetClass = () => ({
    type:types.RESET_ITEM,
})
const resetSection = ( data ) => ({
    type:types.DELETE_ITEM,
    payload:data,
})

const addSection = ( data ) => ({
    type:types.SET_ITEM,
    payload:data
})
const addClass = ( data ) => ({
    type:types.ADD_ITEM,
    payload:data
})
const deleteSection = () => ({
    type:types.RESET_ITEM,
})
const deleteClass = ( data ) => ({
    type:types.DELETE_ITEM,
    payload:data,
})