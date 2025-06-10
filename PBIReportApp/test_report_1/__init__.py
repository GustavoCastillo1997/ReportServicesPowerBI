import io
from openpyxl import Workbook
import azure.functions as func


def main(req: func.HttpRequest) -> func.HttpResponse:
    _ = req.method
    try:
        wb = Workbook()
        ws = wb.active
        ws.title = "Relatório Dashboard 1"

        ws.append(["ID", "Produtor", "Total Animais Vivos"])

        # Dados mock
        data = [
            [1, "Produtor A", 507],
            [2, "Produtor B", 780],
            [3, "Produtor C", 25],
        ]

        for row in data:
            ws.append(row)

        output = io.BytesIO()
        wb.save(output)
        output.seek(0)

        headers = {
            "Content-Disposition": 'attachment; filename="relatorio_db_1.xlsx"',
            "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }

        return func.HttpResponse(body=output.read(), headers=headers, status_code=200)

    except ValueError as ve:
        return func.HttpResponse(
            f"Erro de valor: {str(ve)}",
            status_code=400  # Bad Request
        )
    except Exception as e:
        return func.HttpResponse(
            f"Erro inesperado: {str(e)}",
            status_code=500  # Internal Server Error
        )
