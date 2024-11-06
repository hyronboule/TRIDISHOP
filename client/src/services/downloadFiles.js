import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import axios from 'axios';
import jsPDF from 'jspdf';

export const downloadFiles = async (files, name, total) => {
    const zip = new JSZip();

    await Promise.all(files.map(async (file, i) => {
        try {
            const response = await axios.get(file.file.fileUrl, { responseType: 'blob' });
            if (response.status !== 200) {
                throw new Error(`Failed to fetch file: ${file.file.fileUrl}`);
            }
            zip.file(`fichier3D${i}.glb`, response.data);   //name to file 3D
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    }));

    const receiptBlob = await generateReceipt(name, total, files);
    zip.file('reçu.pdf', receiptBlob);

    // generate Zip
    try {
        const content = await zip.generateAsync({ type: 'blob' });
        saveAs(content, 'fichier3D.zip');
    } catch (err) {
        console.error('Error generating ZIP:', err);
    }
}

const generateReceipt = async (buyerName, total, products) => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Récapitulatif de l'achat effectué", 14, 20);

    // Information of buyer
    doc.setFontSize(13);
    doc.text("Nom du client : " + buyerName, 14, 30);

    // list of products
    doc.text('Produits achetés: ', 14, 70);
    let y = 80;

    products.forEach((product) => {
        let nameProduct = product.nameFile;
        let priceProduct = product.price;

        doc.text(`Code produit : ${nameProduct} - ${priceProduct} euros`, 14, y);
        y += 10;
    });


    doc.setFontSize(14);
    doc.text(`Montant total : ${total} euros`, 14, y + 10);

    return await doc.output('blob');
};