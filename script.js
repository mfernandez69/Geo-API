const inputIp = document.getElementById('inputIp');
const btnEnviar = document.getElementById('btnEnviar');
const res = document.getElementById('res');
const btnPropiaIP = document.getElementById('btnPropiaIp');
//-------------------------------------------------

btnEnviar.addEventListener('click', registrarIp);
btnPropiaIP.addEventListener('click', enivarPropiaIP);
//--------------------------------------------------
function registrarIp() {
  console.log("registrar ipp");
  const valorInput = inputIp.value;
  comprobarInput(valorInput);
}
function comprobarInput(valorInput) {
  if (valorInput !== "") {
    enviarPeticion(valorInput);
  } else {
    console.log("Error,Introduce una IP válida");
  }
}
function enviarPeticion(valorInput) {
  console.log(valorInput);
  // fetch("https://ipgeolocation.abstractapi.com/v1/?api_key=e6b1497a0dc84e0b92832a90a864f30e&ip_address=82.158.73.235")
  //megatarzan280@gmail.com
  fetch("https://ipgeolocation.abstractapi.com/v1/?api_key=e6b1497a0dc84e0b92832a90a864f30e&ip_address=" + valorInput)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      console.log("Mostrar datos fetch");
      mostrarInfo(res);
    })
}
function enivarPropiaIP() {
  //Si no se incluye el parametro de Ip, la API mostrará los resultados de la IP que los solicita
  fetch("https://ipgeolocation.abstractapi.com/v1/?api_key=e6b1497a0dc84e0b92832a90a864f30e")
    .then(res => res.json())
    .then(res => {
      console.log(res);
      console.log("Mostrar datos fetch");
      mostrarInfo(res);
    })
}
function mostrarInfo(infoIp) {
  let txt = "<div id='resultados'><ul id='titulos'>";
  if (Array.isArray(infoIp)) {
    for (let i = 0; i < infoIp.length; i++) {
      txt += "<li>" + infoIp[i] + "</li>";
    }
  }
  if (typeof infoIp === 'object') {
    for (const i in infoIp) {
      if (typeof infoIp[i] === 'object') {
          txt += "<li>" + i + ":</li><ul id='subtipo'>";
        for (const j in infoIp[i]) {
          if (i !== 'flag') {
            txt += "<li>" + j + ": " + infoIp[i][j] + "</li>";
        }else {
          if(j ==='png'){
            const urlImagen = infoIp[i][j]; // Assuming the URL is stored in infoIp[21][2]
            txt += "<img id='imagenBandera' src='" + urlImagen + "' alt='Image'>";
            console.log(urlImagen);
          }
          }
        }
        txt += "</ul>";
      } else {
        txt += "<li>" + i + ": " + infoIp[i] + "</li>";
      }
    }
  }
  txt += "</ul><div>";
  res.innerHTML = txt;
  console.log("Mostar informacion ip");
}