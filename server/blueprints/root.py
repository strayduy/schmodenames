# Third party libs
from flask import Blueprint
from flask import render_template

# Initialize blueprint
blueprint = Blueprint('root', __name__)

@blueprint.route('/')
@blueprint.route('/spymaster')
@blueprint.route('/spymaster/grid/<game_seed>')
@blueprint.route('/field-operative')
def index(game_seed=None):
    return render_template('index.html')

