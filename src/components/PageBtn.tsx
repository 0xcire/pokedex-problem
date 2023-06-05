import clsx from 'clsx';

type PageBtnProps = {
  isDisabled?: boolean;
  isDots?: boolean;
  pageIndex: number;
  isActive: boolean;
};

const PageBtn = ({ isDisabled, isDots, pageIndex, isActive }: PageBtnProps) => {
  return (
    <button
      className={clsx(
        'join-item btn',
        (isDots || isDisabled) && 'btn-disabled',
        isActive && 'btn-active'
      )}
    >
      {isDots ? '...' : pageIndex}
    </button>
  );
};

export default PageBtn;
