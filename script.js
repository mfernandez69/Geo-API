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
        mostrarSubtipos(infoIp[i],txt,i);
        txt += "</ul>";
      } else {
        if (i === "ip_address") {
          txt += "<li id='campoIP'>" + i + ": " + infoIp[i] + "</li>";
        } else {
          txt += "<li>" + i + ": " + infoIp[i] + "</li>";
        }
      }
    }
  }
  txt += "</ul><div>";
  res.innerHTML = txt;
  console.log("Mostar informacion ip");
}
function mostrarSubtipos(subInfo, txt,i) {
  for (const j in subInfo) {
    if (i !== 'flag') {
      if (j === "is_vpn") {
        if (subInfo[j] == "false") {
          txt += "<li id='campoSeguridad'>" + "<img id='imagenVpn' src='img/tick.png' alt='Image'>";
        } else {
          txt += "<li id='campoSeguridad'>" + "<img id='imagenVpn' src='img/cruz.png' alt='Image'>";
        }
        txt += j + ": " + subInfo[j] + "</li>";

      } else {
        txt += "<li>" + j + ": " + subInfo[j] + "</li>";
      }
    } else {
      console.log(subInfo);
      if (j === 'png') {
        const urlImagen = subInfo[j];
        txt += "<img id='imagenBandera' src='" + urlImagen + "' alt='Image'>";
        console.log(urlImagen);
      }
    }
  }
} 