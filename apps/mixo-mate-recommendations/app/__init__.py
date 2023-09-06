""" Top level module

This module:

- Contains create_app()
- Registers extensions
"""

import os
from flask import Flask

# Import config
from config import config_by_env

def create_app():
    env = os.getenv("FLASK_CONFIG") or "default"

    app = Flask(__name__)
    app.config.from_object(config_by_env[env])

    from .api import api_bp

    app.register_blueprint(api_bp, url_prefix="/api")

    return app
