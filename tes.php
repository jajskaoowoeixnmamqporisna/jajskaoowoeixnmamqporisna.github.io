<!DOCTYPE html>
<html>
<head>
    <title>Form Data ke Google Sheets</title>
</head>
<body>
    <h1>Masukkan Data</h1>
    <form action="" method="POST">
        <label for="name">Nama:</label><br>
        <input type="text" id="name" name="name" required><br><br>
        <label for="email">Email:</label><br>
        <input type="email" id="email" name="email" required><br><br>
        <input type="submit" name="submit" value="Kirim">
    </form>

    <?php
    // Cek jika form disubmit
    if (isset($_POST['submit'])) {
        // URL dari Google Apps Script
        $url = 'https://script.google.com/macros/s/AKfycbwnZwJyaiXid91iGgI9dwX6S2SUPcibctinKluwDuUTpEHSz1EFGd_YcV9L_YIo4Ovg/exec';

        // Data yang akan dikirimkan dalam format JSON
        $data = array(
            'name' => $_POST['name'],
            'email' => $_POST['email']
        );

        $options = array(
            'http' => array(
                'header'  => "Content-type: application/json\r\n",
                'method'  => 'POST',
                'content' => json_encode($data),
            ),
        );

        $context  = stream_context_create($options);
        $response = file_get_contents($url, false, $context);

        if ($response === false) {
            // Gagal mengirim permintaan
            echo '<p>Gagal mengirim data. Silakan coba lagi.</p>';
        } else {
            // Berhasil mengirim permintaan
            echo '<p>Data berhasil dikirim ke Google Sheets.</p>';
        }
    }
    ?>
</body>
</html>
