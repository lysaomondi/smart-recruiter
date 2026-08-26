from flask import Flask
from app.config import Config
from app.extensions import db, cors, jwt


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    cors.init_app(
        app,
        resources={r"/api/*": {"origins": "*"}}
    )
    jwt.init_app(app)

    # Import models so SQLAlchemy knows about them
    # before create_all()
    from app.models import user, assessment, question, choice  # noqa: F401

    # Register assessment routes
    # The function currently exists as a placeholder
    # until the assessment feature is implemented.
    from app.routes.assessment_routes import register_assessment_routes

    register_assessment_routes(app)

    # Create database tables
    with app.app_context():
        db.create_all()

    # Health check endpoint
    @app.route("/health")
    def health():
        return {"status": "ok"}

    return app