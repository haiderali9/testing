import * as yup from 'yup';

export const GET_PARTIES_LIST = 'GET_PARTIES_LIST';
export const GET_PARTIES_LIST_FAIL = 'GET_PARTIES_LIST_FAIL';
export const BLOCK_PARTY = 'BLOCK_PARTY';
export const BLOCK_PARTY_FAIL = 'BLOCK_PARTY_FAIL';
export const CREATE_RELYING_PARTY = 'CREATE_RELYING_PARTY';
export const UNBLOCK_RELYING_PARTY = 'UNBLOCK_RELYING_PARTY';

export const UPDATE_PARTY = 'UPDATE_PARTY';
export const UPDATE_PARTY_FAIL = 'UPDATE_PARTY_FAIL';
export const BLOCKED_PARTIES = 'BLOCKED_PARTIES';

const ipRegExp =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([0-9]|[1-2][0-9]|3[0-2]))?$/;

const alphabets = /^[aA-zZ\s]+$/;
const numbers = /^\d+$/;

export const schema = yup
    .object({
        rpType: yup.string().required('RP Type is required !'),
        displayName: yup
            .string()
            .matches(alphabets, 'Can only be Alphabets')
            .required('Display Name is required !'),
        contactPerson: yup.string().required('Contact Person is required !'),
        orgType: yup.string().required('Org Type is required !'),
        websiteURL: yup
            .string()
            .url('Invalid URL')
            .required('Website URL is required !'),
        ntn: yup
            .string()
            .matches(numbers, 'Can only be numbers')
            .required('NTN is required !'),
        orgNum: yup
            .string()
            .matches(numbers, 'Can only be numbers')
            .required('Org Number is required !'),
        strn: yup.string().required('STRN is required !'),
        fullName: yup.string().required('Full Name is required !'),
        officeAddress: yup.string().required('Office Address is required !'),
        officePhoneNo: yup
            .string()
            .matches(numbers, 'Can only be numbers')
            .required('Office Phone is required !'),
        officeEmail: yup
            .string()
            .email('Invalid Email Address')
            .required('Office Email is required !'),
        corrAddress: yup
            .string()
            .required('Corresponding Address is required !'),
        contactPersonPhoneNo: yup
            .string()
            .matches(numbers, 'Can only be numbers')
            .required('Phone Number is required !'),
        shortName: yup
            .string()
            .matches(alphabets, 'Short name can only Alphabets')
            .max(12, 'Short name cannot exceed')
            .required('Short Name is required !'),
        contactPersonEmail: yup
            .string()
            .email('Not a valid Email')
            .required('Contact Person Email is required'),
        ipAddressCIDR: yup
            .string()
            .matches(ipRegExp, 'Not a valid CIDR IP address')
            .required('IP Address CIDR is required')
    })
    .required();

export const DEFAULT_VALUES = {
    rpId: '',
    rpType: '',
    displayName: '',
    contactPerson: '',
    orgType: '',
    websiteURL: '',
    orgNum: '',
    fullName: '',
    officeAddress: '',
    officePhoneNo: '',
    officeEmail: '',
    corrAddress: '',
    contactPersonPhoneNo: '',
    shortName: '',
    contactPersonEmail: '',
    ipAddressCIDR: ''
};
