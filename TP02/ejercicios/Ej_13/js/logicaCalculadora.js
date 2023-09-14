const btn0 = document.getElementById("btn0");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const btn5 = document.getElementById("btn5");
const btn6 = document.getElementById("btn6");
const btn7 = document.getElementById("btn7");
const btn8 = document.getElementById("btn8");
const btn9 = document.getElementById("btn9");
const btnMas = document.getElementById("btn+");
const btnMenos = document.getElementById("btn-");
const btnMultiplicar = document.getElementById("btnX");
const btnDividor = document.getElementById("btn/");
const btnIgual = document.getElementById("btn=");
const btnCE = document.getElementById("btnCE");
const btnC = document.getElementById("btnC");
const btnMasMenos = document.getElementById("btnMasMenos");
const btnPunto = document.getElementById("btn.");
const btnPorcentaje = document.getElementById("btn%");
const operationDisplay = document.getElementById("operation-display");
const display = document.getElementById("main-display");

document.addEventListener("DOMContentLoaded",function(){  
    btn1.addEventListener("click", function(){
        operationDisplay.value = operationDisplay.value + btn1.innerHTML;
    });
    btn2.addEventListener("click", function(){
        operationDisplay.value = operationDisplay.value + btn2.innerHTML;
    });
    btn3.addEventListener("click", function(){
        operationDisplay.value = operationDisplay.value + btn3.innerHTML;
    });
    btnMultiplicar.addEventListener("click", function(){
        operationDisplay.value = operationDisplay.value + btnMultiplicar.innerHTML;
    });
    
    btnMas.addEventListener("click", function(){
        operationDisplay.value = operationDisplay.value + btnMas.innerHTML;
    });
    btnMenos.addEventListener("click", function(){
        operationDisplay.value = operationDisplay.value + btnMenos.innerHTML;
    });
    
    btnDividor.addEventListener("click", function(){
        operationDisplay.value = operationDisplay.value + btnDividor.innerHTML;
    });

    btnIgual.addEventListener("click", function(){
        try {
            display.value = eval(operationDisplay.value);
        } catch (error) {
            display.value = "Error";
        }
    });
    btnCE.addEventListener("click", function(){
        display.value = "";
        operationDisplay.value = "";
    });
});