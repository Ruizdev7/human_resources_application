"""reset_databases

Revision ID: a839e6cf779c
Revises: 9d05416a8c9c
Create Date: 2022-12-16 12:47:17.866135

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a839e6cf779c'
down_revision = '9d05416a8c9c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_foreign_key(None, 'tbl_demographic_data', 'tbl_race', ['ccn_race'], ['ccn_race'])
    op.create_foreign_key(None, 'tbl_demographic_data', 'tbl_city', ['city_residence'], ['ccn_city'])
    op.create_foreign_key(None, 'tbl_demographic_data', 'tbl_employee', ['ccn_employee'], ['ccn_employee'])
    op.create_foreign_key(None, 'tbl_demographic_data', 'tbl_department', ['birth_department'], ['ccn_department'])
    op.create_foreign_key(None, 'tbl_demographic_data', 'tbl_city', ['birth_city'], ['ccn_city'])
    op.create_foreign_key(None, 'tbl_demographic_data', 'tbl_schooling_level', ['ccn_schooling_level'], ['ccn_schooling_level'])
    op.create_foreign_key(None, 'tbl_demographic_data', 'tbl_department', ['department_residence'], ['ccn_department'])
    op.create_foreign_key(None, 'tbl_emergency_contact_details', 'tbl_employee', ['ccn_employee'], ['ccn_employee'])
    op.create_foreign_key(None, 'tbl_emergency_contact_details', 'tbl_relationship', ['ccn_relationship'], ['ccn_relationship'])
    op.create_foreign_key(None, 'tbl_employee', 'tbl_auto_perceived_gender', ['auto_perceived_gender'], ['ccn_auto_perceived_gender'])
    op.create_foreign_key(None, 'tbl_employee', 'tbl_type_id', ['ccn_type_id'], ['ccn_type_id'])
    op.create_foreign_key(None, 'tbl_employee', 'tbl_age_range', ['age_range'], ['ccn_age_range'])
    op.create_foreign_key(None, 'tbl_employee', 'tbl_rh', ['rh'], ['ccn_rh'])
    op.create_foreign_key(None, 'tbl_employment_relationship', 'tbl_employee', ['ccn_employee'], ['ccn_employee'])
    op.create_foreign_key(None, 'tbl_employment_relationship', 'tbl_work_shift', ['ccn_work_shift'], ['ccn_work_shift'])
    op.create_foreign_key(None, 'tbl_employment_relationship', 'tbl_roles', ['ccn_role'], ['ccn_role'])
    op.create_foreign_key(None, 'tbl_employment_relationship', 'tbl_type_relationship', ['ccn_type_relationship'], ['ccn_type_relationship'])
    op.create_foreign_key(None, 'tbl_family_nucleus', 'tbl_employee', ['ccn_employee'], ['ccn_employee'])
    op.create_foreign_key(None, 'tbl_family_nucleus', 'tbl_age_range', ['age_range'], ['ccn_age_range'])
    op.create_foreign_key(None, 'tbl_family_nucleus', 'tbl_auto_perceived_gender', ['ccn_auto_perceived_gender'], ['ccn_auto_perceived_gender'])
    op.create_foreign_key(None, 'tbl_family_nucleus', 'tbl_type_id', ['ccn_type_id'], ['ccn_type_id'])
    op.create_foreign_key(None, 'tbl_family_nucleus', 'tbl_schooling_level', ['ccn_schooling_level'], ['ccn_schooling_level'])
    op.create_foreign_key(None, 'tbl_family_nucleus', 'tbl_marital_status', ['ccn_marital_status'], ['ccn_marital_status'])
    op.create_foreign_key(None, 'tbl_health_condition', 'tbl_employee', ['ccn_employee'], ['ccn_employee'])
    op.create_foreign_key(None, 'tbl_health_condition', 'tbl_diseases', ['ccn_diseases'], ['ccn_diseases'])
    op.create_foreign_key(None, 'tbl_sociodemographic_data', 'tbl_subhouse_type', ['ccn_sub_house_type'], ['ccn_sub_house_type'])
    op.create_foreign_key(None, 'tbl_sociodemographic_data', 'tbl_house_type', ['ccn_house_type'], ['ccn_house_type'])
    op.create_foreign_key(None, 'tbl_sociodemographic_data', 'tbl_employee', ['ccn_employee'], ['ccn_employee'])
    op.create_foreign_key(None, 'tbl_ss_employee', 'tbl_type_affiliation', ['ccn_type_affiliation'], ['ccn_type_affiliation'])
    op.create_foreign_key(None, 'tbl_ss_employee', 'tbl_afp', ['ccn_afp'], ['ccn_afp'])
    op.create_foreign_key(None, 'tbl_ss_employee', 'tbl_ccf', ['ccn_ccf'], ['ccn_ccf'])
    op.create_foreign_key(None, 'tbl_ss_employee', 'tbl_employee', ['ccn_employee'], ['ccn_employee'])
    op.create_foreign_key(None, 'tbl_ss_employee', 'tbl_type_contributor', ['ccn_type_contributor'], ['ccn_type_contributor'])
    op.create_foreign_key(None, 'tbl_ss_employee', 'tbl_eps', ['ccn_eps'], ['ccn_eps'])
    op.create_foreign_key(None, 'tbl_ss_employee', 'tbl_arl', ['ccn_arl'], ['ccn_arl'])
    op.create_foreign_key(None, 'tbl_ss_employee', 'tbl_aap', ['ccn_aap'], ['ccn_aap'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'tbl_ss_employee', type_='foreignkey')
    op.drop_constraint(None, 'tbl_ss_employee', type_='foreignkey')
    op.drop_constraint(None, 'tbl_ss_employee', type_='foreignkey')
    op.drop_constraint(None, 'tbl_ss_employee', type_='foreignkey')
    op.drop_constraint(None, 'tbl_ss_employee', type_='foreignkey')
    op.drop_constraint(None, 'tbl_ss_employee', type_='foreignkey')
    op.drop_constraint(None, 'tbl_ss_employee', type_='foreignkey')
    op.drop_constraint(None, 'tbl_ss_employee', type_='foreignkey')
    op.drop_constraint(None, 'tbl_sociodemographic_data', type_='foreignkey')
    op.drop_constraint(None, 'tbl_sociodemographic_data', type_='foreignkey')
    op.drop_constraint(None, 'tbl_sociodemographic_data', type_='foreignkey')
    op.drop_constraint(None, 'tbl_health_condition', type_='foreignkey')
    op.drop_constraint(None, 'tbl_health_condition', type_='foreignkey')
    op.drop_constraint(None, 'tbl_family_nucleus', type_='foreignkey')
    op.drop_constraint(None, 'tbl_family_nucleus', type_='foreignkey')
    op.drop_constraint(None, 'tbl_family_nucleus', type_='foreignkey')
    op.drop_constraint(None, 'tbl_family_nucleus', type_='foreignkey')
    op.drop_constraint(None, 'tbl_family_nucleus', type_='foreignkey')
    op.drop_constraint(None, 'tbl_family_nucleus', type_='foreignkey')
    op.drop_constraint(None, 'tbl_employment_relationship', type_='foreignkey')
    op.drop_constraint(None, 'tbl_employment_relationship', type_='foreignkey')
    op.drop_constraint(None, 'tbl_employment_relationship', type_='foreignkey')
    op.drop_constraint(None, 'tbl_employment_relationship', type_='foreignkey')
    op.drop_constraint(None, 'tbl_employee', type_='foreignkey')
    op.drop_constraint(None, 'tbl_employee', type_='foreignkey')
    op.drop_constraint(None, 'tbl_employee', type_='foreignkey')
    op.drop_constraint(None, 'tbl_employee', type_='foreignkey')
    op.drop_constraint(None, 'tbl_emergency_contact_details', type_='foreignkey')
    op.drop_constraint(None, 'tbl_emergency_contact_details', type_='foreignkey')
    op.drop_constraint(None, 'tbl_demographic_data', type_='foreignkey')
    op.drop_constraint(None, 'tbl_demographic_data', type_='foreignkey')
    op.drop_constraint(None, 'tbl_demographic_data', type_='foreignkey')
    op.drop_constraint(None, 'tbl_demographic_data', type_='foreignkey')
    op.drop_constraint(None, 'tbl_demographic_data', type_='foreignkey')
    op.drop_constraint(None, 'tbl_demographic_data', type_='foreignkey')
    op.drop_constraint(None, 'tbl_demographic_data', type_='foreignkey')
    # ### end Alembic commands ###