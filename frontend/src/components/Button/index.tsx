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
  label?: string;
  type?: 'button' | 'reset' | 'submit';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Customizable button with mixin-based style that accepts different variants and widths.
 */
export const Button = ({
  variant = 'primary',
  width = 'fit',
  label = 'Click',
  ...props
}: Props) => {
  return (
    <button className={styles[`btn-${variant}-${width}`]} {...props}>
      {label}
    </button>
  );
};
