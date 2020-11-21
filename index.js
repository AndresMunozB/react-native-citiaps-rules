function not_null(value) {
    if (!value || value == undefined || value == null)
        return false;
    return true;
}

function required(value) {
    if (!not_null(value) || value.length == 0)
        return 'Requerido';
    return true;
}

function minsize(value, length) {
    if (!not_null(value) || value.length < length)
        return `Tamaño mínimo ${length}`;
    return true
}

function email(value) {
    email_regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email_regex.test(value))
        return 'Correo inválido. ejemplo@ejemplo.com';
    return true;
}

function phone(value) {
    phone_regex = /\+[0-9]{11,}/i
    if (!phone_regex.test(value))
        return 'Teléfono inválido. +56123456789';
    return true;
}

function rut(value) {
    if (!require('rut.js').validate(value))
        return 'Rut inválido'
    return true
}

function validate(touched, array) {
    if (!touched)
        return '';
    for (let i = 0; i < array.length; i++) {
        if (typeof (array[i]()) == 'string')
            return array[i]();
    }
    return '';
}

function check_fields(inputs) {
    let keys = Object.keys(inputs);
    for (let i = 0; i < keys.length; i++)
        inputs[keys[i]].touch();
    for (let i = 0; i < keys.length; i++) {
        if (validate(true, inputs[keys[i]].rules) !== '')
            return false;
    }
    return true;
}

module.exports = { not_null: not_null, required: required, minsize: minsize, email: email, phone: phone, validate: validate, check_fields: check_fields, rut: rut };





