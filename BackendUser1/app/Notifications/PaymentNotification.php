<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PaymentNotification extends Notification
{
    use Queueable;

    private $payment_id;
    private $id_flouci;

    public function __construct($payment_id, $id_flouci)
    {
        $this->payment_id = $payment_id;
        $this->id_flouci = $id_flouci;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->line('Un paiement a été effectué avec succès.')
                    ->action('Voir le paiement', url('http://127.0.0.1:3000/success?payment_id='.$this->payment_id))
                    ->line('Merci d\'utiliser notre application!');
    }
}
