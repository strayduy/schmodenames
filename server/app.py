# Third party libs
from flask import Flask

# Our libs
from .blueprints import root

def create_app(config_object):
    app = Flask(__name__, static_folder='../client/static')
    app.config.from_object(config_object)

    register_blueprints(app)

    return app

def register_blueprints(app):
    app.register_blueprint(root.blueprint)

