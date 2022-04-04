import {SERVER_URL} from '@app/constants/index';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getRegistration = createAsyncThunk(
    'GET_REGISTRATION',
    async (obj) => {
        const {data} = await axios.post(`${SERVER_URL}/getReg`, obj);
        if (data.code) {
            throw data.message;
        } else {
            const registration = {
                'Full Name':
                    data.data.finalApplication.cnicOcredData.fullName || '',
                'Urdu Full Name':
                    data.data.finalApplication.cnicOcredData.ur_fullName || '',
                'Father Name':
                    data.data.finalApplication.cnicOcredData.fatherName || '',
                'Urdu Father Name':
                    data.data.finalApplication.cnicOcredData.ur_fatherName ||
                    '',
                Gender:
                    data.data.finalApplication.cnicOcredData.gender?.toUpperCase() ||
                    '',
                'Country Of Stay':
                    data.data.finalApplication.cnicOcredData.countryOfStay ||
                    '',
                CNIC: data.data.finalApplication.cnicOcredData.userId || '',
                'Old CNIC':
                    data.data.finalApplication.cnicOcredData.oldCnic || '',
                'Date Of Birth':
                    data.data.finalApplication.cnicOcredData.dob || '',
                'Date Of Issue':
                    data.data.finalApplication.cnicOcredData.issueDate || '',
                'Date Of Expiry':
                    data.data.finalApplication.cnicOcredData.expiryDate || '',
                'Current Address':
                    data.data.finalApplication.cnicOcredData.currentAddress ||
                    '',
                'Urdu Current Address':
                    data.data.finalApplication.cnicOcredData
                        .ur_currentAddress || '',
                'Permanent Address':
                    data.data.finalApplication.cnicOcredData.permanentAddress ||
                    '',
                'Urdu Permanent Address':
                    data.data.finalApplication.cnicOcredData
                        .ur_permanentAddress || ''
            };

            const manualRegistration = {
                'Full Name':
                    data.data.finalApplication.manualEnteredData.fullName || '',
                'Urdu Full Name':
                    data.data.finalApplication.manualEnteredData.ur_fullName ||
                    '',
                'Father Name':
                    data.data.finalApplication.manualEnteredData.fatherName ||
                    '',
                'Urdu Father Name':
                    data.data.finalApplication.manualEnteredData
                        .ur_fatherName || '',
                Gender:
                    data.data.finalApplication.manualEnteredData.gender?.toUpperCase() ||
                    '',
                'Country Of Stay':
                    data.data.finalApplication.manualEnteredData
                        .countryOfStay || '',
                CNIC: data.data.finalApplication.manualEnteredData.userId || '',
                'Old CNIC':
                    data.data.finalApplication.manualEnteredData.oldCnic || '',
                'Date Of Birth':
                    data.data.finalApplication.manualEnteredData.dob || '',
                'Date Of Issue':
                    data.data.finalApplication.manualEnteredData.issueDate ||
                    '',
                'Date Of Expiry':
                    data.data.finalApplication.manualEnteredData.expiryDate ||
                    '',
                'Current Address':
                    data.data.finalApplication.manualEnteredData
                        .currentAddress || '',
                'Urdu Current Address':
                    data.data.finalApplication.manualEnteredData
                        .ur_currentAddress || '',
                'Permanent Address':
                    data.data.finalApplication.manualEnteredData
                        .permanentAddress || '',
                'Urdu Permanent Address':
                    data.data.finalApplication.manualEnteredData
                        .ur_permanentAddress || ''
            };
            return {manualRegistration, registration};
        }
    }
);

export const overWriteRegistration = createAsyncThunk(
    'OVERWRITE_REGISTRATION',
    async (obj) => {
        const {data} = await axios.put(`${SERVER_URL}/updateRegApp`, {
            ...obj,
            useCase: 'manualEntry'
        });
        if (data.code) {
            throw data.message;
        } else {
            return data.message;
        }
    }
);
