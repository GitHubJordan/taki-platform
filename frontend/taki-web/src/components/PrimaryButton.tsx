// src/components/PrimaryButton.tsx
interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ 
  children, 
  onClick, 
  disabled, 
  className = '' 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn-primary ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;