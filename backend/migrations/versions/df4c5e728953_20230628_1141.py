"""20230628_1141

Revision ID: df4c5e728953
Revises: f52fce51c391
Create Date: 2023-06-28 11:41:50.000503

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'df4c5e728953'
down_revision = 'f52fce51c391'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(None, 'tbl_employment_relationship', ['ccn_employee'])
    op.create_foreign_key(None, 'tbl_performance_evaluation', 'tbl_employment_relationship', ['manager'], ['ccn_employee'])
    op.create_foreign_key(None, 'tbl_performance_evaluation', 'tbl_employment_relationship', ['ccn_employee'], ['ccn_employee'])
    op.create_foreign_key(None, 'tbl_performance_evaluation', 'tbl_employment_relationship', ['immediate_boss'], ['ccn_employee'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'tbl_performance_evaluation', type_='foreignkey')
    op.drop_constraint(None, 'tbl_performance_evaluation', type_='foreignkey')
    op.drop_constraint(None, 'tbl_performance_evaluation', type_='foreignkey')
    op.drop_constraint(None, 'tbl_employment_relationship', type_='unique')
    # ### end Alembic commands ###
