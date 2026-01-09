// const PDFDocument = require("pdfkit");
// const fs = require("fs");

// module.exports = (contract) => {
//   return new Promise((resolve) => {
//     const filePath = `uploads/contractsPdf/${contract._id}.pdf`;
//     const doc = new PDFDocument();

//     doc.pipe(fs.createWriteStream(filePath));

//     doc.fontSize(18).text("Contract Farming Agreement");
//     doc.moveDown();

//     doc.text(`Buyer: ${contract.buyer.name}`);
//     doc.text(`Farmer: ${contract.farmer.name}`);
//     doc.text(`Crop: ${contract.cropDetails.name}`);
//     doc.text(`Quantity: ${contract.cropDetails.quantity}`);
//     doc.text(`Price: ${contract.cropDetails.pricePerQuintal}`);

//     doc.end();
//     resolve(filePath);
//   });
// };
// const fs = require("fs");
// const path = require("path");
// const PDFDocument = require("pdfkit");

// async function generatePdf(contract) {
//   const filePath = path.join(
//     "uploads/contractsPdf",
//     `contract-${contract._id}.pdf`
//   );

//   const doc = new PDFDocument();
//   doc.pipe(fs.createWriteStream(filePath));

//   doc.fontSize(18).text("Contract Farming Agreement");
//   doc.moveDown();
//   doc.text(`Buyer: ${contract.buyer.name}`);
//   doc.text(`Farmer: ${contract.farmer.name}`);
//   doc.text(`Commodity: ${contract.cropDetails.name}`);
//   doc.text(`Price: ${contract.cropDetails.pricePerQuintal}`);
//   doc.text(`Quantity: ${contract.cropDetails.quantity}`);

//   doc.end();

//   return filePath;
// }
// const fs = require("fs");
// const path = require("path");
// const PDFDocument = require("pdfkit");

// const generatePdf = async (contract) => {
//   return new Promise((resolve, reject) => {
//     try {
//       // Ensure folder exists
//       const pdfDir = path.join(__dirname, "../uploads/contractsPdf");
//       if (!fs.existsSync(pdfDir)) {
//         fs.mkdirSync(pdfDir, { recursive: true });
//       }

//       const fileName = `contract-${contract._id}.pdf`;
//       const filePath = path.join(pdfDir, fileName);

//       const doc = new PDFDocument({ margin: 50 });
//       const stream = fs.createWriteStream(filePath);
//       doc.pipe(stream);

//       // -------- PDF CONTENT --------
//       doc.fontSize(18).text("Contract Farming Agreement", { align: "center" });
//       doc.moveDown();

//       doc.fontSize(12).text(`Contract ID: ${contract._id}`);
//       doc.text(`Date: ${new Date().toLocaleDateString()}`);
//       doc.moveDown();

//       doc.fontSize(14).text("Buyer Details", { underline: true });
//       doc.fontSize(12).text(`Name: ${contract.buyer.name}`);
//       doc.moveDown();

//       doc.fontSize(14).text("Farmer Details", { underline: true });
//       doc.fontSize(12).text(`Name: ${contract.farmer.name}`);
//       doc.moveDown();

//       doc.fontSize(14).text("Crop Details", { underline: true });
//       doc.fontSize(12).text(`Commodity: ${contract.cropDetails.name}`);
//       doc.text(`Quantity: ${contract.cropDetails.quantity}`);
//       doc.text(`Price: ₹${contract.cropDetails.pricePerQuintal}`);
//       doc.moveDown();

//       doc.fontSize(14).text("Signatures", { underline: true });
//       doc.text(`Buyer Signed: ${contract.signatures.buyer.name}`);
//       doc.text(`Farmer Signed: ${contract.signatures.farmer.name}`);

//       doc.end();

//       stream.on("finish", () => resolve(filePath));
//       stream.on("error", reject);
//     } catch (err) {
//       reject(err);
//     }
//   });
// };

// module.exports = generatePdf;
//ori
// const PDFDocument = require("pdfkit");
// const fs = require("fs");
// const path = require("path");

// module.exports = function generatePdf(contract) {
//   return new Promise((resolve, reject) => {
//     try {
//       const dir = "uploads/contractsPdf";
//       if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

//       const filePath = path.join(dir, `contract-${contract._id}.pdf`);
//       const doc = new PDFDocument({ margin: 50 });
//       const stream = fs.createWriteStream(filePath);
//       doc.pipe(stream);

//       // ✅ SAFE FIELD EXTRACTION
//       const buyerName = contract.buyerName || "N/A";
//       const farmerName = contract.farmerName || "N/A";

//       doc.fontSize(18).text("Contract Farming Agreement", { align: "center" });
//       doc.moveDown();

//       doc.fontSize(12).text(`Buyer: ${buyerName}`);
//       doc.text(`Farmer: ${farmerName}`);
//       doc.moveDown();

//       doc.text(`Commodity: ${contract.commodity}`);
//       doc.text(`Quantity: ${contract.quantity} ${contract.unit}`);
//       doc.text(`Price: ₹${contract.offerPrice}`);
//       doc.text(`Pickup Date: ${contract.pickupDate}`);
//       doc.text(`Location: ${contract.location}`);
//       doc.moveDown();

//       doc.text("Signatures", { underline: true });
//       doc.moveDown();

//       if (contract.signatures?.buyer?.image) {
//         doc.text("Buyer Signed");
//         doc.image(contract.signatures.buyer.image, { width: 120 });
//       }

//       if (contract.signatures?.farmer?.image) {
//         doc.moveDown();
//         doc.text("Farmer Signed");
//         doc.image(contract.signatures.farmer.image, { width: 120 });
//       }

//       doc.end();

//       stream.on("finish", () => resolve(filePath));
//     } catch (err) {
//       reject(err);
//     }
//   });
// };
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

module.exports = function generatePdf(contract) {
  return new Promise((resolve, reject) => {
    try {
      const dir = "uploads/contractsPdf";
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

      const filePath = path.join(dir, `contract-${contract._id}.pdf`);
      const doc = new PDFDocument({ margin: 50 });
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      /* ---------------- SAFE EXTRACTION ---------------- */

      const buyerName = contract.buyerSignature?.name || contract.buyerName || "N/A";
      const farmerName = contract.farmerSignature?.name || contract.farmerName || "N/A";

      const commodity = contract.cropDetails?.name || contract.commodity || "N/A";
      const quantity = contract.cropDetails?.quantity || contract.quantity || "N/A";
      const price = contract.cropDetails?.pricePerQuintal || contract.offerPrice || "N/A";
      const location = contract.delivery?.location || contract.location || "N/A";
      const deliveryDate = contract.delivery?.deadline || contract.pickupDate || "N/A";

      const createdDate = contract.createdAt
        ? new Date(contract.createdAt).toDateString()
        : new Date().toDateString();

      /* ---------------- TITLE ---------------- */

      doc
        .fontSize(18)
        .font("Times-Bold")
        .text("CONTRACT FARMING AGREEMENT", { align: "center" });

      doc.moveDown(1.5);

      doc
        .fontSize(10)
        .font("Times-Roman")
        .text(`Agreement ID: ${contract._id}`, { align: "center" })
        .text(`Date: ${createdDate}`, { align: "center" });

      doc.moveDown(2);

      /* ---------------- INTRO ---------------- */

      doc
        .fontSize(12)
        .text(
          `This Contract Farming Agreement ("Agreement") is entered into on ${createdDate}, between:`
        );

      doc.moveDown();

      doc.font("Times-Bold").text("Buyer (First Party)");
      doc.font("Times-Roman").text(buyerName);

      doc.moveDown();

      doc.font("Times-Bold").text("Farmer (Second Party)");
      doc.font("Times-Roman").text(farmerName);

      doc.moveDown(2);

      /* ---------------- SECTION 1 ---------------- */

      doc.font("Times-Bold").text("1. Crop & Price Specifications");
      doc.moveDown(0.5);
      doc.font("Times-Roman").text(`• Crop: ${commodity}`);
      doc.text(`• Quantity: ${quantity}`);
      doc.text(`• Agreed Price: ₹${price} per unit`);

      doc.moveDown();

      /* ---------------- SECTION 2 ---------------- */

      doc.font("Times-Bold").text("2. Delivery Terms");
      doc.moveDown(0.5);
      doc.font("Times-Roman").text(`• Delivery Location: ${location}`);
      doc.text(`• Delivery Deadline: ${deliveryDate}`);

      doc.moveDown();

      /* ---------------- SECTION 3 ---------------- */

      doc.font("Times-Bold").text("3. Payment Terms");
      doc.moveDown(0.5);
      doc.font("Times-Roman").text(
        "• Payment shall be made via the agreed escrow mechanism on the platform."
      );
      doc.text(
        "• Full payment will be released to the Farmer upon successful delivery and quality verification."
      );

      doc.moveDown();

      /* ---------------- SECTION 4 ---------------- */

      doc.font("Times-Bold").text("4. Quality & Rejection");
      doc.moveDown(0.5);
      doc.font("Times-Roman").text(
        "• The Buyer reserves the right to reject produce that does not meet the agreed quality standards."
      );
      doc.text(
        "• Any disputes related to quality shall be resolved through mutual discussion or arbitration."
      );

      doc.moveDown();

      /* ---------------- SECTION 5 ---------------- */

      doc.font("Times-Bold").text("5. Force Majeure");
      doc.moveDown(0.5);
      doc.font("Times-Roman").text(
        "Neither party shall be liable for failure to perform obligations due to natural calamities, government actions, or other events beyond reasonable control."
      );

      doc.moveDown();

      /* ---------------- SECTION 6 ---------------- */

      doc.font("Times-Bold").text("6. Governing Law");
      doc.moveDown(0.5);
      doc.font("Times-Roman").text(
        "This Agreement shall be governed by and interpreted in accordance with the laws applicable in India."
      );

      doc.moveDown(2);

      /* ---------------- SIGNATURES ---------------- */

      doc.font("Times-Bold").text("IN WITNESS WHEREOF,", { align: "left" });
      doc.font("Times-Roman").text(
        "the parties have digitally signed this Agreement on the Agriassure platform."
      );

      doc.moveDown(2);

      doc.font("Times-Bold").text("Buyer Signature");

const buyerSignPath = contract.signatures?.buyerSignatureUrl
  ? path.join(__dirname, "..", contract.signatures.buyerSignatureUrl)
  : null;

if (buyerSignPath && fs.existsSync(buyerSignPath)) {
  doc.image(buyerSignPath, { width: 120 });
}

doc.font("Times-Roman").text(
  `Name: ${contract.signatures?.buyerName || "N/A"}`
);
doc.moveDown();

/* ---------------- FARMER SIGNATURE ---------------- */

doc.font("Times-Bold").text("Farmer Signature");

const farmerSignPath = contract.signatures?.farmerSignatureUrl
  ? path.join(__dirname, "..", contract.signatures.farmerSignatureUrl)
  : null;

if (farmerSignPath && fs.existsSync(farmerSignPath)) {
  doc.image(farmerSignPath, { width: 120 });
}

doc.font("Times-Roman").text(
  `Name: ${contract.signatures?.farmerName || "Pending"}`
);

      
      // if (contract.buyerSignature?.image && fs.existsSync(contract.buyerSignature.image)) {
      //   doc.image(contract.buyerSignature.image, { width: 120 });
      // }
      // doc.text(`Name: ${buyerName}`);
      // doc.moveDown();

      // doc.font("Times-Bold").text("Farmer Signature");
      // if (contract.farmerSignature?.image && fs.existsSync(contract.farmerSignature.image)) {
      //   doc.image(contract.farmerSignature.image, { width: 120 });
      // }
      // doc.text(`Name: ${farmerName}`);

      doc.moveDown(2);

      doc
        .fontSize(9)
        .fillColor("gray")
        .text(
          "This document is digitally generated and valid without physical signature.",
          { align: "center" }
        );

      doc.end();

      stream.on("finish", () => resolve(filePath));
    } catch (err) {
      reject(err);
    }
  });
};
