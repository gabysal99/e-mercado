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
            <p class="subsT" id="subT${i}">Subtotal `+ articles.currency +`${sub}</p>
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

function cTotal() {
    let total = 0
    let subTotales = document.getElementsByClassName("subsT");
    for(let i = 0; i < subTotales.length; i++){
        total += parseInt(subTotales[i].innerHTML);
    }
    
    document.getElementById("total").innerHTML = total
}

document.addEventListener("DOMContentLoaded", function(e){

    let moneda = "UYU"
    let count = ""

    if (moneda == "UYU") {
        result = count;
    } else {
        result = count * 40
    }

    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            cartArray = resultObj.data.articles;
            showCart(cartArray);
        }
    });
});