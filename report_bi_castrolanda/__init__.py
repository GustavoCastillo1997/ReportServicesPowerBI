import azure.functions as func
from shared import *
from config_loader import get_env_variable, get_config  # <-- Importa o config loader

def main(req: func.HttpRequest) -> func.HttpResponse:
    tenant_id = get_env_variable("TENANT_ID")
    client_id = get_env_variable("CLIENT_ID")
    client_secret = get_env_variable("CLIENT_SECRET")

    config = get_config()
    workspace_id = config["workspace_id"]
    report_id = config["report_id"]

    data, status = extract_json_data(req)

    if status != 200:
        return func.HttpResponse("Erro no JSON", status_code=400)
    else:








        return func.HttpResponse("Sucesso", status_code=200)
