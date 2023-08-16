import os
from hhrr_app import forms
from hhrr_app import create_app
from flask_wtf import CSRFProtect
from flask_sqlalchemy import sqlalchemy
from flask_jwt_extended import jwt_required
from flask.helpers import send_from_directory
from hhrr_app.models.tbl_employee import Employee
from flask import Blueprint, flash, redirect, render_template, request, session, url_for

from hhrr_app import db

blueprint_home = Blueprint("home", __name__, url_prefix="")


@jwt_required(True)
@blueprint_home.route("/home-back", methods=["GET", "POST"])
def home_back():
    title = "Home"
    if "user_name" in session:
        user_name = session["user_name"]
        q_employe = Employee.query.filter(
            Employee.employee_personal_email == user_name
        ).first()
        user_html = (
            q_employe.first_name_employee + " " + q_employe.first_last_name_employee
        )
        empleados = Employee.query.count()
        edad_pro = db.session.query(sqlalchemy.func.avg(Employee.age)).scalar()

        if request.method == "GET":
            return render_template(
                "home/home.html",
                title=title,
                user=user_name,
                user_html=user_html,
            )
        else:
            return render_template(
                "home/home.html", title=title, user=user_name, user_html=user_html
            )
    else:
        mensajeErrorSesion = (
            "No existe una sesion activa porfavor ingrese a la plataforma"
        )
        flash(mensajeErrorSesion)

        return redirect(url_for("index.index"))


@jwt_required(True)
@blueprint_home.route("/log_out", methods=["GET", "POST"])
def log_out():
    session.pop("user_name")
    return redirect(url_for("landingPage.index"))


@jwt_required(True)
@blueprint_home.route("/home", defaults={"path": ""})
@blueprint_home.route("//<path:path>")
def home(path):
    print("hola mundo")
    app = create_app()
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")
