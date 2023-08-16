import os
from flask import Flask
from flask_cors import CORS
from flask_wtf import CSRFProtect
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_swagger_ui import get_swaggerui_blueprint

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
cors = CORS()


SWAGGER_URL = "/api_documentation"
API_URL = "/static/swagger/swagger.json"
SWAGGER_BLUEPRINT = get_swaggerui_blueprint(
    SWAGGER_URL, API_URL, config={"app_name": "hhrr_app"}
)


def create_app(test_config=None):
    app = Flask(
        __name__,
        instance_relative_config=True,
        static_folder="../dist",
        static_url_path="",
    )
    app.config.from_object("config.DevelopmentConfig")
    app.config["JWT_SECRET_KEY"] = "super-secret"
    db.init_app(app)
    jwt = JWTManager(app)
    migrate = Migrate(app, db)
    migrate.init_app(app, db)
    csfr = CSRFProtect(app)
    cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

    from hhrr_app.models import (
        tbl_country,
        tbl_department,
        tbl_city,
        tbl_ccf,
        tbl_aap,
        tbl_afp,
        tbl_age_range,
        tbl_arl,
        tbl_auto_perceived_gender,
        tbl_employee,
        tbl_eps,
        tbl_rh,
        tbl_roles,
        tbl_type_affiliation,
        tbl_type_contributor,
        tbl_type_id,
        tbl_ss_employee,
        tbl_work_shift,
        tbl_type_relationship,
        tbl_employment_relationship,
        tbl_demographic_data,
        tbl_race,
        tbl_schooling_level,
        tbl_emergency_contact_details,
        tbl_relationship,
        tbl_family_nucleus,
        tbl_health_condition,
        tbl_sociodemographic_data,
        tbl_house_type,
        tbl_marital_status,
        tbl_subhouse_type,
        tbl_diseases,
        tbl_administrative_performance_evaluation,
        tbl_directive_performance_evaluation,
        tbl_main_access_control,
        tbl_operative_performance_evaluation,
        tbl_performance_evaluation,
        tbl_states_performance_evaluation,
        tbl_RBAC,
        tbl_RBAC_modules,
        tbl_notification,
        tbl_trial_time_evaluation,
        tbl_trial_time_evaluation_detail
    )

    if test_config is None:
        app.config.from_pyfile("config.py", silent=True)
    else:
        app.config.from_mapping("test_config")
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # AQUI SE REGISTRAN LOS BLUEPRINTS RELACIONADOS CON LAS VISTAS (LOGICA DE NEGOCIOS)
    from hhrr_app.views.home import blueprint_home
    from hhrr_app.views.db_employee import blueprint_db_employee
    from hhrr_app.views.index import blueprint_landing_page
    from hhrr_app.views.defined_codes import blueprint_defined_codes

    app.register_blueprint(blueprint_db_employee, url_prefix="")
    app.register_blueprint(blueprint_landing_page, url_prefix="")
    app.register_blueprint(blueprint_home, url_prefix="")
    app.register_blueprint(blueprint_defined_codes, url_prefix="")

    app.register_blueprint(SWAGGER_BLUEPRINT, url_prefix=SWAGGER_URL)

    # AQUI SE REGISTRAN LOS BLUEPRINTS RELACIONADOS A LOS RECURSOS DE LA API
    from hhrr_app.resources_api.resource_authorization import (
        blueprint_api_authorization_employee,
    )
    from hhrr_app.resources_api.resource_employee import blueprint_api_employee
    from hhrr_app.resources_api.resource_rh import blueprint_api_rh
    from hhrr_app.resources_api.files.download_excel_files import excel_bp
    from hhrr_app.resources_api.resource_aap import blueprint_api_aap
    from hhrr_app.resources_api.resource_afp import blueprint_api_afp
    from hhrr_app.resources_api.resource_arl import blueprint_api_arl
    from hhrr_app.resources_api.resource_ccf import blueprint_api_ccf
    from hhrr_app.resources_api.resource_eps import blueprint_api_eps
    from hhrr_app.resources_api.resource_roles import blueprint_api_role
    from hhrr_app.resources_api.resource_type_id import blueprint_api_type_id
    from hhrr_app.resources_api.resource_employee import blueprint_api_employee
    from hhrr_app.resources_api.resource_age_range import blueprint_api_age_range
    from hhrr_app.resources_api.resource_work_shift import blueprint_api_work_shift
    from hhrr_app.resources_api.resource_rbac import blueprint_api_rbac
    from hhrr_app.resources_api.resource_rbac_modules import blueprint_api_rbac_modules
    from hhrr_app.resources_api.resource_type_affiliation import (
        blueprint_api_type_affiliation,
    )
    from hhrr_app.resources_api.resource_type_contributor import (
        blueprint_api_type_contributor,
    )
    from hhrr_app.resources_api.resource_type_relationship import (
        blueprint_api_type_relationship,
    )
    from hhrr_app.resources_api.resource_auto_perceived_gender import (
        blueprint_api_auto_perceived_gender,
    )
    from hhrr_app.resources_api.resource_employment_relationship import (
        blueprint_api_employment_relationship,
    )

    from hhrr_app.resources_api.resource_diseases import blueprint_api_diseases
    from hhrr_app.resources_api.resource_house_type import blueprint_api_house_type
    from hhrr_app.resources_api.resource_marital_status import (
        blueprint_api_marital_status,
    )
    from hhrr_app.resources_api.resource_race import blueprint_api_race
    from hhrr_app.resources_api.resource_schooling_level import (
        blueprint_api_schooling_level,
    )
    from hhrr_app.resources_api.resource_subhouse_type import (
        blueprint_api_subhouse_type,
    )
    from hhrr_app.resources_api.resource_relationship import (
        blueprint_api_relationship,
    )
    from hhrr_app.resources_api.resource_emergency_contact_details import (
        blueprint_api_emergency_contact_details,
    )
    from hhrr_app.resources_api.resource_ss_employee import blueprint_api_ss_employee
    from hhrr_app.resources_api.resource_health_condition import (
        blueprint_api_health_condition,
    )
    from hhrr_app.resources_api.resource_family_nucleus import (
        blueprint_api_family_nucleus,
    )
    from hhrr_app.resources_api.resource_demographic_data import (
        blueprint_api_demographic_data,
    )
    from hhrr_app.resources_api.resource_sociodemographic_data import (
        blueprint_api_sociodemographic_data,
    )
    from hhrr_app.resources_api.resource_country import blueprint_api_country
    from hhrr_app.resources_api.resource_department import blueprint_api_department
    from hhrr_app.resources_api.resource_city import blueprint_api_city
    from hhrr_app.resources_api.metrics_dashboard_hhrr.dashboard_hhrr import (
        blueprint_api_metrics_hhrr,
    )
    from hhrr_app.resources_api.resource_acces_control import (
        blueprint_api_control_access,
    )
    from hhrr_app.resources_api.resource_states_performance_evaluation import (
        blueprint_api_state_performance_evaluation,
    )
    from hhrr_app.resources_api.resource_performance_evaluation import (
        blueprint_api_performance_evaluation,
    )
    from hhrr_app.resources_api.resource_administrative_performance_evaluation import (
        blueprint_api_administrative_performance_evaluation,
    )
    from hhrr_app.resources_api.resource_directive_performance_evaluation import (
        blueprint_api_directive_performance_evaluation,
    )
    from hhrr_app.resources_api.resource_operative_performance_evaluation import (
        blueprint_api_operative_performance_evaluation,
    )
    from hhrr_app.resources_api.resource_notification import (
        blueprint_api_notification
    )
    from hhrr_app.resources_api.resource_trial_time_evolution import (
        blueprint_api_trial_time_evaluation
    )
    from hhrr_app.resources_api.resource_trial_time_evolution_detail import (
        blueprint_api_trial_time_evaluation_d
    )

    csfr.exempt(blueprint_api_authorization_employee)
    csfr.exempt(blueprint_api_rh)
    csfr.exempt(excel_bp)
    csfr.exempt(blueprint_api_aap)
    csfr.exempt(blueprint_api_afp)
    csfr.exempt(blueprint_api_arl)
    csfr.exempt(blueprint_api_ccf)
    csfr.exempt(blueprint_api_eps)
    csfr.exempt(blueprint_api_race)
    csfr.exempt(blueprint_api_role)
    csfr.exempt(blueprint_api_city)
    csfr.exempt(blueprint_api_country)
    csfr.exempt(blueprint_api_type_id)
    csfr.exempt(blueprint_api_employee)
    csfr.exempt(blueprint_api_diseases)
    csfr.exempt(blueprint_api_age_range)
    csfr.exempt(blueprint_api_house_type)
    csfr.exempt(blueprint_api_department)
    csfr.exempt(blueprint_api_work_shift)
    csfr.exempt(blueprint_api_ss_employee)
    csfr.exempt(blueprint_api_relationship)
    csfr.exempt(blueprint_api_subhouse_type)
    csfr.exempt(blueprint_api_marital_status)
    csfr.exempt(blueprint_api_family_nucleus)
    csfr.exempt(blueprint_api_schooling_level)
    csfr.exempt(blueprint_api_type_affiliation)
    csfr.exempt(blueprint_api_type_contributor)
    csfr.exempt(blueprint_api_health_condition)
    csfr.exempt(blueprint_api_demographic_data)
    csfr.exempt(blueprint_api_type_relationship)
    csfr.exempt(blueprint_api_auto_perceived_gender)
    csfr.exempt(blueprint_api_sociodemographic_data)
    csfr.exempt(blueprint_api_employment_relationship)
    csfr.exempt(blueprint_api_emergency_contact_details)
    csfr.exempt(blueprint_api_metrics_hhrr)
    csfr.exempt(blueprint_api_control_access)
    csfr.exempt(blueprint_api_state_performance_evaluation)
    csfr.exempt(blueprint_api_performance_evaluation)
    csfr.exempt(blueprint_api_administrative_performance_evaluation)
    csfr.exempt(blueprint_api_directive_performance_evaluation)
    csfr.exempt(blueprint_api_operative_performance_evaluation)
    csfr.exempt(blueprint_api_rbac_modules)
    csfr.exempt(blueprint_api_rbac)
    csfr.exempt(blueprint_api_notification)
    csfr.exempt(blueprint_api_trial_time_evaluation)
    csfr.exempt(blueprint_api_trial_time_evaluation_d)

    app.register_blueprint(blueprint_api_control_access, url_prefix="")
    app.register_blueprint(blueprint_api_metrics_hhrr, url_prefix="")
    app.register_blueprint(blueprint_api_rh, url_prefix="")
    app.register_blueprint(blueprint_api_aap, url_prefix="")
    app.register_blueprint(excel_bp, url_prefix="")
    app.register_blueprint(blueprint_api_afp, url_prefix="")
    app.register_blueprint(blueprint_api_arl, url_prefix="")
    app.register_blueprint(blueprint_api_ccf, url_prefix="")
    app.register_blueprint(blueprint_api_eps, url_prefix="")
    app.register_blueprint(blueprint_api_role, url_prefix="")
    app.register_blueprint(blueprint_api_race, url_prefix="")
    app.register_blueprint(blueprint_api_city, url_prefix="")
    app.register_blueprint(blueprint_api_country, url_prefix="")
    app.register_blueprint(blueprint_api_type_id, url_prefix="")
    app.register_blueprint(blueprint_api_diseases, url_prefix="")
    app.register_blueprint(blueprint_api_employee, url_prefix="")
    app.register_blueprint(blueprint_api_age_range, url_prefix="")
    app.register_blueprint(blueprint_api_department, url_prefix="")
    app.register_blueprint(blueprint_api_house_type, url_prefix="")
    app.register_blueprint(blueprint_api_work_shift, url_prefix="")
    app.register_blueprint(blueprint_api_ss_employee, url_prefix="")
    app.register_blueprint(blueprint_api_relationship, url_prefix="")
    app.register_blueprint(blueprint_api_subhouse_type, url_prefix="")
    app.register_blueprint(blueprint_api_marital_status, url_prefix="")
    app.register_blueprint(blueprint_api_family_nucleus, url_prefix="")
    app.register_blueprint(blueprint_api_schooling_level, url_prefix="")
    app.register_blueprint(blueprint_api_type_affiliation, url_prefix="")
    app.register_blueprint(blueprint_api_type_contributor, url_prefix="")
    app.register_blueprint(blueprint_api_demographic_data, url_prefix="")
    app.register_blueprint(blueprint_api_health_condition, url_prefix="")
    app.register_blueprint(blueprint_api_type_relationship, url_prefix="")
    app.register_blueprint(blueprint_api_sociodemographic_data, url_prefix="")
    app.register_blueprint(blueprint_api_auto_perceived_gender, url_prefix="")
    app.register_blueprint(blueprint_api_authorization_employee, url_prefix="")
    app.register_blueprint(blueprint_api_employment_relationship, url_prefix="")
    app.register_blueprint(blueprint_api_emergency_contact_details, url_prefix="")
    app.register_blueprint(blueprint_api_state_performance_evaluation, url_prefix="")
    app.register_blueprint(blueprint_api_performance_evaluation, url_prefix="")
    app.register_blueprint(blueprint_api_rbac, url_prefix="")
    app.register_blueprint(blueprint_api_rbac_modules, url_prefix="")
    app.register_blueprint(
        blueprint_api_administrative_performance_evaluation, url_prefix=""
    )
    app.register_blueprint(
        blueprint_api_directive_performance_evaluation, url_prefix=""
    )
    app.register_blueprint(
        blueprint_api_operative_performance_evaluation, url_prefix=""
    )
    app.register_blueprint(
        blueprint_api_notification, url_prefix=""
    )
    app.register_blueprint(
        blueprint_api_trial_time_evaluation, url_prefix=""
    )
    app.register_blueprint(
        blueprint_api_trial_time_evaluation_d, url_prefix=""
    )
    

    return app
