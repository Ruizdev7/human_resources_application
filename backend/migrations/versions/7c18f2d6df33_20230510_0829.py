"""20230510_0829

Revision ID: 7c18f2d6df33
Revises: 741a18126b62
Create Date: 2023-05-10 08:30:16.528114

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7c18f2d6df33'
down_revision = '741a18126b62'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tbl_employment_relationship', sa.Column('is_active_employee', sa.Boolean(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('tbl_employment_relationship', 'is_active_employee')
    # ### end Alembic commands ###