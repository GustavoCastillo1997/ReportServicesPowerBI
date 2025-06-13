import os
import json
from dotenv import load_dotenv

if os.getenv("AZURE_FUNCTIONS_ENVIRONMENT") != "Production":
    dotenv_path = os.path.join(os.path.dirname(__file__), "../secrets/.env")
    load_dotenv(dotenv_path)

def get_env_variable(key: str) -> str:
    value = os.getenv(key)
    if not value:
        raise EnvironmentError(f"Variável de ambiente '{key}' não encontrada.")
    return value

def get_config(config_path: str = "../config/settings.json") -> dict:
    try:
        with open(config_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        raise FileNotFoundError(f"Arquivo de configuração não encontrado em: {config_path}")
    except json.JSONDecodeError:
        raise ValueError(f"Arquivo de configuração contém JSON inválido: {config_path}")

