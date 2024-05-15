<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    // $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Validation des données (exemple simple)
    if (empty($name) || empty($email)/*  || empty($subject) */ || empty($message)) {
        echo "Tous les champs sont obligatoires.";
    } else {
        // Envoi de l'e-mail
        $to = "jocooper2018@gmail.com"; // Remplacez par votre adresse e-mail
        $headers = "From: $name <$email>";
        if (mail($to, $subject, $message, $headers)) {
            echo "Votre message a été envoyé avec succès.";
        } else {
            echo "Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer.";
        }
    }
}
?>