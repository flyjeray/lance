import styles from './styles.module.scss';

type ButtonSize = 'small' | 'medium' | 'large';
type ButtonColor = 'primary' | 'alternative' | 'outlined';
type ButtonWidth = 'fit' | 'full';

type Props = {
  size?: ButtonSize;
  color?: ButtonColor;
  width?: ButtonWidth;
  onClick?: () => unknown;
  label?: string;
  type?: 'button' | 'reset' | 'submit';
};

/**
 * Customizable button with mixin-based style that accepts different sizes, colors and widths.
 */
export const Button = ({
  size = 'medium',
  color = 'primary',
  width = 'fit',
  onClick = () => {},
  label = 'Click',
  type = 'button',
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={styles[`btn-${size}-${color}-${width}`]}
    >
      {label}
    </button>
  );
};
