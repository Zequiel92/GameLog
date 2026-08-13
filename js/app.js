document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. SELECCIÓN DE ELEMENTOS DEL DOM
  // ==========================================
  const btnMenu = document.querySelector('.btn-menu');
  const menuNav = document.querySelector('.menu-navegacion');
  
  const formJuego = document.querySelector('.main-box form');
  const inputNombre = document.getElementById('Name');
  const selectPlataforma = document.getElementById('Platform');
  const selectEstado = document.getElementById('State');
  const inputPuntuacion = document.getElementById('Score');
  
  const contenedorBiblioteca = document.querySelector('.main-box section');
  const botonesFiltro = document.querySelectorAll('.menu-navegacion button');


  // ==========================================
  // 3. VALIDACIÓN Y AGREGADO DE JUEGO (FORMULARIO)
  // ==========================================
  formJuego.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Obtener y limpiar valores
    const nombre = inputNombre.value.trim();
    const plataforma = selectPlataforma.value;
    const estado = selectEstado.value;
    const puntuacion = inputPuntuacion.value.trim();

    // Requisito 1: Validar que ningún campo esté vacío
    if (!nombre || !plataforma || !estado || !puntuacion) {
      alert('Por favor, completa todos los campos del formulario.');
      return;
    }

    // Validar rango de puntuación
    if (puntuacion < 1 || puntuacion > 10) {
      alert('La puntuación debe ser un número entre 1 y 10.');
      return;
    }

    // Requisito 2: Crear e inyectar dinámicamente la nueva tarjeta
    crearTarjetaJuego(nombre, plataforma, estado, puntuacion);

    // Requisito 3: Limpiar el formulario automáticamente
    formJuego.reset();
  });

  // Función constructora del elemento <article class="card-game">
  function crearTarjetaJuego(nombre, plataforma, estado, puntuacion) {
    const nuevaTarjeta = document.createElement('article');
    nuevaTarjeta.classList.add('card-game');

    nuevaTarjeta.innerHTML = `
      <h3>${nombre}</h3>
      <p><strong>Plataforma:</strong> ${plataforma}</p>
      <p><strong>Estado:</strong> ${estado}</p>
      <p><strong>Puntuación:</strong> ${puntuacion}/10</p>
      <div class="card-actions">
        <button type="button">Editar</button>
        <button type="button">Eliminar</button>
      </div>
    `;

    // Inyectar en el DOM dentro de la sección de la biblioteca
    contenedorBiblioteca.appendChild(nuevaTarjeta);
  }

  // ==========================================
  // 4. ELIMINAR TARJETA (DELEGACIÓN DE EVENTOS)
  // ==========================================
  // Requisito 4: Funciona para tarjetas existentes y dinámicas
  contenedorBiblioteca.addEventListener('click', (e) => {
    const elementoClickeado = e.target;

    // Verificar si se hizo clic en un botón con texto "Eliminar"
    if (
      elementoClickeado.tagName === 'BUTTON' && 
      elementoClickeado.textContent.trim().toLowerCase() === 'eliminar'
    ) {
      // Buscar el elemento <article class="card-game"> más cercano y removerlo
      const tarjeta = elementoClickeado.closest('.card-game');
      if (tarjeta) {
        tarjeta.remove();
      }
    }
  });

  // ==========================================
  // 5. FILTRADO DE TARJETAS
  // ==========================================
  // Requisito 5: Mostrar/Ocultar tarjetas según el filtro
  botonesFiltro.forEach(boton => {
    boton.addEventListener('click', () => {
      const filtroSeleccionado = boton.textContent.trim().toLowerCase();
      const tarjetas = contenedorBiblioteca.querySelectorAll('.card-game');

      tarjetas.forEach(tarjeta => {
        // Extraer el estado guardado dentro del <p> de la tarjeta
        const parrafos = tarjeta.querySelectorAll('p');
        let estadoTarjeta = '';

        parrafos.forEach(p => {
          if (p.textContent.includes('Estado:')) {
            // Extrae solo el valor después de "Estado:" (ej. "Jugando")
            estadoTarjeta = p.textContent.replace('Estado:', '').trim().toLowerCase();
          }
        });

        // Lógica de visualización
        if (filtroSeleccionado === 'todos' || estadoTarjeta === filtroSeleccionado) {
          tarjeta.style.display = 'flex'; // Muestra la tarjeta
        } else {
          tarjeta.style.display = 'none'; // Oculta la tarjeta
        }
      });

      // Si estamos en móvil, cerramos el menú desplegable tras elegir un filtro
      if (menuNav.classList.contains('activo')) {
        menuNav.classList.remove('activo');
      }
    });
  });
});
