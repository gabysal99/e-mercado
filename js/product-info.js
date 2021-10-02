//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function mostrarVehiculo(auto) {

    let desc = "";
    let img = "";


    desc += `
        <h2>${auto.name}</h2><br>
            <br><h5>${auto.description}</h5><br>
            <br>${auto.currency + auto.cost}<br>
            <br>${auto.soldCount + ' vendidos'}<br>
    `;

    img += `
        <img src="img/${auto.name}/1.jpg" width="90" height="auto" alt="">
        <img src="img/${auto.name}/2.jpg" width="90" height="auto" alt="">
        <img src="img/${auto.name}/3.jpg" width="90" height="auto" alt="">
        <img src="img/${auto.name}/4.jpg" width="90" height="auto" alt="">
        <img src="img/${auto.name}/5.jpg" width="90" height="auto" alt=""> 
    `;

    document.getElementById("desc").innerHTML += desc;
    document.getElementById("img").innerHTML += img;
}

//-----------------------------PRODUCTOS RELACIONADOS---------------------------

var autosArray = []

function mostrarRelacionados (auto, autosArray) {
    let rel = "";

    autosArray.forEach(function(indice) {
        rel += `
            <h4>${auto[indice].name}</h4>
            ${auto[indice].currency + auto[indice].cost}
            <img src="img/${auto[indice].name}/1.jpg" width="65" height="auto" alt="">
            <a href="product-info.html"><button>Ver auto</button></a>
        `;
    })
    document.getElementById("productosRel").innerHTML = rel
}

function test(c) {
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var columns = document.getElementsByClassName("column");
    var i, c;
    for (i = 1; i < columns.length; i++) {
        if (w <= 640) columns[i].style.width = "100%";
        if (c == "l") columns[i].style.width = "100%";
        if (c == "g") columns[i].style.width = "25%";
        if (c == "a") columns[i].style.width = "50%";
    }

    document.getElementsByClassName("column").innerHTML += img;
}
//onload = test;

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCT_INFO_URL).then(function (result) {
        if (result.status === "ok") {

            result.data.forEach(auto => {
                if (auto.id == JSON.parse(localStorage.getItem("auto")).autoID) {
                    mostrarVehiculo(auto);
                }

                getJSONData(PRODUCTS_URL).then(function (resultObj) {
                    if (resultObj.status === "ok") {
                        autosArray = resultObj.data;
        
                        mostrarRelacionados(autosArray, auto.relatedProducts);
                    }
                })
            });
        }
    })
})


//-----------------------------COMENTARIOS---------------------------

var comentarios = [];

function mostrarComentarios(array) {
    let mostrarComentario = "";

    for (let i = 0; i < array.length; i++) {
        let comentario = array[i];

        mostrarComentario += `

            <div>
                <h5> Puntuación: `+ comentario.score +`/5</h5>
                <p> `+ comentario.description + `</p>
                <p> Usuario: `+ comentario.user + `</p>
                <p> `+ comentario.dateTime + `</p> <br>
            </div>
        `}
    document.getElementById("comentarios").innerHTML = mostrarComentario;
}

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comentarios = resultObj.data;
            mostrarComentarios(comentarios);
        }
    });
});

//-----------------------------CAJA DE COMENTARIOS---------------------------

function commentBox(){
	var usuario = document.getElementById('usuario').value;
	var comment = document.getElementById('comment').value;
 
	if(usuario =="" || comment ==""){
		alert("Porfavor introduce la informacion requerida!");
	}else{
		var parent=document.createElement('div');
		var el_name=document.createElement('h5');
		var el_message=document.createElement('p');
		var el_line=document.createElement('hr');
		var txt_usuario=document.createTextNode(usuario);
		var txt_message=document.createTextNode(comment);
		el_name.appendChild(txt_usuario);
		el_message.appendChild(txt_message);
		el_line.style.border='1px solid #000';
		parent.appendChild(el_usuario);
		parent.appendChild(el_line);
		parent.appendChild(el_message);
		parent.setAttribute('class', 'pane');
		document.getElementById('result').appendChild(parent);
 
		document.getElementById('name').value="";
		document.getElementById('comment').value="";
	}
}

window.onload = function () {
    var s = document.getElementById("pingStar"),
        m = document.getElementById('dir'),
        n = s.getElementsByTagName("li"),
        input = document.getElementById('startP'); // Guarda el valor seleccionado
    clearAll = function () {
        for (var i = 0; i < n.length; i++) {
            n[i].className = '';
        }
    }
    for (var i = 0; i < n.length; i++) {
        n[i].onclick = function () {
            var q = this.getAttribute("rel");
            clearAll();
            input.value = q;
            for (var i = 0; i < q; i++) {
                n[i].className = 'on';
            }
            m.innerHTML = this.getAttribute("title");
        }
        n[i].onmouseover = function () {
            var q = this.getAttribute("rel");
            clearAll();
            for (var i = 0; i < q; i++) {
                n[i].className = 'on';
            }
        }
        n[i].onmouseout = function () {
            clearAll();
            for (var i = 0; i < input.value; i++) {
                n[i].className = 'on';
            }
        }
    }
}