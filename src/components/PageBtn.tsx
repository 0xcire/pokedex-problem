import clsx from 'clsx';

type PageBtnProps = {
  value: number | string;
  isDisabled?: boolean;
  isDots?: boolean;
  isActive?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const PageBtn = ({
  value,
  isDisabled,
  isDots,
  isActive,
  onClick,
}: PageBtnProps) => {
  return (
    <button
      className={clsx(
        'join-item btn-sm btn md-phone:btn-md',
        (isDots || isDisabled) && 'btn-disabled',
        isActive && 'btn-active'
      )}
      onClick={onClick}
    >
      {isDots ? '...' : value}
    </button>
  );
};

export default PageBtn;
