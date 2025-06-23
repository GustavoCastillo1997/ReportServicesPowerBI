import azure.functions as func
import pandas as pd
import logging
from services.email_service import set_email_body, send_email
from datetime import datetime
from shared import *

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('bi_castrolanda_single iniciado')
    try:
        data, error_response = init_and_extract(req)
        if error_response:
            return error_response

        filtered_data = data.get("filteredData")
        if not filtered_data or not isinstance(filtered_data, list):
            logging.error("Dados de entrada inválidos ou vazios.")
            return func.HttpResponse(
                "Dados de entrada inválidos ou ausentes.",
                status_code=400
            )

        df = pd.DataFrame(filtered_data)

        timestamp = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
        df_in_bytes = df_to_bytes_excel(df)
        download_link = upload_blob(df_in_bytes, f'bi_castrolanda_produtor/relatorio1_{timestamp}.xlsx')
        logging.info(f'Link SAS gerado: {download_link}')

        email_body = set_email_body(download_link)
        send_email('gustavo@apcbrh.com.br', 'B.I Castrolanda - Relatório', email_body, is_html=True)

        logging.info('Relatório gerado e email enviado com sucesso.')
        return sas_response({'sasLink': download_link})
    except Exception as e:
        logging.error(f'Erro inesperado: {e}', exc_info=True)
        return handle_exception()
