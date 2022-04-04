import * as yup from 'yup';

export const CREATE_USER_ADMIN = 'CREATE_ADMIN_USER';
export const GET_ADMINS = 'GET_ADMINS';
export const BLOCK_ADMIN = 'BLOCK_ADMIN';
export const UNBLOCK_ADMIN = 'UNBLOCK_ADMIN';

const alphabets = /^[aA-zZ\s]+$/;
const numbers = /^\d+$/;

export const schema = yup.object({
    userName: yup
        .string()
        .required('User Name is required')
        .matches(alphabets, 'User Name Can Only Be Alphabets')
        .max(26, 'Can not exceed'),
    firstName: yup.string().required('First Name Is Required'),
    lastName: yup.string().required('Lasr Name Is Required '),
    password: yup.string().required('Password is required'),
    cnic: yup
        .string()
        .required('CNIC is required')
        .matches(numbers, 'CNIC can only be numbers')
        .min(13, 'CNIC can only be 13 Digits')
        .max(13, 'CNIC can only be 13 Digits'),

    phoneNumber: yup
        .string()
        .required('Phone number is required')
        .matches(numbers, 'Phone Number Can only Be Numbers')
        .max(13, 'Phone can not exceed 13 Digits'),
    userType: yup.string().required('User Type is Required')
});

export const DEFAULT_VALUES = {
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    cnic: '',
    phoneNumber: '',
    userType: ''
};
