// import React, { useState } from "react";
// import * as XLSX from "xlsx";
// import QRCode from "qrcode";
// import JsBarcode from "jsbarcode";
// import html2canvas from "html2canvas";
// import { saveAs } from "file-saver";

// function App() {
//   const [file, setFile] = useState(null);
//   const [isGenerating, setIsGenerating] = useState(false);

//   const handleFileUpload = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const generateImages = async () => {
//     if (!file) return alert("Please upload an Excel file!");

//     setIsGenerating(true);
//     const reader = new FileReader();
//     reader.onload = async (event) => {
//       const data = new Uint8Array(event.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const sheetName = workbook.SheetNames[0];
//       const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

//       for (let i = 0; i < sheetData.length; i++) {
//         const qrData = sheetData[i].qrData;
//         const barData = sheetData[i].barData;
//         await generateImage(qrData, barData, i + 1);
//       }

//       setIsGenerating(false);
//       alert("All images generated!");
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   const generateImage = async (qrData, barData, index) => {
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");
//     canvas.width = 200;
//     canvas.height = 300;

//     // Draw Header Text
//     ctx.font = "14px Arial";
//     ctx.textAlign = "center";
//     ctx.fillText("HEDANSHIP ASIA (PVT) LTD", canvas.width / 2, 20);

//     // Generate QR Code
//     const qrCanvas = document.createElement("canvas");
//     await QRCode.toCanvas(qrCanvas, qrData, { width: 100 });
//     ctx.drawImage(qrCanvas, 50, 30);

//     // Generate Barcode
//     const barCanvas = document.createElement("canvas");
//     JsBarcode(barCanvas, barData, { width: 2, height: 40 });
//     ctx.drawImage(barCanvas, 50, 150);

//     // Add Barcode Text
//     ctx.font = "12px Arial";
//     ctx.fillText(barData, canvas.width / 2, 210);

//     // Convert Canvas to Image
//     const imgBlob = await new Promise((resolve) =>
//       canvas.toBlob((blob) => resolve(blob))
//     );
//     saveAs(imgBlob, `image_${index}.png`);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>QR & Barcode Generator</h1>
//       <input type="file" accept=".xlsx" onChange={handleFileUpload} />
//       <button onClick={generateImages} disabled={isGenerating}>
//         {isGenerating ? "Generating..." : "Generate Images"}
//       </button>
//     </div>
//   );
// }

// export default App;



// okeii but style edit...................................

// import React, { useState } from "react";
// import * as XLSX from "xlsx";
// import QRCode from "qrcode";
// import JsBarcode from "jsbarcode";
// import html2canvas from "html2canvas";
// import JSZip from "jszip";
// import { saveAs } from "file-saver";

// function App() {
//   const [file, setFile] = useState(null);
//   const [isGenerating, setIsGenerating] = useState(false);

//   const handleFileUpload = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const generateImagesAsZip = async () => {
//     if (!file) return alert("Please upload an Excel file!");

//     setIsGenerating(true);
//     const reader = new FileReader();
//     reader.onload = async (event) => {
//       const data = new Uint8Array(event.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const sheetName = workbook.SheetNames[0];
//       const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

//       const zip = new JSZip();
//       const imageFolder = zip.folder("Generated_Images");

//       for (let i = 0; i < sheetData.length; i++) {
//         const qrData = sheetData[i].qrData;
//         const barData = sheetData[i].barData;
//         const imageBlob = await generateImage(qrData, barData);
//         imageFolder.file(`image_${i + 1}.png`, imageBlob);
//       }

//       const zipBlob = await zip.generateAsync({ type: "blob" });
//       saveAs(zipBlob, "QR_Barcode_Images.zip");

//       setIsGenerating(false);
//       alert("Images generated and downloaded as ZIP!");
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   const generateImage = async (qrData, barData) => {
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");
//     canvas.width = 400;
//     canvas.height = 600;

//     // White Background
//     ctx.fillStyle = "#FFFFFF";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     // Draw Header Text
//     ctx.font = "bold 20px Arial";
//     ctx.textAlign = "center";
//     ctx.fillStyle = "#000000";
//     ctx.fillText("HEDANSHIP ASIA (PVT) LTD", canvas.width / 2, 50);

//     // Generate QR Code
//     const qrCanvas = document.createElement("canvas");
//     await QRCode.toCanvas(qrCanvas, qrData, { width: 120 }); // 1.2cm size
//     const qrImageSize = 120;
//     const qrX = (canvas.width - qrImageSize) / 2; // Center horizontally
//     const qrY = 100; // Position below header
//     ctx.drawImage(qrCanvas, qrX, qrY, qrImageSize, qrImageSize);

//     // Generate Barcode
//     const barCanvas = document.createElement("canvas");
//     JsBarcode(barCanvas, barData, { width: 2, height: 40 });
//     const barcodeX = (canvas.width - barCanvas.width) / 2; // Center horizontally
//     const barcodeY = 250; // Position below QR code
//     ctx.drawImage(barCanvas, barcodeX, barcodeY);

//     // Add Barcode Text
//     ctx.font = "14px Arial";
//     ctx.fillText(barData, canvas.width / 2, barcodeY + 60);

//     // Convert Canvas to Blob
//     return new Promise((resolve) => {
//       canvas.toBlob((blob) => resolve(blob), "image/png");
//     });
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>QR & Barcode Generator</h1>
//       <input type="file" accept=".xlsx" onChange={handleFileUpload} />
//       <button onClick={generateImagesAsZip} disabled={isGenerating}>
//         {isGenerating ? "Generating..." : "Generate Images as ZIP"}
//       </button>
//     </div>
//   );
// }

// export default App;




// Final ......................

// import React, { useState } from "react";
// import * as XLSX from "xlsx";
// import QRCode from "qrcode";
// import JsBarcode from "jsbarcode";
// import JSZip from "jszip";
// import { saveAs } from "file-saver";

// function App() {
//   const [file, setFile] = useState(null);
//   const [isGenerating, setIsGenerating] = useState(false);

//   const handleFileUpload = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const generateImagesAsZip = async () => {
//     if (!file) return alert("Please upload an Excel file!");

//     setIsGenerating(true);
//     const reader = new FileReader();
//     reader.onload = async (event) => {
//       const data = new Uint8Array(event.target.result);
//       const workbook = XLSX.read(data, { type: "array" });
//       const sheetName = workbook.SheetNames[0];
//       const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

//       const zip = new JSZip();
//       const imageFolder = zip.folder("Generated_Images");

//       for (let i = 0; i < sheetData.length; i++) {
//         const qrData = sheetData[i].qrData;
//         const barData = sheetData[i].barData;
//         const imageBlob = await generateImage(qrData, barData);
//         imageFolder.file(`image_${i + 1}.png`, imageBlob);
//       }

//       const zipBlob = await zip.generateAsync({ type: "blob" });
//       saveAs(zipBlob, "QR_Barcode_Images.zip");

//       setIsGenerating(false);
//       alert("Images generated and downloaded as ZIP!");
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   const generateImage = async (qrData, barData) => {
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");

//     // Define dynamic canvas size
//     const canvasWidth = 400;
//     const canvasHeight = 500;
//     const padding = 20;

//     canvas.width = canvasWidth;
//     canvas.height = canvasHeight;

//     // White Background
//     ctx.fillStyle = "#FFFFFF";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     // Draw Header Text
//     ctx.font = "bold 15px Arial";
//     ctx.textAlign = "center";
//     ctx.fillStyle = "#000000";
//     ctx.fillText("HEDANSHIP ASIA (PVT) LTD", canvas.width / 2, padding + 20);

//     // Generate QR Code
//     const qrCanvas = document.createElement("canvas");
//     await QRCode.toCanvas(qrCanvas, qrData, { width: 120 }); // 1.2cm QR code size
//     const qrImageSize = 120;
//     const qrX = (canvas.width - qrImageSize) / 2; // Center horizontally
//     const qrY = padding + 60; // Position below header with padding
//     ctx.drawImage(qrCanvas, qrX, qrY, qrImageSize, qrImageSize);

//     // Generate Barcode
//     const barCanvas = document.createElement("canvas");
//     JsBarcode(barCanvas, barData, { width: 2, height: 40 });
//     const barcodeX = (canvas.width - barCanvas.width) / 2; // Center horizontally
//     const barcodeY = qrY + qrImageSize + 40; // Add padding below QR code
//     ctx.drawImage(barCanvas, barcodeX, barcodeY);

//     // Add Label Below Barcode
//     ctx.font = "16px Arial";
//     ctx.fillText(
//       "", // Replace with your desired label
//       canvas.width / 2,
//       barcodeY + barCanvas.height + 30 // Padding between barcode and label
//     );

//     // Convert Canvas to Blob
//     return new Promise((resolve) => {
//       canvas.toBlob((blob) => resolve(blob), "image/png");
//     });
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>QR & Barcode Generator</h1>
//       <input type="file" accept=".xlsx" onChange={handleFileUpload} />
//       <button onClick={generateImagesAsZip} disabled={isGenerating}>
//         {isGenerating ? "Generating..." : "Generate Images as ZIP"}
//       </button>
//     </div>
//   );
// }

// export default App;


// Last .........................................

import React, { useState } from "react";
import * as XLSX from "xlsx";
import QRCode from "qrcode";
import JsBarcode from "jsbarcode";
import JSZip from "jszip";
import { saveAs } from "file-saver";

function App() {
  const [file, setFile] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const generateImagesAsZip = async () => {
    if (!file) return alert("Please upload an Excel file!");

    setIsGenerating(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      const zip = new JSZip();
      const imageFolder = zip.folder("Generated_Images");

      for (let i = 0; i < sheetData.length; i++) {
        const qrData = sheetData[i].qrData;
        const barData = sheetData[i].barData;
        const imageBlob = await generateImage(qrData, barData);
        imageFolder.file(`image_${i + 1}.png`, imageBlob);
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, "QR_Barcode_Images.zip");

      setIsGenerating(false);
      alert("Images generated and downloaded as ZIP!");
    };
    reader.readAsArrayBuffer(file);
  };

  const generateImage = async (qrData, barData) => {
    // Conversion factor: 1 cm ≈ 37.795 pixels
    const cmToPx = 37.795;

    // Define dynamic canvas size (total 2 cm x 2 cm)
    const canvasWidth = 3 * cmToPx; // 2 cm
    const canvasHeight = 3 * cmToPx; // 2 cm
    const padding = 0.2 * cmToPx; // 0.2 cm padding for all sides

    const qrImageSize = 1.3 * cmToPx; // 1 cm
    const barcodeHeight = 0 * cmToPx; // 0.4 cm
    const headingFontSize = 0.2 * cmToPx; // 0.4 cm
    const textFontSize = 0.3 * cmToPx; // 0.2 cm

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // White Background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Header Text
    ctx.font = `bold ${headingFontSize}px Arial`;
    ctx.textAlign = "center";
    ctx.fillStyle = "#000000";
    ctx.fillText(
      "HEDANSHIP ASIA (PVT) LTD",
      canvas.width / 2,
      padding + headingFontSize
    );

    // Generate QR Code
    const qrCanvas = document.createElement("canvas");
    await QRCode.toCanvas(qrCanvas, qrData, { width: qrImageSize });
    const qrX = (canvas.width - qrImageSize) / 2; // Center horizontally
    const qrY = padding + headingFontSize + 0.2 * cmToPx; // Position below header with padding
    ctx.drawImage(qrCanvas, qrX, qrY, qrImageSize, qrImageSize);

    // Generate Barcode
    const barCanvas = document.createElement("canvas");
    JsBarcode(barCanvas, barData, { width: 1, height: barcodeHeight });
    const barcodeX = (canvas.width - barCanvas.width) / 2; // Center horizontally
    const barcodeY = qrY + qrImageSize + 0.2 * cmToPx; // Add padding below QR code
    // ctx.drawImage(barCanvas, barcodeX, barcodeY);

    // Add Barcode Text
    ctx.font = `${textFontSize}px Arial`;
    ctx.fillText(
      barData,
      canvas.width / 2,
      barcodeY + barcodeHeight + 0.2 * cmToPx // Padding below barcode
    );

    // Convert Canvas to Blob
    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/png");
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>QR & Barcode Generator</h1>
      <input type="file" accept=".xlsx" onChange={handleFileUpload} />
      <button onClick={generateImagesAsZip} disabled={isGenerating}>
        {isGenerating ? "Generating..." : "Generate Images as ZIP"}
      </button>
    </div>
  );
}

export default App;
