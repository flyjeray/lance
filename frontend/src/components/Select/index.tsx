import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

type SelectListItem = {
  label: string;
  key: string;
};

type Props = {
  items: SelectListItem[];
  defaultValueKey?: string;
  onChange: (key: SelectListItem) => void;
  placeholder?: string;
};

export const Select = ({
  items,
  defaultValueKey,
  placeholder = 'Select Value',
  onChange,
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

  const handleClickItem = (item: SelectListItem) => {
    onChange(item);
    setValue(item);
  };

  return (
    <div className={styles.select_container}>
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
