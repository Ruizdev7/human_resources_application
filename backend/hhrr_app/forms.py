from wtforms import FileField
from wtforms import SubmitField
from wtforms import StringField
from wtforms import SelectField
from wtforms import IntegerField
from wtforms import DecimalField
from wtforms import PasswordField
from wtforms import TextAreaField

from flask_wtf import FlaskForm
from wtforms.fields import DateField
from wtforms.validators import Email, Length
from wtforms.validators import DataRequired
from wtforms.validators import NumberRange
from wtforms_sqlalchemy.fields import QuerySelectField

from hhrr_app import db
from hhrr_app.models.tbl_rh import RH
from hhrr_app.models.tbl_eps import EPS
from hhrr_app.models.tbl_afp import AFP
from hhrr_app.models.tbl_arl import ARL
from hhrr_app.models.tbl_ccf import CCF
from hhrr_app.models.tbl_aap import AAP
from hhrr_app.models.tbl_race import Race
from hhrr_app.models.tbl_city import City
from hhrr_app.models.tbl_roles import Role
from hhrr_app.models.tbl_type_id import TypeId
from hhrr_app.models.tbl_country import Country
from hhrr_app.models.tbl_employee import Employee
from hhrr_app.models.tbl_diseases import Diseases
from hhrr_app.models.tbl_age_range import AgeRange
from hhrr_app.models.tbl_house_type import HouseType
from hhrr_app.models.tbl_work_shift import WorkShift
from hhrr_app.models.tbl_department import Department
from hhrr_app.models.tbl_relationship import Relationship
from hhrr_app.models.tbl_subhouse_type import SubHouseType
from hhrr_app.models.tbl_marital_status import MaritalStatus
from hhrr_app.models.tbl_schooling_level import SchoolingLevel
from hhrr_app.models.tbl_type_affiliation import TypeAffiliation
from hhrr_app.models.tbl_type_contributor import TypeContributor
from hhrr_app.models.tbl_type_relationship import TypeRelationship
from hhrr_app.models.tbl_auto_perceived_gender import AutoPerceivedGender


class RegisterEmployee(FlaskForm):

    ccn_type_id = QuerySelectField(
        "Tipo de Documento",
        query_factory=TypeId.choice_query,
        get_label="description_type_id",
    )

    number_id_employee = IntegerField(
        "Numero de Identificacion",
        validators=[
            DataRequired(message="This field is mandatory *"),
            Length(
                max=10, min=6, message="The field must have between 6 to 10 characters"
            ),
            NumberRange(min=0),
        ],
    )

    first_name_employee = StringField(
        "Primer Nombre",
        validators=[
            DataRequired(message="This field is mandatory"),
            Length(
                max=30, min=2, message="The field must have between 2 to 30 characters"
            ),
        ],
    )

    middle_name_employee = StringField(
        "Segundo Nombre",
        validators=[
            Length(
                max=30, min=2, message="The field must have between 2 to 30 characters"
            )
        ],
    )

    first_last_name_employee = StringField(
        "Primer Apellido",
        validators=[
            DataRequired(message="This field is mandatory"),
            Length(
                max=30, min=2, message="The field must have between 3 to 12 characters"
            ),
        ],
    )

    second_last_name_employee = StringField(
        "Segundo Apellido",
        validators=[
            # DataRequired(message="This field is mandatory"),
            Length(
                max=30, min=2, message="The field must have between 3 to 12 characters"
            ),
        ],
    )

    date_birth_employee = DateField("Date Birth Employee")
    age = StringField(
        "Edad",
        validators=[
            # DataRequired(message="This field is mandatory"),
            Length(
                max=30, min=2, message="The field must have between 3 to 12 characters"
            ),
        ],
    )
    age_range = QuerySelectField(
        "Rango de Edad",
        query_factory=AgeRange.choice_query,
        get_label="age_range",
    )

    auto_perceived_gender = QuerySelectField(
        "Genero",
        query_factory=AutoPerceivedGender.choice_query,
        get_label="auto_perceived_gender",
    )

    rh = QuerySelectField(
        "RH",
        query_factory=RH.choice_query,
        get_label="rh",
    )

    employee_personal_email = StringField(
        "Correo Personal",
        validators=[DataRequired(message="This field is mandatory"), Email()],
    )

    employee_personal_cellphone = StringField(
        "No. de Telefono Personal",
        validators=[DataRequired(message="This field is mandatory"), Email()],
    )

    img_employee = FileField("Imagen del empleado")

    employee_password = PasswordField("Contraseña")

    submit = SubmitField("Enviar")


class LoginEmployee(FlaskForm):

    employee_personal_email = StringField(
        "Email address",
        validators=[DataRequired(message="This field is mandatory"), Email()],
    )

    employee_password = PasswordField("Password")

    submit = SubmitField("Enviar")


class CreateCity(FlaskForm):

    id_city = IntegerField(
        "City Code",
        validators=[
            DataRequired(message="This field is mandatory *"),
            Length(
                max=10, min=6, message="The field must have between 6 to 10 characters"
            ),
            NumberRange(min=0),
        ],
    )

    description_city = StringField(
        "Description City",
        validators=[
            DataRequired(message="This field is mandatory"),
            Length(
                max=200,
                min=3,
                message="The field must have between 3 to 200 characters",
            ),
        ],
    )

    ccn_department = QuerySelectField(
        "ccn_department",
        query_factory=Department.choice_query,
        get_label="descripcion_department",
    )

    submit = SubmitField("Enviar")


class CreateCountry(FlaskForm):

    id_country = IntegerField(
        "COUNTRY CODE",
        validators=[
            DataRequired(message="This field is mandatory *"),
            Length(
                max=10, min=6, message="The field must have between 6 to 10 characters"
            ),
            NumberRange(min=0),
        ],
    )

    description_country = StringField(
        "COUNTRY",
        validators=[
            DataRequired(message="This field is mandatory"),
            Length(
                max=200,
                min=3,
                message="The field must have between 3 to 200 characters",
            ),
        ],
    )

    submit = SubmitField("Enviar")


class CreateDepartment(FlaskForm):
    id_department = IntegerField(
        "CODE DEPARTMENT",
        validators=[
            DataRequired(message="This field is mandatory *"),
            Length(
                max=10, min=6, message="The field must have between 6 to 10 characters"
            ),
            NumberRange(min=0),
        ],
    )

    descripcion_department = StringField(
        "DESCRIPTION DEPARTMENT",
        validators=[
            DataRequired(message="This field is mandatory"),
            Length(
                max=200,
                min=3,
                message="The field must have between 3 to 200 characters",
            ),
        ],
    )

    ccn_country = QuerySelectField(
        "COUNTRY CODE",
        query_factory=Country.choice_query,
        get_label="description_country",
    )

    submit = SubmitField("Enviar")


class CreateTypeOfDocument(FlaskForm):
    type_id = StringField(
        "ID Tipo de mantenimiento",
        validators=[
            DataRequired(message="This field is mandatory"),
            Length(
                max=20,
                min=1,
                message="The field must have between 3 to 200 characters",
            ),
        ],
    )

    description_type_id = StringField(
        "description type",
        validators=[
            DataRequired(message="This field is mandatory"),
            Length(
                max=20,
                min=1,
                message="The field must have between 3 to 200 characters",
            ),
        ],
    )

    submit = SubmitField("Enviar")


class ResetPassword(FlaskForm):
    usermail = StringField(
        "Usermail",
        validators=[
            DataRequired(message="This field is mandatory"),
            Length(
                max=20,
                min=1,
                message="The field must have between 3 to 20 characters",
            ),
        ],
    )

    new_password = PasswordField(
        "New Password",
        validators=[
            DataRequired(message="This field is mandatory"),
            Length(
                max=20,
                min=1,
                message="The field must have between 3 to 20 characters",
            ),
        ],
    )

    confirm_password = PasswordField(
        "Confirm Password",
        validators=[
            DataRequired(message="This field is mandatory"),
            Length(
                max=20,
                min=1,
                message="The field must have between 3 to 20 characters",
            ),
        ],
    )

    submit = SubmitField("Enviar")


class CreateTypeAffiliation(FlaskForm):

    affiliation_code = IntegerField(
        "Affiliation Code",
        validators=[
            DataRequired(message="This field is mandatory *"),
            Length(
                max=10, min=6, message="The field must have between 1 to 6 characters"
            ),
            NumberRange(min=0),
        ],
    )

    description_type_affiliation = StringField(
        "Description Type Affiliation",
        validators=[
            DataRequired(message="This field is mandatory"),
            Length(
                max=200,
                min=3,
                message="The field must have between 3 to 200 characters",
            ),
        ],
    )

    submit = SubmitField("Enviar")


class CreateTypeContributor(FlaskForm):

    contributor_code = IntegerField(
        "Contributor Code",
        validators=[
            DataRequired(message="This field is mandatory *"),
            Length(
                max=10, min=6, message="The field must have between 1 to 6 characters"
            ),
            NumberRange(min=0),
        ],
    )

    description_type_contributor = StringField(
        "Description Type Contributor",
        validators=[
            DataRequired(message="This field is mandatory"),
            Length(
                max=200,
                min=3,
                message="The field must have between 3 to 200 characters",
            ),
        ],
    )

    submit = SubmitField("Enviar")


class CreateEPS(FlaskForm):

    code_eps = StringField(
        "EPS Code",
        validators=[
            DataRequired(message="This field is mandatory *"),
            Length(
                max=10, min=6, message="The field must have between 1 to 6 characters"
            ),
        ],
    )

    code_sgp_eps = StringField(
        "code_sgp_EPS",
        validators=[
            DataRequired(message="This field is mandatory"),
            Length(
                max=200,
                min=3,
                message="The field must have between 3 to 200 characters",
            ),
        ],
    )

    nit_eps = StringField(
        "NIT EPS",
        validators=[
            DataRequired(message="This field is mandatory"),
            Length(
                max=200,
                min=3,
                message="The field must have between 3 to 200 characters",
            ),
        ],
    )

    dig_ver = IntegerField(
        "Div Ver",
        validators=[
            DataRequired(message="This field is mandatory"),
            Length(
                max=200,
                min=3,
                message="The field must have between 3 to 200 characters",
            ),
            NumberRange(min=0),
        ],
    )

    description_eps = StringField(
        "EPS",
        validators=[
            DataRequired(message="This field is mandatory"),
            Length(
                max=200,
                min=3,
                message="The field must have between 3 to 200 characters",
            ),
        ],
    )

    submit = SubmitField("Enviar")


class CreateAFP(FlaskForm):

    code_afp = StringField(
        "AFP Code",
        validators=[
            DataRequired(message="This field is mandatory *"),
            Length(
                max=10, min=6, message="The field must have between 1 to 6 characters"
            ),
        ],
    )

    nit_afp = StringField(
        "NIT AFP",
        validators=[
            DataRequired(message="This field is mandatory"),
            Length(
                max=200,
                min=3,
                message="The field must have between 3 to 200 characters",
            ),
        ],
    )

    dig_ver = IntegerField(
        "Div Ver",
        validators=[
            DataRequired(message="This field is mandatory"),
            Length(
                max=200,
                min=3,
                message="The field must have between 3 to 200 characters",
            ),
            NumberRange(min=0),
        ],
    )

    description_afp = StringField(
        "AFP",
        validators=[
            DataRequired(message="This field is mandatory"),
            Length(
                max=200,
                min=3,
                message="The field must have between 3 to 200 characters",
            ),
        ],
    )

    submit = SubmitField("Enviar")


class CreateARL(FlaskForm):

    code_arl = StringField(
        "ARL Code",
        validators=[
            DataRequired(message="This field is mandatory *"),
            Length(
                max=10, min=1, message="The field must have between 1 to 6 characters"
            ),
        ],
    )

    nit_arl = StringField(
        "NIT ARL",
        validators=[
            DataRequired(message="This field is mandatory"),
            Length(
                max=200,
                min=3,
                message="The field must have between 3 to 200 characters",
            ),
        ],
    )

    dig_ver = IntegerField(
        "Div Ver",
        validators=[
            DataRequired(message="This field is mandatory"),
            Length(
                max=200,
                min=3,
                message="The field must have between 3 to 200 characters",
            ),
            NumberRange(min=0),
        ],
    )

    description_arl = StringField(
        "ARL",
        validators=[
            DataRequired(message="This field is mandatory"),
            Length(
                max=200,
                min=3,
                message="The field must have between 3 to 200 characters",
            ),
        ],
    )

    submit = SubmitField("Enviar")


class CreateCCF(FlaskForm):

    code_ccf = StringField(
        "CCF Code",
        validators=[
            DataRequired(message="This field is mandatory *"),
            Length(
                max=10, min=1, message="The field must have between 1 to 6 characters"
            ),
        ],
    )

    nit_ccf = StringField(
        "NIT CCF",
        validators=[
            DataRequired(message="This field is mandatory"),
            Length(
                max=200,
                min=3,
                message="The field must have between 3 to 200 characters",
            ),
        ],
    )

    dig_ver = IntegerField(
        "Div Ver",
        validators=[
            DataRequired(message="This field is mandatory"),
            Length(
                max=200,
                min=3,
                message="The field must have between 3 to 200 characters",
            ),
            NumberRange(min=0),
        ],
    )

    description_ccf = StringField(
        "CCF",
        validators=[
            DataRequired(message="This field is mandatory"),
            Length(
                max=200,
                min=3,
                message="The field must have between 3 to 200 characters",
            ),
        ],
    )

    submit = SubmitField("Enviar")


class CreateAAP(FlaskForm):

    code_aap = StringField(
        "AAP Code",
        validators=[
            DataRequired(message="This field is mandatory *"),
            Length(
                max=10, min=1, message="The field must have between 1 to 6 characters"
            ),
        ],
    )

    nit_aap = StringField(
        "NIT AAP",
        validators=[
            DataRequired(message="This field is mandatory"),
            Length(
                max=200,
                min=3,
                message="The field must have between 3 to 200 characters",
            ),
        ],
    )

    dig_ver = IntegerField(
        "Div Ver",
        validators=[
            DataRequired(message="This field is mandatory"),
            Length(
                max=200,
                min=3,
                message="The field must have between 3 to 200 characters",
            ),
            NumberRange(min=0),
        ],
    )

    description_aap = StringField(
        "AAP",
        validators=[
            DataRequired(message="This field is mandatory"),
            Length(
                max=200,
                min=3,
                message="The field must have between 3 to 200 characters",
            ),
        ],
    )

    submit = SubmitField("Enviar")


class CreateSSEmployee(FlaskForm):

    ccn_employee = QuerySelectField(
        "EMPLOYEE",
        query_factory=Employee.choice_query,
        get_label="full_name_employee",
    )

    ccn_type_affiliation = QuerySelectField(
        "TYPE AFFILIATION",
        query_factory=TypeAffiliation.choice_query,
        get_label="description_type_affiliation",
    )

    ccn_type_contributor = QuerySelectField(
        "TYPE CONTRIBUTOR",
        query_factory=TypeContributor.choice_query,
        get_label="description_type_contributor",
    )

    ccn_eps = QuerySelectField(
        "EPS",
        query_factory=EPS.choice_query,
        get_label="description_eps",
    )

    ccn_afp = QuerySelectField(
        "AFP",
        query_factory=AFP.choice_query,
        get_label="description_afp",
    )

    ccn_arl = QuerySelectField(
        "ARL",
        query_factory=ARL.choice_query,
        get_label="description_arl",
    )

    ccn_ccf = QuerySelectField(
        "CCF",
        query_factory=CCF.choice_query,
        get_label="description_ccf",
    )

    ccn_aap = QuerySelectField(
        "AAP",
        query_factory=AAP.choice_query,
        get_label="description_aap",
    )

    submit = SubmitField("Enviar")


class CreateEmploymentRelationship(FlaskForm):

    employee = QuerySelectField(
        "Empleado",
        query_factory=Employee.choice_query,
        get_label="full_name_employee",
    )

    role = QuerySelectField(
        "Role -> Cargo",
        query_factory=Role.choice_query,
        get_label="full_role",
    )

    work_shift = QuerySelectField(
        "Turno de Trabajo",
        query_factory=WorkShift.choice_query,
        get_label="description_work_shift",
    )

    binding_date = DateField("Fecha Vinculacion Laboral")

    pending_days_to_enjoy_for_holidays = IntegerField(
        "Dias tomados de vacaciones",
    )

    termination_date = DateField("Fecha Desvinculacion Laboral")

    # termination_date = DateField("termination_date")

    """ time_worked = DecimalField(
        "Tiempo Laborado",
        places=2,
        validators=[DataRequired()],
    )

    pending_days_to_enjoy_for_holidays = DecimalField(
        "Dias pendientes por disfrutar por concepto de vacaciones",
        places=2,
        validators=[DataRequired()],
    ) """

    type_relationship = QuerySelectField(
        "Tipo de Vinculacion",
        query_factory=TypeRelationship.choice_query,
        get_label="description_type_relationship",
    )

    employee_corporate_email = StringField(
        "Correo Electronico Corporativo",
    )

    employee_corporate_cellphone = IntegerField(
        "Telefono Corporativo",
        validators=[DataRequired(message="This field is mandatory"), Email()],
    )

    immediate_boss = QuerySelectField(
        "Jefe Inmediato",
        query_factory=Employee.choice_query,
        get_label="full_name_employee",
    )

    submit = SubmitField("Enviar")


class CreateRole(FlaskForm):

    area = StringField(
        "Area",
        validators=[
            DataRequired(message="Este campo es obligatorio(*)"),
            Length(
                max=50, min=1, message="El campo debera tener entre 1 y 50 caracteres"
            ),
        ],
    )

    role = StringField(
        "Role -> Cargo",
        validators=[
            DataRequired(message="Este campo es obligatorio(*)"),
            Length(
                max=50, min=1, message="El campo debera tener entre 1 y 50 caracteres"
            ),
        ],
    )

    associated_process = StringField(
        "Proceso Asociado",
        validators=[
            DataRequired(message="Este campo es obligatorio(*)"),
            Length(
                max=50, min=1, message="El campo debera tener entre 1 y 50 caracteres"
            ),
        ],
    )

    submit = SubmitField("CREAR")


class CreateWorkShift(FlaskForm):

    description_work_shift = StringField(
        "Turno de Trabajo",
        validators=[
            DataRequired(message="Este campo es obligatorio(*)"),
            Length(
                max=40, min=1, message="El campo debera tener entre 1 y 40 caracteres"
            ),
        ],
    )

    submit = SubmitField("CREAR")


class CreateTypeRelationship(FlaskForm):

    description_type_relationship = StringField(
        "Tipo de vinculacion",
        validators=[
            DataRequired(message="Este campo es obligatorio(*)"),
            Length(
                max=40, min=1, message="El campo debera tener entre 1 y 40 caracteres"
            ),
        ],
    )

    submit = SubmitField("CREAR")


class CreateSchoolingLevel(FlaskForm):

    description_schooling_level = StringField(
        "Nivel de escolaridad",
        validators=[
            DataRequired(message="Este campo es obligatorio(*)"),
            Length(
                max=40, min=1, message="El campo debera tener entre 1 y 40 caracteres"
            ),
        ],
    )

    submit = SubmitField("CREAR")


class CreateRace(FlaskForm):

    description_race = StringField(
        "Raza",
        validators=[
            DataRequired(message="Este campo es obligatorio(*)"),
            Length(
                max=40, min=1, message="El campo debera tener entre 1 y 40 caracteres"
            ),
        ],
    )

    submit = SubmitField("CREAR")


class CreateDemographicData(FlaskForm):

    employee = QuerySelectField(
        "Empleado",
        query_factory=Employee.choice_query,
        get_label="full_name_employee",
    )

    birth_department = QuerySelectField(
        "Departamento de Nacimiento",
        query_factory=Department.choice_query,
        get_label="descripcion_department",
    )

    birth_city = QuerySelectField(
        "Ciudad de Nacimiento",
        query_factory=City.choice_query,
        get_label="description_city",
    )

    department_residence = QuerySelectField(
        "Departamento de Residencia",
        query_factory=Department.choice_query,
        get_label="descripcion_department",
    )

    city_residence = QuerySelectField(
        "Ciudad de Residencia",
        query_factory=City.choice_query,
        get_label="description_city",
    )

    ccn_schooling_level = QuerySelectField(
        "Nivel de Escolaridad",
        query_factory=SchoolingLevel.choice_query,
        get_label="description_schooling_level",
    )

    ccn_race = QuerySelectField(
        "Raza",
        query_factory=Race.choice_query,
        get_label="description_race",
    )

    submit = SubmitField("Enviar")


class CreateEmergencyContactDetails(FlaskForm):

    employee = QuerySelectField(
        "Empleado",
        query_factory=Employee.choice_query,
        get_label="full_name_employee",
    )

    emergency_contact = StringField(
        "Nombre del contacto de emergencia",
        validators=[
            DataRequired(message="Este campo es obligatorio(*)"),
            Length(
                max=40, min=1, message="El campo debera tener entre 1 y 40 caracteres"
            ),
        ],
    )

    relationship = QuerySelectField(
        "Parentesco",
        query_factory=Relationship.choice_query,
        get_label="relationship",
    )

    cellphone = StringField(
        "Celular Emergencia",
        validators=[
            DataRequired(message="Este campo es obligatorio(*)"),
            Length(
                max=40, min=1, message="El campo debera tener entre 1 y 40 caracteres"
            ),
        ],
    )

    submit = SubmitField("Enviar")


class CreateTypeId(FlaskForm):

    type_id = StringField(
        "Tipo ID",
        validators=[
            DataRequired(message="Este campo es obligatorio(*)"),
            Length(
                max=40, min=1, message="El campo debera tener entre 1 y 40 caracteres"
            ),
        ],
    )

    description_type_id = StringField(
        "Tipo de identificacion",
        validators=[
            DataRequired(message="Este campo es obligatorio(*)"),
            Length(
                max=40, min=1, message="El campo debera tener entre 1 y 40 caracteres"
            ),
        ],
    )

    submit = SubmitField("CREAR")


class CreateAutoPerceivedGender(FlaskForm):
    auto_perceived_gender = StringField(
        "Genero",
        validators=[
            DataRequired(message="Este campo es obligatorio(*)"),
            Length(
                max=40, min=1, message="El campo debera tener entre 1 y 40 caracteres"
            ),
        ],
    )

    submit = SubmitField("CREAR")


class CreateRH(FlaskForm):
    rh = StringField(
        "RH",
        validators=[
            DataRequired(message="Este campo es obligatorio(*)"),
            Length(
                max=40, min=1, message="El campo debera tener entre 1 y 40 caracteres"
            ),
        ],
    )

    submit = SubmitField("CREAR")


class CreateAgerange(FlaskForm):
    age_range = StringField(
        "Rango de Edad",
        validators=[
            DataRequired(message="Este campo es obligatorio(*)"),
            Length(
                max=40, min=1, message="El campo debera tener entre 1 y 40 caracteres"
            ),
        ],
    )

    submit = SubmitField("CREAR")


class CreateFamilyNucleus(FlaskForm):

    ccn_employee = QuerySelectField(
        "Empleado",
        query_factory=Employee.choice_query,
        get_label="full_name_employee",
    )

    ccn_marital_status = QuerySelectField(
        "Estado Civil",
        query_factory=MaritalStatus.choice_query,
        get_label="marital_status",
    )

    number_of_children = IntegerField(
        "Numero de Hijos",
        validators=[
            DataRequired(message="This field is mandatory *"),
            Length(
                max=10, min=6, message="The field must have between 6 to 10 characters"
            ),
            NumberRange(min=0),
        ],
    )

    ccn_type_id = QuerySelectField(
        "Tipo de Documento",
        query_factory=TypeId.choice_query,
        get_label="description_type_id",
    )

    number_id = IntegerField(
        "Numero de Documento",
        validators=[
            Length(
                max=10, min=6, message="The field must have between 6 to 10 characters"
            ),
            NumberRange(min=0),
        ],
    )

    ccn_auto_perceived_gender = QuerySelectField(
        "Genero",
        query_factory=AutoPerceivedGender.choice_query,
        get_label="auto_perceived_gender",
    )

    first_name = StringField(
        "Primer Nombre",
        validators=[
            Length(
                max=30, min=2, message="The field must have between 2 to 30 characters"
            ),
        ],
    )

    middle_name = StringField(
        "Segundo nombre",
        validators=[
            Length(
                max=30, min=2, message="The field must have between 2 to 30 characters"
            ),
        ],
    )

    first_last_name = StringField(
        "Primer Apellido",
        validators=[
            Length(
                max=30, min=2, message="The field must have between 2 to 30 characters"
            ),
        ],
    )

    second_last_name = StringField(
        "Segundo Apellido",
        validators=[
            Length(
                max=30, min=2, message="The field must have between 2 to 30 characters"
            ),
        ],
    )

    date_of_birth = DateField("Date Birth Employee")

    age = IntegerField(
        "Edad",
        validators=[
            Length(
                max=10, min=6, message="The field must have between 6 to 10 characters"
            ),
            NumberRange(min=0),
        ],
    )

    age_range = QuerySelectField(
        "Rango de Edad",
        query_factory=AgeRange.choice_query,
        get_label="age_range",
    )

    ccn_schooling_level = QuerySelectField(
        "Nivel de escolaridad",
        query_factory=SchoolingLevel.choice_query,
        get_label="description_schooling_level",
    )

    submit = SubmitField("CREAR")


class CreateSociodemographicData(FlaskForm):
    ccn_employee = QuerySelectField(
        "Empleado",
        query_factory=Employee.choice_query,
        get_label="full_name_employee",
    )
    other_dependents = SelectField(
        "Otros dependen de usted?",
        choices=[
            ("SI", "SI"),
            ("NO", "NO"),
        ],
    )
    relatives = IntegerField(
        "Numero de personas en el hogar?",
        validators=[
            DataRequired(message="This field is mandatory *"),
            Length(
                max=10, min=6, message="The field must have between 6 to 10 characters"
            ),
            NumberRange(min=0),
        ],
    )
    people_with_disabilities = IntegerField(
        "No. de personas en condición de discapacidad?",
        validators=[
            DataRequired(message="This field is mandatory *"),
            Length(
                max=10, min=6, message="The field must have between 6 to 10 characters"
            ),
            NumberRange(min=0),
        ],
    )
    monthly_income = IntegerField(
        "Ingresos familiares mensuales SMLMV?",
        validators=[
            DataRequired(message="This field is mandatory *"),
            Length(
                max=10, min=6, message="The field must have between 6 to 10 characters"
            ),
            NumberRange(min=0),
        ],
    )
    is_income_enougth = SelectField(
        "Los ingresos alcanzan para cubrir gastos mensuales?",
        choices=[
            ("SI", "SI"),
            ("NO", "NO"),
        ],
    )
    ccn_sub_house_type = QuerySelectField(
        "Tipo de vivienda",
        query_factory=SubHouseType.choice_query,
        get_label="sub_house_type",
    )
    ccn_house_type = QuerySelectField(
        "Caracteristicas de la vivienda",
        query_factory=HouseType.choice_query,
        get_label="house_type",
    )
    where_its_located = SelectField(
        "Zona en la que se ubica",
        choices=[("RURAL", "RURAL"), ("URBANA", "URBANA"), ("SUBURBANA", "SUBURBANA")],
    )
    residence_address = StringField(
        "Direccion de Residencia",
        validators=[
            DataRequired(message="This field is mandatory"),
            Length(
                max=255, min=2, message="The field must have between 2 to 30 characters"
            ),
        ],
    )
    type_transportation = SelectField(
        "Tipo de transporte para ir al trabajo",
        choices=[
            ("RUTA", "RUTA"),
            ("CAMINANDO", "CAMINANDO"),
            ("BICICLETA", "BICICLETA"),
            ("MOTO", "MOTO"),
            ("VEHICULO", "VEHICULO"),
            ("PARTICULAR", "PARTICULAR"),
            ("TRANSPORTE PUBLICO", "TRANSPORTE PUBLICO"),
            ("OTRO", "OTRO"),
        ],
    )

    type_transportation_2 = SelectField(
        "Tipo de transporte para ir al trabajo (opcional)",
        choices=[
            ("", ""),
            ("RUTA", "RUTA"),
            ("CAMINANDO", "CAMINANDO"),
            ("BICICLETA", "BICICLETA"),
            ("MOTO", "MOTO"),
            ("VEHICULO", "VEHICULO"),
            ("PARTICULAR", "PARTICULAR"),
            ("TRANSPORTE PUBLICO", "TRANSPORTE PUBLICO"),
            ("OTRO", "OTRO"),
        ],
    )
    social_stratum = SelectField(
        "Estrato de servicios publicos",
        choices=[
            ("1", "1"),
            ("2", "2"),
            ("3", "3"),
            ("4", "4"),
            ("5", "5"),
            ("6", "6"),
        ],
    )
    electric_power = SelectField(
        "Energia Electrica",
        choices=[
            ("SI", "SI"),
            ("NO", "NO"),
        ],
    )
    sewerage = SelectField(
        "Alcantarillado",
        choices=[
            ("SI", "SI"),
            ("NO", "NO"),
        ],
    )
    aqueduct = SelectField(
        "Acueducto",
        choices=[
            ("SI", "SI"),
            ("NO", "NO"),
        ],
    )
    natural_gas = SelectField(
        "Gas Natural",
        choices=[
            ("SI", "SI"),
            ("NO", "NO"),
        ],
    )
    garbage_collection = SelectField(
        "Recolección de Basuras",
        choices=[
            ("SI", "SI"),
            ("NO", "NO"),
        ],
    )
    landline = SelectField(
        "Telefono Fijo",
        choices=[
            ("SI", "SI"),
            ("NO", "NO"),
        ],
    )
    debts = SelectField(
        "Tiene Deudas?",
        choices=[
            ("SI", "SI"),
            ("NO", "NO"),
        ],
    )
    debt_refinancing = SelectField(
        "Esta interesado en refinanciar las deudas y consolidarlas en un solo credito?",
        choices=[
            ("SI", "SI"),
            ("NO", "NO"),
        ],
    )
    computer_at_home = SelectField(
        "En su hogar hay computador?",
        choices=[
            ("SI", "SI"),
            ("NO", "NO"),
        ],
    )
    have_internet_access = SelectField(
        "Tiene acceso a internet?",
        choices=[
            ("SI", "SI"),
            ("NO", "NO"),
        ],
    )

    submit = SubmitField("CREAR")


class CreateHealthCondition(FlaskForm):
    ccn_employee = QuerySelectField(
        "Empleado",
        query_factory=Employee.choice_query,
        get_label="full_name_employee",
    )
    consume_alcoholic_beverages = SelectField(
        "Consume bebidas alcoholicas?",
        choices=[
            ("SI", "SI"),
            ("NO", "NO"),
        ],
    )
    diseases = QuerySelectField(
        "Enfermedades",
        query_factory=Diseases.choice_query,
        get_label="diseases",
    )
    allergies = SelectField(
        "Alergias?",
        choices=[
            ("SI", "SI"),
            ("NO", "NO"),
        ],
    )
    what_allergy = StringField(
        "Cuales Alergias?",
        validators=[
            Length(
                max=30, min=2, message="The field must have between 2 to 30 characters"
            ),
        ],
    )
    medicines = SelectField(
        "Medicamentos?",
        choices=[
            ("SI", "SI"),
            ("NO", "NO"),
        ],
    )
    what_medicin = StringField(
        "Cuales medicamentos?",
        validators=[
            Length(
                max=30, min=2, message="The field must have between 2 to 30 characters"
            ),
        ],
    )
    last_medical_consultation = SelectField(
        "Hace cuanto fue su ultima consulta medica?",
        choices=[
            ("MENOR DE 3 MESESS", "MENOR DE 3 MESESS"),
            ("HACE 5 MESES", "HACE 5 MESES"),
            ("MAYOR A 6 MESES", "MAYOR A 6 MESES"),
            ("NO CONTESTA", "NO CONTESTA"),
        ],
    )
    plan_to_drink_less_alcoholic_beverages = SelectField(
        "Ha sentido alguna vez que debe ingerir menor cantidad de bebidas alcoholicas?",
        choices=[
            ("SI", "SI"),
            ("NO", "NO"),
        ],
    )
    discomfort_due_to_criticism_when_ingesting_alcohol = SelectField(
        "Le ha molestado que la gente lo critique por su forma de ingerir bebidas alcoholicas?",
        choices=[
            ("SI", "SI"),
            ("NO", "NO"),
        ],
    )
    need_to_drink_alcohol_in_the_morning = SelectField(
        "Alguna vez ha sentido la necesidad de ingerir bebidas alcoholicas en la mañana?",
        choices=[
            ("SI", "SI"),
            ("NO", "NO"),
        ],
    )
    physical_activity_3_times_a_week_30_minutes = SelectField(
        "Practica actividad fisica por lo menos 3 veces a la semana por 30 minutos minimo?",
        choices=[
            ("SI", "SI"),
            ("NO", "NO"),
        ],
    )
    he_is_a_smoker = SelectField(
        "Usted es fumador?",
        choices=[
            ("SI", "SI"),
            ("NO", "NO"),
        ],
    )
    how_many_cigarettes_a_day = IntegerField(
        "Cuantos cigarrillos al dia?",
        validators=[
            DataRequired(message="This field is mandatory *"),
            Length(
                max=10, min=6, message="The field must have between 6 to 10 characters"
            ),
            NumberRange(min=0),
        ],
    )
    he_is_ex_smoker = SelectField(
        "Usted es exfumador?",
        choices=[
            ("SI", "SI"),
            ("NO", "NO"),
        ],
    )
    consume_psychoactive_substances = SelectField(
        "Consume sustancias psicoactivas?",
        choices=[
            ("SI", "SI"),
            ("NO", "NO"),
        ],
    )
    used_psychoactive_substances_before = SelectField(
        "Ha consimido sustancias psicoactivas?",
        choices=[
            ("SI", "SI"),
            ("NO", "NO"),
        ],
    )
    what_psychoactive_substances = StringField(
        "Cual sustancia psicoactiva?",
        validators=[
            Length(
                max=30, min=2, message="The field must have between 2 to 30 characters"
            ),
        ],
    )

    submit = SubmitField("CREAR")


class CreateHouseType(FlaskForm):

    house_type = StringField(
        "Tipo de Vivienda",
        validators=[
            DataRequired(message="Este campo es obligatorio(*)"),
            Length(
                max=40, min=1, message="El campo debera tener entre 1 y 40 caracteres"
            ),
        ],
    )

    submit = SubmitField("CREAR")


class CreateSubHouseType(FlaskForm):

    sub_house_type = StringField(
        "Sub Tipo de Vivienda",
        validators=[
            DataRequired(message="Este campo es obligatorio(*)"),
            Length(
                max=40, min=1, message="El campo debera tener entre 1 y 40 caracteres"
            ),
        ],
    )

    submit = SubmitField("CREAR")


class CreateMaritalStatus(FlaskForm):

    marital_status = StringField(
        "Estado Civil",
        validators=[
            DataRequired(message="Este campo es obligatorio(*)"),
            Length(
                max=40, min=1, message="El campo debera tener entre 1 y 40 caracteres"
            ),
        ],
    )

    submit = SubmitField("CREAR")


class CreateDiseases(FlaskForm):

    diseases = StringField(
        "Enfermedad",
        validators=[
            DataRequired(message="Este campo es obligatorio(*)"),
            Length(
                max=40, min=1, message="El campo debera tener entre 1 y 40 caracteres"
            ),
        ],
    )

    submit = SubmitField("CREAR")


class MessageForm(FlaskForm):

    title_message = StringField("Titutlo Mensaje")

    body_message = TextAreaField("Asunto Mensaje")

    submit = SubmitField("ENVIAR")
