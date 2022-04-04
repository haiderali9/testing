import {createSlice} from '@reduxjs/toolkit';
import {getDocUploadData, uploadNadraVerisysFile} from './NadraVerisys.thunk';

const initialState = {
    error: null,
    loading: false,
    successMessage: null,
    documentUploadData: null,
    verisysImage: null
};

export const NadraVerisysSlice = createSlice({
    name: 'nadraVerisys',
    initialState,
    reducers: {
        setImage: (state, {payload}) => {
            state.verisysImage = payload;
        },
        resetMessageState: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: {
        [getDocUploadData.pending]: (state) => {
            state.loading = true;
        },
        [getDocUploadData.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.documentUploadData = payload;
        },
        [getDocUploadData.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [uploadNadraVerisysFile.pending]: (state) => {
            state.loading = true;
        },
        [uploadNadraVerisysFile.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.successMessage = payload;
        },
        [uploadNadraVerisysFile.rejected]: (state, action) => {
            state.loading = false;
            //  The S3 url does not return anything as response it just sends 204 status code which means the file is uploaded(We have checked the bucket it is uploading the image).There was no other way currently.Server cancels the axios post request as the interceptor intercepts the request and attatch headers with it. Right now we are checking ig the error is === Failed to fetch then out file is uploading and the status code is 204
            if (action.error.message === 'Failed to fetch') {
                state.successMessage = 'Image Uploaded Successfully';
            } else {
                state.error = action.error.message;
            }
        }
    }
});

export default NadraVerisysSlice.reducer;

export const {resetMessageState, setImage} = NadraVerisysSlice.actions;
