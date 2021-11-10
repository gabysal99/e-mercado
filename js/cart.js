//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function showCart(array){
    let mostrarCarrito = "";

    for(let i = 0; i < array.length; i++){ 
        let articles = array[i];
        let sub = Math.round(articles.unitCost * articles.count)
        mostrarCarrito += `

        <div>
            <img src="` + articles.src + `"width="80px" alt="" class="img-thumbnail">
        </div>
        <div>
            <p> `+ articles.name +`</p>
            <p><input type="number" onchange="subTotal(${articles.unitCost},${i})" value="${articles.count}" min="1" id="cantidad${i}"></p>
            <p> `+ articles.currency + articles.unitCost +`</p>
            <hr>
            <p class="subsT" id="subT${i}">Subtotal $ `+ articles.currency +`${sub}</p>
        </div>
        `
        document.getElementById("cart").innerHTML = mostrarCarrito;    
    }
    cTotal()
}

function subTotal(unitCost, i) {
    let count = parseInt(document.getElementById(`cantidad${i}`).value);
    let subT = Math.round(unitCost * count);
    document.getElementById(`subT${i}`).innerHTML = subT;
    
    cTotal();
}

function costoEnvio() {
    let premium = document.getElementById("premium")
    let express = document.getElementById("express")
    let standard = document.getElementById("standard")
    let costoE = document.getElementById("costoenvio")

    if (premium.status === "ok") {
        Math.round(costoE = subTotal() * .15)
        Math.round(cTotal() = cTotal + (subTotal() * .15))
    }
    if (express.status === "ok") {
        costoE = subTotal() * .07
        cTotal() = cTotal() + (subTotal() * .07)
    }
}

function cTotal() {
    let total = 0
    let subTotales = document.getElementsByClassName("subsT");
    for(let i = 0; i < subTotales.length; i++){
        total += parseInt(subTotales[i].innerHTML);
    }
    
    document.getElementById("total").innerHTML = total
}

document.addEventListener("DOMContentLoaded", function(e){


    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            cartArray = resultObj.data.articles;
            showCart(cartArray);
        }
    });
});

//Validaciones

function miValidacion() {
    let flag = true;
    let msg = "";

    let elementosDentro = document.getElementsByClassName("formuIn");
    let elementosFuera = document.getElementsByClassName("formuOut");
    document.getElementById("feedback").innerHTML = "";

    //Envios
    if (!document.querySelector('input[name="envio"]:checked')) {
        alert('Seleccione un envio');
        flag = false;
    }

    //Solo 1 vacío dentro:
    let cuentoDentro = 0;
    for (let i = 0; i < elementosDentro.length; i++) {
        const element = elementosDentro[i];
        if (element.value == "") {
            cuentoDentro += 1;
        }
    }

    if (cuentoDentro > 1) {
        flag = false;
        msg += "-Solo puede haber un campo vacío dentro del formulario <br>"
    }

    //Solo 1 vacío fuera:
    let cuentoFuera = 0;
    for (let i = 0; i < elementosFuera.length; i++) {
        const element = elementosFuera[i];
        if (element.value == "") {
            cuentoFuera += 1;
        }
    }

    if (cuentoFuera > 1) {
        flag = false;
        msg += "-Solo puede haber un campo vacío fuera del formulario <br>"
    }


    //Contenido igual:
    let iguales = false;
    for (let i = 0; i < elementosDentro.length; i++) {
        const elementIn = elementosDentro[i];
        for (let i = 0; i < elementosFuera.length; i++) {
            const elementOut = elementosFuera[i];
            if (elementIn.value !== "" && elementIn.value === elementOut.value) {
                iguales = true;
            }
        }
    }
    if (!iguales) {
        flag = false;
        msg += "-El contenido de uno de los campos de adentro debe ser igual al de uno de los de afuera <br>"
    }

    //Campo min y max
    let num = false;
    for (let i = 0; i < elementosFuera.length; i++) {
        const elementOut = elementosFuera[i];
        if (parseInt(elementOut.value) > 5 && parseInt(elementOut.value) < 10) {
            num = true;
        }
    }
    if (!num) {
        flag = false;
        msg += "-Uno de los campos fuera del formulario debe tener un valor númerico entre 6 y 9<br>"
    }

    //minlength maxlength
    let caracteres = false;
    for (let i = 0; i < elementosDentro.length; i++) {
        const elementIn = elementosDentro[i];
        if (elementIn.value.length > 7 && elementIn.value.length < 15) {
            caracteres = true;
        }
    }
    if (!caracteres) {
        flag = false;
        msg += "-Uno de los campos dentro del formulario debe tener entre 8 y 14 caracteres<br>"
    }

    document.getElementById("feedback").innerHTML = msg;
    return flag;
}


let form = document.getElementById("myForm");
form.addEventListener('submit', function (event) {
    if (!miValidacion()) {
        event.preventDefault()
        event.stopPropagation()
    }else{
        document.getElementById("feedback").innerHTML = "";
    }
})