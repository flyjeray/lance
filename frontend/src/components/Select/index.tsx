import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

export type SelectItem = {
  label: string;
  key: string;
};

type Props = {
  items: SelectItem[];
  defaultValueKey?: string;
  onChange: (key: SelectItem) => void;
  label?: string;
  placeholder?: string;
  shouldCloseOnSelect?: boolean;
};

export const Select = ({
  items,
  defaultValueKey,
  label = '',
  placeholder = 'Select Value',
  onChange,
  shouldCloseOnSelect = true,
}: Props) => {
  const find = (key?: string) => items.find((x) => x.key === key);

  const [value, setValue] = useState(find(defaultValueKey));
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setValue(find(defaultValueKey));
  }, [defaultValueKey]);

  const handleClickButton = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickItem = (item: SelectItem) => {
    onChange(item);
    setValue(item);
    if (shouldCloseOnSelect) {
      setIsOpen(false);
    }
  };

  return (
    <div className={styles.select_container}>
      {label && <p>{label}</p>}
      <button className={styles.select_button} onClick={handleClickButton}>
        {value?.label || placeholder}
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          {items.map((item) => (
            <button
              className={styles.item}
              onClick={() => handleClickItem(item)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
