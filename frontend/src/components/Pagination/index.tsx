import { useEffect, useMemo } from 'react';
import { renderPagination, TRIPLE_DOT_SYMBOL } from './utils';
import { Button } from '..';
import styles from './styles.module.scss';

type Props = {
  page: number;
  lastPage: number;
  delta: number;

  onPageChange: (page: number) => void;
};

export const Pagination = ({
  page,
  lastPage,
  delta = 3,
  onPageChange = () => {},
}: Props) => {
  const pagination = useMemo(
    () => renderPagination(page, lastPage, delta),
    [page, lastPage, delta]
  );

  useEffect(() => {
    console.log('Pagination', pagination);
  }, [pagination]);

  return (
    <div className={styles.pagination_row}>
      {pagination.map((p, i) =>
        p === TRIPLE_DOT_SYMBOL ? (
          <span key={`tds-${i}`}>{TRIPLE_DOT_SYMBOL}</span>
        ) : (
          <Button
            key={p}
            onClick={() => onPageChange(p)}
            disabled={page === p}
            label={p.toString()}
          />
        )
      )}
    </div>
  );
};
