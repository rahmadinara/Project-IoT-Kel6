const logList =
document.getElementById("logList");

function addLog(message){

  const li =
  document.createElement("li");

  li.innerText = message;

  logList.prepend(li);

}