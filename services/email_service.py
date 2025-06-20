import smtplib
from config_loader import get_smtp_config
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formataddr


def set_email_body(link: str) -> str:
    return f"""
        <html>
            <body>
                <p>Olá!</p>
                <p>Clique no link abaixo para realizar o seu download:</p>
                <p><a href="{link}">Download Relatório</a></p>
                <p>Att,<br>APCBRH</p>
            </body>
        </html>
    """

def send_email(recipient: str, subject: str, email_body: str, is_html: bool = False) -> None:

    config = get_smtp_config()

    smtp_user = config['smtp_user']
    smtp_pass = config['smtp_pass']
    smtp_host = config['smtp_host']
    smtp_port = config['smtp_port']
    smtp_name = config['smtp_name']

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = formataddr((smtp_name, smtp_user))
    msg["To"] = recipient

    if is_html:
        part = MIMEText(email_body, "html", "utf-8")
    else:
        part = MIMEText(email_body, "plain", "utf-8")

    msg.attach(part)

    try:
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.send_message(msg)
            print(f"E-mail enviado para {recipient}")

    except smtplib.SMTPException as e:
        print(f"[ERRO SMTP] Falha ao enviar e-mail: {e}")
        raise
