import os
from hhrr_app import db
from flask import json
from flask import request
from flask import jsonify
from flask import Blueprint
from flask_sqlalchemy import sqlalchemy
from flask import make_response, send_from_directory

from hhrr_app import create_app
from hhrr_app.models.tbl_city import City
from hhrr_app.models.tbl_roles import Role
from hhrr_app.models.tbl_employee import Employee
from hhrr_app.models.tbl_demographic_data import DemographicData
from hhrr_app.models.tbl_type_relationship import TypeRelationship
from hhrr_app.models.tbl_employment_relationship import EmploymentRelationship

blueprint_api_metrics_hhrr = Blueprint("api_metrics_hhrr", __name__, url_prefix="")


def area_abbreviation(area):
    abbreviation = area.split(" ")
    if len(abbreviation) >= 3:
        name_abb = f"{abbreviation[0][0]} {abbreviation[1][0]} {abbreviation[2][0]}"
    elif len(abbreviation) == 2:
        name_abb = (
            f"{abbreviation[0][0]}{abbreviation[0][1]} {abbreviation[1][0]}{abbreviation[1][1]}"
            if len(abbreviation[1]) > 3
            else f"{abbreviation[0][0]}{abbreviation[0][1]}{abbreviation[0][2]}"
        )
    elif len(abbreviation) == 1:
        name_abb = f"{abbreviation[0]}"
    return name_abb


@blueprint_api_metrics_hhrr.route("/api/v1/metrics_for_main_data", methods=["GET"])
def get_main_data():
    metrics_for_main_data = {
        "active_employees": 0,
        "employee_for_area": [],
        "employee_for_gender": {
            "male_employees": 0,
            "female_employees": 0,
            "employees_others": 0,
        },
        "recidencie_cities": [],
        "employee_type_of_relationship": [],
        "employee_for_region": [],
        "employee_for_area_for_charge": [],
        "employee_for_area_for_charge_by_sum": {},
    }

    # Trae todas las areas de la tabla roles sin duplicidad
    roles = []
    query_roles = Role.query.all()
    for role in query_roles:
        if role.area in roles:
            pass
        else:
            roles.append(
                role.area,
            )
    # Creacion de espacion por area en los diccionarios
    for role in roles:
        metrics_for_main_data["employee_for_area_for_charge_by_sum"][role] = []

    # Query de la tabla de employment_relation ship para el calculo de empleados que esten activos
    query_employee_relation_ship = EmploymentRelationship.query.filter_by(
        is_active_employee=1
    ).all()
    metrics_for_main_data["active_employees"] = len(query_employee_relation_ship)

    # Query de la tabla de employment relationship y roles para las tarjetas informativas de empleados por area por cargo
    for area in roles:
        query_employee_by_area = (
            db.session.query(EmploymentRelationship, Role)
            .join(Role, EmploymentRelationship.ccn_role == Role.ccn_role)
            .filter(
                Role.area == f"{area}", EmploymentRelationship.is_active_employee == 1
            )
            .all()
        )

        for area_by_employee in query_employee_by_area:
            metrics_for_main_data["employee_for_area_for_charge"].append(
                {
                    "full_name_employee": area_by_employee[
                        0
                    ].Employee.full_name_employee,
                    "area": area_by_employee[1].area,
                    "ccn_employee": area_by_employee[0].Employee.ccn_employee,
                    "role": area_by_employee[1].role,
                    "ccn_role": area_by_employee[1].ccn_role,
                }
            )
            metrics_for_main_data["employee_for_area_for_charge_by_sum"][
                area_by_employee[1].area
            ].append(
                {
                    "full_name_employee": area_by_employee[
                        0
                    ].Employee.full_name_employee,
                    "area": area_by_employee[1].area,
                    "ccn_employee": area_by_employee[0].Employee.ccn_employee,
                    "role": area_by_employee[1].role,
                    "ccn_role": area_by_employee[1].ccn_role,
                }
            )

    # Iteracion que generara personas por area en las graficas
    for role in roles:
        metrics_for_main_data["employee_for_area"].append(
            {
                "area_abbreviation": area_abbreviation(role),
                "area": role,
                "employee_qty": len(
                    metrics_for_main_data["employee_for_area_for_charge_by_sum"][role]
                ),
                "employees": metrics_for_main_data[
                    "employee_for_area_for_charge_by_sum"
                ][role],
            }
        )

    # Datos para la grafica de empleado por genero
    query_employee = EmploymentRelationship.query.filter_by(is_active_employee=1).all()

    for employee in query_employee:
        if employee.Employee.auto_perceived_gender == 1:
            metrics_for_main_data["employee_for_gender"]["male_employees"] = (
                metrics_for_main_data["employee_for_gender"]["male_employees"] + 1
            )
        elif employee.Employee.auto_perceived_gender == 2:
            metrics_for_main_data["employee_for_gender"]["female_employees"] = (
                metrics_for_main_data["employee_for_gender"]["female_employees"] + 1
            )
        elif employee.Employee.auto_perceived_gender == 3:
            metrics_for_main_data["employee_for_gender"]["employees_others"] = (
                metrics_for_main_data["employee_for_gender"]["employees_others"] + 1
            )

    # Datos para la grafica cantidad de empleados por tipo de vinculacion
    type_of_relationship = TypeRelationship.query.all()
    for relationship in type_of_relationship:
        total_type_of_relationship = (
            db.session.query(EmploymentRelationship, TypeRelationship)
            .join(
                TypeRelationship,
                EmploymentRelationship.ccn_type_relationship
                == TypeRelationship.ccn_type_relationship,
            )
            .filter(
                TypeRelationship.description_type_relationship
                == f"{relationship.description_type_relationship}",
                EmploymentRelationship.is_active_employee == 1,
            )
            .count()
        )
        metrics_for_main_data["employee_type_of_relationship"].append(
            {
                "relationship": f"{relationship.description_type_relationship}",
                "qty_relationship": total_type_of_relationship,
            }
        )

    # Grafica de empleado por region
    list_of_cities = []
    ccn_active_employees = []

    # trae un unico de las ciudades con los datos de la tabla de datos demograficos
    recidencie_cities = DemographicData.query.with_entities(
        DemographicData.city_residence.distinct(),
    ).all()

    # Crea una lista unicamente con los ccn de las personas que estan activas en la empresa
    for employee_relation_ship in query_employee_relation_ship:
        ccn_active_employees.append(employee_relation_ship.ccn_employee)

    query_demographic_data = DemographicData.query.all()
    for city_count in recidencie_cities:
        quantity = sum(
            1
            for city in query_demographic_data
            if city.city_residence == city_count[0]
            and city.ccn_employee in ccn_active_employees
        )
        list_of_cities.append(
            {
                "ccn_city": city_count[0],
                "quantity": quantity,
                "city": "",
            }
        )

    for cities in list_of_cities:
        query_citie = City.query.filter_by(ccn_city=cities["ccn_city"]).first()
        metrics_for_main_data["recidencie_cities"].append(
            {
                "ccn_city": cities["ccn_city"],
                "quantity": cities["quantity"],
                "city": query_citie.description_city,
            }
        )

    # Tarjeta para el conteo de la cantidad de empleados
    employee_qty = (
        db.session.query(EmploymentRelationship, Employee)
        .join(Employee, EmploymentRelationship.ccn_employee == Employee.ccn_employee)
        .filter(
            Employee.ccn_employee != 0, EmploymentRelationship.is_active_employee == 1
        )
        .count()
    )
    metrics_for_main_data["employee_qty"] = employee_qty

    # Tarjeta para el conteo de la cantidad de empleados
    avg_for_age = db.session.query(sqlalchemy.func.avg(Employee.age)).scalar()
    metrics_for_main_data["avg_for_age"] = int(avg_for_age)

    return make_response(
        jsonify({"MetricsForMainDashboard": metrics_for_main_data}, 200)
    )


@blueprint_api_metrics_hhrr.route("/metrics/hhrr", defaults={"path": ""})
@blueprint_api_metrics_hhrr.route("//<path:path>")
def afp(path):
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")
