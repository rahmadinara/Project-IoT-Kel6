async function loadDashboard(){

  const response =
  await fetch("http://localhost:3000/api/dashboard");

  const data =
  await response.json();

  document.getElementById("totalItems")
  .innerText = data.total;

  document.getElementById("intactItems")
  .innerText = data.intact;

  document.getElementById("defectItems")
  .innerText = data.defect;

}

loadDashboard();