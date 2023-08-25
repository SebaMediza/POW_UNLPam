function validar(){
    return validarTelefono();
}
function validarTelefono(){
    let number = document.getElementById('phoneNumberAlfa');
    const regrex = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;
    if(regrex.test(number.value)){
        alert('true')
        return true;
    }
}