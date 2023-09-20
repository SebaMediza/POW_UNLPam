function verificarCUIL(){
    var tipo = document.getElementById("tipo").value;
    var numeroDNI = document.getElementById("numeroDNI").value;
    var verificador = document.getElementById("verificador").value;

    const serieNum = [5,4,3,2,7,6,5,4,3,2];
    const stringDNI = numeroDNI.toString();
    const stringTIPO = tipo.toString();
    const tipoDNI = stringTIPO + stringDNI;
    const arrayTipoDni = tipoDNI.split('').map(digito => parseInt(digito, 10));
    var suma_P = 0;
    const once = 11;

    for(let i=0;i<serieNum.length;i++){
        suma_P += arrayTipoDni[i] * serieNum[i];
    }
    var suma_mod11 = (suma_P / once);
    var decimal = suma_mod11 - Math.floor(suma_mod11);
    console.log(suma_P);
    console.log(suma_mod11);
    var redondeado = Math.round(decimal);
    console.log(redondeado);
}