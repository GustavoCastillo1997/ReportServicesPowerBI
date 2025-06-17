import io
import pandas as pd
from datetime import datetime, timedelta
from azure.storage.blob import BlobServiceClient, BlobSasPermissions, generate_blob_sas
from config_loader import get_azure_blob_config


def upload_blob(content: bytes, blob_name: str) -> str:
    cfg = get_azure_blob_config()
    connection_string = cfg['connection_string']
    container_name = cfg['container']
    account_key = cfg['account_key']

    blob_service_client = BlobServiceClient.from_connection_string(connection_string)
    container_client = blob_service_client.get_container_client(container_name)

    blob_client = container_client.get_blob_client(blob_name)

    blob_client.upload_blob(content, overwrite=True)

    sas_token = generate_blob_sas(
        container_name=container_name,
        blob_name=blob_name,
        account_name=blob_service_client.account_name,
        account_key=account_key,
        permission=BlobSasPermissions(read=True),
        expiry=datetime.utcnow() + timedelta(minutes=20)
    )

    sas_url = f"{blob_client.url}?{sas_token}"

    return sas_url

def df_to_bytes_excel(df: pd.DataFrame) -> bytes:
    buffer = io.BytesIO()
    with pd.ExcelWriter(buffer, engine='openpyxl') as writer:
        df.to_excel(writer, index=False)
    buffer.seek(0)
    return buffer.read()
