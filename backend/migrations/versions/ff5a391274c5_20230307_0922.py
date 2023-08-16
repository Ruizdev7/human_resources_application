"""20230307_0922

Revision ID: ff5a391274c5
Revises: a2ccb89664fd
Create Date: 2023-03-07 09:22:58.273651

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'ff5a391274c5'
down_revision = 'a2ccb89664fd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('tbl_administrative_performance_evaluation', 'ccn_performance_evaluation',
               existing_type=mysql.INTEGER(),
               nullable=True)
    op.alter_column('tbl_administrative_performance_evaluation', 'ccn_employee',
               existing_type=mysql.INTEGER(),
               nullable=True)
    op.create_foreign_key(None, 'tbl_administrative_performance_evaluation', 'tbl_performance_evaluation', ['ccn_performance_evaluation'], ['ccn_performance_evaluation'])
    op.create_foreign_key(None, 'tbl_administrative_performance_evaluation', 'tbl_employment_relationship', ['ccn_employee'], ['ccn_employee'])
    op.alter_column('tbl_directive_performance_evaluation', 'ccn_performance_evaluation',
               existing_type=mysql.INTEGER(),
               nullable=True)
    op.alter_column('tbl_directive_performance_evaluation', 'ccn_employee',
               existing_type=mysql.INTEGER(),
               nullable=True)
    op.alter_column('tbl_operative_performance_evaluation', 'ccn_performance_evaluation',
               existing_type=mysql.INTEGER(),
               nullable=True)
    op.alter_column('tbl_operative_performance_evaluation', 'ccn_employee',
               existing_type=mysql.INTEGER(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('tbl_operative_performance_evaluation', 'ccn_employee',
               existing_type=mysql.INTEGER(),
               nullable=False)
    op.alter_column('tbl_operative_performance_evaluation', 'ccn_performance_evaluation',
               existing_type=mysql.INTEGER(),
               nullable=False)
    op.alter_column('tbl_directive_performance_evaluation', 'ccn_employee',
               existing_type=mysql.INTEGER(),
               nullable=False)
    op.alter_column('tbl_directive_performance_evaluation', 'ccn_performance_evaluation',
               existing_type=mysql.INTEGER(),
               nullable=False)
    op.drop_constraint(None, 'tbl_administrative_performance_evaluation', type_='foreignkey')
    op.drop_constraint(None, 'tbl_administrative_performance_evaluation', type_='foreignkey')
    op.alter_column('tbl_administrative_performance_evaluation', 'ccn_employee',
               existing_type=mysql.INTEGER(),
               nullable=False)
    op.alter_column('tbl_administrative_performance_evaluation', 'ccn_performance_evaluation',
               existing_type=mysql.INTEGER(),
               nullable=False)
    # ### end Alembic commands ###
