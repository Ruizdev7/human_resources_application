"""20221222_0955

Revision ID: a9cf40b2d4b6
Revises: 756c5a362598
Create Date: 2022-12-22 09:56:03.131202

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'a9cf40b2d4b6'
down_revision = '756c5a362598'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('tbl_family_nucleus', 'number_of_children',
               existing_type=mysql.BIGINT(),
               nullable=True)
    op.alter_column('tbl_family_nucleus', 'number_id',
               existing_type=mysql.INTEGER(),
               nullable=True)
    op.alter_column('tbl_family_nucleus', 'first_name',
               existing_type=mysql.VARCHAR(length=30),
               nullable=True)
    op.alter_column('tbl_family_nucleus', 'middle_name',
               existing_type=mysql.VARCHAR(length=30),
               nullable=True)
    op.alter_column('tbl_family_nucleus', 'first_last_name',
               existing_type=mysql.VARCHAR(length=30),
               nullable=True)
    op.alter_column('tbl_family_nucleus', 'second_last_name',
               existing_type=mysql.VARCHAR(length=30),
               nullable=True)
    op.alter_column('tbl_family_nucleus', 'date_of_birth',
               existing_type=sa.DATE(),
               nullable=True)
    op.alter_column('tbl_family_nucleus', 'age',
               existing_type=mysql.INTEGER(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('tbl_family_nucleus', 'age',
               existing_type=mysql.INTEGER(),
               nullable=False)
    op.alter_column('tbl_family_nucleus', 'date_of_birth',
               existing_type=sa.DATE(),
               nullable=False)
    op.alter_column('tbl_family_nucleus', 'second_last_name',
               existing_type=mysql.VARCHAR(length=30),
               nullable=False)
    op.alter_column('tbl_family_nucleus', 'first_last_name',
               existing_type=mysql.VARCHAR(length=30),
               nullable=False)
    op.alter_column('tbl_family_nucleus', 'middle_name',
               existing_type=mysql.VARCHAR(length=30),
               nullable=False)
    op.alter_column('tbl_family_nucleus', 'first_name',
               existing_type=mysql.VARCHAR(length=30),
               nullable=False)
    op.alter_column('tbl_family_nucleus', 'number_id',
               existing_type=mysql.INTEGER(),
               nullable=False)
    op.alter_column('tbl_family_nucleus', 'number_of_children',
               existing_type=mysql.BIGINT(),
               nullable=False)
    # ### end Alembic commands ###