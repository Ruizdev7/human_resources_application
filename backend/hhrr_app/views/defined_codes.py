from flask import flash
from email import message
from flask import request
from flask import session
from flask import url_for
from flask import redirect
from flask import Blueprint
from flask_wtf import CSRFProtect
from flask import render_template

from hhrr_app import db
from hhrr_app import forms

from hhrr_app.models.tbl_rh import RH
from hhrr_app.models.tbl_eps import EPS
from hhrr_app.models.tbl_afp import AFP
from hhrr_app.models.tbl_arl import ARL
from hhrr_app.models.tbl_ccf import CCF
from hhrr_app.models.tbl_aap import AAP
from hhrr_app.models.tbl_city import City
from hhrr_app.models.tbl_race import Race
from hhrr_app.models.tbl_roles import Role
from hhrr_app.models.tbl_type_id import TypeId
from hhrr_app.models.tbl_country import Country
from hhrr_app.models.tbl_employee import Employee
from hhrr_app.models.tbl_diseases import Diseases
from hhrr_app.models.tbl_age_range import AgeRange
from hhrr_app.models.tbl_work_shift import WorkShift
from hhrr_app.models.tbl_house_type import HouseType
from hhrr_app.models.tbl_department import Department
from hhrr_app.models.tbl_subhouse_type import SubHouseType
from hhrr_app.models.tbl_marital_status import MaritalStatus
from hhrr_app.models.tbl_schooling_level import SchoolingLevel
from hhrr_app.models.tbl_type_affiliation import TypeAffiliation
from hhrr_app.models.tbl_type_contributor import TypeContributor
from hhrr_app.models.tbl_type_relationship import TypeRelationship
from hhrr_app.models.tbl_auto_perceived_gender import AutoPerceivedGender
from hhrr_app.models.tbl_employment_relationship import EmploymentRelationship


blueprint_defined_codes = Blueprint("defined_codes", __name__, url_prefix="")


# CREATE READ UPDATE DELETE COUNTRY
@blueprint_defined_codes.route("/create_country", methods=["GET", "POST"])
def create_country():
    title = "Countries"
    if "user_name" in session:
        user_name = session["user_name"]
        form = forms.CreateCountry(request.form)
        # q = Employee.query.filter(Employee.employee_email == user_name).first()
        if request.method == "GET":
            return render_template(
                "fixed_assets/create_fixed_asset.html",
                title=title,
                user=user_name,
                form=form,
            )
        else:
            id_country = request.form["id_country"].upper()
            description_country = request.form["description_country"].upper()

            new_country = Country(
                id_country,
                description_country,
            )

            db.session.add(new_country)
            db.session.commit()

            type_mmesage = "create"
            flash(f"{description_country} has been created correctly")

            return redirect(
                url_for(
                    "defined_codes.defined_code_country",
                    flash=flash,
                    message=type_mmesage,
                )
            )
    else:
        mensajeErrorSesion = "There is no active session please enter the platform"
        flash(mensajeErrorSesion)

        return redirect(url_for("index.index"))


@blueprint_defined_codes.route("/defined_code_country", methods=["GET", "POST"])
@blueprint_defined_codes.route(
    "/defined_code_country/<message>", methods=["GET", "POST"]
)
def defined_code_country(message=None):
    message = message
    title = "Defined Code Country"
    form = forms.CreateCountry(request.form)
    if "user_name" in session:
        user_name = session["user_name"]
        query_logged_user = Employee.query.filter(
            Employee.employee_personal_email == user_name
        ).first()
        if request.method == "GET":
            q_defined_code_country = Country.query.all()
            return render_template(
                "defined_codes/defined_codes_country.html",
                list_defined_code_country=q_defined_code_country,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
        else:
            return render_template(
                "defined_codes/defined_codes_country.html",
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
    else:
        mensajeErrorSesion = "There is no active session please enter the platform"
        flash(mensajeErrorSesion)
        return redirect(url_for("landingPage.index"))


@blueprint_defined_codes.route(
    "/update_country/<int:ccn_country>", methods=["GET", "POST"]
)
def update_country(ccn_country):
    if request.method == "GET":
        q = Country.query.filter_by(ccn_country=ccn_country).first()
        form = forms.CreateCountry(
            id_country=q.id_country, description_country=q.description_country
        )
        return render_template(
            "defined_codes/update_country.html", form=form, q=q, ccn_country=ccn_country
        )
    elif request.method == "POST":
        q = db.session.query(Country).filter_by(ccn_country=ccn_country).first()
        q.description_country = request.form["description_country"].upper()
        q.id_country = request.form["id_country"].upper()
        form = forms.CreateCountry(request.form)
        db.session.commit()

        type_message = "update"
        flash(f"{q.description_country} has been updated correctly")
        return redirect(
            url_for(
                "defined_codes.defined_code_country", flash=flash, message=type_message
            )
        )


@blueprint_defined_codes.route(
    "/delete_country/<int:ccn_country>", methods=["GET", "POST"]
)
def delete_country(ccn_country):
    form = forms.CreateCountry(request.form)
    if "user_name" in session:
        Country.delete_country(ccn_country)
        type_message = "delete"
        flash(f"The Country has been deleted correctly")

        return redirect(
            url_for(
                "defined_codes.defined_code_country", flash=flash, message=type_message
            )
        )


# CREATE READ UPDATE DELETE DEPARTMENT
@blueprint_defined_codes.route("/create_department", methods=["GET", "POST"])
def create_department():
    title = "Cities"
    if "user_name" in session:
        user_name = session["user_name"]
        form = forms.CreateDepartment(request.form)
        # q = Employee.query.filter(Employee.employee_email == user_name).first()
        if request.method == "GET":
            return render_template(
                "fixed_assets/create_fixed_asset.html",
                title=title,
                user=user_name,
                form=form,
            )
        else:
            id_department = request.form["id_department"].upper()
            descripcion_department = request.form["descripcion_department"].upper()
            ccn_country = request.form["ccn_country"].upper()

            new_department = Department(
                id_department,
                descripcion_department,
                ccn_country,
            )

            db.session.add(new_department)
            db.session.commit()

            type_message = "create"
            flash(f"{descripcion_department} has been created correctly")

            return redirect(
                url_for(
                    "defined_codes.defined_code_department",
                    flash=flash,
                    message=type_message,
                )
            )
    else:
        mensajeErrorSesion = "There is no active session please enter the platform"
        flash(mensajeErrorSesion)

        return redirect(url_for("index.index"))


@blueprint_defined_codes.route("/defined_code_department", methods=["GET", "POST"])
@blueprint_defined_codes.route(
    "/defined_code_department/<message>", methods=["GET", "POST"]
)
def defined_code_department(message=None):
    message = message
    title = "Defined Code Department"
    form = forms.CreateDepartment(request.form)
    if "user_name" in session:
        user_name = session["user_name"]
        query_logged_user = Employee.query.filter(
            Employee.employee_personal_email == user_name
        ).first()

        if request.method == "GET":
            query_list_departments = Department.query.all()

            return render_template(
                "defined_codes/defined_codes_department.html",
                query_logged_user=query_logged_user,
                query_list_departments=query_list_departments,
                title=title,
                user=user_name,
                form=form,
                message=message,
            )
        else:
            query_list_departments = Department.query.all()
            return render_template(
                "defined_codes/defined_codes_department.html",
                query_logged_user=query_logged_user,
                query_list_departments=query_list_departments,
                user=user_name,
                form=form,
            )
    else:
        mensajeErrorSesion = "There is no active session please enter the platform"
        flash(mensajeErrorSesion)
        return redirect(url_for("landingPage.index"))


@blueprint_defined_codes.route(
    "/update_department/<int:id_department>", methods=["GET", "POST"]
)
def update_department(id_department):
    if request.method == "GET":
        q = Department.query.filter_by(id_department=id_department).first()
        q_country = Country.query.filter_by(ccn_country=q.ccn_country).first()
        form = forms.CreateDepartment(
            id_department=q.id_department,
            descripcion_department=q.descripcion_department,
            ccn_country=q_country,
        )
        return render_template(
            "defined_codes/update_department.html",
            form=form,
            q=q,
            id_department=id_department,
        )
    elif request.method == "POST":
        q = db.session.query(Department).filter_by(id_department=id_department).first()
        q.descripcion_department = request.form["descripcion_department"].upper()
        q.id_department = request.form["id_department"].upper()
        q.ccn_country = request.form["ccn_country"].upper()
        form = forms.CreateCountry(request.form)
        db.session.commit()
        type_message = "update"
        flash(f"{q.descripcion_department} updated correctly")
        return redirect(
            url_for(
                "defined_codes.defined_code_department",
                flash=flash,
                message=type_message,
            )
        )


@blueprint_defined_codes.route(
    "/delete_department/<int:ccn_department>", methods=["GET", "POST"]
)
def delete_department(ccn_department):
    form = forms.CreateDepartment(request.form)
    if "user_name" in session:
        Department.delete_department(ccn_department)
        type_message = "delete"
        flash(f"The department was removed correctly")

        return redirect(
            url_for(
                f"defined_codes.defined_code_department",
                flash=flash,
                message=type_message,
            )
        )


# CREATE READ UPDATE DELETE CITY
@blueprint_defined_codes.route("/create_city", methods=["GET", "POST"])
def create_city():
    title = "Cities"
    if "user_name" in session:
        user_name = session["user_name"]
        form = forms.CreateCity(request.form)
        # q = Employee.query.filter(Employee.employee_email == user_name).first()
        if request.method == "GET":
            return render_template(
                "fixed_assets/create_fixed_asset.html",
                title=title,
                user=user_name,
                form=form,
            )
        else:
            id_city = request.form["id_city"].upper()
            description_city = request.form["description_city"].upper()
            ccn_department = request.form["ccn_department"].upper()

            new_city = City(
                id_city,
                description_city,
                ccn_department,
            )

            db.session.add(new_city)
            db.session.commit()
            type_message = "create"
            flash(f"{description_city} has been created correctly")
            return redirect(
                url_for(
                    "defined_codes.defined_code_city", flash=flash, message=type_message
                )
            )
    else:
        mensajeErrorSesion = "There is no active session please enter the platform"
        flash(mensajeErrorSesion)

        return redirect(url_for("index.index"))


@blueprint_defined_codes.route("/defined_code_city", methods=["GET", "POST"])
@blueprint_defined_codes.route("/defined_code_city/<message>", methods=["GET", "POST"])
def defined_code_city(message=None):
    message = message
    title = "Defined Code City"
    form = forms.CreateCity(request.form)
    if "user_name" in session:
        user_name = session["user_name"]
        query_logged_user = Employee.query.filter(
            Employee.employee_personal_email == user_name
        ).first()
        if request.method == "GET":
            q_defined_code_city = City.query.all()
            list_city = []
            for i in q_defined_code_city:
                department = Department.query.filter_by(
                    ccn_department=i.ccn_department
                ).first()
                addinfo = [
                    i.id_city,
                    i.description_city,
                    department.descripcion_department,
                ]
                list_city.append(addinfo)
            return render_template(
                "defined_codes/defined_codes_city.html",
                list_defined_code_city=list_city,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
        else:
            return render_template(
                "defined_codes/defined_codes_city.html",
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
    else:
        mensajeErrorSesion = "There is no active session please enter the platform"
        flash(mensajeErrorSesion)
        return redirect(url_for("landingPage.index"))


@blueprint_defined_codes.route("/update_city/<int:id_city>", methods=["GET", "POST"])
def update_city(id_city):
    if request.method == "GET":
        q = City.query.filter_by(id_city=id_city).first()
        q_department = Department.query.filter_by(
            ccn_department=q.ccn_department
        ).first()
        form = forms.CreateCity(
            id_city=q.id_city,
            description_city=q.description_city,
            ccn_department=q_department,
        )
        return render_template(
            "defined_codes/update_city.html", form=form, q=q, id_city=id_city
        )
    elif request.method == "POST":
        q = db.session.query(City).filter_by(id_city=id_city).first()
        q.description_city = request.form["description_city"].upper()
        q.id_city = request.form["id_city"].upper()
        q.ccn_department = request.form["ccn_department"].upper()
        form = forms.CreateCity(request.form)
        db.session.commit()
        type_message = "update"
        flash(f"{q.description_city} updated correctly")

        return redirect(
            url_for(
                "defined_codes.defined_code_city", flash=flash, message=type_message
            )
        )


@blueprint_defined_codes.route("/delete_city/<int:ccn_city>", methods=["GET", "POST"])
def delete_city(ccn_city):
    form = forms.CreateCity(request.form)
    if "user_name" in session:
        City.delete_city(ccn_city)
        type_message = "delete"
        flash(f"The City has been delete correctly")
        return redirect(
            url_for(
                "defined_codes.defined_code_city", flash=flash, message=type_message
            )
        )


# CREATE READ UPDATE DELETE TYPE AFFILIATION
@blueprint_defined_codes.route("/create_type_affiliation", methods=["GET", "POST"])
def create_type_affiliation():
    title = "New Type Affiliation"
    if "user_name" in session:
        user_name = session["user_name"]
        form = forms.CreateTypeAffiliation(request.form)
        # q = Employee.query.filter(Employee.employee_email == user_name).first()
        if request.method == "GET":
            return render_template(
                "defined_codes/type_affiliation.html",
                title=title,
                user=user_name,
                form=form,
            )
        else:

            affiliation_code = request.form["affiliation_code"].upper()
            description_type_affiliation = request.form["description_type_affiliation"].upper()

            new_type_affiliation = TypeAffiliation(
                affiliation_code,
                description_type_affiliation,
            )

            db.session.add(new_type_affiliation)
            db.session.commit()
            type_message = "create"
            flash(f"{description_type_affiliation} has been created correctly")
            return redirect(
                url_for(
                    "defined_codes.defined_code_type_affiliation",
                    flash=flash,
                    message=type_message,
                )
            )
    else:
        mensajeErrorSesion = "There is no active session please enter the platform"
        flash(mensajeErrorSesion)

        return redirect(url_for("index.index"))


@blueprint_defined_codes.route(
    "/defined_code_type_affiliation", methods=["GET", "POST"]
)
@blueprint_defined_codes.route(
    "/defined_code_type_affiliation/<message>", methods=["GET", "POST"]
)
def defined_code_type_affiliation(message=None):
    message = message
    title = "Defined Code Type Affiliation"
    form = forms.CreateTypeAffiliation(request.form)
    if "user_name" in session:
        user_name = session["user_name"]
        query_logged_user = Employee.query.filter(
            Employee.employee_personal_email == user_name
        ).first()
        if request.method == "GET":
            query_list_types_affiliation = TypeAffiliation.query.all()
            return render_template(
                "defined_codes/defined_codes_type_affiliation.html",
                query_list_types_affiliation=query_list_types_affiliation,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
        else:
            return render_template(
                "defined_codes/defined_codes_type_affiliation.html",
                query_list_types_affiliation=query_list_types_affiliation,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
    else:
        mensajeErrorSesion = "There is no active session please enter the platform"
        flash(mensajeErrorSesion)
        return redirect(url_for("landingPage.index"))


@blueprint_defined_codes.route(
    "/update_type_affiliation/<int:ccn_type_affiliation>", methods=["GET", "POST"]
)
def update_type_affiliation(ccn_type_affiliation):
    if request.method == "GET":
        query_type_affiliation = TypeAffiliation.query.filter_by(
            ccn_type_affiliation=ccn_type_affiliation
        ).first()
        form = forms.CreateTypeAffiliation(
            affiliation_code=query_type_affiliation.affiliation_code,
            description_type_affiliation=query_type_affiliation.description_type_affiliation,
        )

        return render_template(
            "defined_codes/update_type_affiliation.html",
            form=form,
            query_type_affiliation=query_type_affiliation,
            ccn_type_affiliation=ccn_type_affiliation,
        )
    elif request.method == "POST":
        query_type_affiliation = TypeAffiliation.query.filter_by(
            ccn_type_affiliation=ccn_type_affiliation
        ).first()

        query_type_affiliation.affiliation_code = request.form["affiliation_code"].upper()
        query_type_affiliation.description_type_affiliation = request.form[
            "description_type_affiliation"
        ].upper()

        form = forms.CreateTypeAffiliation(request.form)
        db.session.commit()
        type_message = "update"
        flash(
            f"{query_type_affiliation.description_type_affiliation} updated correctly"
        )

        return redirect(
            url_for(
                "defined_codes.defined_code_type_affiliation",
                flash=flash,
                message=type_message,
            )
        )


@blueprint_defined_codes.route(
    "/delete_type_affiliation/<int:ccn_type_affiliation>", methods=["GET", "POST"]
)
def delete_type_affiliation(ccn_type_affiliation):
    form = forms.CreateTypeAffiliation(request.form)
    if "user_name" in session:
        TypeAffiliation.delete_type_affiliation(ccn_type_affiliation)
        type_message = "delete"
        flash(f"Type Affliation has been delete correctly")
        return redirect(
            url_for(
                "defined_codes.defined_code_type_affiliation",
                flash=flash,
                message=type_message,
            )
        )


# CREATE READ UPDATE DELETE TYPE CONTRIBUTOR
@blueprint_defined_codes.route("/create_type_contributor", methods=["GET", "POST"])
def create_type_contributor():
    title = "New Type Contributor"
    if "user_name" in session:
        user_name = session["user_name"]
        form = forms.CreateTypeContributor(request.form)
        if request.method == "GET":
            return render_template(
                "defined_codes/type_contributor.html",
                title=title,
                user=user_name,
                form=form,
            )
        else:
            contributor_code = request.form["contributor_code"].upper()
            description_type_contributor = request.form["description_type_contributor"].upper()

            new_type_contributor = TypeContributor(
                contributor_code,
                description_type_contributor,
            )

            db.session.add(new_type_contributor)
            db.session.commit()
            type_message = "create"
            flash(f"{description_type_contributor} has been created correctly")
            return redirect(
                url_for(
                    "defined_codes.defined_code_type_contributor",
                    flash=flash,
                    message=type_message,
                )
            )
    else:
        mensajeErrorSesion = "There is no active session please enter the platform"
        flash(mensajeErrorSesion)

        return redirect(url_for("index.index"))


@blueprint_defined_codes.route(
    "/defined_code_type_contributor", methods=["GET", "POST"]
)
@blueprint_defined_codes.route(
    "/defined_code_type_contributor/<message>", methods=["GET", "POST"]
)
def defined_code_type_contributor(message=None):
    message = message
    title = "Defined Code Type Contributor"
    form = forms.CreateTypeContributor(request.form)
    if "user_name" in session:
        user_name = session["user_name"]
        query_logged_user = Employee.query.filter(
            Employee.employee_personal_email == user_name
        ).first()
        if request.method == "GET":
            query_list_types_contributor = TypeContributor.query.all()
            return render_template(
                "defined_codes/defined_codes_type_contributor.html",
                query_list_types_contributor=query_list_types_contributor,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
        else:
            return render_template(
                "defined_codes/defined_codes_type_contributor.html",
                query_list_types_contributor=query_list_types_contributor,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
    else:
        mensajeErrorSesion = "There is no active session please enter the platform"
        flash(mensajeErrorSesion)
        return redirect(url_for("landingPage.index"))


@blueprint_defined_codes.route(
    "/update_type_contributor/<int:ccn_type_contributor>", methods=["GET", "POST"]
)
def update_type_contributor(ccn_type_contributor):
    if request.method == "GET":
        query_type_contributor = TypeContributor.query.filter_by(
            ccn_type_contributor=ccn_type_contributor
        ).first()
        form = forms.CreateTypeContributor(
            contributor_code=query_type_contributor.contributor_code,
            description_type_contributor=query_type_contributor.description_type_contributor,
        )

        return render_template(
            "defined_codes/update_type_contributor.html",
            form=form,
            query_type_contributor=query_type_contributor,
            ccn_type_contributor=ccn_type_contributor,
        )
    elif request.method == "POST":
        query_type_contributor = TypeContributor.query.filter_by(
            ccn_type_contributor=ccn_type_contributor
        ).first()

        query_type_contributor.contributor_code = request.form["contributor_code"].upper()
        query_type_contributor.description_type_contributor = request.form[
            "description_type_contributor"
        ].upper()

        form = forms.CreateTypeContributor(request.form)
        db.session.commit()
        type_message = "update"
        flash(
            f"{query_type_contributor.description_type_contributor} updated correctly"
        )

        return redirect(
            url_for(
                "defined_codes.defined_code_type_contributor",
                flash=flash,
                message=type_message,
            )
        )


@blueprint_defined_codes.route(
    "/delete_type_contributor/<int:ccn_type_contributor>", methods=["GET", "POST"]
)
def delete_type_contributor(ccn_type_contributor):
    form = forms.CreateTypeContributor(request.form)
    if "user_name" in session:
        TypeContributor.delete_type_contributor(ccn_type_contributor)
        type_message = "delete"
        flash(f"Type Contributor has been delete correctly")
        return redirect(
            url_for(
                "defined_codes.defined_code_type_contributor",
                flash=flash,
                message=type_message,
            )
        )


# CREATE READ UPDATE DELETE EPS
@blueprint_defined_codes.route("/create_eps", methods=["GET", "POST"])
def create_eps():
    title = "New EPS"
    if "user_name" in session:
        user_name = session["user_name"]
        form = forms.CreateEPS(request.form)
        if request.method == "GET":
            return render_template(
                "defined_codes/defined_codes_eps.html",
                title=title,
                user=user_name,
                form=form,
            )
        else:

            code_eps = request.form["code_eps"].upper()
            code_sgp_eps = request.form["code_sgp_eps"].upper()
            nit_eps = request.form["nit_eps"].upper()
            dig_ver = request.form["dig_ver"].upper()
            description_eps = request.form["description_eps"].upper()

            new_eps = EPS(
                code_eps,
                code_sgp_eps,
                nit_eps,
                dig_ver,
                description_eps,
            )

            db.session.add(new_eps)
            db.session.commit()
            type_message = "create"
            flash(f"{description_eps} has been created correctly")
            return redirect(
                url_for(
                    "defined_codes.defined_code_eps",
                    flash=flash,
                    message=type_message,
                )
            )
    else:
        mensajeErrorSesion = "There is no active session please enter the platform"
        flash(mensajeErrorSesion)
        return redirect(url_for("index.index"))


@blueprint_defined_codes.route("/defined_code_eps", methods=["GET", "POST"])
@blueprint_defined_codes.route("/defined_code_eps/<message>", methods=["GET", "POST"])
def defined_code_eps(message=None):
    message = message
    title = "EPS"
    form = forms.CreateEPS(request.form)
    if "user_name" in session:
        user_name = session["user_name"]
        query_logged_user = Employee.query.filter(
            Employee.employee_personal_email == user_name
        ).first()
        if request.method == "GET":
            query_list_eps = EPS.query.all()
            return render_template(
                "defined_codes/defined_codes_eps.html",
                query_list_eps=query_list_eps,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
        else:
            return render_template(
                "defined_codes/defined_codes_type_contributor.html",
                query_list_eps=query_list_eps,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
    else:
        mensajeErrorSesion = "There is no active session please enter the platform"
        flash(mensajeErrorSesion)
        return redirect(url_for("landingPage.index"))


@blueprint_defined_codes.route("/update_eps/<int:ccn_eps>", methods=["GET", "POST"])
def update_eps(ccn_eps):
    if request.method == "GET":
        query_eps = EPS.query.filter_by(ccn_eps=ccn_eps).first()
        form = forms.CreateEPS(
            code_eps=query_eps.code_eps,
            code_sgp_eps=query_eps.code_sgp_eps,
            nit_eps=query_eps.nit_eps,
            dig_ver=query_eps.dig_ver,
            description_eps=query_eps.description_eps,
        )
        return render_template(
            "defined_codes/update_eps.html",
            form=form,
            query_eps=query_eps,
            ccn_eps=ccn_eps,
        )
    elif request.method == "POST":

        query_eps = EPS.query.filter_by(ccn_eps=ccn_eps).first()

        query_eps.code_eps = request.form["code_eps"].upper()
        query_eps.code_sgp_eps = request.form["code_sgp_eps"].upper()
        query_eps.nit_eps = request.form["nit_eps"].upper()
        query_eps.dig_ver = request.form["dig_ver"].upper()
        query_eps.description_eps = request.form["description_eps"].upper()

        form = forms.CreateEPS(request.form)
        db.session.commit()
        type_message = "update"
        flash(f"{query_eps.description_eps} updated correctly")
        return redirect(
            url_for(
                "defined_codes.defined_code_eps",
                flash=flash,
                message=type_message,
            )
        )


@blueprint_defined_codes.route("/delete_eps/<int:ccn_eps>", methods=["GET", "POST"])
def delete_eps(ccn_eps):
    form = forms.CreateEPS(request.form)
    if "user_name" in session:
        EPS.delete_eps(ccn_eps)
        type_message = "delete"
        flash(f"EPS has been delete correctly")
        return redirect(
            url_for(
                "defined_codes.defined_code_eps",
                flash=flash,
                message=type_message,
            )
        )


# CREATE READ UPDATE DELETE AFP
@blueprint_defined_codes.route("/create_afp", methods=["GET", "POST"])
def create_afp():
    title = "New AFP"
    if "user_name" in session:
        user_name = session["user_name"]
        form = forms.CreateAFP(request.form)
        if request.method == "GET":
            return render_template(
                "defined_codes/defined_codes_afp.html",
                title=title,
                user=user_name,
                form=form,
            )
        else:

            code_afp = request.form["code_afp"].upper()
            nit_afp = request.form["nit_afp"].upper()
            dig_ver = request.form["dig_ver"].upper()
            description_afp = request.form["description_afp"].upper()

            new_afp = AFP(
                code_afp,
                nit_afp,
                dig_ver,
                description_afp,
            )

            db.session.add(new_afp)
            db.session.commit()
            type_message = "create"
            flash(f"{description_afp} has been created correctly")
            return redirect(
                url_for(
                    "defined_codes.defined_code_afp",
                    flash=flash,
                    message=type_message,
                )
            )
    else:
        mensajeErrorSesion = "There is no active session please enter the platform"
        flash(mensajeErrorSesion)
        return redirect(url_for("index.index"))


@blueprint_defined_codes.route("/defined_code_afp", methods=["GET", "POST"])
@blueprint_defined_codes.route("/defined_code_afp/<message>", methods=["GET", "POST"])
def defined_code_afp(message=None):
    message = message
    title = "AFP"
    form = forms.CreateAFP(request.form)
    if "user_name" in session:
        user_name = session["user_name"]
        query_logged_user = Employee.query.filter(
            Employee.employee_personal_email == user_name
        ).first()
        if request.method == "GET":
            query_list_afp = AFP.query.all()
            return render_template(
                "defined_codes/defined_codes_afp.html",
                query_list_afp=query_list_afp,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
        else:
            return render_template(
                "defined_codes/defined_codes_type_contributor.html",
                query_list_afp=query_list_afp,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
    else:
        mensajeErrorSesion = "There is no active session please enter the platform"
        flash(mensajeErrorSesion)
        return redirect(url_for("landingPage.index"))


@blueprint_defined_codes.route("/update_afp/<int:ccn_afp>", methods=["GET", "POST"])
def update_afp(ccn_afp):
    if request.method == "GET":
        query_afp = AFP.query.filter_by(ccn_afp=ccn_afp).first()
        form = forms.CreateAFP(
            code_afp=query_afp.code_afp,
            nit_afp=query_afp.nit_afp,
            dig_ver=query_afp.dig_ver,
            description_afp=query_afp.description_afp,
        )
        return render_template(
            "defined_codes/update_afp.html",
            form=form,
            query_afp=query_afp,
            ccn_afp=ccn_afp,
        )
    elif request.method == "POST":

        query_afp = AFP.query.filter_by(ccn_afp=ccn_afp).first()

        query_afp.code_afp = request.form["code_afp"].upper()
        query_afp.nit_afp = request.form["nit_afp"].upper()
        query_afp.dig_ver = request.form["dig_ver"].upper()
        query_afp.description_afp = request.form["description_afp"].upper()

        form = forms.CreateAFP(request.form)
        db.session.commit()
        type_message = "update"
        flash(f"{query_afp.description_afp} updated correctly")
        return redirect(
            url_for(
                "defined_codes.defined_code_afp",
                flash=flash,
                message=type_message,
            )
        )


@blueprint_defined_codes.route("/delete_afp/<int:ccn_afp>", methods=["GET", "POST"])
def delete_afp(ccn_afp):
    form = forms.CreateAFP(request.form)
    if "user_name" in session:
        AFP.delete_afp(ccn_afp)
        type_message = "delete"
        flash(f"AFP has been delete correctly")
        return redirect(
            url_for(
                "defined_codes.defined_code_afp",
                flash=flash,
                message=type_message,
            )
        )


# CREATE READ UPDATE DELETE ARL
@blueprint_defined_codes.route("/create_arl", methods=["GET", "POST"])
def create_arl():
    title = "New ARL"
    if "user_name" in session:
        user_name = session["user_name"]
        form = forms.CreateARL(request.form)
        if request.method == "GET":
            return render_template(
                "defined_codes/defined_codes_arl.html",
                title=title,
                user=user_name,
                form=form,
            )
        else:
            code_arl = request.form["code_arl"].upper()
            nit_arl = request.form["nit_arl"].upper()
            dig_ver = request.form["dig_ver"].upper()
            description_arl = request.form["description_arl"].upper()

            new_arl = ARL(
                code_arl,
                nit_arl,
                dig_ver,
                description_arl,
            )

            db.session.add(new_arl)
            db.session.commit()
            type_message = "create"
            flash(f"{description_arl} has been created correctly")
            return redirect(
                url_for(
                    "defined_codes.defined_code_arl",
                    flash=flash,
                    message=type_message,
                )
            )
    else:
        mensajeErrorSesion = "There is no active session please enter the platform"
        flash(mensajeErrorSesion)
        return redirect(url_for("index.index"))


@blueprint_defined_codes.route("/defined_code_arl", methods=["GET", "POST"])
@blueprint_defined_codes.route("/defined_code_arl/<message>", methods=["GET", "POST"])
def defined_code_arl(message=None):
    message = message
    title = "ARL"
    form = forms.CreateARL(request.form)
    if "user_name" in session:
        user_name = session["user_name"]
        query_logged_user = Employee.query.filter(
            Employee.employee_personal_email == user_name
        ).first()
        if request.method == "GET":
            query_list_arl = ARL.query.all()
            return render_template(
                "defined_codes/defined_codes_arl.html",
                query_list_arl=query_list_arl,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
        else:
            return render_template(
                "defined_codes/defined_codes_type_contributor.html",
                query_list_arl=query_list_arl,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
    else:
        mensajeErrorSesion = "There is no active session please enter the platform"
        flash(mensajeErrorSesion)
        return redirect(url_for("landingPage.index"))


@blueprint_defined_codes.route("/update_arl/<int:ccn_arl>", methods=["GET", "POST"])
def update_arl(ccn_arl):
    if request.method == "GET":
        query_arl = ARL.query.filter_by(ccn_arl=ccn_arl).first()
        form = forms.CreateARL(
            code_arl=query_arl.code_arl,
            nit_arl=query_arl.nit_arl,
            dig_ver=query_arl.dig_ver,
            description_arl=query_arl.description_arl,
        )
        return render_template(
            "defined_codes/update_arl.html",
            form=form,
            query_arl=query_arl,
            ccn_arl=ccn_arl,
        )
    elif request.method == "POST":

        query_arl = ARL.query.filter_by(ccn_arl=ccn_arl).first()
        query_arl.code_arl = request.form["code_arl"].upper()
        query_arl.nit_arl = request.form["nit_arl"].upper()
        query_arl.dig_ver = request.form["dig_ver"].upper()
        query_arl.description_arl = request.form["description_arl"].upper()

        form = forms.CreateARL(request.form)
        db.session.commit()
        type_message = "update"
        flash(f"{query_arl.description_arl} updated correctly")
        return redirect(
            url_for(
                "defined_codes.defined_code_arl",
                flash=flash,
                message=type_message,
            )
        )


@blueprint_defined_codes.route("/delete_arl/<int:ccn_arl>", methods=["GET", "POST"])
def delete_arl(ccn_arl):
    form = forms.CreateARL(request.form)
    if "user_name" in session:
        ARL.delete_arl(ccn_arl)
        type_message = "delete"
        flash(f"ARL has been delete correctly")
        return redirect(
            url_for(
                "defined_codes.defined_code_arl",
                flash=flash,
                message=type_message,
            )
        )


# CREATE READ UPDATE DELETE CCF
@blueprint_defined_codes.route("/create_ccf", methods=["GET", "POST"])
def create_ccf():
    title = "New CCF"
    if "user_name" in session:
        user_name = session["user_name"]
        form = forms.CreateCCF(request.form)
        if request.method == "GET":
            return render_template(
                "defined_codes/defined_codes_ccf.html",
                title=title,
                user=user_name,
                form=form,
            )
        else:
            code_ccf = request.form["code_ccf"].upper()
            nit_ccf = request.form["nit_ccf"].upper()
            dig_ver = request.form["dig_ver"].upper()
            description_ccf = request.form["description_ccf"].upper()

            new_ccf = CCF(
                code_ccf,
                nit_ccf,
                dig_ver,
                description_ccf,
            )

            db.session.add(new_ccf)
            db.session.commit()
            type_message = "create"
            flash(f"{description_ccf} has been created correctly")
            return redirect(
                url_for(
                    "defined_codes.defined_code_ccf",
                    flash=flash,
                    message=type_message,
                )
            )
    else:
        mensajeErrorSesion = "There is no active session please enter the platform"
        flash(mensajeErrorSesion)
        return redirect(url_for("index.index"))


@blueprint_defined_codes.route("/defined_code_ccf", methods=["GET", "POST"])
@blueprint_defined_codes.route("/defined_code_ccf/<message>", methods=["GET", "POST"])
def defined_code_ccf(message=None):
    message = message
    title = "CCF"
    form = forms.CreateCCF(request.form)
    if "user_name" in session:
        user_name = session["user_name"]
        query_logged_user = Employee.query.filter(
            Employee.employee_personal_email == user_name
        ).first()
        if request.method == "GET":
            query_list_ccf = CCF.query.all()
            return render_template(
                "defined_codes/defined_codes_ccf.html",
                query_list_ccf=query_list_ccf,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
        else:
            return render_template(
                "defined_codes/defined_codes_ccf.html",
                query_list_ccf=query_list_ccf,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
    else:
        mensajeErrorSesion = "There is no active session please enter the platform"
        flash(mensajeErrorSesion)
        return redirect(url_for("landingPage.index"))


@blueprint_defined_codes.route("/update_ccf/<int:ccn_ccf>", methods=["GET", "POST"])
def update_ccf(ccn_ccf):
    if request.method == "GET":
        query_ccf = CCF.query.filter_by(ccn_ccf=ccn_ccf).first()
        form = forms.CreateCCF(
            code_ccf=query_ccf.code_ccf,
            nit_ccf=query_ccf.nit_ccf,
            dig_ver=query_ccf.dig_ver,
            description_ccf=query_ccf.description_ccf,
        )
        return render_template(
            "defined_codes/update_ccf.html",
            form=form,
            query_ccf=query_ccf,
            ccn_ccf=ccn_ccf,
        )
    elif request.method == "POST":

        query_ccf = CCF.query.filter_by(ccn_ccf=ccn_ccf).first()
        query_ccf.code_ccf = request.form["code_ccf"].upper()
        query_ccf.nit_ccf = request.form["nit_ccf"].upper()
        query_ccf.dig_ver = request.form["dig_ver"].upper()
        query_ccf.description_ccf = request.form["description_ccf"].upper()

        form = forms.CreateCCF(request.form)
        db.session.commit()
        type_message = "update"
        flash(f"{query_ccf.description_ccf} updated correctly")
        return redirect(
            url_for(
                "defined_codes.defined_code_ccf",
                flash=flash,
                message=type_message,
            )
        )


@blueprint_defined_codes.route("/delete_ccf/<int:ccn_ccf>", methods=["GET", "POST"])
def delete_ccf(ccn_ccf):
    form = forms.CreateCCF(request.form)
    if "user_name" in session:
        CCF.delete_ccf(ccn_ccf)
        type_message = "delete"
        flash(f"CCF has been delete correctly")
        return redirect(
            url_for(
                "defined_codes.defined_code_arl",
                flash=flash,
                message=type_message,
            )
        )


# CREATE READ UPDATE DELETE AAP
@blueprint_defined_codes.route("/create_aap", methods=["GET", "POST"])
def create_aap():
    title = "New AAP"
    if "user_name" in session:
        user_name = session["user_name"]
        form = forms.CreateAAP(request.form)
        if request.method == "GET":
            return render_template(
                "defined_codes/defined_codes_aap.html",
                title=title,
                user=user_name,
                form=form,
            )
        else:
            code_aap = request.form["code_aap"].upper()
            nit_aap = request.form["nit_aap"].upper()
            dig_ver = request.form["dig_ver"].upper()
            description_aap = request.form["description_aap"].upper()

            new_aap = AAP(
                code_aap,
                nit_aap,
                dig_ver,
                description_aap,
            )

            db.session.add(new_aap)
            db.session.commit()
            type_message = "create"
            flash(f"{description_aap} has been created correctly")
            return redirect(
                url_for(
                    "defined_codes.defined_code_aap",
                    flash=flash,
                    message=type_message,
                )
            )
    else:
        mensajeErrorSesion = "There is no active session please enter the platform"
        flash(mensajeErrorSesion)
        return redirect(url_for("index.index"))


@blueprint_defined_codes.route("/defined_code_aap", methods=["GET", "POST"])
@blueprint_defined_codes.route("/defined_code_aap/<message>", methods=["GET", "POST"])
def defined_code_aap(message=None):
    message = message
    title = "AAP"
    form = forms.CreateAAP(request.form)
    if "user_name" in session:
        user_name = session["user_name"]
        query_logged_user = Employee.query.filter(
            Employee.employee_personal_email == user_name
        ).first()
        if request.method == "GET":
            query_list_aap = AAP.query.all()
            return render_template(
                "defined_codes/defined_codes_aap.html",
                query_list_aap=query_list_aap,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
        else:
            return render_template(
                "defined_codes/defined_codes_aap.html",
                query_list_aap=query_list_aap,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
    else:
        mensajeErrorSesion = "There is no active session please enter the platform"
        flash(mensajeErrorSesion)
        return redirect(url_for("landingPage.index"))


@blueprint_defined_codes.route("/update_aap/<int:ccn_aap>", methods=["GET", "POST"])
def update_aap(ccn_aap):
    if request.method == "GET":
        query_aap = AAP.query.filter_by(ccn_aap=ccn_aap).first()
        form = forms.CreateAAP(
            code_aap=query_aap.code_aap,
            nit_aap=query_aap.nit_aap,
            dig_ver=query_aap.dig_ver,
            description_aap=query_aap.description_aap,
        )
        return render_template(
            "defined_codes/update_aap.html",
            form=form,
            query_aap=query_aap,
            ccn_aap=ccn_aap,
        )
    elif request.method == "POST":

        query_aap = AAP.query.filter_by(ccn_aap=ccn_aap).first()

        query_aap.code_aap = request.form["code_aap"].upper()
        query_aap.nit_aap = request.form["nit_aap"].upper()
        query_aap.dig_ver = request.form["dig_ver"].upper()
        query_aap.description_aap = request.form["description_aap"].upper()
        db.session.commit()

        form = forms.CreateAAP(request.form)
        
        type_message = "update"
        flash(f"{query_aap.description_aap} updated correctly")
        return redirect(
            url_for(
                "defined_codes.defined_code_aap",
                flash=flash,
                message=type_message,
            )
        )


@blueprint_defined_codes.route("/delete_aap/<int:ccn_aap>", methods=["GET", "POST"])
def delete_aap(ccn_aap):
    form = forms.CreateAAP(request.form)
    if "user_name" in session:
        AAP.delete_aap(ccn_aap)
        type_message = "delete"
        flash(f"AAP has been delete correctly")
        return redirect(
            url_for(
                "defined_codes.defined_code_aap",
                flash=flash,
                message=type_message,
            )
        )


# CREATE READ UPDATE DELETE ROLES
@blueprint_defined_codes.route("/create_role", methods=["GET", "POST"])
def create_role():
    title = "Roles"
    if "user_name" in session:
        user_name = session["user_name"]
        form = forms.CreateRole(request.form)
        if request.method == "GET":
            return render_template(
                "defined_codes/defined_codes_role.html",
                title=title,
                user=user_name,
                form=form,
            )
        else:
            area = request.form["area"].upper()
            role = request.form["role"].upper()
            associated_process = request.form["associated_process"].upper()

            new_role = Role(
                area=area,
                role=role,
                process=associated_process,
            )

            db.session.add(new_role)
            db.session.commit()
            type_message = "create"
            flash(f"{role} ha sido creado correctamente!!!")
            return redirect(
                url_for(
                    "defined_codes.defined_code_roles",
                    flash=flash,
                    message=type_message,
                )
            )
    else:
        mensajeErrorSesion = (
            "No hay una sesion activa porfavor inicia sesion en la plataforma"
        )
        flash(mensajeErrorSesion)
        return redirect(url_for("index.index"))


@blueprint_defined_codes.route("/defined_code_roles", methods=["GET", "POST"])
@blueprint_defined_codes.route("/defined_code_roles/<message>", methods=["GET", "POST"])
def defined_code_roles(message=None):
    message = message
    title = "Roles"
    form = forms.CreateRole(request.form)
    if "user_name" in session:
        user_name = session["user_name"]
        query_logged_user = Employee.query.filter(
            Employee.employee_personal_email == user_name
        ).first()
        if request.method == "GET":
            query_list_roles = Role.query.all()
            return render_template(
                "defined_codes/defined_codes_role.html",
                query_list_roles=query_list_roles,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
        else:
            query_list_roles = Role.query.all()
            return render_template(
                "defined_codes/defined_codes_role.html",
                query_list_roles=query_list_roles,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
    else:
        mensajeErrorSesion = (
            "No hay una sesion activa porfavor inicia sesion en la plataforma"
        )
        flash(mensajeErrorSesion)
        return redirect(url_for("landingPage.index"))


@blueprint_defined_codes.route("/update_role/<int:ccn_role>", methods=["GET", "POST"])
def update_role(ccn_role):
    if request.method == "GET":
        query_role = Role.query.filter_by(ccn_role=ccn_role).first()
        form = forms.CreateRole(
            area=query_role.area,
            role=query_role.role,
            associated_process=query_role.process,
        )
        return render_template(
            "defined_codes/update_role.html",
            form=form,
            query_role=query_role,
            ccn_role=ccn_role,
        )
    elif request.method == "POST":

        query_role = Role.query.filter_by(ccn_role=ccn_role).first()

        query_role.area = request.form["area"].upper()
        query_role.role = request.form["role"].upper()
        query_role.process = request.form["associated_process"].upper()
        query_role.full_role = request.form["role"].upper() +" - "+ request.form["associated_process"].upper()
        form = forms.CreateRole(request.form)
        db.session.commit()
        type_message = "update"
        flash(f"{query_role.process} ha sido actualizado correctamente")
        return redirect(
            url_for(
                "defined_codes.defined_code_roles",
                flash=flash,
                message=type_message,
            )
        )


@blueprint_defined_codes.route("/delete_role/<int:ccn_role>", methods=["GET", "POST"])
def delete_role(ccn_role):
    form = forms.CreateRole(request.form)
    if "user_name" in session:
        Role.delete_role(ccn_role)
        type_message = "delete"
        flash(f"El Role ha sido eliminado correctamente")
        return redirect(
            url_for(
                "defined_codes.defined_code_roles",
                flash=flash,
                message=type_message,
            )
        )


# CREATE READ UPDATE DELETE WORK SHIFT
@blueprint_defined_codes.route("/create_work_shift", methods=["GET", "POST"])
def create_work_shift():
    title = "Turnos de Trabajo"
    if "user_name" in session:
        user_name = session["user_name"]
        form = forms.CreateWorkShift(request.form)
        if request.method == "GET":
            return render_template(
                "defined_codes/defined_codes_work_shift.html",
                title=title,
                user=user_name,
                form=form,
            )
        else:
            description_work_shift = request.form["description_work_shift"].upper()

            new_work_shift = WorkShift(
                description_work_shift=description_work_shift,
            )

            db.session.add(new_work_shift)
            db.session.commit()
            type_message = "create"
            flash(
                f"El turno de trabajo {description_work_shift} ha sido creado correctamente!!!"
            )
            return redirect(
                url_for(
                    "defined_codes.defined_code_work_shift",
                    flash=flash,
                    message=type_message,
                )
            )
    else:
        mensajeErrorSesion = (
            "No hay una sesion activa porfavor inicia sesion en la plataforma"
        )
        flash(mensajeErrorSesion)
        return redirect(url_for("index.index"))


@blueprint_defined_codes.route("/defined_code_work_shift", methods=["GET", "POST"])
@blueprint_defined_codes.route(
    "/defined_code_work_shift/<message>", methods=["GET", "POST"]
)
def defined_code_work_shift(message=None):
    message = message
    title = "Roles"
    form = forms.CreateWorkShift(request.form)
    if "user_name" in session:
        user_name = session["user_name"]
        query_logged_user = Employee.query.filter(
            Employee.employee_personal_email == user_name
        ).first()
        if request.method == "GET":
            query_list_work_shift = WorkShift.query.all()
            return render_template(
                "defined_codes/defined_codes_work_shift.html",
                query_list_work_shift=query_list_work_shift,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
        else:
            query_list_work_shift = WorkShift.query.all()
            return render_template(
                "defined_codes/defined_codes_role.html",
                query_list_work_shift=query_list_work_shift,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
    else:
        mensajeErrorSesion = (
            "No hay una sesion activa porfavor inicia sesion en la plataforma"
        )
        flash(mensajeErrorSesion)
        return redirect(url_for("landingPage.index"))


@blueprint_defined_codes.route(
    "/update_work_shift/<int:ccn_work_shift>", methods=["GET", "POST"]
)
def update_work_shift(ccn_work_shift):
    if request.method == "GET":
        query_work_shift = WorkShift.query.filter_by(
            ccn_work_shift=ccn_work_shift
        ).first()
        form = forms.CreateWorkShift(
            description_work_shift=query_work_shift.description_work_shift,
        )
        return render_template(
            "defined_codes/update_work_shift.html",
            form=form,
            query_work_shift=query_work_shift,
            ccn_work_shift=ccn_work_shift,
        )
    elif request.method == "POST":

        query_work_shift = WorkShift.query.filter_by(
            ccn_work_shift=ccn_work_shift
        ).first()

        query_work_shift.description_work_shift = request.form["description_work_shift"].upper()

        form = forms.WorkShift(request.form)
        db.session.commit()
        type_message = "update"
        flash(
            f"{query_work_shift.description_work_shift} ha sido actualizado correctamente"
        )
        return redirect(
            url_for(
                "defined_codes.defined_code_work_shift",
                flash=flash,
                message=type_message,
            )
        )


@blueprint_defined_codes.route(
    "/delete_work_shift/<int:ccn_work_shift>", methods=["GET", "POST"]
)
def delete_work_shift(ccn_work_shift):
    form = forms.CreateWorkShift(request.form)
    if "user_name" in session:
        WorkShift.delete_work_shift(ccn_work_shift)
        type_message = "delete"
        flash(f"El Turno de trabajo ha sido eliminado correctamente")
        return redirect(
            url_for(
                "defined_codes.defined_code_work_shift",
                flash=flash,
                message=type_message,
            )
        )


# CREATE READ UPDATE DELETE COMPANY EMPLOYEE RELATIONSHIP
@blueprint_defined_codes.route("/create_type_relationship", methods=["GET", "POST"])
def create_type_relationship():
    title = "Tipo de Vinculacion"
    if "user_name" in session:
        user_name = session["user_name"]
        form = forms.CreateTypeRelationship(request.form)
        if request.method == "GET":
            return render_template(
                "defined_codes/defined_codes_type_relationship.html",
                title=title,
                user=user_name,
                form=form,
            )
        else:
            description_type_relationship = request.form[
                "description_type_relationship"
            ].upper()

            new_type_relationship = TypeRelationship(
                description_type_relationship=description_type_relationship,
            )

            db.session.add(new_type_relationship)
            db.session.commit()
            type_message = "create"
            flash(
                f"El tipo de vinculacion con la compañia {description_type_relationship} ha sido creado correctamente!!!"
            )
            return redirect(
                url_for(
                    "defined_codes.defined_code_type_relationship",
                    flash=flash,
                    message=type_message,
                )
            )
    else:
        mensajeErrorSesion = (
            "No hay una sesion activa porfavor inicia sesion en la plataforma"
        )
        flash(mensajeErrorSesion)
        return redirect(url_for("index.index"))


@blueprint_defined_codes.route(
    "/defined_code_type_relationship", methods=["GET", "POST"]
)
@blueprint_defined_codes.route(
    "/defined_code_type_relationship/<message>", methods=["GET", "POST"]
)
def defined_code_type_relationship(message=None):
    message = message
    title = "Tipo de Vinculacion"
    form = forms.CreateTypeRelationship(request.form)
    if "user_name" in session:
        user_name = session["user_name"]
        query_logged_user = Employee.query.filter(
            Employee.employee_personal_email == user_name
        ).first()
        if request.method == "GET":
            query_list_type_relationship = TypeRelationship.query.all()
            return render_template(
                "defined_codes/defined_codes_type_relationship.html",
                query_list_type_relationship=query_list_type_relationship,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
        else:
            query_list_type_relationship = TypeRelationship.query.all()
            return render_template(
                "defined_codes/defined_codes_type_relationship.html",
                query_list_type_relationship=query_list_type_relationship,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
    else:
        mensajeErrorSesion = (
            "No hay una sesion activa porfavor inicia sesion en la plataforma"
        )
        flash(mensajeErrorSesion)
        return redirect(url_for("landingPage.index"))


@blueprint_defined_codes.route(
    "/update_type_relationship/<int:ccn_type_relationship>", methods=["GET", "POST"]
)
def update_type_relationship(ccn_type_relationship):
    if request.method == "GET":
        query_type_relationship = TypeRelationship.query.filter_by(
            ccn_type_relationship=ccn_type_relationship
        ).first()
        form = forms.CreateTypeRelationship(
            description_type_relationship=query_type_relationship.description_type_relationship,
        )
        return render_template(
            "defined_codes/update_type_relationship.html",
            form=form,
            query_type_relationship=query_type_relationship,
            ccn_type_relationship=ccn_type_relationship,
        )
    elif request.method == "POST":

        query_type_relationship = TypeRelationship.query.filter_by(
            ccn_type_relationship=ccn_type_relationship
        ).first()

        query_type_relationship.description_type_relationship = request.form[
            "description_type_relationship"
        ].upper()

        form = forms.TypeRelationship(request.form)
        db.session.commit()
        type_message = "update"
        flash(
            f"{query_type_relationship.description_type_relationship} ha sido actualizado correctamente"
        )
        return redirect(
            url_for(
                "defined_codes.defined_code_type_relationship",
                flash=flash,
                message=type_message,
            )
        )


@blueprint_defined_codes.route(
    "/delete_type_relationship/<int:ccn_type_relationship>", methods=["GET", "POST"]
)
def delete_type_relationship(ccn_type_relationship):
    form = forms.CreateTypeRelationship(request.form)
    if "user_name" in session:
        TypeRelationship.delete_type_relationship(ccn_type_relationship)
        type_message = "delete"
        flash(f"El tipo de vinculacion ha sido eliminado correctamente")
        return redirect(
            url_for(
                "defined_codes.defined_code_type_relationship",
                flash=flash,
                message=type_message,
            )
        )


# CREATE READ UPDATE DELETE DEMOGRAPHIC DATA
@blueprint_defined_codes.route("/create_schooling_level", methods=["GET", "POST"])
def create_schooling_level():
    title = "Nivel de escolaridad"
    if "user_name" in session:
        user_name = session["user_name"]
        form = forms.CreateSchoolingLevel(request.form)
        if request.method == "GET":
            return render_template(
                "defined_codes/defined_codes_schooling_level.html",
                title=title,
                user=user_name,
                form=form,
            )
        else:
            description_schooling_level = request.form["description_schooling_level"].upper()

            new_schooling_level = SchoolingLevel(
                description_schooling_level=description_schooling_level,
            )

            db.session.add(new_schooling_level)
            db.session.commit()
            type_message = "create"
            flash(
                f"Nivel de escolaridad {description_schooling_level} ha sido creado correctamente!!!"
            )
            return redirect(
                url_for(
                    "defined_codes.defined_code_schooling_level",
                    flash=flash,
                    message=type_message,
                )
            )
    else:
        mensajeErrorSesion = (
            "No hay una sesion activa porfavor inicia sesion en la plataforma"
        )
        flash(mensajeErrorSesion)
        return redirect(url_for("index.index"))


@blueprint_defined_codes.route("/defined_code_schooling_level", methods=["GET", "POST"])
@blueprint_defined_codes.route(
    "/defined_code_schooling_level/<message>", methods=["GET", "POST"]
)
def defined_code_schooling_level(message=None):
    message = message
    title = "Niveles de Escolaridad"
    form = forms.CreateSchoolingLevel(request.form)
    if "user_name" in session:
        user_name = session["user_name"]
        query_logged_user = Employee.query.filter(
            Employee.employee_personal_email == user_name
        ).first()
        if request.method == "GET":
            query_list_schooling_level = SchoolingLevel.query.all()
            return render_template(
                "defined_codes/defined_codes_schooling_level.html",
                query_list_schooling_level=query_list_schooling_level,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
        else:
            query_list_schooling_level = SchoolingLevel.query.all()
            return render_template(
                "defined_codes/defined_codes_schooling_level.html",
                query_list_schooling_level=query_list_schooling_level,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
    else:
        mensajeErrorSesion = (
            "No hay una sesion activa porfavor inicia sesion en la plataforma"
        )
        flash(mensajeErrorSesion)
        return redirect(url_for("landingPage.index"))


@blueprint_defined_codes.route(
    "/update_schooling_level/<int:ccn_schooling_level>", methods=["GET", "POST"]
)
def update_schooling_level(ccn_schooling_level):
    if request.method == "GET":
        query_schooling_level = SchoolingLevel.query.filter_by(
            ccn_schooling_level=ccn_schooling_level
        ).first()
        form = forms.CreateSchoolingLevel(
            description_schooling_level=query_schooling_level.description_schooling_level,
        )
        return render_template(
            "defined_codes/update_schooling_level.html",
            form=form,
            query_schooling_level=query_schooling_level,
            ccn_schooling_level=ccn_schooling_level,
        )
    elif request.method == "POST":

        query_schooling_level = SchoolingLevel.query.filter_by(
            ccn_schooling_level=ccn_schooling_level
        ).first()

        query_schooling_level.description_schooling_level = request.form[
            "description_schooling_level"
        ].upper()

        form = forms.CreateSchoolingLevel(request.form)
        db.session.commit()
        type_message = "update"
        flash(
            f"{query_schooling_level.description_schooling_level} ha sido actualizado correctamente"
        )
        return redirect(
            url_for(
                "defined_codes.defined_code_schooling_level",
                flash=flash,
                message=type_message,
            )
        )


@blueprint_defined_codes.route(
    "/delete_schooling_level/<int:ccn_schooling_level>", methods=["GET", "POST"]
)
def delete_schooling_level(ccn_schooling_level):
    form = forms.CreateSchoolingLevel(request.form)
    if "user_name" in session:
        SchoolingLevel.delete_schooling_level(ccn_schooling_level)
        type_message = "delete"
        flash(f"El nivel de escolaridad ha sido eliminado correctamente")
        return redirect(
            url_for(
                "defined_codes.defined_code_schooling_level",
                flash=flash,
                message=type_message,
            )
        )


# CREATE READ UPDATE DELETE RACE
@blueprint_defined_codes.route("/create_race", methods=["GET", "POST"])
def create_race():
    title = "Raza"
    if "user_name" in session:
        user_name = session["user_name"]
        form = forms.CreateRace(request.form)
        if request.method == "GET":
            return render_template(
                "defined_codes/defined_codes_race.html",
                title=title,
                user=user_name,
                form=form,
            )
        else:
            description_race = request.form["description_race"].upper()

            new_race = Race(
                description_race=description_race,
            )

            db.session.add(new_race)
            db.session.commit()
            type_message = "create"
            flash(f"Raza {description_race} ha sido creado correctamente!!!")
            return redirect(
                url_for(
                    "defined_codes.defined_code_race",
                    flash=flash,
                    message=type_message,
                )
            )
    else:
        mensajeErrorSesion = (
            "No hay una sesion activa porfavor inicia sesion en la plataforma"
        )
        flash(mensajeErrorSesion)
        return redirect(url_for("index.index"))


@blueprint_defined_codes.route("/defined_code_race", methods=["GET", "POST"])
@blueprint_defined_codes.route("/defined_code_race/<message>", methods=["GET", "POST"])
def defined_code_race(message=None):
    message = message
    title = "Raza"
    form = forms.CreateRace(request.form)
    if "user_name" in session:
        user_name = session["user_name"]
        query_logged_user = Employee.query.filter(
            Employee.employee_personal_email == user_name
        ).first()
        if request.method == "GET":
            query_list_race = Race.query.all()
            return render_template(
                "defined_codes/defined_codes_race.html",
                query_list_race=query_list_race,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
        else:
            query_list_race = Race.query.all()
            return render_template(
                "defined_codes/defined_codes_race.html",
                query_list_race=query_list_race,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
    else:
        mensajeErrorSesion = (
            "No hay una sesion activa porfavor inicia sesion en la plataforma"
        )
        flash(mensajeErrorSesion)
        return redirect(url_for("landingPage.index"))


@blueprint_defined_codes.route("/update_race/<int:ccn_race>", methods=["GET", "POST"])
def update_race(ccn_race):
    if request.method == "GET":
        query_race = Race.query.filter_by(ccn_race=ccn_race).first()
        form = forms.CreateRace(
            description_race=query_race.description_race,
        )
        return render_template(
            "defined_codes/update_race.html",
            form=form,
            query_race=query_race,
            ccn_race=ccn_race,
        )
    elif request.method == "POST":

        query_race = Race.query.filter_by(ccn_race=ccn_race).first()

        query_race.description_race = request.form["description_race"].upper()

        form = forms.CreateRace(request.form)
        db.session.commit()
        type_message = "update"
        flash(f"{query_race.description_race} ha sido actualizada correctamente")
        return redirect(
            url_for(
                "defined_codes.defined_code_race",
                flash=flash,
                message=type_message,
            )
        )


@blueprint_defined_codes.route("/delete_race/<int:ccn_race>", methods=["GET", "POST"])
def delete_race(ccn_race):
    form = forms.CreateRace(request.form)
    if "user_name" in session:
        Race.delete_race(ccn_race)
        type_message = "delete"
        flash(f"La raza ha sido eliminada correctamente")
        return redirect(
            url_for(
                "defined_codes.defined_code_race",
                flash=flash,
                message=type_message,
            )
        )


# CREATE READ UPDATE DELETE TYPE IDENTIFICATION
@blueprint_defined_codes.route("/create_type_id", methods=["GET", "POST"])
def create_type_id():
    title = "Raza"
    if "user_name" in session:
        user_name = session["user_name"]
        form = forms.CreateTypeId(request.form)
        if request.method == "GET":
            return render_template(
                "defined_codes/defined_codes_type_id.html",
                title=title,
                user=user_name,
                form=form,
            )
        else:

            type_id = request.form["type_id"].upper()
            description_type_id = request.form["description_type_id"].upper()

            new_type_id = TypeId(
                type_id=type_id,
                description_type_id=description_type_id,
            )

            db.session.add(new_type_id)
            db.session.commit()
            type_message = "create"
            flash(
                f"Tipo de Identificacion {description_type_id} ha sido creado correctamente!!!"
            )
            return redirect(
                url_for(
                    "defined_codes.defined_code_type_id",
                    flash=flash,
                    message=type_message,
                )
            )
    else:
        mensajeErrorSesion = (
            "No hay una sesion activa porfavor inicia sesion en la plataforma"
        )
        flash(mensajeErrorSesion)
        return redirect(url_for("index.index"))


@blueprint_defined_codes.route("/defined_code_type_id", methods=["GET", "POST"])
@blueprint_defined_codes.route(
    "/defined_code_type_id/<message>", methods=["GET", "POST"]
)
def defined_code_type_id(message=None):
    message = message
    title = "Tipo de Identificacion"
    form = forms.CreateTypeId(request.form)
    if "user_name" in session:
        user_name = session["user_name"]
        query_logged_user = Employee.query.filter(
            Employee.employee_personal_email == user_name
        ).first()
        if request.method == "GET":
            query_list_type_id = TypeId.query.all()
            return render_template(
                "defined_codes/defined_codes_type_id.html",
                query_list_type_id=query_list_type_id,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
        else:
            query_list_type_id = TypeId.query.all()
            return render_template(
                "defined_codes/defined_codes_type_id.html",
                query_list_type_id=query_list_type_id,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
    else:
        mensajeErrorSesion = (
            "No hay una sesion activa porfavor inicia sesion en la plataforma"
        )
        flash(mensajeErrorSesion)
        return redirect(url_for("landingPage.index"))


@blueprint_defined_codes.route(
    "/update_type_id/<int:ccn_type_id>", methods=["GET", "POST"]
)
def update_type_id(ccn_type_id):
    if request.method == "GET":
        query_type_id = TypeId.query.filter_by(ccn_type_id=ccn_type_id).first()
        form = forms.CreateTypeId(
            type_id=query_type_id.type_id,
            description_type_id=query_type_id.description_type_id,
        )
        return render_template(
            "defined_codes/update_type_id.html",
            form=form,
            query_type_id=query_type_id,
            ccn_type_id=ccn_type_id,
        )
    elif request.method == "POST":

        query_type_id = TypeId.query.filter_by(ccn_type_id=ccn_type_id).first()

        query_type_id.type_id = request.form["type_id"].upper()
        query_type_id.description_type_id = request.form["description_type_id"].upper()

        form = forms.CreateTypeId(request.form)
        db.session.commit()
        type_message = "update"
        flash(f"{query_type_id.description_type_id} ha sido actualizada correctamente")
        return redirect(
            url_for(
                "defined_codes.defined_code_type_id",
                flash=flash,
                message=type_message,
            )
        )


@blueprint_defined_codes.route(
    "/delete_type_id/<int:ccn_type_id>", methods=["GET", "POST"]
)
def delete_type_id(ccn_type_id):
    form = forms.CreateTypeId(request.form)
    if "user_name" in session:
        TypeId.delete_type_id(ccn_type_id)
        type_message = "delete"
        flash(f"El tipo de Identificacion se ha sido eliminada correctamente")
        return redirect(
            url_for(
                "defined_codes.defined_code_type_id",
                flash=flash,
                message=type_message,
            )
        )

# CREATE READ UPDATE DELETE AUTO PERCEIVED GENDER
@blueprint_defined_codes.route("/create_gender", methods=["GET", "POST"])
def create_gender():
    title = "Gender"
    if "user_name" in session:
        user_name = session["user_name"]
        form = forms.CreateAutoPerceivedGender(request.form)
        if request.method == "GET":
            return render_template(
                "defined_codes/defined_codes_apg.html",
                title=title,
                user=user_name,
                form=form,
            )
        else:

            auto_perceived_gender = request.form["auto_perceived_gender"].upper()

            new_gender = AutoPerceivedGender(
                auto_perceived_gender=auto_perceived_gender,
            )

            db.session.add(new_gender)
            db.session.commit()
            type_message = "create"
            flash(
                f"El genero {auto_perceived_gender} ha sido creado correctamente!!!"
            )
            return redirect(
                url_for(
                    "defined_codes.defined_code_apg",
                    flash=flash,
                    message=type_message,
                )
            )
    else:
        mensajeErrorSesion = (
            "No hay una sesion activa porfavor inicia sesion en la plataforma"
        )
        flash(mensajeErrorSesion)
        return redirect(url_for("index.index"))


@blueprint_defined_codes.route("/defined_code_apg", methods=["GET", "POST"])
@blueprint_defined_codes.route(
    "/defined_code_apg/<message>", methods=["GET", "POST"]
)
def defined_code_apg(message=None):
    message = message
    title = "Auto Perceived Gender"
    form = forms.CreateAutoPerceivedGender(request.form)
    if "user_name" in session:
        user_name = session["user_name"]
        query_logged_user = Employee.query.filter(
            Employee.employee_personal_email == user_name
        ).first()
        if request.method == "GET":
            query_list_auto_perceived_gender = AutoPerceivedGender.query.all()
            return render_template(
                "defined_codes/defined_codes_apg.html",
                query_list_auto_perceived_gender=query_list_auto_perceived_gender,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
        else:
            query_list_type_id = AutoPerceivedGender.query.all()
            return render_template(
                "defined_codes/defined_codes_apg.html",
                query_list_auto_perceived_gender=query_list_auto_perceived_gender,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
    else:
        mensajeErrorSesion = (
            "No hay una sesion activa porfavor inicia sesion en la plataforma"
        )
        flash(mensajeErrorSesion)
        return redirect(url_for("landingPage.index"))


@blueprint_defined_codes.route(
    "/update_auto_perceived_gender/<int:ccn_auto_perceived_gender>", methods=["GET", "POST"]
)
def update_auto_perceived_gender(ccn_auto_perceived_gender):

    if request.method == "GET":
        query_auto_perceived_gender = AutoPerceivedGender.query.filter_by(ccn_auto_perceived_gender=ccn_auto_perceived_gender).first()
        form = forms.CreateAutoPerceivedGender(
            auto_perceived_gender=query_auto_perceived_gender.auto_perceived_gender
        )
        return render_template(
            "defined_codes/update_apg.html",
            form=form,
            query_auto_perceived_gender=query_auto_perceived_gender,
            ccn_auto_perceived_gender=ccn_auto_perceived_gender,
        )
    elif request.method == "POST":

        query_auto_perceived_gender = AutoPerceivedGender.query.filter_by(ccn_auto_perceived_gender=ccn_auto_perceived_gender).first()
        
        query_auto_perceived_gender.auto_perceived_gender = request.form["auto_perceived_gender"].upper()
        
        form = forms.CreateAutoPerceivedGender(request.form)
        db.session.commit()
        type_message = "update"
        flash(f"{query_auto_perceived_gender.auto_perceived_gender} ha sido actualizada correctamente")
        return redirect(
            url_for(
                "defined_codes.defined_code_apg",
                flash=flash,
                message=type_message,
            )
        )


@blueprint_defined_codes.route(
    "/delete_auto_perceived_gender/<int:ccn_auto_perceived_gender>", methods=["GET", "POST"]
)
def delete_auto_perceived_gender(ccn_auto_perceived_gender):
    form = forms.CreateAutoPerceivedGender(request.form)
    if "user_name" in session:
        AutoPerceivedGender.delete_auto_perceived_gender(ccn_auto_perceived_gender)
        type_message = "delete"
        flash(f"El tipo de Identificacion se ha sido eliminada correctamente")
        return redirect(
            url_for(
                "defined_codes.defined_code_apg",
                flash=flash,
                message=type_message,
            )
        )


# CREATE READ UPDATE DELETE RH
@blueprint_defined_codes.route("/create_rh", methods=["GET", "POST"])
def create_rh():
    title = "RH"
    if "user_name" in session:
        user_name = session["user_name"]
        form = forms.CreateRH(request.form)
        if request.method == "GET":
            return render_template(
                "defined_codes/defined_codes_rh.html",
                title=title,
                user=user_name,
                form=form,
            )
        else:

            rh = request.form["rh"].upper()

            new_rh = RH(
                rh=rh,
            )

            db.session.add(new_rh)
            db.session.commit()
            type_message = "create"
            flash(
                f"El RH {rh} ha sido creado correctamente!!!"
            )
            return redirect(
                url_for(
                    "defined_codes.defined_code_rh",
                    flash=flash,
                    message=type_message,
                )
            )
    else:
        mensajeErrorSesion = (
            "No hay una sesion activa porfavor inicia sesion en la plataforma"
        )
        flash(mensajeErrorSesion)
        return redirect(url_for("index.index"))


@blueprint_defined_codes.route("/defined_code_rh", methods=["GET", "POST"])
@blueprint_defined_codes.route(
    "/defined_code_rh/<message>", methods=["GET", "POST"]
)
def defined_code_rh(message=None):
    message = message
    title = "RH"
    form = forms.CreateRH(request.form)
    if "user_name" in session:
        user_name = session["user_name"]
        query_logged_user = Employee.query.filter(
            Employee.employee_personal_email == user_name
        ).first()
        if request.method == "GET":
            query_list_rh = RH.query.all()
            return render_template(
                "defined_codes/defined_codes_rh.html",
                query_list_rh=query_list_rh,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
        else:
            return render_template(
                "defined_codes/defined_codes_apg.html",
                query_list_rh=query_list_rh,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
    else:
        mensajeErrorSesion = (
            "No hay una sesion activa porfavor inicia sesion en la plataforma"
        )
        flash(mensajeErrorSesion)
        return redirect(url_for("landingPage.index"))


@blueprint_defined_codes.route(
    "/update_rh/<int:ccn_rh>", methods=["GET", "POST"]
)
def update_rh(ccn_rh):

    if request.method == "GET":
        query_rh = RH.query.filter_by(ccn_rh=ccn_rh).first()
        form = forms.CreateRH(
            rh=query_rh.rh
        )
        return render_template(
            "defined_codes/update_rh.html",
            form=form,
            ccn_rh=ccn_rh,
            query_rh=query_rh,
        )
    elif request.method == "POST":

        query_rh = RH.query.filter_by(ccn_rh=ccn_rh).first()
        
        query_rh.rh = request.form["rh"].upper()
        
        form = forms.CreateRH(request.form)
        db.session.commit()
        type_message = "update"
        flash(f"El RH {query_rh.rh} se ha sido actualizada correctamente")
        return redirect(
            url_for(
                "defined_codes.defined_code_rh",
                flash=flash,
                message=type_message,
            )
        )


@blueprint_defined_codes.route(
    "/delete_rh/<int:ccn_rh>", methods=["GET", "POST"]
)
def delete_rh(ccn_rh):
    form = forms.CreateRH(request.form)
    if "user_name" in session:
        RH.delete_rh(ccn_rh)
        type_message = "delete"
        flash(f"El tipo de Identificacion se ha sido eliminada correctamente")
        return redirect(
            url_for(
                "defined_codes.defined_code_rh",
                flash=flash,
                message=type_message,
            )
        )


# CREATE READ UPDATE DELETE AGE RANGE
@blueprint_defined_codes.route("/create_age_range", methods=["GET", "POST"])
def create_age_range():
    title = "Age Range"
    if "user_name" in session:
        user_name = session["user_name"]
        form = forms.CreateRH(request.form)
        if request.method == "GET":
            return render_template(
                "defined_codes/defined_codes_age_range.html",
                title=title,
                user=user_name,
                form=form,
            )
        else:

            age_range = request.form["age_range"].upper()

            new_age_range = AgeRange(
                age_range=age_range,
            )

            db.session.add(new_age_range)
            db.session.commit()
            type_message = "create"
            flash(
                f"El rango de edad {age_range} ha sido creado correctamente!!!"
            )
            return redirect(
                url_for(
                    "defined_codes.defined_code_age_range",
                    flash=flash,
                    message=type_message,
                )
            )
    else:
        mensajeErrorSesion = (
            "No hay una sesion activa porfavor inicia sesion en la plataforma"
        )
        flash(mensajeErrorSesion)
        return redirect(url_for("index.index"))


@blueprint_defined_codes.route("/defined_code_age_range", methods=["GET", "POST"])
@blueprint_defined_codes.route(
    "/defined_code_age_range/<message>", methods=["GET", "POST"]
)
def defined_code_age_range(message=None):
    message = message
    title = "Age Range"
    form = forms.CreateAgerange(request.form)
    if "user_name" in session:
        user_name = session["user_name"]
        query_logged_user = Employee.query.filter(
            Employee.employee_personal_email == user_name
        ).first()
        if request.method == "GET":
            query_list_age_range = AgeRange.query.all()
            return render_template(
                "defined_codes/defined_codes_age_range.html",
                query_list_age_range=query_list_age_range,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
        else:
            return render_template(
                "defined_codes/defined_codes_age_range.html",
                query_list_age_range=query_list_age_range,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
    else:
        mensajeErrorSesion = (
            "No hay una sesion activa porfavor inicia sesion en la plataforma"
        )
        flash(mensajeErrorSesion)
        return redirect(url_for("landingPage.index"))


@blueprint_defined_codes.route(
    "/update_age_range/<int:ccn_age_range>", methods=["GET", "POST"]
)
def update_age_range(ccn_age_range):

    if request.method == "GET":
        query_age_range = AgeRange.query.filter_by(ccn_age_range=ccn_age_range).first()
        form = forms.CreateAgerange(
            age_range=query_age_range.age_range
        )
        return render_template(
            "defined_codes/update_age_range.html",
            form=form,
            ccn_age_range=ccn_age_range,
            query_age_range=query_age_range,
        )
    elif request.method == "POST":

        query_age_range = AgeRange.query.filter_by(ccn_age_range=ccn_age_range).first()
        
        query_age_range.age_range = request.form["age_range"].upper()
        
        form = forms.CreateAgerange(request.form)
        db.session.commit()
        type_message = "update"
        flash(f"El rango de edad {query_age_range.age_range} se ha sido actualizada correctamente")
        return redirect(
            url_for(
                "defined_codes.defined_code_age_range",
                flash=flash,
                message=type_message,
            )
        )


@blueprint_defined_codes.route(
    "/delete_age_range/<int:ccn_age_range>", methods=["GET", "POST"]
)
def delete_age_range(ccn_age_range):
    form = forms.CreateAgerange(request.form)
    if "user_name" in session:
        AgeRange.delete_age_range(ccn_age_range)
        type_message = "delete"
        flash(f"El rango de edad se ha sido eliminada correctamente")
        return redirect(
            url_for(
                "defined_codes.defined_code_age_range",
                flash=flash,
                message=type_message,
            )
        )



# CREATE READ UPDATE DELETE HOUSE TYPE
@blueprint_defined_codes.route("/create_house_type", methods=["GET", "POST"])
def create_house_type():
    title = "Tipo de Vivienda"
    if "user_name" in session:
        user_name = session["user_name"]
        form = forms.CreateHouseType(request.form)
        if request.method == "GET":
            return render_template(
                "defined_codes/defined_codes_house_type.html",
                title=title,
                user=user_name,
                form=form,
            )
        else:

            house_type = request.form["house_type"].upper()

            new_house_type = HouseType(
                house_type=house_type,
            )

            db.session.add(new_house_type)
            db.session.commit()
            type_message = "create"
            flash(
                f"El tipo de vivienda {house_type} ha sido creado correctamente!!!"
            )
            return redirect(
                url_for(
                    "defined_codes.defined_code_house_type",
                    flash=flash,
                    message=type_message,
                )
            )
    else:
        mensajeErrorSesion = (
            "No hay una sesion activa porfavor inicia sesion en la plataforma"
        )
        flash(mensajeErrorSesion)
        return redirect(url_for("index.index"))


@blueprint_defined_codes.route("/defined_code_house_type", methods=["GET", "POST"])
@blueprint_defined_codes.route(
    "/defined_code_house_type/<message>", methods=["GET", "POST"]
)
def defined_code_house_type(message=None):
    message = message
    title = "Age Range"
    form = forms.CreateHouseType(request.form)
    if "user_name" in session:
        user_name = session["user_name"]
        query_logged_user = Employee.query.filter(
            Employee.employee_personal_email == user_name
        ).first()
        if request.method == "GET":
            query_list_house_type = HouseType.query.all()
            return render_template(
                "defined_codes/defined_codes_house_type.html",
                query_list_house_type=query_list_house_type,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
        else:
            return render_template(
                "defined_codes/defined_codes_house_type.html",
                query_list_house_type=query_list_house_type,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
    else:
        mensajeErrorSesion = (
            "No hay una sesion activa porfavor inicia sesion en la plataforma"
        )
        flash(mensajeErrorSesion)
        return redirect(url_for("landingPage.index"))


@blueprint_defined_codes.route(
    "/update_house_type/<int:ccn_house_type>", methods=["GET", "POST"]
)
def update_house_type(ccn_house_type):

    if request.method == "GET":
        query_hpuse_type = HouseType.query.filter_by(ccn_house_type=ccn_house_type).first()
        form = forms.CreateHouseType(
            house_type = query_hpuse_type.house_type 
        )
        return render_template(
            "defined_codes/update_house_type.html",
            form=form,
            ccn_house_type=ccn_house_type,
            query_hpuse_type=query_hpuse_type,
        )
    elif request.method == "POST":

        query_house_type = HouseType.query.filter_by(ccn_house_type=ccn_house_type).first()
        
        query_house_type.house_type = request.form["house_type"].upper()
        
        form = forms.CreateHouseType(request.form)
        db.session.commit()
        type_message = "update"
        flash(f"El tipo de vivienda {query_house_type.house_type} se ha sido actualizada correctamente")
        return redirect(
            url_for(
                "defined_codes.defined_code_house_type",
                flash=flash,
                message=type_message,
            )
        )


@blueprint_defined_codes.route(
    "/delete_house_type/<int:ccn_house_type>", methods=["GET", "POST"]
)
def delete_house_type(ccn_house_type):
    form = forms.CreateHouseType(request.form)
    if "user_name" in session:
        HouseType.delete_house_type(ccn_house_type)
        type_message = "delete"
        flash(f"El tipo de vivienda se ha sido eliminada correctamente")
        return redirect(
            url_for(
                "defined_codes.defined_code_house_type",
                flash=flash,
                message=type_message,
            )
        )


# CREATE READ UPDATE DELETE SUB HOUSE TYPE
@blueprint_defined_codes.route("/create_sub_house_type", methods=["GET", "POST"])
def create_sub_house_type():
    title = "Subtipo de Vivienda"
    if "user_name" in session:
        user_name = session["user_name"]
        form = forms.CreateSubHouseType(request.form)
        if request.method == "GET":
            return render_template(
                "defined_codes/defined_codes_sub_house_type.html",
                title=title,
                user=user_name,
                form=form,
            )
        else:

            sub_house_type = request.form["sub_house_type"].upper()

            new_sub_house_type = SubHouseType(
                sub_house_type=sub_house_type,
            )

            db.session.add(new_sub_house_type)
            db.session.commit()
            type_message = "create"
            flash(
                f"El sub tipo de vivienda {sub_house_type} ha sido creado correctamente!!!"
            )
            return redirect(
                url_for(
                    "defined_codes.defined_code_sub_house_type",
                    flash=flash,
                    message=type_message,
                )
            )
    else:
        mensajeErrorSesion = (
            "No hay una sesion activa porfavor inicia sesion en la plataforma"
        )
        flash(mensajeErrorSesion)
        return redirect(url_for("index.index"))


@blueprint_defined_codes.route("/defined_code_sub_house_type", methods=["GET", "POST"])
@blueprint_defined_codes.route(
    "/defined_code_sub_house_type/<message>", methods=["GET", "POST"]
)
def defined_code_sub_house_type(message=None):
    message = message
    title = "Sub Tipo de Vivienda"
    form = forms.CreateSubHouseType(request.form)
    if "user_name" in session:
        user_name = session["user_name"]
        query_logged_user = Employee.query.filter(
            Employee.employee_personal_email == user_name
        ).first()
        if request.method == "GET":
            query_list_sub_house_type = SubHouseType.query.all()
            return render_template(
                "defined_codes/defined_codes_sub_house_type.html",
                query_list_sub_house_type=query_list_sub_house_type,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
        else:
            return render_template(
                "defined_codes/defined_codes_sub_house_type.html",
                query_list_sub_house_type=query_list_sub_house_type,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
    else:
        mensajeErrorSesion = (
            "No hay una sesion activa porfavor inicia sesion en la plataforma"
        )
        flash(mensajeErrorSesion)
        return redirect(url_for("landingPage.index"))


@blueprint_defined_codes.route(
    "/update_sub_house_type/<int:ccn_sub_house_type>", methods=["GET", "POST"]
)
def update_sub_house_type(ccn_sub_house_type):

    if request.method == "GET":
        query_sub_house_type = SubHouseType.query.filter_by(ccn_sub_house_type=ccn_sub_house_type).first()
        form = forms.CreateSubHouseType(
            sub_house_type = query_sub_house_type.sub_house_type 
        )
        return render_template(
            "defined_codes/update_sub_house_type.html",
            form=form,
            ccn_sub_house_type=ccn_sub_house_type,
            query_sub_house_type=query_sub_house_type,
        )
    elif request.method == "POST":

        query_sub_house_type = SubHouseType.query.filter_by(ccn_sub_house_type=ccn_sub_house_type).first()
        
        query_sub_house_type.sub_house_type = request.form["sub_house_type"].upper()
        
        form = forms.CreateSubHouseType(request.form)
        db.session.commit()
        type_message = "update"
        flash(f"El sub tipo de vivienda {query_sub_house_type.sub_house_type} se ha sido actualizada correctamente")
        return redirect(
            url_for(
                "defined_codes.defined_code_sub_house_type",
                flash=flash,
                message=type_message,
            )
        )


@blueprint_defined_codes.route(
    "/delete_sub_house_type/<int:ccn_sub_house_type>", methods=["GET", "POST"]
)
def delete_sub_house_type(ccn_sub_house_type):
    form = forms.CreateSubHouseType(request.form)
    if "user_name" in session:
        SubHouseType.delete_sub_house_type(ccn_sub_house_type)
        type_message = "delete"
        flash(f"El sub tipo de vivienda se ha sido eliminada correctamente")
        return redirect(
            url_for(
                "defined_codes.defined_code_sub_house_type",
                flash=flash,
                message=type_message,
            )
        )



# CREATE READ UPDATE DELETE MARITAL STATUS
@blueprint_defined_codes.route("/create_marital_status", methods=["GET", "POST"])
def create_marital_status():
    title = "Estado Civil"
    if "user_name" in session:
        user_name = session["user_name"]
        form = forms.CreateMaritalStatus(request.form)
        if request.method == "GET":
            return render_template(
                "defined_codes/defined_codes_marital_status.html",
                title=title,
                user=user_name,
                form=form,
            )
        else:

            marital_status = request.form["marital_status"].upper()

            new_marital_status = MaritalStatus(
                marital_status=marital_status,
            )

            db.session.add(new_marital_status)
            db.session.commit()
            type_message = "create"
            flash(
                f"El estado civil {marital_status} ha sido creado correctamente!!!"
            )
            return redirect(
                url_for(
                    "defined_codes.defined_code_marital_status",
                    flash=flash,
                    message=type_message,
                )
            )
    else:
        mensajeErrorSesion = (
            "No hay una sesion activa porfavor inicia sesion en la plataforma"
        )
        flash(mensajeErrorSesion)
        return redirect(url_for("index.index"))


@blueprint_defined_codes.route("/defined_code_marital_status", methods=["GET", "POST"])
@blueprint_defined_codes.route(
    "/defined_code_marital_status/<message>", methods=["GET", "POST"]
)
def defined_code_marital_status(message=None):
    message = message
    title = "Estado Civil"
    form = forms.CreateMaritalStatus(request.form)
    if "user_name" in session:
        user_name = session["user_name"]
        query_logged_user = Employee.query.filter(
            Employee.employee_personal_email == user_name
        ).first()
        if request.method == "GET":
            query_list_marital_status = MaritalStatus.query.all()
            return render_template(
                "defined_codes/defined_codes_marital_status.html",
                query_list_marital_status=query_list_marital_status,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
        else:
            return render_template(
                "defined_codes/defined_codes_marital_status.html",
                query_list_marital_status=query_list_marital_status,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
    else:
        mensajeErrorSesion = (
            "No hay una sesion activa porfavor inicia sesion en la plataforma"
        )
        flash(mensajeErrorSesion)
        return redirect(url_for("landingPage.index"))


@blueprint_defined_codes.route(
    "/update_marital_status/<int:ccn_marital_status>", methods=["GET", "POST"]
)
def update_marital_status(ccn_marital_status):

    if request.method == "GET":
        query_marital_status = MaritalStatus.query.filter_by(ccn_marital_status=ccn_marital_status).first()
        form = forms.CreateMaritalStatus(
            marital_status = query_marital_status.marital_status 
        )
        return render_template(
            "defined_codes/update_marital_status.html",
            form=form,
            ccn_marital_status=ccn_marital_status,
            query_marital_status=query_marital_status,
        )
    elif request.method == "POST":

        query_marital_status = MaritalStatus.query.filter_by(ccn_marital_status=ccn_marital_status).first()
        
        query_marital_status.marital_status = request.form["marital_status"].upper()
        
        form = forms.CreateMaritalStatus(request.form)
        db.session.commit()
        type_message = "update"
        flash(f"El estado civil {query_marital_status.marital_status} se ha sido actualizada correctamente")
        return redirect(
            url_for(
                "defined_codes.defined_code_marital_status",
                flash=flash,
                message=type_message,
            )
        )


@blueprint_defined_codes.route(
    "/delete_marital_status/<int:ccn_marital_status>", methods=["GET", "POST"]
)
def delete_marital_status(ccn_marital_status):
    form = forms.CreateMaritalStatus(request.form)
    if "user_name" in session:
        MaritalStatus.delete_marital_status(ccn_marital_status)
        type_message = "delete"
        flash(f"El estado civil se ha sido eliminada correctamente")
        return redirect(
            url_for(
                "defined_codes.defined_code_marital_status",
                flash=flash,
                message=type_message,
            )
        )




# CREATE READ UPDATE DELETE MARITAL STATUS
@blueprint_defined_codes.route("/create_diseases", methods=["GET", "POST"])
def create_diseases():
    title = "Enfermedades"
    if "user_name" in session:
        user_name = session["user_name"]
        form = forms.CreateDiseases(request.form)
        if request.method == "GET":
            return render_template(
                "defined_codes/defined_codes_diseases.html",
                title=title,
                user=user_name,
                form=form,
            )
        else:

            diseases = request.form["diseases"].upper()

            new_diseases = Diseases(
                diseases=diseases,
            )

            db.session.add(new_diseases)
            db.session.commit()
            type_message = "create"
            flash(
                f"El tipo de enfermedad {diseases} se ha sido creado correctamente!!!"
            )
            return redirect(
                url_for(
                    "defined_codes.defined_code_diseases",
                    flash=flash,
                    message=type_message,
                )
            )
    else:
        mensajeErrorSesion = (
            "No hay una sesion activa porfavor inicia sesion en la plataforma"
        )
        flash(mensajeErrorSesion)
        return redirect(url_for("index.index"))


@blueprint_defined_codes.route("/defined_code_diseases", methods=["GET", "POST"])
@blueprint_defined_codes.route(
    "/defined_code_diseases/<message>", methods=["GET", "POST"]
)
def defined_code_diseases(message=None):
    message = message
    title = "Estado Civil"
    form = forms.CreateDiseases(request.form)
    if "user_name" in session:
        user_name = session["user_name"]
        query_logged_user = Employee.query.filter(
            Employee.employee_personal_email == user_name
        ).first()
        if request.method == "GET":
            query_list_diseases = Diseases.query.all()
            return render_template(
                "defined_codes/defined_codes_diseases.html",
                query_list_diseases=query_list_diseases,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
        else:
            return render_template(
                "defined_codes/defined_codes_diseases.html",
                query_list_marital_status=query_list_marital_status,
                title=title,
                user=user_name,
                form=form,
                query_logged_user=query_logged_user,
                message=message,
            )
    else:
        mensajeErrorSesion = (
            "No hay una sesion activa porfavor inicia sesion en la plataforma"
        )
        flash(mensajeErrorSesion)
        return redirect(url_for("landingPage.index"))


@blueprint_defined_codes.route(
    "/update_diseases/<int:ccn_diseases>", methods=["GET", "POST"]
)
def update_diseases(ccn_diseases):

    if request.method == "GET":
        query_diseases = Diseases.query.filter_by(ccn_diseases=ccn_diseases).first()
        form = forms.CreateDiseases(
            diseases = query_diseases.diseases 
        )
        return render_template(
            "defined_codes/update_diseases.html",
            form=form,
            ccn_diseases=ccn_diseases,
            query_diseases=query_diseases,
        )
    elif request.method == "POST":

        query_diseases = Diseases.query.filter_by(ccn_diseases=ccn_diseases).first()
        
        query_diseases.diseases = request.form["diseases"].upper()
        
        form = forms.CreateDiseases(request.form)
        db.session.commit()
        type_message = "update"
        flash(f"El tipo de enfermedad {query_diseases.diseases} se ha sido actualizada correctamente")
        return redirect(
            url_for(
                "defined_codes.defined_code_diseases",
                flash=flash,
                message=type_message,
            )
        )


@blueprint_defined_codes.route(
    "/delete_diseases/<int:ccn_diseases>", methods=["GET", "POST"]
)
def delete_diseases(ccn_diseases):
    form = forms.CreateDiseases(request.form)
    if "user_name" in session:
        Diseases.delete_diseases(ccn_diseases)
        type_message = "delete"
        flash(f"El tipo de enfermedad se ha sido eliminada correctamente")
        return redirect(
            url_for(
                "defined_codes.defined_code_diseases",
                flash=flash,
                message=type_message,
            )
        )


