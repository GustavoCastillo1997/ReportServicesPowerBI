import azure.functions as func
import pandas as pd
from config_loader import init_config
from services.email_service import send_email
from datetime import datetime
from shared import *


def main(req: func.HttpRequest) -> func.HttpResponse:

    init_config()
    data, status = extract_json_data(req)

    if status != 200:
        print('Falha na geracao do relatorio! JSON Inválido')
        return func.HttpResponse("Erro no JSON", status_code=400)

    try:
        df = pd.DataFrame([data])

        df['Media Leite por Animal'] = df['Media Leite por Animal'].round(2)
        df['Ultimo Cadastro'] = pd.to_datetime(df['Ultimo Cadastro'])
        df['Ultimo Cadastro'] = df['Ultimo Cadastro'].dt.strftime('%d/%m/%Y')

        timestamp = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
        df_in_bytes = df_to_bytes_excel(df)
        download_link = upload_blob(df_in_bytes, f'bi_castrolanda_produtor/relatorio1_{timestamp}.xlsx')
        print(download_link)
        print('Link SAS gerado com sucesso!')

        email_body = f"""
                <html>
                    <body>
                        <p>Olá!</p>
                        <p>Clique no link abaixo para realizar o seu download:</p>
                        <p><a href="{download_link}">Download Relatório</a></p>
                        <p>Att,<br>APCBRH</p>
                    </body>
                </html>
                """
        send_email('gustavo@apcbrh.com.br', 'B.I Castrolanda - Relatório', email_body,is_html=True)

        print('Relatório gerado e email enviado com sucesso!')
        return func.HttpResponse("Sucesso", status_code=200)

    except Exception as e:
        print(f'Erro no processamento do relatório: {e}')
        return func.HttpResponse("Erro interno no servidor", status_code=500)
