import uuid
import json
import logging
import azure.functions as func
from typing import Any, Dict, Tuple




def generate_unique_id() -> str:
    return str(uuid.uuid4())

def save_json_to_file(dados: dict, file_path: str) -> None:
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(dados, file, ensure_ascii=False, indent=4)

def extract_json_data(req: func.HttpRequest) -> Tuple[Dict[str, Any], int]:
    try:
        data = req.get_json()
        logging.info(f'Dados recebidos do Power BI: {data}')
        return data, 200
    except Exception as e:
        logging.error(f'Erro ao processar requisição: {e}')
        return {"error": "Erro ao processar os dados"}, 500
