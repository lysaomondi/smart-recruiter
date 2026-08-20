const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  ...props
}) => {
  const resolvedVariant = variant === 'teal' ? 'primary' : variant;

  return (
    <button
      type={type}
      className={`btn btn-${resolvedVariant} btn-${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
