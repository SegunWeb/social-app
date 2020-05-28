export const requiredField = value => {
    if(value)return undefined;
    return 'field is required';
};


export const maxLengthCreator = (maxLength) => (value) => {
    if (value.length > maxLength) return 'max length is 30 symbols';
    return undefined
};