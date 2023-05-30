export const Button = ({ page, quantityPage, onClick }) => {
  console.log(page, quantityPage);
  console.log(page === quantityPage);
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
      <span className="span">{page}</span>
      <span className="span">/</span>
      <span className="span">{quantityPage}</span>
      <button
        type="button"
        disabled={page === quantityPage}
        onClick={() => onClick(+1)}
        className="btn margin-left"
      >
        {'>'}
      </button>
    </div>
  );
};
