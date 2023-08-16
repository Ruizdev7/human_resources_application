import pandas as pd
from flask import jsonify
from flask import request
from flask import Blueprint
from flask import make_response
from hhrr_app import db
from hhrr_app.models.tbl_main_access_control import MainAccessControl

blueprint_api_control_access = Blueprint("api_control_access", __name__, url_prefix="")

@blueprint_api_control_access.route("/api/v1/access_control", methods=["POST"])
def post_access_control():
    
    excelfile = request.files["excelfile"]
    df = pd.read_excel(excelfile)

    for indice_fila,serie_fila in df.iterrows():
        date = serie_fila['Fecha'],
        hour = serie_fila['Hora'],
        number_id_employee = serie_fila['Cedula'], 
        name = serie_fila['Nombre'],
        area = serie_fila['Area'],
        event = serie_fila['Salida / Entrada'],
        new_access_data = MainAccessControl(
            date,
            hour,
            number_id_employee,
            name,
            area,
            event,
        )
        db.session.add(new_access_data)
        db.session.commit()
        

    return make_response(
        jsonify(
            {
                "Employees": "Very good read file",
                "msg": "The employee has been add succesfully",
                "Success": "true",
            }
        ),
        201,
    )