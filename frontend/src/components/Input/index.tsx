import styles from './styles.module.scss';

type InputVariant = 'default' | 'filled';
type InputWidth = 'fit' | 'full';

type Props = {
  variant?: InputVariant;
  width?: InputWidth;
  placeholder?: string;
  disabled?: boolean;
};

export const Input = ({
  variant = 'default',
  width = 'fit',
  placeholder,
  disabled,
}: Props) => {
  return (
    <input
      className={styles[`input-${variant}-${width}`]}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};
