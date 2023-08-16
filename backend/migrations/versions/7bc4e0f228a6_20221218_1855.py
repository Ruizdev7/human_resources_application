"""20221218_1855

Revision ID: 7bc4e0f228a6
Revises: 8488e4f272f7
Create Date: 2022-12-18 08:55:11.256074

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7bc4e0f228a6'
down_revision = '8488e4f272f7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_foreign_key(None, 'tbl_ss_employee', 'tbl_employee', ['ccn_employee'], ['ccn_employee'])
    op.create_foreign_key(None, 'tbl_ss_employee', 'tbl_ccf', ['ccn_ccf'], ['ccn_ccf'])
    op.create_foreign_key(None, 'tbl_ss_employee', 'tbl_arl', ['ccn_arl'], ['ccn_arl'])
    op.create_foreign_key(None, 'tbl_ss_employee', 'tbl_afp', ['ccn_afp'], ['ccn_afp'])
    op.create_foreign_key(None, 'tbl_ss_employee', 'tbl_eps', ['ccn_eps'], ['ccn_eps'])
    op.create_foreign_key(None, 'tbl_ss_employee', 'tbl_aap', ['ccn_aap'], ['ccn_aap'])
    op.create_foreign_key(None, 'tbl_ss_employee', 'tbl_type_contributor', ['ccn_type_contributor'], ['ccn_type_contributor'])
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
    # ### end Alembic commands ###
