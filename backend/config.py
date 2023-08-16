# CONFIGURATION BASE CONFIGURATION
class Config:
    DEBUG: True
    TESTING: True

    # SQLALCHEMY DATABASE CONFIGURATION
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:root@10.10.0.251:3306/hhrr_dev"


# PRODUCTION SERVER CONFIGURATION
class ProductionConfig(Config):
    DEBUG: False


# DEVELOPMENT SERVER CONFIGURATION
class DevelopmentConfig(Config):
    SECRET_KEY = "hardsecretkey"
    DEBUG = True
    TESTING = True
