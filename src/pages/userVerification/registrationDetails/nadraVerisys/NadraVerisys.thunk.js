import {HTTP_SERVER_URL, SERVER_API_VERSION} from '@app/constants/index';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getDocUploadData = createAsyncThunk(
    'GET_DOCUMENT_UPLOAD_DATA',
    async (obj) => {
        const {data} = await axios.post(
            `${HTTP_SERVER_URL}/${SERVER_API_VERSION}/documents`,
            obj
        );
        if (data.code) {
            throw data.message;
        } else {
            return data.data;
        }
    }
);

export const uploadNadraVerisysFile = createAsyncThunk(
    'UPLOAD_VERISYS_FILE',
    async (obj) => {
        const formData = new FormData();
        Object.keys(obj.fields).map((key) => {
            return formData.append(key, obj.fields[key]);
        });
        const options = {
            method: 'POST',
            body: formData
        };
        const response = await fetch(obj.url, options);
        return response;
    }
);
