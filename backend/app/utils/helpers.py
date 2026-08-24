from werkzeug.security import check_password_hash, generate_password_hash


def hash_password(password):
    """Create a secure hash from a plain-text password."""
    return generate_password_hash(password)


def verify_password(password, password_hash):
    """Check a plain-text password against its stored hash."""
    return check_password_hash(password_hash, password)