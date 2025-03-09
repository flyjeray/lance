import styles from './styles.module.scss';

type ButtonVariant =
  | 'primary'
  | 'alternative'
  | 'primary-outlined'
  | 'alternative-outlined';
type ButtonWidth = 'fit' | 'full';

type Props = {
  variant?: ButtonVariant;
  width?: ButtonWidth;
  onClick?: () => unknown;
  label?: string;
  type?: 'button' | 'reset' | 'submit';
};

/**
 * Customizable button with mixin-based style that accepts different variants and widths.
 */
export const Button = ({
  variant = 'primary',
  width = 'fit',
  onClick = () => {},
  label = 'Click',
  type = 'button',
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={styles[`btn-${variant}-${width}`]}
    >
      {label}
    </button>
  );
};
