import Papa from 'papaparse';
const csvText = `nombre,descripcion,IDProducto,Precio,imagen1,imagen2,imagen3,imagen4\r\n"""NutriCan Senior +7""","""Alimento balanceado para perros mayores de 7 años  con antioxidantes y protectores articulares.""","""VET-001""","""185000""","""images/products/vet-001-1.png""","""images/products/vet-001-2.png""","""images/products/vet-001-3.png""","""images/products/vet-001-4.png"""`;
Papa.parse(csvText, {
  header: true,
  skipEmptyLines: true,
  complete: (results) => {
    console.log(results.data);
  }
});
