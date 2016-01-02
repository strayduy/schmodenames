# Third party libs
from flask import Flask
from flask.ext import cache_bust
from flask.ext.compress import Compress

# Our libs
from .blueprints import root

def create_app(config_object):
    app = Flask(__name__, static_folder='../client/static')
    app.config.from_object(config_object)

    register_blueprints(app)
    register_extensions(app)

    return app

def register_extensions(app):
    cache_bust.init_cache_busting(app)
    Compress(app)

def register_blueprints(app):
    app.register_blueprint(root.blueprint)

