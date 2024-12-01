import { Button, ButtonProps, CircularProgress, IconProps } from '@mui/material';
import React from 'react';

interface Props extends ButtonProps {
  isLoading?: boolean;
  startIcon?: React.ReactElement<IconProps>;
  endIcon?: React.ReactElement<IconProps>;
  onClick?: () => void;
  width?: number | string;
  height?: number | string;
  size?: 'small' | 'medium' | 'large';
  backgroundColor?: string;
  textColor?: string;
  color?: ButtonProps['color'];
  type?: 'button' | 'submit' | 'reset';
  disabledBackgroundColor?: string;
  variant?: 'text' | 'outlined' | 'contained';
}

const CustomButton: React.FC<Props> = ({
  children,
  isLoading = false,
  startIcon,
  endIcon,
  onClick,
  width,
  height,
  size = 'medium',
  disabled,
  variant = 'contained',
  type = 'button',
  color,
  className,
  backgroundColor,
  textColor,
  disabledBackgroundColor = '#CCCCCC',
  ...rest
}) => {
  const buttonStyle = {
    width,
    height,
    color: textColor,
    backgroundColor: isLoading ||disabled ? disabledBackgroundColor : backgroundColor,
    variant: variant,
  };

  return (
    <Button
      variant={variant}
      color={color}
      disabled={disabled || isLoading}
      onClick={onClick}
      style={buttonStyle}
      size={size}
      type={type}
      {...rest}
      startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : startIcon}
      endIcon={endIcon}
      className={className}
    >
      {children}
    </Button>
  );
};

export default CustomButton;