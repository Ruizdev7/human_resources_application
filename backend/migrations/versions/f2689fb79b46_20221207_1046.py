"""20221207_1046

Revision ID: f2689fb79b46
Revises: 577ad265c728
Create Date: 2022-12-07 10:46:35.553142

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'f2689fb79b46'
down_revision = '577ad265c728'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tbl_family_nucleus', sa.Column('ccn_type_id', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'tbl_family_nucleus', 'tbl_auto_perceived_gender', ['ccn_auto_perceived_gender'], ['ccn_auto_perceived_gender'])
    op.create_foreign_key(None, 'tbl_family_nucleus', 'tbl_type_id', ['ccn_type_id'], ['ccn_type_id'])
    op.drop_column('tbl_family_nucleus', 'type_of_document')
    op.drop_column('tbl_family_nucleus', 'sex')
    op.add_column('tbl_health_condition', sa.Column('ccn_employee', sa.Integer(), nullable=False))
    op.alter_column('tbl_health_condition', 'what_allergy',
               existing_type=mysql.VARCHAR(length=255),
               nullable=True)
    op.alter_column('tbl_health_condition', 'what_medicin',
               existing_type=mysql.VARCHAR(length=255),
               nullable=True)
    op.create_foreign_key(None, 'tbl_health_condition', 'tbl_employee', ['ccn_employee'], ['ccn_employee'])
    op.add_column('tbl_sociodemographic_data', sa.Column('ccn_employee', sa.Integer(), nullable=False))
    op.add_column('tbl_sociodemographic_data', sa.Column('relatives', sa.Integer(), nullable=False))
    op.add_column('tbl_sociodemographic_data', sa.Column('people_with_disabilities', sa.Integer(), nullable=False))
    op.add_column('tbl_sociodemographic_data', sa.Column('monthly_income', sa.Integer(), nullable=False))
    op.add_column('tbl_sociodemographic_data', sa.Column('is_income_enougth', sa.String(length=50), nullable=False))
    op.add_column('tbl_sociodemographic_data', sa.Column('sub_house_type', sa.String(length=150), nullable=False))
    op.add_column('tbl_sociodemographic_data', sa.Column('house_type', sa.String(length=150), nullable=False))
    op.add_column('tbl_sociodemographic_data', sa.Column('where_its_located', sa.String(length=100), nullable=False))
    op.add_column('tbl_sociodemographic_data', sa.Column('type_transportation', sa.String(length=150), nullable=False))
    op.add_column('tbl_sociodemographic_data', sa.Column('social_stratum', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'tbl_sociodemographic_data', 'tbl_employee', ['ccn_employee'], ['ccn_employee'])
    op.drop_column('tbl_sociodemographic_data', 'features_of_housing')
    op.drop_column('tbl_sociodemographic_data', 'public_services_stratum')
    op.drop_column('tbl_sociodemographic_data', 'monthly_household_income')
    op.drop_column('tbl_sociodemographic_data', 'type_of_transport_to_go_to_work')
    op.drop_column('tbl_sociodemographic_data', 'housing_type')
    op.drop_column('tbl_sociodemographic_data', 'area_where_its_located')
    op.drop_column('tbl_sociodemographic_data', 'income_reaches')
    op.drop_column('tbl_sociodemographic_data', 'number_of_people_with_disabilities')
    op.drop_column('tbl_sociodemographic_data', 'number_of_people_in_the_home')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tbl_sociodemographic_data', sa.Column('number_of_people_in_the_home', mysql.INTEGER(), autoincrement=False, nullable=False))
    op.add_column('tbl_sociodemographic_data', sa.Column('number_of_people_with_disabilities', mysql.INTEGER(), autoincrement=False, nullable=False))
    op.add_column('tbl_sociodemographic_data', sa.Column('income_reaches', mysql.VARCHAR(length=50), nullable=False))
    op.add_column('tbl_sociodemographic_data', sa.Column('area_where_its_located', mysql.VARCHAR(length=100), nullable=False))
    op.add_column('tbl_sociodemographic_data', sa.Column('housing_type', mysql.VARCHAR(length=150), nullable=False))
    op.add_column('tbl_sociodemographic_data', sa.Column('type_of_transport_to_go_to_work', mysql.VARCHAR(length=150), nullable=False))
    op.add_column('tbl_sociodemographic_data', sa.Column('monthly_household_income', mysql.INTEGER(), autoincrement=False, nullable=False))
    op.add_column('tbl_sociodemographic_data', sa.Column('public_services_stratum', mysql.INTEGER(), autoincrement=False, nullable=False))
    op.add_column('tbl_sociodemographic_data', sa.Column('features_of_housing', mysql.VARCHAR(length=150), nullable=False))
    op.drop_constraint(None, 'tbl_sociodemographic_data', type_='foreignkey')
    op.drop_column('tbl_sociodemographic_data', 'social_stratum')
    op.drop_column('tbl_sociodemographic_data', 'type_transportation')
    op.drop_column('tbl_sociodemographic_data', 'where_its_located')
    op.drop_column('tbl_sociodemographic_data', 'house_type')
    op.drop_column('tbl_sociodemographic_data', 'sub_house_type')
    op.drop_column('tbl_sociodemographic_data', 'is_income_enougth')
    op.drop_column('tbl_sociodemographic_data', 'monthly_income')
    op.drop_column('tbl_sociodemographic_data', 'people_with_disabilities')
    op.drop_column('tbl_sociodemographic_data', 'relatives')
    op.drop_column('tbl_sociodemographic_data', 'ccn_employee')
    op.drop_constraint(None, 'tbl_health_condition', type_='foreignkey')
    op.alter_column('tbl_health_condition', 'what_medicin',
               existing_type=mysql.VARCHAR(length=255),
               nullable=False)
    op.alter_column('tbl_health_condition', 'what_allergy',
               existing_type=mysql.VARCHAR(length=255),
               nullable=False)
    op.drop_column('tbl_health_condition', 'ccn_employee')
    op.add_column('tbl_family_nucleus', sa.Column('sex', mysql.VARCHAR(length=100), nullable=False))
    op.add_column('tbl_family_nucleus', sa.Column('type_of_document', mysql.VARCHAR(length=40), nullable=False))
    op.drop_constraint(None, 'tbl_family_nucleus', type_='foreignkey')
    op.drop_constraint(None, 'tbl_family_nucleus', type_='foreignkey')
    op.drop_column('tbl_family_nucleus', 'ccn_type_id')
    # ### end Alembic commands ###
