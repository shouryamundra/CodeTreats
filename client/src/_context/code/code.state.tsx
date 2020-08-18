import React from 'react';
import api from 'utils/api';
import history from 'utils/history';
import {
    ADD_SNIPPET,
    CODE_DID_UPDATE,
    FETCH_SNIPPET,
    FETCH_SNIPPETS,
    INPUT_DID_UPDATE,
    SET_LOADING,
    SUBMIT_CODE,
    UPDATE_LANGUAGE,
} from '../types';
import CodeContext from './code.context';
import codeReducer, { initialState as initialValues } from './code.reducer';
import { ISnippet, State } from './code.type';

const CodeState: React.FC = ({ children }) => {
    const initialState: State = {
        ...initialValues,
    };

    const [state, dispatch] = React.useReducer(codeReducer, initialState);

    // updateCode
    const updateCode = (code: string) => {
        // console.clear();
        dispatch({
            type: CODE_DID_UPDATE,
            payload: code,
        });
    };

    // upate Input
    const updateInput = (input: string) => {
        dispatch({
            type: INPUT_DID_UPDATE,
            payload: input,
        });
    };

    // update language
    const updateLanguage = (lang: string) => {
        dispatch({
            type: UPDATE_LANGUAGE,
            payload: lang,
        });
    };

    // action functions
    const submitCode = async (code: string, language: string, input: string) => {
        try {
            setLoading();
            const payload = {
                language: language,
                sourceCode: code,
                userInput: input,
            };
            const res = await api.post('/code/submit', payload);
            dispatch({
                type: SUBMIT_CODE,
                payload: res.data,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const fetchSnippets = async () => {
        try {
            setLoading();
            const res = await api.get(`/snippets`); //res.data -> { prev, next, snippets}
            dispatch({
                type: FETCH_SNIPPETS,
                payload: res.data.snippets,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const fetchSnippetbyId = async (snipId: string) => {
        try {
            setLoading();
            const res = await api.get(`/snippets/${snipId}`);
            dispatch({
                type: FETCH_SNIPPET,
                payload: res.data,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const addSnippet = async (snippet: ISnippet) => {
        try {
            const res = await api.post(`/snippets`, snippet);
            dispatch({
                type: ADD_SNIPPET,
                payload: res.data,
            });

            // programmatic navigation from custom history obj
            history.push('/snippets');
        } catch (error) {
            console.log(error);
        }
    };

    // filter snippets
    const filterSnippets = (text: string) => {};

    // clear filters
    const clearFilter = () => {};

    // set loading
    const setLoading = () => {
        dispatch({
            type: SET_LOADING,
        });
    };

    return (
        <CodeContext.Provider
            value={{
                code: state?.code,
                language: state.language,
                loading: state?.loading,
                output: state.output,
                input: state.input,
                snippets: state.snippets,
                updateCode,
                updateInput,
                updateLanguage,
                submitCode,
                fetchSnippets,
                fetchSnippetbyId,
                addSnippet,
                filterSnippets,
                clearFilter,
            }}
        >
            {children}
        </CodeContext.Provider>
    );
};

export default CodeState;
