import React, { ButtonHTMLAttributes } from 'react';
import './style.scss';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'confirm' | 'cancel';
  label?: string;
  icon?: string;
  iconPosition?: 'left' | 'right';
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  variant,
  label,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  const baseClass = `btn-custom btn-${variant} ${className}`.trim();

  return (
    <button className={baseClass} {...props}>
      {icon && iconPosition === 'left' && (
        <span className="material-symbols-outlined">{icon}</span>
      )}
      
      {label && <strong>{label}</strong>}
      
      {icon && iconPosition === 'right' && (
        <span className="material-symbols-outlined">{icon}</span>
      )}
    </button>
  );
};