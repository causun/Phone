import './styles/button.css';

function Button({ children, onClick, className, type='button' }) {
  return (
    <button type={type} className={`btn ${className || ''}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
