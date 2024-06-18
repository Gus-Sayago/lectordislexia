document.addEventListener('DOMContentLoaded', function() {
    const archivoInput = document.getElementById('archivo-input');
    const cargarBtn = document.getElementById('cargar-btn');
    const textoInput = document.getElementById('texto');
    const leerBtn = document.getElementById('leer-btn');
    const detenerBtn = document.getElementById('detener-btn');
  
    cargarBtn.addEventListener('click', function() {
      archivoInput.click();
    });
  
    archivoInput.addEventListener('change', function() {
      const archivo = archivoInput.files[0];
      if (archivo) {
        const tipo = obtenerTipoArchivo(archivo.name);
        if (tipo === 'txt') {
          leerArchivoTexto(archivo);
        } else if (tipo === 'pdf') {
          leerArchivoPDF(archivo);
        } else {
          alert('Formato de archivo no compatible. Por favor, elige un archivo de texto (.txt), documento (.doc/.docx) o PDF (.pdf).');
        }
      }
    });
  
    leerBtn.addEventListener('click', function() {
      const textoParaLeer = textoInput.value.trim();
      if (textoParaLeer !== '') {
        leerTexto(textoParaLeer);
      }
    });
  
    detenerBtn.addEventListener('click', function() {
      detenerLectura();
    });
  
    function obtenerTipoArchivo(nombreArchivo) {
      const extension = nombreArchivo.split('.').pop().toLowerCase();
      if (extension === 'txt') {
        return 'txt';
      } else if (extension === 'pdf') {
        return 'pdf';
      } else {
        return 'otro';
      }
    }
  
    function leerArchivoTexto(archivo) {
      const lector = new FileReader();
      lector.onload = function(evento) {
        textoInput.value = evento.target.result;
      };
      lector.readAsText(archivo);
    }
  
    function leerArchivoPDF(archivo) {
      const lector = new FileReader();
      lector.onload = function(evento) {
        const arrayBuffer = evento.target.result;
        pdfjsLib.getDocument(arrayBuffer).promise.then(function(pdfDoc) {
          let textoPDF = '';
          const numPaginas = pdfDoc.numPages;
          for (let pagina = 1; pagina <= numPaginas; pagina++) {
            pdfDoc.getPage(pagina).then(function(paginaPDF) {
              return paginaPDF.getTextContent();
            }).then(function(contenido) {
              contenido.items.forEach(function(item) {
                textoPDF += item.str + ' ';
              });
              textoInput.value = textoPDF;
            });
          }
        });
      };
      lector.readAsArrayBuffer(archivo);
    }
  
    function leerTexto(texto) {
      const mensaje = new SpeechSynthesisUtterance();
      mensaje.text = texto;
      window.speechSynthesis.speak(mensaje);
    }
  
    function detenerLectura() {
      window.speechSynthesis.cancel();
    }
  });
  