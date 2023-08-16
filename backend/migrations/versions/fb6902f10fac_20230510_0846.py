"""20230510_0846

Revision ID: fb6902f10fac
Revises: 7c18f2d6df33
Create Date: 2023-05-10 08:46:19.577075

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'fb6902f10fac'
down_revision = '7c18f2d6df33'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('tbl_employment_relationship', 'manager',
               existing_type=mysql.INTEGER(),
               nullable=False)
    op.drop_constraint('tbl_employment_relationship_ibfk_5', 'tbl_employment_relationship', type_='foreignkey')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_foreign_key('tbl_employment_relationship_ibfk_5', 'tbl_employment_relationship', 'tbl_employee', ['manager'], ['ccn_employee'])
    op.alter_column('tbl_employment_relationship', 'manager',
               existing_type=mysql.INTEGER(),
               nullable=True)
    # ### end Alembic commands ###