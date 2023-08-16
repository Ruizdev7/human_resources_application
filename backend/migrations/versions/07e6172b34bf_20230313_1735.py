"""20230313_1735

Revision ID: 07e6172b34bf
Revises: bad5ee7282ee
Create Date: 2023-03-13 17:36:06.082645

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '07e6172b34bf'
down_revision = 'bad5ee7282ee'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tbl_performance_evaluation', sa.Column('action_date', sa.DateTime(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('tbl_performance_evaluation', 'action_date')
    # ### end Alembic commands ###
