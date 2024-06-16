<?php
// Pastikan kode PHP dimulai sebelum tag HTML
// Di sini Anda dapat menulis logika PHP yang diperlukan sebelum menampilkan HTML

// Contoh, set data default jika belum ada data POST
$name = isset($_POST['name']) ? $_POST['name'] : '';
$email = isset($_POST['email']) ? $_POST['email'] : '';

// Jika form disubmit, lakukan sesuatu dengan data POST
if (isset($_POST['submit'])) {
    // Misalnya, simpan data ke Google Sheets menggunakan Google Apps Script
    $url = 'https://script.google.com/macros/s/AKfycbwnZwJyaiXid91iGgI9dwX6S2SUPcibctinKluwDuUTpEHSz1EFGd_YcV9L_YIo4Ovg/exec';
    
    // Data yang akan dikirimkan dalam format JSON
    $data = array(
        'name' => $name,
        'email' => $email
    );
    
    // Pengaturan untuk permintaan POST
    $options = array(
        'http' => array(
            'header'  => "Content-type: application/json\r\n",
            'method'  => 'POST',
            'content' => json_encode($data),
        ),
    );
    
    // Buat konteks stream untuk permintaan POST
    $context  = stream_context_create($options);
    
    // Kirim permintaan POST ke URL Google Apps Script
    $response = file_get_contents($url, false, $context);
    
    // Tampilkan pesan berdasarkan respons
    if ($response === false) {
        $message = '<p>Gagal mengirim data. Silakan coba lagi.</p>';
    } else {
        $message = '<p>Data berhasil dikirim ke Google Sheets.</p>';
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Form Data ke Google Sheets</title>
</head>
<body>
    <h1>Masukkan Data</h1>
    
    <!-- Form HTML dengan aksi ke halaman sendiri (tes.php) -->
    <form action="" method="POST">
        <label for="name">Nama:</label><br>
        <input type="text" id="name" name="name" value="<?php echo htmlspecialchars($name); ?>" required><br><br>
        
        <label for="email">Email:</label><br>
        <input type="email" id="email" name="email" value="<?php echo htmlspecialchars($email); ?>" required><br><br>
        
        <input type="submit" name="submit" value="Kirim">
    </form>

    <!-- Tampilkan pesan hasil pengiriman -->
    <?php echo isset($message) ? $message : ''; ?>
</body>
</html>
