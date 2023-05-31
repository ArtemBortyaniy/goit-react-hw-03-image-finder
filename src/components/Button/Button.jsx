import { Controls } from 'components/Controls/Controls';

export const Button = ({ page, quantityPage, onClick }) => {
  return (
    <div className="container-btn">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onClick(-1)}
        className="btn margin-right"
      >
        {'<'}
      </button>
      <Controls page={page} quantityPage={quantityPage} />
      <button
        type="button"
        disabled={page === quantityPage}
        onClick={() => onClick(1)}
        className="btn margin-left"
      >
        {'>'}
      </button>
    </div>
  );
};
