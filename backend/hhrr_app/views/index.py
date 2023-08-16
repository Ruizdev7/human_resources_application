import os
from hhrr_app import db
from crypt import methods
from flask_wtf import CSRFProtect
from hhrr_app import forms,create_app
from flask_jwt_extended import jwt_required
from hhrr_app.models.tbl_employee import Employee
from werkzeug.security import generate_password_hash, check_password_hash
from flask import render_template, Blueprint, redirect, request, url_for, session, flash, send_from_directory

blueprint_landing_page = Blueprint("landingPage", __name__, url_prefix="")

@jwt_required
@blueprint_landing_page.route('/', defaults={'path': ''})
@blueprint_landing_page.route('//<path:path>')
def index(path):
    app = create_app()
    print(app.static_folder)
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')
    


@blueprint_landing_page.route("/registerEmployeeBasic", methods=["GET", "POST"])
def registerEmployeeBasic():
    form = forms.RegisterEmployee(request.form)
    if request.method == "GET":
        return render_template("login/signup.html", form=form)
    else:

        ccn_type_id = request.form["ccn_type_id"]
        number_id_employee = request.form["number_id_employee"]
        first_name_employee = request.form["first_name_employee"].upper()
        middle_name_employee = request.form["middle_name_employee"].upper()
        first_last_name_employee = request.form["first_last_name_employee"].upper()
        second_last_name_employee = request.form["second_last_name_employee"].upper()

        full_name_employee = (
            first_name_employee
            + middle_name_employee
            + first_last_name_employee
            + second_last_name_employee
        )

        date_birth_employee = request.form["date_birth_employee"]
        age = 32
        age_range = request.form["age_range"]
        auto_perceived_gender = request.form["auto_perceived_gender"]
        rh = request.form["rh"]
        employee_personal_email = request.form["employee_personal_email"]
        employee_personal_cellphone = request.form["employee_personal_cellphone"]
        informed_consent_law_1581 = "yes"
        if request.files["img_employee"]:
            employee_photo = request.files["img_employee"]
            filename = secure_filename(employee_photo.filename)
            image = filename
            employee_photo.save(
                os.path.join("hhrr_app/static/images/employee_photos", filename)
            )

        else:
            image = "not_registered.jpg"
        employee_password = generate_password_hash(request.form["employee_password"])

        new_employee = Employee(
            ccn_type_id,
            number_id_employee,
            first_name_employee,
            middle_name_employee,
            first_last_name_employee,
            second_last_name_employee,
            full_name_employee,
            date_birth_employee,
            age,
            age_range,
            auto_perceived_gender,
            rh,
            employee_personal_email,
            employee_personal_cellphone,
            informed_consent_law_1581,
            image,
            employee_password,
        )

        db.session.add(new_employee)
        db.session.commit()

        return redirect(url_for("landingPage.loginEmployee"))


@blueprint_landing_page.route("/reset_password_back", methods=["GET", "POST"])
def reset_password_back():
    form = forms.ResetPassword(request.form)
    if request.method == "POST":
        usermail = request.form["usermail"]
        q = Employee.query.filter_by(employee_email=usermail).first()
        if request.form["new_password"] == request.form["confirm_password"]:
            q.employee_password = generate_password_hash(request.form["new_password"])
            db.session.commit()
        return redirect(url_for("landingPage.loginEmployee"))
    else:
        form = forms.ResetPassword()
        return render_template("login/reset_password.html", form=form)


@blueprint_landing_page.route("/capture_email_back", methods=["GET", "POST"])
def capture_email_back():
    form = forms.ResetPassword(request.form)
    if request.method == "POST":
        import os
        import smtplib
        import email.message

        msg = email.message.Message()
        msg["Subject"] = "Reset Password"
        msg["From"] = "b_restrepo7@hotmail.com"
        msg["To"] = request.form["usermail"]
        msg.add_header("Content-Type", "text/html")
        email_content = f"<h1>http://localhost:5000/reset_password</h1>"
        msg.set_payload(email_content)
        s = smtplib.SMTP("smtp.office365.com", 587, "localhost")
        s.starttls()
        # Login Credentials for sending the mail
        s.login(
            "b_restrepo7@hotmail.com", os.environ["password"], initial_response_ok=True
        )
        s.sendmail(msg["From"], [msg["To"]], msg.as_string())
        s.quit()
        return (
            "<h1>Hemos enviado un mensaje de confirmacion a su correo electronico<h1>"
        )
    else:
        form = forms.ResetPassword()
        return render_template("login/capture_email.html", form=form)


@blueprint_landing_page.route("/loginEmployeeback", methods=["GET", "POST"])
def loginEmployeeback():
    form = forms.LoginEmployee(request.form)
    if request.method == "POST" and form.validate_on_submit():

        email_received = request.form["employee_personal_email"].upper()
        password_received = request.form["employee_password"]


        q = Employee.query.filter(
            Employee.employee_personal_email == email_received
        ).first()


        if q is None:
            error_message = "User not found ..."
            flash(error_message)
            return redirect(url_for("landingPage.loginEmployee"))

        elif email_received == q.employee_personal_email and check_password_hash(
            q.employee_password, password_received
        ):
            session["user_name"] = email_received
            succesful_msj = "Welcome {}".format(q.full_name_employee)


            flash(succesful_msj)

            return redirect(url_for("home.home"))
        else:
            error_msj = "The credentials has been provided are wrong, please try again"

            flash(error_msj)

            return redirect(url_for("landingPage.loginEmployee"))
    else:
        return render_template("login/login.html", form=form)
