const inputIp = document.getElementById('inputIp');
const btnEnviar = document.getElementById('btnEnviar');
const res = document.getElementById('res');
const btnPropiaIP=document.getElementById('btnPropiaIp');
//-------------------------------------------------
let valorInput = "";
btnEnviar.addEventListener('click', registrarIp);
btnPropiaIP.addEventListener('click',enivarPropiaIP);
//--------------------------------------------------
function registrarIp() {
  console.log("registrar ipp");
  valorInput = document.getElementById('inputIp').value;
  enviarPeticion(valorInput);
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
function enivarPropiaIP(){
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
  let txt = "<ul>";
  if (Array.isArray(infoIp)) {
    for (let i = 0; i < infoIp.length; i++) {
      txt += "<li>" + infoIp[i] + "</li>";
    }
  } 
  if (typeof infoIp === 'object') {
    for (const i in infoIp) {
      if (typeof infoIp[i] === 'object') {
        txt += "<li>" + i + ":</li><ul>";
        for (const j in infoIp[i]) {
          txt += "<li>" + j + ": " + infoIp[i][j] + "</li>";
        }
        txt += "</ul>";
      } else {
        txt += "<li>" + i + ": " + infoIp[i] + "</li>";
      }
    }
  }
  txt += "</ul>";
  // res.innerHTML = JSON.stringify(infoIp, null, 2);  Convert object to string
  res.innerHTML = txt;
  console.log("Mostar informacion ip");
}