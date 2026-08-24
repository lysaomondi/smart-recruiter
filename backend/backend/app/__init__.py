from flask import Flask
from app.config import Config
from app.extensions import db, cors, jwt


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    cors.init_app(app)
    jwt.init_app(app)

    # Import models so SQLAlchemy knows about them before create_all()
    from app.models import user, assessment, question, choice  # noqa: F401

    # Register routes directly on the app — no Blueprints
    from app.routes.assessment_routes import register_assessment_routes
    register_assessment_routes(app)

    # No migrations in this project yet — create tables directly.
    # Migrations get introduced once the team merges everyone's models together.
    with app.app_context():
        db.create_all()

    @app.route("/health")
    def health():
        return {"status": "ok"}

    return app
