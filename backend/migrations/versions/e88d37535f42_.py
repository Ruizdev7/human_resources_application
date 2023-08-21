"""empty message

Revision ID: e88d37535f42
Revises: 
Create Date: 2023-08-19 10:13:34.730047

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e88d37535f42'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tbl_RBAC_modules',
    sa.Column('ccn_rbac_module', sa.Integer(), nullable=False),
    sa.Column('rbac_module', sa.String(length=100), nullable=True),
    sa.PrimaryKeyConstraint('ccn_rbac_module')
    )
    op.create_table('tbl_aap',
    sa.Column('ccn_aap', sa.Integer(), nullable=False),
    sa.Column('code_aap', sa.String(length=40), nullable=False),
    sa.Column('nit_aap', sa.String(length=20), nullable=False),
    sa.Column('dig_ver', sa.Integer(), nullable=True),
    sa.Column('description_aap', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('ccn_aap')
    )
    op.create_table('tbl_afp',
    sa.Column('ccn_afp', sa.Integer(), nullable=False),
    sa.Column('code_afp', sa.String(length=40), nullable=False),
    sa.Column('nit_afp', sa.String(length=20), nullable=False),
    sa.Column('dig_ver', sa.Integer(), nullable=True),
    sa.Column('description_afp', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('ccn_afp')
    )
    op.create_table('tbl_age_range',
    sa.Column('ccn_age_range', sa.Integer(), nullable=False),
    sa.Column('age_range', sa.String(length=40), nullable=False),
    sa.PrimaryKeyConstraint('ccn_age_range')
    )
    op.create_table('tbl_arl',
    sa.Column('ccn_arl', sa.Integer(), nullable=False),
    sa.Column('code_arl', sa.String(length=40), nullable=False),
    sa.Column('nit_arl', sa.String(length=20), nullable=False),
    sa.Column('dig_ver', sa.Integer(), nullable=True),
    sa.Column('description_arl', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('ccn_arl')
    )
    op.create_table('tbl_auto_perceived_gender',
    sa.Column('ccn_auto_perceived_gender', sa.Integer(), nullable=False),
    sa.Column('auto_perceived_gender', sa.String(length=40), nullable=True),
    sa.PrimaryKeyConstraint('ccn_auto_perceived_gender')
    )
    op.create_table('tbl_ccf',
    sa.Column('ccn_ccf', sa.Integer(), nullable=False),
    sa.Column('code_ccf', sa.String(length=40), nullable=False),
    sa.Column('nit_ccf', sa.String(length=20), nullable=False),
    sa.Column('dig_ver', sa.Integer(), nullable=True),
    sa.Column('description_ccf', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('ccn_ccf')
    )
    op.create_table('tbl_country',
    sa.Column('ccn_country', sa.Integer(), nullable=False),
    sa.Column('id_country', sa.Integer(), nullable=False),
    sa.Column('description_country', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('ccn_country')
    )
    op.create_table('tbl_diseases',
    sa.Column('ccn_diseases', sa.Integer(), nullable=False),
    sa.Column('diseases', sa.String(length=150), nullable=True),
    sa.PrimaryKeyConstraint('ccn_diseases')
    )
    op.create_table('tbl_eps',
    sa.Column('ccn_eps', sa.Integer(), nullable=False),
    sa.Column('code_eps', sa.String(length=40), nullable=True),
    sa.Column('code_sgp_eps', sa.String(length=40), nullable=True),
    sa.Column('nit_eps', sa.String(length=20), nullable=False),
    sa.Column('dig_ver', sa.Integer(), nullable=True),
    sa.Column('description_eps', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('ccn_eps')
    )
    op.create_table('tbl_house_type',
    sa.Column('ccn_house_type', sa.Integer(), nullable=False),
    sa.Column('house_type', sa.String(length=150), nullable=True),
    sa.PrimaryKeyConstraint('ccn_house_type')
    )
    op.create_table('tbl_main_access_control',
    sa.Column('ccn_main_access_control', sa.Integer(), nullable=False),
    sa.Column('date', sa.String(length=40), nullable=False),
    sa.Column('hour', sa.String(length=20), nullable=False),
    sa.Column('number_id_employee', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('area', sa.String(length=100), nullable=False),
    sa.Column('event', sa.String(length=100), nullable=False),
    sa.Column('observations', sa.String(length=200), nullable=True),
    sa.PrimaryKeyConstraint('ccn_main_access_control')
    )
    op.create_table('tbl_marital_status',
    sa.Column('ccn_marital_status', sa.Integer(), nullable=False),
    sa.Column('marital_status', sa.String(length=150), nullable=True),
    sa.PrimaryKeyConstraint('ccn_marital_status')
    )
    op.create_table('tbl_race',
    sa.Column('ccn_race', sa.Integer(), nullable=False),
    sa.Column('description_race', sa.String(length=40), nullable=False),
    sa.PrimaryKeyConstraint('ccn_race')
    )
    op.create_table('tbl_relationship',
    sa.Column('ccn_relationship', sa.Integer(), nullable=False),
    sa.Column('relationship', sa.String(length=50), nullable=True),
    sa.Column('relationship_level', sa.String(length=50), nullable=True),
    sa.PrimaryKeyConstraint('ccn_relationship')
    )
    op.create_table('tbl_rh',
    sa.Column('ccn_rh', sa.Integer(), nullable=False),
    sa.Column('rh', sa.String(length=10), nullable=False),
    sa.PrimaryKeyConstraint('ccn_rh')
    )
    op.create_table('tbl_roles',
    sa.Column('ccn_role', sa.Integer(), nullable=False),
    sa.Column('area', sa.String(length=50), nullable=True),
    sa.Column('role', sa.String(length=50), nullable=True),
    sa.Column('process', sa.String(length=50), nullable=True),
    sa.Column('full_role', sa.String(length=250), nullable=True),
    sa.PrimaryKeyConstraint('ccn_role')
    )
    op.create_table('tbl_schooling_level',
    sa.Column('ccn_schooling_level', sa.Integer(), nullable=False),
    sa.Column('description_schooling_level', sa.String(length=40), nullable=False),
    sa.PrimaryKeyConstraint('ccn_schooling_level')
    )
    op.create_table('tbl_states_performance_evaluation',
    sa.Column('ccn_states_performance_evaluation', sa.Integer(), nullable=False),
    sa.Column('states_performance_evaluation', sa.String(length=20), nullable=False),
    sa.PrimaryKeyConstraint('ccn_states_performance_evaluation')
    )
    op.create_table('tbl_subhouse_type',
    sa.Column('ccn_sub_house_type', sa.Integer(), nullable=False),
    sa.Column('sub_house_type', sa.String(length=150), nullable=True),
    sa.PrimaryKeyConstraint('ccn_sub_house_type')
    )
    op.create_table('tbl_type_affiliation',
    sa.Column('ccn_type_affiliation', sa.Integer(), nullable=False),
    sa.Column('affiliation_code', sa.Integer(), nullable=False),
    sa.Column('description_type_affiliation', sa.String(length=30), nullable=False),
    sa.PrimaryKeyConstraint('ccn_type_affiliation')
    )
    op.create_table('tbl_type_contributor',
    sa.Column('ccn_type_contributor', sa.Integer(), nullable=False),
    sa.Column('contributor_code', sa.Integer(), nullable=False),
    sa.Column('description_type_contributor', sa.String(length=200), nullable=False),
    sa.PrimaryKeyConstraint('ccn_type_contributor')
    )
    op.create_table('tbl_type_id',
    sa.Column('ccn_type_id', sa.Integer(), nullable=False),
    sa.Column('type_id', sa.String(length=3), nullable=False),
    sa.Column('description_type_id', sa.String(length=40), nullable=False),
    sa.PrimaryKeyConstraint('ccn_type_id')
    )
    op.create_table('tbl_type_relationship',
    sa.Column('ccn_type_relationship', sa.Integer(), nullable=False),
    sa.Column('description_type_relationship', sa.String(length=40), nullable=False),
    sa.PrimaryKeyConstraint('ccn_type_relationship')
    )
    op.create_table('tbl_work_shift',
    sa.Column('ccn_work_shift', sa.Integer(), nullable=False),
    sa.Column('description_work_shift', sa.String(length=40), nullable=False),
    sa.PrimaryKeyConstraint('ccn_work_shift')
    )
    op.create_table('tbl_RBAC',
    sa.Column('ccn_rbac', sa.Integer(), nullable=False),
    sa.Column('ccn_role', sa.Integer(), nullable=True),
    sa.Column('ccn_rbac_module', sa.Integer(), nullable=True),
    sa.Column('create_access', sa.Boolean(), nullable=True),
    sa.Column('read_access', sa.Boolean(), nullable=True),
    sa.Column('update_access', sa.Boolean(), nullable=True),
    sa.Column('delete_access', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['ccn_rbac_module'], ['tbl_RBAC_modules.ccn_rbac_module'], ),
    sa.ForeignKeyConstraint(['ccn_role'], ['tbl_roles.ccn_role'], ),
    sa.PrimaryKeyConstraint('ccn_rbac')
    )
    op.create_table('tbl_department',
    sa.Column('ccn_department', sa.Integer(), nullable=False),
    sa.Column('id_department', sa.Integer(), nullable=False),
    sa.Column('descripcion_department', sa.String(length=60), nullable=False),
    sa.Column('ccn_country', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['ccn_country'], ['tbl_country.ccn_country'], ),
    sa.PrimaryKeyConstraint('ccn_department')
    )
    op.create_table('tbl_employee',
    sa.Column('ccn_employee', sa.Integer(), nullable=False),
    sa.Column('ccn_type_id', sa.Integer(), nullable=True),
    sa.Column('number_id_employee', sa.BigInteger(), nullable=False),
    sa.Column('first_name_employee', sa.String(length=30), nullable=False),
    sa.Column('middle_name_employee', sa.String(length=30), nullable=True),
    sa.Column('first_last_name_employee', sa.String(length=30), nullable=False),
    sa.Column('second_last_name_employee', sa.String(length=30), nullable=True),
    sa.Column('full_name_employee', sa.String(length=200), nullable=False),
    sa.Column('date_birth_employee', sa.Date(), nullable=False),
    sa.Column('age', sa.Integer(), nullable=False),
    sa.Column('age_range', sa.Integer(), nullable=True),
    sa.Column('auto_perceived_gender', sa.Integer(), nullable=True),
    sa.Column('rh', sa.Integer(), nullable=True),
    sa.Column('employee_personal_email', sa.String(length=100), nullable=False),
    sa.Column('employee_personal_cellphone', sa.BigInteger(), nullable=False),
    sa.Column('informed_consent_law_1581', sa.String(length=10), nullable=False),
    sa.Column('image', sa.String(length=255), nullable=True),
    sa.Column('employee_password', sa.String(length=300), nullable=False),
    sa.Column('last_message_read_time', sa.DateTime(), nullable=True),
    sa.Column('ccn_marital_status', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['age_range'], ['tbl_age_range.ccn_age_range'], ),
    sa.ForeignKeyConstraint(['auto_perceived_gender'], ['tbl_auto_perceived_gender.ccn_auto_perceived_gender'], ),
    sa.ForeignKeyConstraint(['ccn_marital_status'], ['tbl_marital_status.ccn_marital_status'], ),
    sa.ForeignKeyConstraint(['ccn_type_id'], ['tbl_type_id.ccn_type_id'], ),
    sa.ForeignKeyConstraint(['rh'], ['tbl_rh.ccn_rh'], ),
    sa.PrimaryKeyConstraint('ccn_employee'),
    sa.UniqueConstraint('number_id_employee')
    )
    op.create_table('tbl_city',
    sa.Column('ccn_city', sa.Integer(), nullable=False),
    sa.Column('id_city', sa.Integer(), nullable=False),
    sa.Column('description_city', sa.String(length=60), nullable=False),
    sa.Column('ccn_department', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['ccn_department'], ['tbl_department.ccn_department'], ),
    sa.PrimaryKeyConstraint('ccn_city')
    )
    op.create_table('tbl_emergency_contact_details',
    sa.Column('ccn_emergency_contact_details', sa.Integer(), nullable=False),
    sa.Column('ccn_employee', sa.Integer(), nullable=True),
    sa.Column('emergency_contact', sa.String(length=60), nullable=False),
    sa.Column('ccn_relationship', sa.Integer(), nullable=True),
    sa.Column('cellphone', sa.BigInteger(), nullable=False),
    sa.ForeignKeyConstraint(['ccn_employee'], ['tbl_employee.ccn_employee'], ),
    sa.ForeignKeyConstraint(['ccn_relationship'], ['tbl_relationship.ccn_relationship'], ),
    sa.PrimaryKeyConstraint('ccn_emergency_contact_details'),
    sa.UniqueConstraint('ccn_employee')
    )
    op.create_table('tbl_employment_relationship',
    sa.Column('ccn_employment_relationship', sa.Integer(), nullable=False),
    sa.Column('ccn_employee', sa.Integer(), nullable=True),
    sa.Column('ccn_role', sa.Integer(), nullable=True),
    sa.Column('ccn_work_shift', sa.Integer(), nullable=True),
    sa.Column('binding_date', sa.Date(), nullable=False),
    sa.Column('termination_date', sa.Date(), nullable=True),
    sa.Column('time_worked', sa.String(length=255), nullable=False),
    sa.Column('pending_days_to_enjoy_for_holidays', sa.Float(), nullable=True),
    sa.Column('ccn_type_relationship', sa.Integer(), nullable=True),
    sa.Column('employee_corporate_email', sa.String(length=100), nullable=False),
    sa.Column('employee_corporate_cellphone', sa.BigInteger(), nullable=False),
    sa.Column('immediate_boss', sa.Integer(), nullable=True),
    sa.Column('manager', sa.Integer(), nullable=True),
    sa.Column('type_of_charge', sa.String(length=50), nullable=False),
    sa.Column('is_active_employee', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['ccn_employee'], ['tbl_employee.ccn_employee'], ),
    sa.ForeignKeyConstraint(['ccn_role'], ['tbl_roles.ccn_role'], ),
    sa.ForeignKeyConstraint(['ccn_type_relationship'], ['tbl_type_relationship.ccn_type_relationship'], ),
    sa.ForeignKeyConstraint(['ccn_work_shift'], ['tbl_work_shift.ccn_work_shift'], ),
    sa.ForeignKeyConstraint(['immediate_boss'], ['tbl_employee.ccn_employee'], ),
    sa.ForeignKeyConstraint(['manager'], ['tbl_employee.ccn_employee'], ),
    sa.PrimaryKeyConstraint('ccn_employment_relationship'),
    sa.UniqueConstraint('ccn_employee')
    )
    op.create_table('tbl_family_nucleus',
    sa.Column('ccn_family_nucleus', sa.Integer(), nullable=False),
    sa.Column('ccn_employee', sa.Integer(), nullable=False),
    sa.Column('number_of_children', sa.BigInteger(), nullable=True),
    sa.Column('ccn_type_id', sa.Integer(), nullable=False),
    sa.Column('number_id', sa.BigInteger(), nullable=True),
    sa.Column('ccn_auto_perceived_gender', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=30), nullable=True),
    sa.Column('middle_name', sa.String(length=30), nullable=True),
    sa.Column('first_last_name', sa.String(length=30), nullable=True),
    sa.Column('second_last_name', sa.String(length=30), nullable=True),
    sa.Column('date_of_birth', sa.Date(), nullable=True),
    sa.Column('age', sa.Integer(), nullable=True),
    sa.Column('age_range', sa.Integer(), nullable=False),
    sa.Column('ccn_schooling_level', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['age_range'], ['tbl_age_range.ccn_age_range'], ),
    sa.ForeignKeyConstraint(['ccn_auto_perceived_gender'], ['tbl_auto_perceived_gender.ccn_auto_perceived_gender'], ),
    sa.ForeignKeyConstraint(['ccn_employee'], ['tbl_employee.ccn_employee'], ),
    sa.ForeignKeyConstraint(['ccn_schooling_level'], ['tbl_schooling_level.ccn_schooling_level'], ),
    sa.ForeignKeyConstraint(['ccn_type_id'], ['tbl_type_id.ccn_type_id'], ),
    sa.PrimaryKeyConstraint('ccn_family_nucleus')
    )
    op.create_table('tbl_health_condition',
    sa.Column('ccn_health_condition', sa.Integer(), nullable=False),
    sa.Column('ccn_employee', sa.Integer(), nullable=False),
    sa.Column('consume_alcoholic_beverages', sa.String(length=50), nullable=False),
    sa.Column('ccn_diseases', sa.Integer(), nullable=False),
    sa.Column('allergies', sa.String(length=50), nullable=False),
    sa.Column('what_allergy', sa.String(length=255), nullable=True),
    sa.Column('medicines', sa.String(length=50), nullable=False),
    sa.Column('what_medicin', sa.String(length=255), nullable=True),
    sa.Column('last_medical_consultation', sa.String(length=255), nullable=False),
    sa.Column('plan_to_drink_less_alcoholic_beverages', sa.String(length=50), nullable=False),
    sa.Column('discomfort_due_to_criticism_when_ingesting_alcohol', sa.String(length=50), nullable=False),
    sa.Column('need_to_drink_alcohol_in_the_morning', sa.String(length=50), nullable=False),
    sa.Column('physical_activity_3_times_a_week_30_minutes', sa.String(length=50), nullable=False),
    sa.Column('he_is_a_smoker', sa.String(length=50), nullable=False),
    sa.Column('how_many_cigarettes_a_day', sa.Integer(), nullable=False),
    sa.Column('he_is_ex_smoker', sa.String(length=50), nullable=False),
    sa.Column('consume_psychoactive_substances', sa.String(length=50), nullable=False),
    sa.Column('used_psychoactive_substances_before', sa.String(length=50), nullable=False),
    sa.Column('what_psychoactive_substances', sa.String(length=255), nullable=False),
    sa.ForeignKeyConstraint(['ccn_diseases'], ['tbl_diseases.ccn_diseases'], ),
    sa.ForeignKeyConstraint(['ccn_employee'], ['tbl_employee.ccn_employee'], ),
    sa.PrimaryKeyConstraint('ccn_health_condition'),
    sa.UniqueConstraint('ccn_employee')
    )
    op.create_table('tbl_message',
    sa.Column('ccn_message', sa.Integer(), nullable=False),
    sa.Column('ccn_sender', sa.Integer(), nullable=True),
    sa.Column('ccn_recipient', sa.Integer(), nullable=True),
    sa.Column('title_message', sa.String(length=50), nullable=False),
    sa.Column('body_message', sa.String(length=240), nullable=False),
    sa.Column('time_stamp', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['ccn_recipient'], ['tbl_employee.ccn_employee'], ),
    sa.ForeignKeyConstraint(['ccn_sender'], ['tbl_employee.ccn_employee'], ),
    sa.PrimaryKeyConstraint('ccn_message')
    )
    op.create_index(op.f('ix_tbl_message_time_stamp'), 'tbl_message', ['time_stamp'], unique=False)
    op.create_table('tbl_notification',
    sa.Column('ccn_notification', sa.Integer(), nullable=False),
    sa.Column('ccn_employee', sa.Integer(), nullable=True),
    sa.Column('event_name', sa.String(length=100), nullable=False),
    sa.Column('content', sa.String(length=200), nullable=False),
    sa.Column('link', sa.String(length=250), nullable=True),
    sa.Column('is_checked', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['ccn_employee'], ['tbl_employee.ccn_employee'], ),
    sa.PrimaryKeyConstraint('ccn_notification')
    )
    op.create_table('tbl_sociodemographic_data',
    sa.Column('ccn_sociodemographic_data', sa.Integer(), nullable=False),
    sa.Column('ccn_employee', sa.Integer(), nullable=False),
    sa.Column('other_dependents', sa.String(length=50), nullable=False),
    sa.Column('relatives', sa.Integer(), nullable=False),
    sa.Column('how_many_people_in_change', sa.Integer(), nullable=False),
    sa.Column('people_with_disabilities', sa.Integer(), nullable=False),
    sa.Column('monthly_income', sa.String(length=50), nullable=False),
    sa.Column('is_income_enougth', sa.String(length=50), nullable=False),
    sa.Column('ccn_sub_house_type', sa.Integer(), nullable=False),
    sa.Column('ccn_house_type', sa.Integer(), nullable=False),
    sa.Column('where_its_located', sa.String(length=100), nullable=False),
    sa.Column('residence_address', sa.String(length=300), nullable=False),
    sa.Column('neighborhood', sa.String(length=200), nullable=False),
    sa.Column('type_transportation', sa.String(length=150), nullable=False),
    sa.Column('type_transportation_2', sa.String(length=150), nullable=False),
    sa.Column('social_stratum', sa.Integer(), nullable=False),
    sa.Column('electric_power', sa.String(length=50), nullable=False),
    sa.Column('sewerage', sa.String(length=50), nullable=False),
    sa.Column('aqueduct', sa.String(length=50), nullable=False),
    sa.Column('natural_gas', sa.String(length=50), nullable=False),
    sa.Column('garbage_collection', sa.String(length=50), nullable=False),
    sa.Column('landline', sa.String(length=50), nullable=False),
    sa.Column('debts', sa.String(length=50), nullable=False),
    sa.Column('debt_refinancing', sa.String(length=50), nullable=False),
    sa.Column('computer_at_home', sa.String(length=50), nullable=False),
    sa.Column('have_internet_access', sa.String(length=50), nullable=False),
    sa.ForeignKeyConstraint(['ccn_employee'], ['tbl_employee.ccn_employee'], ),
    sa.ForeignKeyConstraint(['ccn_house_type'], ['tbl_house_type.ccn_house_type'], ),
    sa.ForeignKeyConstraint(['ccn_sub_house_type'], ['tbl_subhouse_type.ccn_sub_house_type'], ),
    sa.PrimaryKeyConstraint('ccn_sociodemographic_data'),
    sa.UniqueConstraint('ccn_employee')
    )
    op.create_table('tbl_ss_employee',
    sa.Column('ccn_ss_employee', sa.Integer(), nullable=False),
    sa.Column('ccn_employee', sa.Integer(), nullable=True),
    sa.Column('ccn_type_affiliation', sa.Integer(), nullable=True),
    sa.Column('ccn_type_contributor', sa.Integer(), nullable=True),
    sa.Column('ccn_eps', sa.Integer(), nullable=True),
    sa.Column('ccn_afp', sa.Integer(), nullable=True),
    sa.Column('ccn_arl', sa.Integer(), nullable=True),
    sa.Column('ccn_ccf', sa.Integer(), nullable=True),
    sa.Column('ccn_aap', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['ccn_aap'], ['tbl_aap.ccn_aap'], ),
    sa.ForeignKeyConstraint(['ccn_afp'], ['tbl_afp.ccn_afp'], ),
    sa.ForeignKeyConstraint(['ccn_arl'], ['tbl_arl.ccn_arl'], ),
    sa.ForeignKeyConstraint(['ccn_ccf'], ['tbl_ccf.ccn_ccf'], ),
    sa.ForeignKeyConstraint(['ccn_employee'], ['tbl_employee.ccn_employee'], ),
    sa.ForeignKeyConstraint(['ccn_eps'], ['tbl_eps.ccn_eps'], ),
    sa.ForeignKeyConstraint(['ccn_type_affiliation'], ['tbl_type_affiliation.ccn_type_affiliation'], ),
    sa.ForeignKeyConstraint(['ccn_type_contributor'], ['tbl_type_contributor.ccn_type_contributor'], ),
    sa.PrimaryKeyConstraint('ccn_ss_employee'),
    sa.UniqueConstraint('ccn_employee')
    )
    op.create_table('tbl_trial_time_evaluation',
    sa.Column('ccn_trial_time_evaluation', sa.Integer(), nullable=False),
    sa.Column('ccn_employee', sa.Integer(), nullable=True),
    sa.Column('ccn_hhrr_manager', sa.Integer(), nullable=True),
    sa.Column('ccn_immediate_boss', sa.Integer(), nullable=True),
    sa.Column('ccn_order_state', sa.Integer(), nullable=True),
    sa.Column('date_employee_response', sa.Date(), nullable=False),
    sa.Column('date_immediate_boss', sa.Date(), nullable=False),
    sa.Column('created_date', sa.Date(), nullable=False),
    sa.Column('hhrr_manager_date', sa.Date(), nullable=False),
    sa.ForeignKeyConstraint(['ccn_employee'], ['tbl_employee.ccn_employee'], ),
    sa.ForeignKeyConstraint(['ccn_hhrr_manager'], ['tbl_employee.ccn_employee'], ),
    sa.ForeignKeyConstraint(['ccn_immediate_boss'], ['tbl_employee.ccn_employee'], ),
    sa.ForeignKeyConstraint(['ccn_order_state'], ['tbl_states_performance_evaluation.ccn_states_performance_evaluation'], ),
    sa.PrimaryKeyConstraint('ccn_trial_time_evaluation')
    )
    op.create_table('tbl_demographic_data',
    sa.Column('ccn_demographic_data', sa.Integer(), nullable=False),
    sa.Column('ccn_employee', sa.Integer(), nullable=True),
    sa.Column('birth_country', sa.Integer(), nullable=True),
    sa.Column('birth_department', sa.Integer(), nullable=True),
    sa.Column('birth_city', sa.Integer(), nullable=True),
    sa.Column('country_residence', sa.Integer(), nullable=True),
    sa.Column('department_residence', sa.Integer(), nullable=True),
    sa.Column('city_residence', sa.Integer(), nullable=True),
    sa.Column('ccn_schooling_level', sa.Integer(), nullable=True),
    sa.Column('ccn_race', sa.Integer(), nullable=True),
    sa.Column('is_head_of_household', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['birth_city'], ['tbl_city.ccn_city'], ),
    sa.ForeignKeyConstraint(['birth_country'], ['tbl_country.ccn_country'], ),
    sa.ForeignKeyConstraint(['birth_department'], ['tbl_department.ccn_department'], ),
    sa.ForeignKeyConstraint(['ccn_employee'], ['tbl_employee.ccn_employee'], ),
    sa.ForeignKeyConstraint(['ccn_race'], ['tbl_race.ccn_race'], ),
    sa.ForeignKeyConstraint(['ccn_schooling_level'], ['tbl_schooling_level.ccn_schooling_level'], ),
    sa.ForeignKeyConstraint(['city_residence'], ['tbl_city.ccn_city'], ),
    sa.ForeignKeyConstraint(['country_residence'], ['tbl_country.ccn_country'], ),
    sa.ForeignKeyConstraint(['department_residence'], ['tbl_department.ccn_department'], ),
    sa.PrimaryKeyConstraint('ccn_demographic_data'),
    sa.UniqueConstraint('ccn_employee')
    )
    op.create_table('tbl_performance_evaluation',
    sa.Column('ccn_performance_evaluation', sa.Integer(), nullable=False),
    sa.Column('opening_date', sa.DateTime(), nullable=True),
    sa.Column('entry_date', sa.DateTime(), nullable=True),
    sa.Column('action_date', sa.DateTime(), nullable=True),
    sa.Column('immediate_boss_question_date', sa.DateTime(), nullable=True),
    sa.Column('employee_response_date', sa.DateTime(), nullable=True),
    sa.Column('action_plan_date', sa.DateTime(), nullable=True),
    sa.Column('finish_date', sa.DateTime(), nullable=True),
    sa.Column('immediate_boss', sa.Integer(), nullable=True),
    sa.Column('manager', sa.Integer(), nullable=True),
    sa.Column('ccn_employee', sa.Integer(), nullable=True),
    sa.Column('ccn_states_performance_evaluation', sa.Integer(), nullable=True),
    sa.Column('type_employee', sa.String(length=50), nullable=False),
    sa.ForeignKeyConstraint(['ccn_employee'], ['tbl_employment_relationship.ccn_employee'], ),
    sa.ForeignKeyConstraint(['ccn_states_performance_evaluation'], ['tbl_states_performance_evaluation.ccn_states_performance_evaluation'], ),
    sa.ForeignKeyConstraint(['immediate_boss'], ['tbl_employment_relationship.ccn_employee'], ),
    sa.ForeignKeyConstraint(['manager'], ['tbl_employment_relationship.ccn_employee'], ),
    sa.PrimaryKeyConstraint('ccn_performance_evaluation')
    )
    op.create_table('tbl_trial_time_evaluation_detail',
    sa.Column('ccn_trial_time_evaluation_detail', sa.Integer(), nullable=False),
    sa.Column('ccn_trial_time_evaluation', sa.Integer(), nullable=True),
    sa.Column('initiative_coperation', sa.Integer(), nullable=True),
    sa.Column('teamwork', sa.Integer(), nullable=True),
    sa.Column('responsability', sa.Integer(), nullable=True),
    sa.Column('accountability_discipline', sa.Integer(), nullable=True),
    sa.Column('work_quality', sa.Integer(), nullable=True),
    sa.Column('productivity', sa.Integer(), nullable=True),
    sa.Column('agility_discipline', sa.Integer(), nullable=True),
    sa.Column('hseq', sa.Integer(), nullable=True),
    sa.Column('total_score', sa.Integer(), nullable=True),
    sa.Column('initial_induction', sa.Boolean(), nullable=True),
    sa.Column('coorporative_principles', sa.Boolean(), nullable=True),
    sa.Column('strength', sa.String(length=500), nullable=True),
    sa.Column('improve_areas', sa.String(length=500), nullable=True),
    sa.Column('employee_approval', sa.Boolean(), nullable=True),
    sa.Column('employee_choice_reason', sa.String(length=500), nullable=True),
    sa.Column('hhrr_approval', sa.Boolean(), nullable=True),
    sa.Column('hhrr_choice_reason', sa.String(length=500), nullable=True),
    sa.ForeignKeyConstraint(['ccn_trial_time_evaluation'], ['tbl_trial_time_evaluation.ccn_trial_time_evaluation'], ),
    sa.PrimaryKeyConstraint('ccn_trial_time_evaluation_detail')
    )
    op.create_table('tbl_administrative_performance_evaluation',
    sa.Column('ccn_administrative_performance_evaluation', sa.Integer(), nullable=False),
    sa.Column('ccn_performance_evaluation', sa.Integer(), nullable=True),
    sa.Column('ccn_employee', sa.Integer(), nullable=True),
    sa.Column('engagement_or_productivity', sa.String(length=10), nullable=True),
    sa.Column('communication_skills', sa.String(length=10), nullable=True),
    sa.Column('adaptation_to_change', sa.String(length=10), nullable=True),
    sa.Column('customer_orientation', sa.String(length=10), nullable=True),
    sa.Column('innovation', sa.String(length=10), nullable=True),
    sa.Column('professional_rigor', sa.String(length=10), nullable=True),
    sa.Column('problem_resolution', sa.String(length=10), nullable=True),
    sa.Column('leadership', sa.String(length=10), nullable=True),
    sa.Column('organization', sa.String(length=10), nullable=True),
    sa.Column('overall_score', sa.Integer(), nullable=True),
    sa.Column('level_value', sa.String(length=50), nullable=True),
    sa.Column('employee_response', sa.String(length=300), nullable=True),
    sa.Column('first_action_plan', sa.String(length=50), nullable=True),
    sa.Column('first_action_plan_date', sa.String(length=10), nullable=True),
    sa.Column('first_period_of_execution', sa.String(length=100), nullable=True),
    sa.Column('second_action_plan', sa.String(length=50), nullable=True),
    sa.Column('second_action_plan_date', sa.String(length=10), nullable=True),
    sa.Column('second_period_of_execution', sa.String(length=100), nullable=True),
    sa.Column('third_action_plan', sa.String(length=50), nullable=True),
    sa.Column('third_action_plan_date', sa.String(length=10), nullable=True),
    sa.Column('third_period_of_execution', sa.String(length=100), nullable=True),
    sa.Column('immediate_boss_observation', sa.String(length=100), nullable=True),
    sa.Column('manager_response', sa.String(length=250), nullable=True),
    sa.Column('manager_approval', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['ccn_employee'], ['tbl_employment_relationship.ccn_employee'], ),
    sa.ForeignKeyConstraint(['ccn_performance_evaluation'], ['tbl_performance_evaluation.ccn_performance_evaluation'], ),
    sa.PrimaryKeyConstraint('ccn_administrative_performance_evaluation')
    )
    op.create_table('tbl_directive_performance_evaluation',
    sa.Column('ccn_directive_performance_evaluation', sa.Integer(), nullable=False),
    sa.Column('ccn_performance_evaluation', sa.Integer(), nullable=True),
    sa.Column('ccn_employee', sa.Integer(), nullable=True),
    sa.Column('engagement_or_productivity', sa.String(length=10), nullable=True),
    sa.Column('communication_skills', sa.String(length=10), nullable=True),
    sa.Column('adaptation_to_change', sa.String(length=10), nullable=True),
    sa.Column('customer_orientation', sa.String(length=10), nullable=True),
    sa.Column('innovation', sa.String(length=10), nullable=True),
    sa.Column('professional_rigor', sa.String(length=10), nullable=True),
    sa.Column('problem_resolution', sa.String(length=10), nullable=True),
    sa.Column('leadership', sa.String(length=10), nullable=True),
    sa.Column('organization', sa.String(length=10), nullable=True),
    sa.Column('overall_score', sa.Integer(), nullable=True),
    sa.Column('level_value', sa.String(length=50), nullable=True),
    sa.Column('employee_response', sa.String(length=300), nullable=True),
    sa.Column('first_action_plan', sa.String(length=50), nullable=True),
    sa.Column('first_action_plan_date', sa.String(length=10), nullable=True),
    sa.Column('first_period_of_execution', sa.String(length=100), nullable=True),
    sa.Column('second_action_plan', sa.String(length=50), nullable=True),
    sa.Column('second_action_plan_date', sa.String(length=10), nullable=True),
    sa.Column('second_period_of_execution', sa.String(length=100), nullable=True),
    sa.Column('third_action_plan', sa.String(length=50), nullable=True),
    sa.Column('third_action_plan_date', sa.String(length=10), nullable=True),
    sa.Column('third_period_of_execution', sa.String(length=100), nullable=True),
    sa.Column('immediate_boss_observation', sa.String(length=100), nullable=True),
    sa.Column('manager_response', sa.String(length=250), nullable=True),
    sa.Column('manager_approval', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['ccn_employee'], ['tbl_employment_relationship.ccn_employee'], ),
    sa.ForeignKeyConstraint(['ccn_performance_evaluation'], ['tbl_performance_evaluation.ccn_performance_evaluation'], ),
    sa.PrimaryKeyConstraint('ccn_directive_performance_evaluation')
    )
    op.create_table('tbl_operative_performance_evaluation',
    sa.Column('ccn_operative_performance_evaluation', sa.Integer(), nullable=False),
    sa.Column('ccn_performance_evaluation', sa.Integer(), nullable=True),
    sa.Column('ccn_employee', sa.Integer(), nullable=True),
    sa.Column('engagement_or_productivity', sa.String(length=10), nullable=True),
    sa.Column('communication_skills', sa.String(length=10), nullable=True),
    sa.Column('adaptation_to_change', sa.String(length=10), nullable=True),
    sa.Column('learning_and_development', sa.String(length=10), nullable=True),
    sa.Column('organization', sa.String(length=10), nullable=True),
    sa.Column('continuous_improvement', sa.String(length=10), nullable=True),
    sa.Column('active_participation', sa.String(length=10), nullable=True),
    sa.Column('relations', sa.String(length=10), nullable=True),
    sa.Column('puntuality', sa.String(length=10), nullable=True),
    sa.Column('overall_score', sa.Integer(), nullable=True),
    sa.Column('level_value', sa.String(length=50), nullable=True),
    sa.Column('employee_response', sa.String(length=300), nullable=True),
    sa.Column('first_action_plan', sa.String(length=50), nullable=True),
    sa.Column('first_action_plan_date', sa.String(length=10), nullable=True),
    sa.Column('first_period_of_execution', sa.String(length=100), nullable=True),
    sa.Column('second_action_plan', sa.String(length=50), nullable=True),
    sa.Column('second_action_plan_date', sa.String(length=10), nullable=True),
    sa.Column('second_period_of_execution', sa.String(length=100), nullable=True),
    sa.Column('third_action_plan', sa.String(length=50), nullable=True),
    sa.Column('third_action_plan_date', sa.String(length=10), nullable=True),
    sa.Column('third_period_of_execution', sa.String(length=100), nullable=True),
    sa.Column('immediate_boss_observation', sa.String(length=100), nullable=True),
    sa.Column('manager_response', sa.String(length=250), nullable=True),
    sa.Column('manager_approval', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['ccn_employee'], ['tbl_employment_relationship.ccn_employee'], ),
    sa.ForeignKeyConstraint(['ccn_performance_evaluation'], ['tbl_performance_evaluation.ccn_performance_evaluation'], ),
    sa.PrimaryKeyConstraint('ccn_operative_performance_evaluation')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tbl_operative_performance_evaluation')
    op.drop_table('tbl_directive_performance_evaluation')
    op.drop_table('tbl_administrative_performance_evaluation')
    op.drop_table('tbl_trial_time_evaluation_detail')
    op.drop_table('tbl_performance_evaluation')
    op.drop_table('tbl_demographic_data')
    op.drop_table('tbl_trial_time_evaluation')
    op.drop_table('tbl_ss_employee')
    op.drop_table('tbl_sociodemographic_data')
    op.drop_table('tbl_notification')
    op.drop_index(op.f('ix_tbl_message_time_stamp'), table_name='tbl_message')
    op.drop_table('tbl_message')
    op.drop_table('tbl_health_condition')
    op.drop_table('tbl_family_nucleus')
    op.drop_table('tbl_employment_relationship')
    op.drop_table('tbl_emergency_contact_details')
    op.drop_table('tbl_city')
    op.drop_table('tbl_employee')
    op.drop_table('tbl_department')
    op.drop_table('tbl_RBAC')
    op.drop_table('tbl_work_shift')
    op.drop_table('tbl_type_relationship')
    op.drop_table('tbl_type_id')
    op.drop_table('tbl_type_contributor')
    op.drop_table('tbl_type_affiliation')
    op.drop_table('tbl_subhouse_type')
    op.drop_table('tbl_states_performance_evaluation')
    op.drop_table('tbl_schooling_level')
    op.drop_table('tbl_roles')
    op.drop_table('tbl_rh')
    op.drop_table('tbl_relationship')
    op.drop_table('tbl_race')
    op.drop_table('tbl_marital_status')
    op.drop_table('tbl_main_access_control')
    op.drop_table('tbl_house_type')
    op.drop_table('tbl_eps')
    op.drop_table('tbl_diseases')
    op.drop_table('tbl_country')
    op.drop_table('tbl_ccf')
    op.drop_table('tbl_auto_perceived_gender')
    op.drop_table('tbl_arl')
    op.drop_table('tbl_age_range')
    op.drop_table('tbl_afp')
    op.drop_table('tbl_aap')
    op.drop_table('tbl_RBAC_modules')
    # ### end Alembic commands ###