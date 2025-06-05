
const { generatePDF } = require('../services/pdf')

const generateCertificate = async (req, res) => {
    try {
        const { name, email } = req.body
        if (!name || !email) {
            return res.status(400).json({ success: false, message: 'Name and Email is Required' });
        }
        const generatedDetails = await generatePDF(req.body);
        if (!generatedDetails.success) {
            return res.status(500).json({ success: false, message: 'PDF generation failed' });
        }
        return res.status(200).json({ success: true, message: 'PDF generated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error?.message || 'Something went wrong' })
    }
}

module.exports = { generateCertificate }