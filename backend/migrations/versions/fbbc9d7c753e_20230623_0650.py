"""20230623_0650

Revision ID: fbbc9d7c753e
Revises: 79f940e53d4b
Create Date: 2023-06-23 06:50:45.017557

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'fbbc9d7c753e'
down_revision = '79f940e53d4b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tbl_employee', sa.Column('ccn_marital_status', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'tbl_employee', 'tbl_marital_status', ['ccn_marital_status'], ['ccn_marital_status'])
    op.drop_constraint('tbl_family_nucleus_ibfk_1', 'tbl_family_nucleus', type_='foreignkey')
    op.drop_column('tbl_family_nucleus', 'ccn_marital_status')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tbl_family_nucleus', sa.Column('ccn_marital_status', mysql.INTEGER(), autoincrement=False, nullable=False))
    op.create_foreign_key('tbl_family_nucleus_ibfk_1', 'tbl_family_nucleus', 'tbl_marital_status', ['ccn_marital_status'], ['ccn_marital_status'])
    op.drop_constraint(None, 'tbl_employee', type_='foreignkey')
    op.drop_column('tbl_employee', 'ccn_marital_status')
    # ### end Alembic commands ###
