document.addEventListener('DOMContentLoaded', function() {
    const textoInput = document.getElementById('texto');
    const leerBtn = document.getElementById('leer-btn');
    const detenerBtn = document.getElementById('detener-btn');
  
    leerBtn.addEventListener('click', function() {
      const textoParaLeer = textoInput.value.trim();
      if (textoParaLeer !== '') {
        leerTexto(textoParaLeer);
      }
    });
  
    detenerBtn.addEventListener('click', function() {
      detenerLectura();
    });
  
    function leerTexto(texto) {
      // Crear un nuevo objeto de SpeechSynthesisUtterance
      const mensaje = new SpeechSynthesisUtterance();
      // Establecer el texto a leer
      mensaje.text = texto;
      // Iniciar la síntesis de voz
      window.speechSynthesis.speak(mensaje);
    }
  
    function detenerLectura() {
      // Detener la síntesis de voz actual
      window.speechSynthesis.cancel();
    }
  });
  