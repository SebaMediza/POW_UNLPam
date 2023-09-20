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
    console.log("Suma de productos: " + suma_P);

    var suma_mod11 = (suma_P / once);
    console.log("Modulo de la suma" + suma_mod11);
    
    var decimal = suma_mod11 - Math.floor(suma_mod11);
    
    var deciTrunc = parseFloat(decimal.toFixed(3))
    console.log("Parte decimal: " + deciTrunc);
    
    var finalNum = parseFloat(11 - Math.round((deciTrunc * 10).toFixed(3)));
    console.log("Numero de control: " + finalNum);
    
    if(verificador == finalNum){
        var res = "El CUIL es VALIDO";
        document.getElementById("rtaContainer").innerHTML = res;
        console.log(res);
    }else{
        if(verificarCUILREC(23, numeroDNI, verificador)){
            var res = "El CUIL es VALIDO";
            document.getElementById("rtaContainer").innerHTML = res;
        }else{
            if(verificarCUILREC(33, numeroDNI, verificador)){
                var res = "El CUIL es VALIDO";
                document.getElementById("rtaContainer").innerHTML = res;
            }else{
                document.getElementById("rtaContainer").innerHTML = "El CUIL NO es VALIDO";
            }
        }
    }
}

function verificarCUILREC(tipoPARAM,numeroDNIPARAM,verificadorPARAM){
    var tipo = tipoPARAM;
    var numeroDNI = numeroDNIPARAM;
    var verificador = verificadorPARAM;

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
    console.log("Suma de productos: " + suma_P);

    var suma_mod11 = (suma_P / once);
    console.log("Modulo de la suma" + suma_mod11);
    
    var decimal = suma_mod11 - Math.floor(suma_mod11);
    
    var deciTrunc = parseFloat(decimal.toFixed(3))
    console.log("Parte decimal: " + deciTrunc);
    
    var finalNum = parseFloat(11 - Math.round((deciTrunc * 10).toFixed(3)));
    console.log("Numero de control: " + finalNum);
    
    if(verificador == finalNum){
        return true;
    }else{
        return false;
    }
}