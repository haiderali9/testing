import * as yup from 'yup';

export const CREATE_RELYING_PARTY = 'CREATE_RELYING_PARTY';
export const CREATE_RELYING_PARTY_FAIL = 'CREATE_RELYING_PARTY_FAIL';

const ipRegExp =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([0-9]|[1-2][0-9]|3[0-2]))?$/;

const alphabets = /^[aA-zZ\s]+$/;

export const schema = yup
    .object({
        rpType: yup.string().required('RP Type is required'),
        displayName: yup
            .string()
            .matches(alphabets, 'Can only be alphabets')
            .required('Display Name is required !'),
        contactPerson: yup.string().required('Contact Person is required'),
        orgType: yup.string().required('Org Type is required'),
        websiteURL: yup
            .string()
            .url('invalid url')
            .required('Website URL is required !'),
        ntn: yup.string().required('NTN is required'),
        orgNum: yup
            .number()
            .integer('Not a valid number')
            .required('Org Number is required !'),
        strn: yup.string().required('STRN is required'),
        fullName: yup.string().required('Full Name is required'),
        officeAddress: yup.string().required('Office Address is required'),
        officePhoneNo: yup
            .number('Can only be numbers')
            .positive()
            .required('Office Phone is required !'),
        officeEmail: yup
            .string()
            .email('Invalid email address')
            .required('Office Email is required !'),
        corrAddress: yup.string().required('Corresponding Address is required'),
        contactPersonPhoneNo: yup
            .number('Must be a number')
            .integer()
            .required('Phone Number is required !'),
        shortName: yup.string().required('Short Name is required'),
        contactPersonEmail: yup
            .string()
            .required('Contact Person Email is required'),
        ipAddressCIDR: yup
            .string()
            .matches(ipRegExp, 'Not a valid CIDR ip address')
            .required('IP Address CIDR is required')
    })
    .required();
