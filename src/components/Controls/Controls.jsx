export const Controls = ({ page, quantityPage }) => {
  return (
    <>
      <span className="span">{page}</span>
      <span className="span">/</span>
      <span className="span">{quantityPage}</span>
    </>
  );
};
