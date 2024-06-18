const fs = require('fs-extra');
const path = require('path');

// Path ke file TSV
const tsvFilePath = path.join(__dirname, '../../tes.tsv');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).send('Method Not Allowed');
        return;
    }

    const { text } = req.body;

    if (!text) {
        res.status(400).send('Teks tidak boleh kosong.');
        return;
    }

    try {
        // Baca konten TSV yang sudah ada
        const data = await fs.readFile(tsvFilePath, 'utf-8');
        // Tambahkan teks baru ke konten TSV
        const updatedContent = data.trim() + '\n' + text;
        // Tulis kembali ke file TSV
        await fs.writeFile(tsvFilePath, updatedContent);
        console.log('Berhasil menambahkan teks ke TSV.');
        res.status(200).send('Teks berhasil ditambahkan ke TSV.');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Gagal menambahkan teks ke TSV.');
    }
};
