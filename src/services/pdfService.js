const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

exports.generatePdf = (user) => {
  return new Promise((resolve, reject) => {
    const pdfDir = path.join(__dirname, '../../pdfs');
    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir);
    }

    const pdfPath = path.join(pdfDir, `user_${user.id}.pdf`);
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pdfPath));

    doc.fontSize(25).text('User Information', { align: 'center' });
    doc.text(`Name: ${user.firstName} ${user.lastName}`, { align: 'left' });
    doc.text(`Phone Number: ${user.phoneNumber}`, { align: 'left' });
    doc.text(`Email: ${user.email}`, { align: 'left' });

    doc.end();
    doc.on('finish', () => {
      resolve(pdfPath);
    });
    doc.on('error', (err) => {
      reject(err);
    });
  });
};
