"""20230629_0755

Revision ID: 33a7c3729988
Revises: f1a4c54a3d64
Create Date: 2023-06-29 07:55:40.342057

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '33a7c3729988'
down_revision = 'f1a4c54a3d64'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(None, 'tbl_employment_relationship', ['ccn_employee'])
    op.drop_constraint('tbl_family_nucleus_ibfk_1', 'tbl_family_nucleus', type_='foreignkey')
    op.drop_column('tbl_family_nucleus', 'ccn_marital_status')
    op.create_unique_constraint(None, 'tbl_health_condition', ['ccn_employee'])
    op.create_foreign_key(None, 'tbl_performance_evaluation', 'tbl_employment_relationship', ['ccn_employee'], ['ccn_employee'])
    op.create_foreign_key(None, 'tbl_performance_evaluation', 'tbl_employment_relationship', ['immediate_boss'], ['ccn_employee'])
    op.create_foreign_key(None, 'tbl_performance_evaluation', 'tbl_employment_relationship', ['manager'], ['ccn_employee'])
    op.create_unique_constraint(None, 'tbl_sociodemographic_data', ['ccn_employee'])
    op.create_unique_constraint(None, 'tbl_ss_employee', ['ccn_employee'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'tbl_ss_employee', type_='unique')
    op.drop_constraint(None, 'tbl_sociodemographic_data', type_='unique')
    op.drop_constraint(None, 'tbl_performance_evaluation', type_='foreignkey')
    op.drop_constraint(None, 'tbl_performance_evaluation', type_='foreignkey')
    op.drop_constraint(None, 'tbl_performance_evaluation', type_='foreignkey')
    op.drop_constraint(None, 'tbl_health_condition', type_='unique')
    op.add_column('tbl_family_nucleus', sa.Column('ccn_marital_status', mysql.INTEGER(), autoincrement=False, nullable=False))
    op.create_foreign_key('tbl_family_nucleus_ibfk_1', 'tbl_family_nucleus', 'tbl_marital_status', ['ccn_marital_status'], ['ccn_marital_status'])
    op.drop_constraint(None, 'tbl_employment_relationship', type_='unique')
    # ### end Alembic commands ###
