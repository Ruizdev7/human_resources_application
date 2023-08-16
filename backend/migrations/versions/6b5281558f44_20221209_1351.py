"""20221209_1351

Revision ID: 6b5281558f44
Revises: 48d96a3e8f89
Create Date: 2022-12-09 13:51:26.689891

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '6b5281558f44'
down_revision = '48d96a3e8f89'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tbl_family_nucleus', sa.Column('number_id', sa.Integer(), nullable=False))
    op.drop_column('tbl_family_nucleus', 'number_id_employee')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tbl_family_nucleus', sa.Column('number_id_employee', mysql.INTEGER(), autoincrement=False, nullable=False))
    op.drop_column('tbl_family_nucleus', 'number_id')
    # ### end Alembic commands ###