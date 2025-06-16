import azure.functions as func
from shared import *


def main(req: func.HttpRequest) -> func.HttpResponse:

    data, status = extract_json_data(req)

    if status != 200:
        return func.HttpResponse("Erro no JSON", status_code=400)
    else:
        return func.HttpResponse("Sucesso", status_code=200)
