import azure.functions as func
import pandas as pd
from config_loader import init_config
from datetime import datetime
from shared import *


def main(req: func.HttpRequest) -> func.HttpResponse:

    data, status = extract_json_data(req)
    df = pd.DataFrame([data])

    df['Media Leite por Animal'] = df['Media Leite por Animal'].round(2)

    df['Ultimo Cadastro'] = pd.to_datetime(df['Ultimo Cadastro'])
    df['Ultimo Cadastro'] = df['Ultimo Cadastro'].dt.strftime('%d/%m/%Y')


    init_config()

    timestamp = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
    df_in_bytes = df_to_bytes_excel(df)
    print(upload_blob(df_in_bytes, f'bi_castrolanda_produtor/relatorio1_{timestamp}.xlsx'))


    if status != 200:
        print('Falha na geracao do relatorio!')
        return func.HttpResponse("Erro no JSON", status_code=400)
    else:
        print('Relatorio gerado com sucesso!')
        return func.HttpResponse("Sucesso", status_code=200)
