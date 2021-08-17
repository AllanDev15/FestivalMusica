document.addEventListener('DOMContentLoaded', () => {
  crearGaleria();
});

function crearGaleria() {
  const galeria = document.querySelector('.galeria-imagenes');
  for (let i = 1; i <= 12; i++) {
    const imagen = document.createElement('img');
    imagen.src = `build/img/thumb/${i}.webp`;
    imagen.dataset.imagenId = i;

    // Anadir la funcion mostrarImagen

    imagen.onclick = mostrarImagen;

    const lista = document.createElement('li');
    lista.appendChild(imagen);

    galeria.appendChild(lista);
  }
}

function mostrarImagen(e) {
  const id = parseInt(e.target.dataset.imagenId);

  const imagen = document.createElement('img');
  imagen.src = `build/img/grande/${id}.webp`;

  console.log(imagen);

  const overlay = document.createElement('div');
  overlay.appendChild(imagen);
  overlay.classList.add('overlay');

  overlay.onclick = function () {
    overlay.remove();
    body.classList.remove('fijar-body');
  };

  // Boton para cerrar

  const cerrarImagen = document.createElement('p');
  cerrarImagen.textContent = 'X';
  cerrarImagen.classList.add('btn-cerrar');

  cerrarImagen.onclick = function () {
    overlay.remove();
    body.classList.remove('fijar-body');
  };

  overlay.appendChild(cerrarImagen);

  const body = document.querySelector('body');
  body.appendChild(overlay);
  body.classList.add('fijar-body');
}
