<?php
ini_set('display_errors', 0);
error_reporting(0);
/**
 * mailing.php - Korrigierte Version für marcus-guehne.com
 */

// 1. CORS-Header (Behebt den "Status 0" Fehler im Browser)
header("Access-Control-Allow-Origin: https://marcus-guehne.com");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// 2. Behandle Preflight-Anfragen (Browser schickt erst OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === "OPTIONS") {
    http_response_code(200);
    exit;
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

// Konfiguration laden
// Pfad ggf. anpassen, falls die Datei woanders liegt
$smtp_config = require __DIR__ . '/../config_smtp.php';

$smtpHost     = $smtp_config['smtpHost'];     // w0210087.kasserver.com
$smtpUsername = $smtp_config['smtpUsername']; // m07c1c07
$smtpPassword = $smtp_config['smtpPassword']; 
$smtpPort     = $smtp_config['smtpPort'];     // 587

// Neue E-Mail-Adressen
$recipient_email = 'anfrage@marcus-guehne.com'; 
$from_email      = 'anfrage@marcus-guehne.com'; // Deine neue Absenderadresse

if ($_SERVER['REQUEST_METHOD'] === "POST") {

    $json = file_get_contents('php://input');
    $params = json_decode($json);

    // Validierung der Eingaben
    $name    = htmlspecialchars(trim($params->name ?? ''));
    $email   = filter_var(trim($params->email ?? ''), FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(trim($params->message ?? ''));

    if (empty($name) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($message)) {
        http_response_code(400); 
        echo json_encode(["status" => "error", "message" => "Ungültige Daten übertragen."]);
        exit;
    }

    try {
        $mail = new PHPMailer(true);

        // Servereinstellungen
        $mail->isSMTP();
        $mail->Host       = $smtpHost;
        $mail->SMTPAuth   = true;
        $mail->SMTPDebug = 0;
        $mail->Username   = $smtpUsername; 
        $mail->Password   = $smtpPassword;
        $mail->SMTPSecure = 'tls'; 
        $mail->Port       = $smtpPort;
        $mail->SMTPOptions = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);
        $mail->CharSet    = 'UTF-8';

        // Absender & Empfänger
        // Wichtig: setFrom muss eine Adresse deiner Domain sein
        $mail->setFrom($from_email, 'Kontaktformular Portfolio');
        $mail->addAddress($recipient_email);
        $mail->addReplyTo($email, $name); // Damit du direkt auf die Mail des Users antworten kannst

        // Inhalt
        $mail->isHTML(true);
        $mail->Subject = "Neue Anfrage von " . $name;
        
        $mail->Body = "
            <html>
            <body style='font-family: Arial, sans-serif;'>
                <h2 style='color: #333;'>Neue Kontaktanfrage</h2>
                <p><strong>Name:</strong> {$name}</p>
                <p><strong>E-Mail:</strong> <a href='mailto:{$email}'>{$email}</a></p>
                <hr style='border: 0; border-top: 1px solid #eee;'>
                <p><strong>Nachricht:</strong></p>
                <p style='white-space: pre-wrap;'>" . nl2br($message) . "</p>
            </body>
            </html>
        ";
        $mail->AltBody = "Name: {$name}\nE-Mail: {$email}\n\nNachricht:\n{$message}";

        $mail->send();

        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Nachricht wurde gesendet."]);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            "status" => "error", 
            "message" => "Mail konnte nicht gesendet werden.",
            "debug" => $mail->ErrorInfo
        ]);
    }
    
    exit;
}

// Falls jemand die Datei direkt im Browser aufruft
http_response_code(405);
echo json_encode(["status" => "error", "message" => "Nur POST-Anfragen erlaubt."]);
exit;
?>