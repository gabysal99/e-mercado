//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var autosArray = [];

function showCategoriesList(array){
    let mostrarAutos = "";

    for(let i = 0; i < array.length; i++){ 
        let auto = array[i];
        mostrarAutos += `

        <div>
            <img src="` + auto.imgSrc + `" alt="` + auto.description + `" class="img-thumbnail">
        </div>
        <div>
            <h4>`+ auto.name +`</h4> 
            <p> `+ auto.description +`</p>
            <p> `+ auto.currency + auto.cost +`</p>
            <p> `+ auto.soldCount + ` artículos<p>
            </div>
        </div>
        `
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