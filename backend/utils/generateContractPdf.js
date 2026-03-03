
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

//       /* ---------------- SAFE EXTRACTION ---------------- */

//       const buyerName = contract.buyerSignature?.name || contract.buyerName || "N/A";
//       const farmerName = contract.farmerSignature?.name || contract.farmerName || "N/A";

//       const commodity = contract.cropDetails?.name || contract.commodity || "N/A";
//       const quantity = contract.cropDetails?.quantity || contract.quantity || "N/A";
//       const price = contract.cropDetails?.pricePerQuintal || contract.offerPrice || "N/A";
//       const location = contract.delivery?.location || contract.location || "N/A";
//       const deliveryDate = contract.delivery?.deadline || contract.pickupDate || "N/A";

//       const createdDate = contract.createdAt
//         ? new Date(contract.createdAt).toDateString()
//         : new Date().toDateString();

//       /* ---------------- TITLE ---------------- */

//       doc
//         .fontSize(18)
//         .font("Times-Bold")
//         .text("CONTRACT FARMING AGREEMENT", { align: "center" });

//       doc.moveDown(1.5);

//       doc
//         .fontSize(10)
//         .font("Times-Roman")
//         .text(`Agreement ID: ${contract._id}`, { align: "center" })
//         .text(`Date: ${createdDate}`, { align: "center" });

//       doc.moveDown(2);

//       /* ---------------- INTRO ---------------- */

//       doc
//         .fontSize(12)
//         .text(
//           `This Contract Farming Agreement ("Agreement") is entered into on ${createdDate}, between:`
//         );

//       doc.moveDown();

//       doc.font("Times-Bold").text("Buyer (First Party)");
//       doc.font("Times-Roman").text(buyerName);

//       doc.moveDown();

//       doc.font("Times-Bold").text("Farmer (Second Party)");
//       doc.font("Times-Roman").text(farmerName);

//       doc.moveDown(2);

//       /* ---------------- SECTION 1 ---------------- */

//       doc.font("Times-Bold").text("1. Crop & Price Specifications");
//       doc.moveDown(0.5);
//       doc.font("Times-Roman").text(`• Crop: ${commodity}`);
//       doc.text(`• Quantity: ${quantity}`);
//       doc.text(`• Agreed Price: ₹${price} per unit`);

//       doc.moveDown();

//       /* ---------------- SECTION 2 ---------------- */

//       doc.font("Times-Bold").text("2. Delivery Terms");
//       doc.moveDown(0.5);
//       doc.font("Times-Roman").text(`• Delivery Location: ${location}`);
//       doc.text(`• Delivery Deadline: ${deliveryDate}`);

//       doc.moveDown();

//       /* ---------------- SECTION 3 ---------------- */

//       doc.font("Times-Bold").text("3. Payment Terms");
//       doc.moveDown(0.5);
//       doc.font("Times-Roman").text(
//         "• Payment shall be made via the agreed escrow mechanism on the platform."
//       );
//       doc.text(
//         "• Full payment will be released to the Farmer upon successful delivery and quality verification."
//       );

//       doc.moveDown();

//       /* ---------------- SECTION 4 ---------------- */

//       doc.font("Times-Bold").text("4. Quality & Rejection");
//       doc.moveDown(0.5);
//       doc.font("Times-Roman").text(
//         "• The Buyer reserves the right to reject produce that does not meet the agreed quality standards."
//       );
//       doc.text(
//         "• Any disputes related to quality shall be resolved through mutual discussion or arbitration."
//       );

//       doc.moveDown();

//       /* ---------------- SECTION 5 ---------------- */

//       doc.font("Times-Bold").text("5. Force Majeure");
//       doc.moveDown(0.5);
//       doc.font("Times-Roman").text(
//         "Neither party shall be liable for failure to perform obligations due to natural calamities, government actions, or other events beyond reasonable control."
//       );

//       doc.moveDown();

//       /* ---------------- SECTION 6 ---------------- */

//       doc.font("Times-Bold").text("6. Governing Law");
//       doc.moveDown(0.5);
//       doc.font("Times-Roman").text(
//         "This Agreement shall be governed by and interpreted in accordance with the laws applicable in India."
//       );

//       doc.moveDown(2);

//       /* ---------------- SIGNATURES ---------------- */

//       doc.font("Times-Bold").text("IN WITNESS WHEREOF,", { align: "left" });
//       doc.font("Times-Roman").text(
//         "the parties have digitally signed this Agreement on the Agriassure platform."
//       );

//       doc.moveDown(2);

//       doc.font("Times-Bold").text("Buyer Signature");

// const buyerSignPath = contract.signatures?.buyerSignatureUrl
//   ? path.join(__dirname, "..", contract.signatures.buyerSignatureUrl)
//   : null;

// if (buyerSignPath && fs.existsSync(buyerSignPath)) {
//   doc.image(buyerSignPath, { width: 120 });
// }

// doc.font("Times-Roman").text(
//   `Name: ${contract.signatures?.buyerName || "N/A"}`
// );
// doc.moveDown();

// /* ---------------- FARMER SIGNATURE ---------------- */

// doc.font("Times-Bold").text("Farmer Signature");

// const farmerSignPath = contract.signatures?.farmerSignatureUrl
//   ? path.join(__dirname, "..", contract.signatures.farmerSignatureUrl)
//   : null;

// if (farmerSignPath && fs.existsSync(farmerSignPath)) {
//   doc.image(farmerSignPath, { width: 120 });
// }

// doc.font("Times-Roman").text(
//   `Name: ${contract.signatures?.farmerName || "Pending"}`
// );

      
//       // if (contract.buyerSignature?.image && fs.existsSync(contract.buyerSignature.image)) {
//       //   doc.image(contract.buyerSignature.image, { width: 120 });
//       // }
//       // doc.text(`Name: ${buyerName}`);
//       // doc.moveDown();

//       // doc.font("Times-Bold").text("Farmer Signature");
//       // if (contract.farmerSignature?.image && fs.existsSync(contract.farmerSignature.image)) {
//       //   doc.image(contract.farmerSignature.image, { width: 120 });
//       // }
//       // doc.text(`Name: ${farmerName}`);

//       doc.moveDown(2);

//       doc
//         .fontSize(9)
//         .fillColor("gray")
//         .text(
//           "This document is digitally generated and valid without physical signature.",
//           { align: "center" }
//         );

//       doc.end();

//       stream.on("finish", () => resolve(filePath));
//     } catch (err) {
//       reject(err);
//     }
//   });
// };
//24/2
// const PDFDocument = require("pdfkit");
// const cloudinary = require("../config/Cloudinary");
// const streamifier = require("streamifier");

// module.exports = function generatePdf(contract) {
//   return new Promise((resolve, reject) => {
//     try {
//       const doc = new PDFDocument({ margin: 50 });

//       let buffers = [];
//       doc.on("data", buffers.push.bind(buffers));

//       doc.on("end", async () => {
//         const pdfBuffer = Buffer.concat(buffers);

//         try {
//           const uploadStream = cloudinary.uploader.upload_stream(
//             {
//               folder: "agriassure/contracts",
//               resource_type: "raw", // IMPORTANT for PDFs
//               public_id: `contract-${contract._id}`,
//             },
//             (error, result) => {
//               if (error) return reject(error);
//               resolve(result.secure_url);
//             }
//           );

//           streamifier.createReadStream(pdfBuffer).pipe(uploadStream);
//         } catch (err) {
//           reject(err);
//         }
//       });

//       /* ---------------- SAFE EXTRACTION ---------------- */

//       const buyerName =
//         contract.buyerSignature?.name || contract.buyerName || "N/A";
//       const farmerName =
//         contract.farmerSignature?.name || contract.farmerName || "N/A";

//       const commodity =
//         contract.cropDetails?.name || contract.commodity || "N/A";
//       const quantity =
//         contract.cropDetails?.quantity || contract.quantity || "N/A";
//       const price =
//         contract.cropDetails?.pricePerQuintal || contract.offerPrice || "N/A";
//       const location =
//         contract.delivery?.location || contract.location || "N/A";
//       const deliveryDate =
//         contract.delivery?.deadline || contract.pickupDate || "N/A";

//       const createdDate = contract.createdAt
//         ? new Date(contract.createdAt).toDateString()
//         : new Date().toDateString();

//       /* ---------------- TITLE ---------------- */

//       doc
//         .fontSize(18)
//         .font("Times-Bold")
//         .text("CONTRACT FARMING AGREEMENT", { align: "center" });

//       doc.moveDown(1.5);

//       doc
//         .fontSize(10)
//         .font("Times-Roman")
//         .text(`Agreement ID: ${contract._id}`, { align: "center" })
//         .text(`Date: ${createdDate}`, { align: "center" });

//       doc.moveDown(2);

//       /* ---------------- INTRO ---------------- */

//       doc
//         .fontSize(12)
//         .text(
//           `This Contract Farming Agreement ("Agreement") is entered into on ${createdDate}, between:`
//         );

//       doc.moveDown();

//       doc.font("Times-Bold").text("Buyer (First Party)");
//       doc.font("Times-Roman").text(buyerName);

//       doc.moveDown();

//       doc.font("Times-Bold").text("Farmer (Second Party)");
//       doc.font("Times-Roman").text(farmerName);

//       doc.moveDown(2);

//       /* ---------------- SECTION 1 ---------------- */

//       doc.font("Times-Bold").text("1. Crop & Price Specifications");
//       doc.moveDown(0.5);
//       doc.font("Times-Roman").text(`• Crop: ${commodity}`);
//       doc.text(`• Quantity: ${quantity}`);
//       doc.text(`• Agreed Price: ₹${price} per unit`);

//       doc.moveDown();

//       /* ---------------- SECTION 2 ---------------- */

//       doc.font("Times-Bold").text("2. Delivery Terms");
//       doc.moveDown(0.5);
//       doc.font("Times-Roman").text(`• Delivery Location: ${location}`);
//       doc.text(`• Delivery Deadline: ${deliveryDate}`);

//       doc.moveDown();

//       /* ---------------- SECTION 3 ---------------- */

//       doc.font("Times-Bold").text("3. Payment Terms");
//       doc.moveDown(0.5);
//       doc.font("Times-Roman").text(
//         "• Payment shall be made via the agreed escrow mechanism on the platform."
//       );
//       doc.text(
//         "• Full payment will be released to the Farmer upon successful delivery and quality verification."
//       );

//       doc.moveDown();

//       /* ---------------- SECTION 4 ---------------- */

//       doc.font("Times-Bold").text("4. Quality & Rejection");
//       doc.moveDown(0.5);
//       doc.font("Times-Roman").text(
//         "• The Buyer reserves the right to reject produce that does not meet the agreed quality standards."
//       );
//       doc.text(
//         "• Any disputes related to quality shall be resolved through mutual discussion or arbitration."
//       );

//       doc.moveDown();

//       /* ---------------- SECTION 5 ---------------- */

//       doc.font("Times-Bold").text("5. Force Majeure");
//       doc.moveDown(0.5);
//       doc.font("Times-Roman").text(
//         "Neither party shall be liable for failure to perform obligations due to natural calamities, government actions, or other events beyond reasonable control."
//       );

//       doc.moveDown();

//       /* ---------------- SECTION 6 ---------------- */

//       doc.font("Times-Bold").text("6. Governing Law");
//       doc.moveDown(0.5);
//       doc.font("Times-Roman").text(
//         "This Agreement shall be governed by and interpreted in accordance with the laws applicable in India."
//       );

//       doc.moveDown(2);

//       /* ---------------- SIGNATURES ---------------- */

//       doc.font("Times-Bold").text("IN WITNESS WHEREOF,", { align: "left" });
//       doc.font("Times-Roman").text(
//         "the parties have digitally signed this Agreement on the Agriassure platform."
//       );

//       doc.moveDown(2);

//       doc.font("Times-Bold").text("Buyer Signature");

//       if (contract.signatures?.buyerSignatureUrl) {
//         doc.image(contract.signatures.buyerSignatureUrl, { width: 120 });
//       }

//       doc.font("Times-Roman").text(
//         `Name: ${contract.signatures?.buyerName || "N/A"}`
//       );
//       doc.moveDown();

//       doc.font("Times-Bold").text("Farmer Signature");

//       if (contract.signatures?.farmerSignatureUrl) {
//         doc.image(contract.signatures.farmerSignatureUrl, { width: 120 });
//       }

//       doc.font("Times-Roman").text(
//         `Name: ${contract.signatures?.farmerName || "Pending"}`
//       );

//       doc.moveDown(2);

//       doc
//         .fontSize(9)
//         .fillColor("gray")
//         .text(
//           "This document is digitally generated and valid without physical signature.",
//           { align: "center" }
//         );

//       doc.end();
//     } catch (err) {
//       reject(err);
//     }
//   });
// };

// const PDFDocument = require("pdfkit");
// const cloudinary = require("../config/Cloudinary");
// const streamifier = require("streamifier");
// const axios = require("axios");

// module.exports = async function generatePdf(
//   contract,
//   { buyerSignatureBuffer = null, farmerSignatureBuffer = null } = {}
// ) {
//   // return new Promise((resolve, reject) => {
//     try {
//       const doc = new PDFDocument({ margin: 50 });

//       let buffers = [];
//       doc.on("data", buffers.push.bind(buffers));

//       doc.on("end", async () => {
//         try {
//           const pdfBuffer = Buffer.concat(buffers);

//           const uploadStream = cloudinary.uploader.upload_stream(
//             {
//               folder: "agriassure/contracts",
//               resource_type: "raw",
//               public_id: `contract-${contract._id}`,
//               overwrite: true,
//             },
//             (error, result) => {
//               if (error) return reject(error);
//               resolve(result.secure_url);
//             }
//           );

//           streamifier.createReadStream(pdfBuffer).pipe(uploadStream);
//         } catch (err) {
//           reject(err);
//         }
//       });

//       /* ---------------- SAFE EXTRACTION ---------------- */

//       const buyerName =
//         contract.signatures?.buyerName ||
//         contract.buyerSignature?.name ||
//         contract.buyerName ||
//         "N/A";

//       const farmerName =
//         contract.signatures?.farmerName ||
//         contract.farmerSignature?.name ||
//         contract.farmerName ||
//         "N/A";

//       const commodity =
//         contract.cropDetails?.name || contract.commodity || "N/A";

//       const quantity =
//         contract.cropDetails?.quantity || contract.quantity || "N/A";

//       const price =
//         contract.cropDetails?.pricePerQuintal ||
//         contract.offerPrice ||
//         "N/A";

//       const location =
//         contract.delivery?.location || contract.location || "N/A";

//       const deliveryDate =
//         contract.delivery?.deadline ||
//         contract.pickupDate ||
//         "N/A";

//       const createdDate = contract.createdAt
//         ? new Date(contract.createdAt).toDateString()
//         : new Date().toDateString();

//       /* ---------------- TITLE ---------------- */

//       doc
//         .fontSize(18)
//         .font("Times-Bold")
//         .text("CONTRACT FARMING AGREEMENT", { align: "center" });

//       doc.moveDown(1.5);

//       doc
//         .fontSize(10)
//         .font("Times-Roman")
//         .text(`Agreement ID: ${contract._id}`, { align: "center" })
//         .text(`Date: ${createdDate}`, { align: "center" });

//       doc.moveDown(2);

//       /* ---------------- INTRO ---------------- */

//       doc
//         .fontSize(12)
//         .text(
//           `This Contract Farming Agreement ("Agreement") is entered into on ${createdDate}, between:`
//         );

//       doc.moveDown();

//       doc.font("Times-Bold").text("Buyer (First Party)");
//       doc.font("Times-Roman").text(buyerName);

//       doc.moveDown();

//       doc.font("Times-Bold").text("Farmer (Second Party)");
//       doc.font("Times-Roman").text(farmerName);

//       doc.moveDown(2);

//       /* ---------------- SECTION 1 ---------------- */

//       doc.font("Times-Bold").text("1. Crop & Price Specifications");
//       doc.moveDown(0.5);
//       doc.font("Times-Roman").text(`• Crop: ${commodity}`);
//       doc.text(`• Quantity: ${quantity}`);
//       doc.text(`• Agreed Price: ₹${price} per unit`);

//       doc.moveDown();

//       /* ---------------- SECTION 2 ---------------- */

//       doc.font("Times-Bold").text("2. Delivery Terms");
//       doc.moveDown(0.5);
//       doc.font("Times-Roman").text(`• Delivery Location: ${location}`);
//       doc.text(`• Delivery Deadline: ${deliveryDate}`);

//       doc.moveDown();

//       /* ---------------- SECTION 3 ---------------- */

//       doc.font("Times-Bold").text("3. Payment Terms");
//       doc.moveDown(0.5);
//       doc.font("Times-Roman").text(
//         "• Payment shall be made via the agreed escrow mechanism on the platform."
//       );
//       doc.text(
//         "• Full payment will be released to the Farmer upon successful delivery and quality verification."
//       );

//       doc.moveDown();

//       /* ---------------- SECTION 4 ---------------- */

//       doc.font("Times-Bold").text("4. Quality & Rejection");
//       doc.moveDown(0.5);
//       doc.font("Times-Roman").text(
//         "• The Buyer reserves the right to reject produce that does not meet the agreed quality standards."
//       );
//       doc.text(
//         "• Any disputes related to quality shall be resolved through mutual discussion or arbitration."
//       );

//       doc.moveDown();

//       /* ---------------- SECTION 5 ---------------- */

//       doc.font("Times-Bold").text("5. Force Majeure");
//       doc.moveDown(0.5);
//       doc.font("Times-Roman").text(
//         "Neither party shall be liable for failure to perform obligations due to natural calamities, government actions, or other events beyond reasonable control."
//       );

//       doc.moveDown();

//       /* ---------------- SECTION 6 ---------------- */

//       doc.font("Times-Bold").text("6. Governing Law");
//       doc.moveDown(0.5);
//       doc.font("Times-Roman").text(
//         "This Agreement shall be governed by and interpreted in accordance with the laws applicable in India."
//       );

//       doc.moveDown(2);

//       /* ---------------- SIGNATURES ---------------- */

//       doc.font("Times-Bold").text("IN WITNESS WHEREOF,", { align: "left" });
//       doc.font("Times-Roman").text(
//         "the parties have digitally signed this Agreement on the Agriassure platform."
//       );

//       doc.moveDown(2);

//       // BUYER SIGNATURE
//       doc.font("Times-Bold").text("Buyer Signature");

//       // if (buyerSignatureBuffer) {
//       //   doc.image(buyerSignatureBuffer, { width: 120 });
//       // }
//       if (contract.signatures?.buyerSignatureUrl) {
//   try {
//     const response = await axios.get(
//       contract.signatures.buyerSignatureUrl,
//       { responseType: "arraybuffer" }
//     );
//     const imageBuffer = Buffer.from(response.data, "binary");
//     doc.image(imageBuffer, { width: 120 });
//   } catch (err) {
//     console.error("Buyer sign image error:", err.message);
//   }
// }

// doc.font("Times-Roman").text(
//   `Name: ${contract.signatures?.buyerName || "N/A"}`
// );

// doc.moveDown();

//       doc.font("Times-Roman").text(`Name: ${buyerName}`);
//       doc.moveDown();

//       // FARMER SIGNATURE
//       doc.font("Times-Bold").text("Farmer Signature");

//       // if (farmerSignatureBuffer) {
//       //   doc.image(farmerSignatureBuffer, { width: 120 });
//       // }
//       if (contract.signatures?.farmerSignatureUrl) {
//   try {
//     const response = await axios.get(
//       contract.signatures.farmerSignatureUrl,
//       { responseType: "arraybuffer" }
//     );
//     const imageBuffer = Buffer.from(response.data, "binary");
//     doc.image(imageBuffer, { width: 120 });
//   } catch (err) {
//     console.error("Farmer sign image error:", err.message);
//   }

//       doc.font("Times-Roman").text(`Name: ${farmerName}`);

//       doc.moveDown(2);

//       doc
//         .fontSize(9)
//         .fillColor("gray")
//         .text(
//           "This document is digitally generated and valid without physical signature.",
//           { align: "center" }
//         );

//       doc.end();
//     } catch (err) {
//       reject(err);
//     }
//   }
// };
const PDFDocument = require("pdfkit");
const cloudinary = require("../config/Cloudinary");
const streamifier = require("streamifier");
const axios = require("axios");

module.exports = async function generatePdf(contract) {
  try {
    const doc = new PDFDocument({ margin: 50 });

    let buffers = [];
    doc.on("data", (data) => buffers.push(data));

    /* ---------------- SAFE EXTRACTION ---------------- */

    const buyerName =
      contract.signatures?.buyerName ||
      contract.buyerName ||
      "N/A";

    const farmerName =
      contract.signatures?.farmerName ||
      contract.farmerName ||
      "N/A";

    const commodity =
      contract.cropDetails?.name || contract.commodity || "N/A";

    const quantity =
      contract.cropDetails?.quantity || contract.quantity || "N/A";

    const price =
      contract.cropDetails?.pricePerQuintal ||
      contract.offerPrice ||
      "N/A";

    const location =
      contract.delivery?.location || contract.deliveryAddress || "N/A";

    const deliveryDate =
      contract.delivery?.deadline ||
      contract.pickupDate ||
      "N/A";

    const createdDate = contract.createdAt
      ? new Date(contract.createdAt).toDateString()
      : new Date().toDateString();

    /* ---------------- DOWNLOAD SIGNATURES FIRST ---------------- */

    let buyerImageBuffer = null;
    let farmerImageBuffer = null;

    if (contract.signatures?.buyerSignatureUrl) {
      try {
        const response = await axios.get(
          contract.signatures.buyerSignatureUrl,
          { responseType: "arraybuffer" }
        );
        buyerImageBuffer = Buffer.from(response.data);
      } catch (err) {
        console.error("Buyer sign image error:", err.message);
      }
    }

    if (contract.signatures?.farmerSignatureUrl) {
      try {
        const response = await axios.get(
          contract.signatures.farmerSignatureUrl,
          { responseType: "arraybuffer" }
        );
        farmerImageBuffer = Buffer.from(response.data);
      } catch (err) {
        console.error("Farmer sign image error:", err.message);
      }
    }

    /* ---------------- TITLE ---------------- */

    doc.fontSize(18)
      .font("Times-Bold")
      .text("CONTRACT FARMING AGREEMENT", { align: "center" });

    doc.moveDown(1.5);

    doc.fontSize(10)
      .font("Times-Roman")
      .text(`Agreement ID: ${contract._id}`, { align: "center" })
      .text(`Date: ${createdDate}`, { align: "center" });

    doc.moveDown(2);

    /* ---------------- INTRO ---------------- */

    doc.fontSize(12)
      .text(
        `This Contract Farming Agreement is entered into on ${createdDate}, between:`
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

    /* ---------------- SIGNATURES ---------------- */

    doc.moveDown(2);

    doc.font("Times-Bold").text("IN WITNESS WHEREOF,", { align: "left" });
    doc.font("Times-Roman").text(
      "the parties have digitally signed this Agreement on the Agriassure platform."
    );

    doc.moveDown(2);

    // BUYER SIGNATURE
    doc.font("Times-Bold").text("Buyer Signature");

    if (buyerImageBuffer) {
      doc.image(buyerImageBuffer, { width: 120 });
    }

    doc.font("Times-Roman").text(`Name: ${buyerName}`);
    doc.moveDown();

    // FARMER SIGNATURE
    doc.font("Times-Bold").text("Farmer Signature");

    if (farmerImageBuffer) {
      doc.image(farmerImageBuffer, { width: 120 });
    }

    doc.font("Times-Roman").text(`Name: ${farmerName}`);

    doc.moveDown(2);

    doc.fontSize(9)
      .fillColor("gray")
      .text(
        "This document is digitally generated and valid without physical signature.",
        { align: "center" }
      );

    doc.end();

    /* ---------------- WAIT FOR PDF BUFFER ---------------- */

    const pdfBuffer = await new Promise((resolve, reject) => {
      doc.on("end", () => resolve(Buffer.concat(buffers)));
      doc.on("error", reject);
    });

    /* ---------------- UPLOAD TO CLOUDINARY ---------------- */

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "agriassure/contracts",
          resource_type: "auto",
          public_id: `contract-${contract._id}`,
          format: "pdf",
          overwrite: true,
          type: "upload",   
          access_mode: "public",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      streamifier.createReadStream(pdfBuffer).pipe(uploadStream);
    });

    return uploadResult.secure_url;

  } catch (error) {
    console.error("PDF generation error:", error);
    throw error;
  }
};