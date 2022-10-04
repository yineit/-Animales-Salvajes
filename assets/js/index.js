import { Animal, Leon, Lobo, Oso, Serpiente, Aguila } from "./animales.js";
import getSonidoAnimal from "./sonidos.js";
import imagenes from "./imagenes.js";

const animalesSeleccionados = [];

const btnRegistrar = document.getElementById("btnRegistrar");
const nombre = document.getElementById('animal');
const edad = document.getElementById('edad');
const comentarios = document.getElementById('comentarios');;
const tablaAnimales = document.getElementById('Animales')

btnRegistrar.addEventListener('click', async (evento) => {
    evento.preventDefault();
    const imgBack = document.getElementById('preview').style.backgroundImage;
    const urlImg = imgBack.slice(5, imgBack.length - 2);
    if (validador(nombre, edad, comentarios, urlImg)) {

        if (nombre.value === 'Águila') {
            nombre.value = 'Aguila'
        }
        const srcSonidoAnimal = `./assets/sounds/${await getSonidoAnimal(nombre.value)}`
        let animal;

        switch (nombre.value) {
            case 'Leon':
                animal = new Leon(nombre.value, edad.value, urlImg, comentarios.value, srcSonidoAnimal)
                break;
            case 'Lobo':
                animal = new Lobo(nombre.value, edad.value, urlImg, comentarios.value, srcSonidoAnimal)
                break
            case 'Oso':
                animal = new Oso(nombre.value, edad.value, urlImg, comentarios.value, srcSonidoAnimal)
                break;
            case 'Serpiente':
                animal = new Serpiente(nombre.value, edad.value, urlImg, comentarios.value, srcSonidoAnimal)
                break;
            case 'Aguila':
                animal = new Aguila(nombre.value, edad.value, urlImg, comentarios.value, srcSonidoAnimal)
                break;
        }

        animalesSeleccionados.push(animal)
        crearCards(animalesSeleccionados);
        limpiarForm(nombre, edad, comentarios, imgBack);
        crearModal(animalesSeleccionados);

    } else {
        alert('Todos los campos son obligatorios')
    }

})

const validador = (nombre, edad, comentarios, urlImg) => {
    if ((nombre.value !== "" && nombre.value !== 'Selecciona el animal') && (edad.value !== "" && edad.value !== 'Selecciona el rango de años') && comentarios.value !== "" && urlImg !== "") {
        return true;
    } else {
        return false;
    }
}

const limpiarForm = (nombre, edad, comentarios, imgBack) => {
    nombre.value = "Selecciona un animal"
    edad.value = "Selecciona un rango de años"
    comentarios.value = ""
    const defaultImgBg = document.getElementById('preview')
    defaultImgBg.style.backgroundImage = 'url("./assets/imgs/lion.svg")'
}

const crearCards = (listaAnimales) => {
    tablaAnimales.innerHTML = ''

    listaAnimales.forEach((animal, i) => {

        tablaAnimales.innerHTML +=

            `
            <div class="card text-white bg-secondary m-3">
            <img type ="button "style="width: 10rem;" src="${animal.Img}" class="card-img-top" data-bs-toggle="modal" data-bs-target="#${animal.Nombre}-${i}">
            <div class="card-body p-1" onclick="playSounds('${animal.Sonido}')">
            <a href="#"><img class="p-1" height="30rem" src="./assets/imgs/audio.svg"/></a>
            </div>
            </div>
            `
    });
}

window.playSounds = (sound) => {
    const sonido = new Audio(sound);
    sonido.play();
}

const crearModal = (listaAnimales) => {
    const modal = document.getElementById('modal');
    modal.innerHTML = "";
    listaAnimales.forEach((animal, i) => {
        
        modal.innerHTML +=
            `
        <!-- Modal ${animal.Nombre} - ${i} -->
        <div class="modal fade" id="${animal.Nombre}-${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered w-25 role=document">
            <div class="modal-content bg-dark text-white">
            <div class="modal-header">
                <h2 class="modal-title" id="exampleModalLabel">${animal.Nombre}</h2>
            </div>
            <div class="modal-body">
                <img src="${animal.Img}" class="img-fluid">
                <hr>
                <h4>Rango de edad del animal</h4>
                <p>${animal.Edad}</p>
                <hr>
                <h4>Comentario</h4>
                <p>${animal.Comentarios}</p> 
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
            </div>
        </div>
        </div>
        `
    })

}