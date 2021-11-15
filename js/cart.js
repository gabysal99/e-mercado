//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function showCart(array) {
    let mostrarCarrito = "";

    for (let i = 0; i < array.length; i++) {
        let articles = array[i];
        let sub = Math.round(articles.unitCost * articles.count)
        mostrarCarrito += `

        <div>
            <img src="` + articles.src + `"width="80px" alt="" class="img-thumbnail">
        </div>
        <div>
            <p> `+ articles.name + `</p>
            <p><input type="number" onchange="subTotal(${articles.unitCost},${i})" value="${articles.count}" min="1" id="cantidad${i}"></p>
            <p> `+ articles.currency + articles.unitCost + `</p>
            <hr>
            <p class="subsT" id="subT${i}">Subtotal ` + articles.currency + `${sub}</p>
        </div>
        `
        document.getElementById("cart").innerHTML = mostrarCarrito;
    }
    cTotal()
    subTotal()
    costoEnvio()
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
    let costoE = 0

    if (premium.status === "ok") {
        Math.round(costoE = subTotal(unitCost, i) * .15)
        Math.round(cTotal() = cTotal + (subTotal(unitCost, i) * .15))
    }
    if (express.status === "ok") {
        costoE = subTotal(unitCost, i) * .07
        cTotal() = cTotal() + (subTotal(unitCost, i) * .07)
    }
    if (standard.status === "ok") {
        costoE = subTotal(unitCost, i) * .05
        cTotal() = cTotal() + (subTotal(unitCost, i) * .05)
    }
    document.getElementById("costoenvio").innerHTML = costoE;
    cTotal()
}

function cTotal() {
    let total = ""
    let subTotales = document.getElementsByClassName("subsT");
    for (let i = 0; i < subTotales.length; i++) {
        total += parseInt(subTotales[i].innerHTML);
    }

    document.getElementById("total").innerHTML = total
}

document.addEventListener("DOMContentLoaded", function (e) {


    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartArray = resultObj.data.articles;
            showCart(cartArray);
        }
    });
});

//Validaciones

function miValidacion() {
    let flag = true;

    document.getElementById("feedback").innerHTML = "";

    //Envios
    if (!document.querySelector('input[name="envio"]:checked')) {
        alert('Seleccione un envio');
        flag = false;
    }

    //Direccion de envio
    let calle = document.getElementById("calle").value
    let nump = document.getElementById("numero").value
    let esq = document.getElementById("esquina").value

    if (calle == "" || nump == "" || esq == "") {
        flag = false;
        alert("Algún campo de la direccion se encuentra vacío")
    }

    //Modal
    let nombreC = document.getElementById("owner").value
    let card = document.getElementById("cardNumber").value
    let cvv = document.getElementById("cvv").value
    let corriente = document.getElementById("cuentaC").value
    let ahorro = document.getElementById("cuentaA").value

    if ((card == "" && nombreC == "" && cvv == "") || corriente == "" || ahorro == "") {
        flag = false;
        alert('Debe seleccionar un método de pago');
    }
    
    return flag;
}

document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById('feedback').addEventListener("click", function () {
        if (!miValidacion()) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            window.location = 'finalcompra.html';
        }
    })
});