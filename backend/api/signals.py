from django.db.models.signals import Signal
from django.dispatch import receiver
from .authorization import *
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes

create_intern = Signal()
notification_email = Signal()

@receiver(create_intern)
def set_password_email(sender, user, **kwargs) :
    uid = urlsafe_base64_encode(force_bytes(user.id))
    token_generator = CustomToken()
    token = token_generator.make_token(user)

    subject = 'MEG - Set new Password'
    message = 'Click the link below to set your password.\n\n'
    message += f'http://localhost:3000/set-password/{uid}/{token}'
    send_mail(
        subject=subject,
        message=message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
    )

@receiver(notification_email)
def send_notification_email(sender, user, **kwargs):
    subject = 'MEG - Password Set Successfully'
    message = f'Hello {user.name},\n\nWelcome to our website! We are excited to have you on board.\n\nBest regards,\nTeam MEG'
    send_mail(
        subject=subject,
        message=message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email]
    )