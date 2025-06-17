import os
import json
from dotenv import load_dotenv


def init_config():
    env = os.getenv('AZURE_FUNCTIONS_ENVIRONMENT')
    print(f'AZURE_FUNCTIONS_ENVIRONMENT: {env}')

    if env != 'Production':
        dotenv_path = os.path.join(os.path.dirname(__file__), 'secrets', '.env')

        environment_set = load_dotenv(dotenv_path)
        if environment_set:
            print(f'env carregado com sucesso!')
        else:
            print(f'Falha no carregamento do env')

        os.getenv('AZURE_STORAGE_CONNECTION_STRING')

def get_env_variable(key: str) -> str:
    value = os.getenv(key)
    if value is None or value == '':
        raise EnvironmentError(f'Variável de ambiente "{key}" não encontrada ou vazia.')
    return value

def get_config(config_path: str = '../config/settings.json') -> dict:
    try:
        with open(config_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        raise FileNotFoundError(f'Arquivo de configuração não encontrado em: {config_path}')
    except json.JSONDecodeError:
        raise ValueError(f'Arquivo de configuração contém JSON inválido: {config_path}')

def get_azure_blob_config() -> dict:
    return {
        'connection_string': get_env_variable('AZURE_STORAGE_CONNECTION_STRING'),
        'container': get_env_variable('AZURE_STORAGE_CONTAINER'),
        'account_key': get_env_variable('AZURE_STORAGE_ACCOUNT_KEY')
    }

def get_powerbi_oauth_config() -> dict:
    return {
        'tenant_id': get_env_variable('TENANT_ID'),
        'client_id': get_env_variable('CLIENT_ID'),
        'client_secret': get_env_variable('CLIENT_SECRET'),
        'scope': os.getenv('POWER_BI_SCOPE', 'https://analysis.windows.net/powerbi/api/.default')
    }

def get_powerbi_workspace_config(config_path: str = '../config/settings.json') -> dict:
    config = get_config(config_path)
    if 'workspace_id' not in config or 'report_id' not in config:
        raise KeyError('O arquivo settings.json deve conter "workspace_id" e "report_id".')
    return {
        'workspace_id': config['workspace_id'],
        'report_id': config['report_id']
    }
