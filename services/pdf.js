const fs = require('fs');
const path = require('path');
const PdfPrinter = require('pdfmake');
const vfsFonts = require('pdfmake/build/vfs_fonts');
const moment = require('moment');
const jsonFile = require('../images/images.json');

const vfs = vfsFonts;

const generatePDF = async (info) => {
    try {
        const fonts = {
            Roboto: {
                normal: Buffer.from(vfs['Roboto-Regular.ttf'], 'base64'),
                bold: Buffer.from(vfs['Roboto-Medium.ttf'], 'base64'),
                italics: Buffer.from(vfs['Roboto-Italic.ttf'], 'base64'),
                bolditalics: Buffer.from(vfs['Roboto-MediumItalic.ttf'], 'base64'),
            },
            MonotypeCorsiva: {
                normal: fs.readFileSync(path.join(__dirname, '../fonts/Monotype-Corsiva-Regular.ttf')),
                bold: fs.readFileSync(path.join(__dirname, '../fonts/Monotype-Corsiva-Bold.ttf')),
                italics: fs.readFileSync(path.join(__dirname, '../fonts/Monotype-Corsiva-Regular-Italic.ttf')),
                bolditalics: fs.readFileSync(path.join(__dirname, '../fonts/Monotype-Corsiva-Bold-Italic.ttf')),
            }
        };

        const printer = new PdfPrinter(fonts);

        const docDefinition = {
            pageMargins: [0, 0, 0, 0],
            content: [
                {
                    canvas: [
                        {
                            type: 'rect',
                            x: 10,
                            y: 10,
                            w: 560,
                            h: 525,
                            r:5,
                            lineColor: '#008dc3',
                            lineWidth: 10
                        }
                    ],
                    absolutePosition: { x: 10, y: 10 }
                },
                {
                    stack: [
                        {
                            columns: [
                                {
                                    stack: [
                                        { text: `Register-Id:- ${info?.registerId}`, style: 'info', marginTop: 15 },
                                        { text: `E-Mail: ${info?.email}`, style: 'info' },
                                        { text: `Phone No.: ${info?.phone}`, style: 'info' }
                                    ]
                                },
                                {
                                    image: jsonFile?.logo,
                                    width: 80
                                },
                                {
                                    stack: [
                                        { text: `${info?.address}`, style: 'info', marginTop: 15 },
                                        { text: `${info?.city} (${info?.zip})`, style: 'info' },
                                        { text: `(${info?.state}) ${info?.country}`, style: 'info' }
                                    ],
                                    alignment: 'right'
                                }
                            ],
                            margin: [40, 40, 40, 20]
                        },

                        { text: 'Certificate of Half Marathon', style: 'header' },
                        { text: 'This Certificate Presented to', style: 'subheader' },
                        { text: `${info?.name}`, style: 'name' },

                        {
                            text: `The certificate of achievement is awarded to individuals who have\ndemonstrated outstanding performance in their field. Here’s an example text\n for a certificate`,
                            style: 'body'
                        },

                        {
                            columns: [
                                {
                                    stack: [
                                        { text: `Date of Birth:- ${info?.dob}`, style: 'info' }
                                    ],
                                    width: '36%'
                                },
                                {
                                    stack: [
                                        { text: `Gender:- ${info?.gender}`, style: 'info' }
                                    ],
                                    alignment: 'center',
                                    width: '33.33%'
                                },
                                {
                                    stack: [
                                        { text: `Blood Group: ${info?.bloodGroup}`, style: 'info' }
                                    ],
                                    alignment: 'right',
                                    width: '33.33%'
                                }
                            ],
                            margin: [40, 30, 40, 20]
                        },

                        {
                            columns: [
                                {
                                    stack: [
                                        { text: moment().format('DD-MM-YYYY hh:mm:ss'), fontSize: 10, margin: [0, 25, 0, 1], alignment: 'center' },
                                        { text: '--------------------------------------------', fontSize: 10, margin: [0, 0, 0, 1] },
                                        { text: 'DATE - TIME', alignment: 'center', fontSize: 10, bold: true }
                                    ],
                                },
                                {
                                    image: jsonFile?.certificateStampLogo,
                                    width: 80,
                                    margin: [0, 10, 0, 10],
                                },
                                {
                                    stack: [
                                        { text: '--------------------------------------------', fontSize: 10, margin: [0, 35, 0, 1] },
                                        { text: 'Signature', alignment: 'center', fontSize: 10, bold: true }
                                    ],
                                    alignment: 'right'
                                }
                            ],
                            columnGap: 80,
                            margin: [40, 20, 40, 0]
                        }
                    ]
                },

            ],
            styles: {
                info: { fontSize: 10, margin: [0, 2, 0, 2] },
                header: { fontSize: 35, font: "MonotypeCorsiva", color: "#008dc3", bold: true, alignment: 'center', margin: [0, 15, 0, 10] },
                subheader: { fontSize: 20, font: "MonotypeCorsiva", alignment: 'center', margin: [0, 5, 0, 0], italics: true },
                name: { fontSize: 25, font: "MonotypeCorsiva", bold: true, color: '#a4794a', alignment: 'center', margin: [0, 0, 0, 10], italics: true },
                body: { fontSize: 12, alignment: 'center', margin: [20, 7, 20, 10] }
            }
        };

        const pdfDoc = printer.createPdfKitDocument(docDefinition);
        const outputPath = path.join(__dirname, '../pdf', `${info?.name}-Certificate.pdf`);
        pdfDoc.pipe(fs.createWriteStream(outputPath));
        pdfDoc.end();

        return { success: true }

    } catch (error) {
        console.error(error);
        return { success: false, message: "PDF generation failed" }
    }
};

module.exports = { generatePDF };
