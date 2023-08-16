"""20230307_2244

Revision ID: c6203ac77b17
Revises: cc0e45e4927c
Create Date: 2023-03-07 22:44:54.173619

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'c6203ac77b17'
down_revision = 'cc0e45e4927c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('tbl_main_access_control', 'observations',
               existing_type=mysql.VARCHAR(length=200),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('tbl_main_access_control', 'observations',
               existing_type=mysql.VARCHAR(length=200),
               nullable=False)
    # ### end Alembic commands ###
