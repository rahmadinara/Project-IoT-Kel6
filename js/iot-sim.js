setInterval(()=>{

  const random =
  Math.random() > 0.7
  ? "DEFECT"
  : "INTACT";

  addLog(`Barang baru : ${random}`);

},3000);