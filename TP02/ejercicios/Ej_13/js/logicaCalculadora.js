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

const conversorPorcentaje = /\d{0,2}.%$/gmi;


document.addEventListener("DOMContentLoaded",function(){  
    
    let currentInput = "0";

    const btnNumeros = this.querySelectorAll('.numberBtn');
    Array.from(btnNumeros).forEach(boton => {
        boton.addEventListener("click", function(){
            operationDisplay.value = operationDisplay.value + boton.innerHTML;
        });
    });

    const btnOpreaciones = [btnMas, btnMenos, btnMultiplicar, btnDividor, btnMasMenos, btnPorcentaje]
    Array.from(btnOpreaciones).forEach(operacion =>{
        operacion.addEventListener("click", function(){
            if (display.value != "" && operationDisplay.value !=""){
                operationDisplay.value = "";
                operationDisplay.value = display.value;
            }
            operationDisplay.value = operationDisplay.value + operacion.innerHTML;
        });
    });

    btnIgual.addEventListener("click", function(){
        try {
            display.value = eval(operationDisplay.value);
        } catch (error) {
            console.log(error);
            display.value = "error";
        }
    });

    btnCE.addEventListener("click", function(){
        display.value = "";
        operationDisplay.value = "";
    });

    btnPorcentaje.addEventListener("click", function(){
        const expression = operationDisplay.value;
        const lastIndex = expression.lastIndexOf("+") || expression.lastIndexOf("-") || expression.lastIndexOf("*") || expression.lastIndexOf("/");
        if (lastIndex !== -1) {
            const lastOperand = expression.substring(lastIndex + 1);
            const porcentaje = parseFloat(lastOperand) / 100;
            const newExpression = expression.substring(0, lastIndex + 1) + porcentaje.toString();
            operationDisplay.value = newExpression;
            currentInput = porcentaje.toString();
        }
    });

    btnC.addEventListener("click", function(){
        if (display.value != ""){
            display.value = "";
        }
    });
});
