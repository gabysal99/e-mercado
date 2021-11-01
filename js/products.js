//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var autosArray = [];
var precioMin
var precioMax

function mostrarVehiculo(id) {
    localStorage.setItem("auto", JSON.stringify({autoID: id}));
    window.location = "product-info.html";
}

function showCategoriesList(array){
    let mostrarAutos = "";

    for(let i = 0; i < array.length; i++){ 
        let auto = array[i];
        
        if (((precioMin == undefined) || (precioMin != undefined && parseInt(auto.cost) >= precioMin)) && 
        ((precioMax == undefined) || (precioMax != undefined && parseInt(auto.cost) <= precioMax))) {

            mostrarAutos += `
                <div class="col col-md-6 col-lg-4">
                    <div class="card">
                        <div>
                            <img src="` + auto.imgSrc + `" alt="` + auto.description + `" class="card-img-top">
                        </div>
                        <div class="card-body">
                            <h4 class="card-title">`+ auto.name + `</h4>
                            <p class="card-text"> `+ auto.description + `</p>
                            <p class="card-text"> `+ auto.currency + auto.cost + `</p>
                            <p class="card-text"> `+ auto.soldCount + ` artículos vendidos</p>
                            <button onclick="mostrarVehiculo(`+ auto.id +`)" class="btn btn-primary">Ver más</button>
                        </div>
                    </div>
                </div>  
            `}
        document.getElementById("productos").innerHTML = mostrarAutos;    
    }
}



document.addEventListener("DOMContentLoaded", function (e) {
    
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            autosArray = resultObj.data;
            showCategoriesList(autosArray);
        }
    });
});

document.getElementById("precioA").addEventListener('click', function() {
    
    autosArray.sort((a,b)=>a.cost-b.cost)

    showCategoriesList(autosArray)
})

document.getElementById("precioD").addEventListener('click', function() {
    
    autosArray.sort((a,b)=>b.cost-a.cost)

    showCategoriesList(autosArray)
});

document.getElementById("relevancia").addEventListener('click', function() {
    
    autosArray.sort((a,b)=>b.soldCount-a.soldCount)

    showCategoriesList(autosArray)
});

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("buscar").addEventListener("input", function() {

        showCategoriesList(autosArray)
    });
})

document.getElementById("filtro").addEventListener("click", function() {

    precioMin = document.getElementById("min").value;
    precioMax = document.getElementById("max").value;

    if ((precioMin != undefined) && (precioMin != "") && (parseInt(precioMin)) >= 0) {
        precioMin = parseInt(precioMin);
    }
    else {
        precioMin = undefined;
    }
    if ((precioMax != undefined) && (precioMax != "") && (parseInt(precioMax)) >= 0) {
        precioMax = parseInt(precioMax);
    }
    else {
        precioMax = undefined;
    }

    showCategoriesList(autosArray);
});

document.getElementById("limpiar").addEventListener("click", function() {
    document.getElementById("min").value = "";
    document.getElementById("max").value = "";

    precioMin = undefined;
    precioMax = undefined;

    showCategoriesList(autosArray);
})