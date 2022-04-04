import {isNull} from 'lodash';

export const calculateWindowSize = (windowWidth) => {
    if (windowWidth >= 1200) {
        return 'lg';
    }
    if (windowWidth >= 992) {
        return 'md';
    }
    if (windowWidth >= 768) {
        return 'sm';
    }
    return 'xs';
};

export const createColumnData = (normalizedData) => {
    return isNull(normalizedData) ? [] : Object.values(normalizedData);
};

export const structureCnic = (cnic) => {
    return !cnic
        ? ''
        : `${cnic.slice(0, 5)}-${cnic.slice(5, -1)}-${cnic.at(-1)}`;
};

export const dateCnic = (date) => {
    return !date ? '' : date.split('/').join('.');
};

export const calculateDifference = (el, arr) => {
    return arr.includes(el) ? 'text-light bg-danger' : 'text-ligth bg-success';
};
