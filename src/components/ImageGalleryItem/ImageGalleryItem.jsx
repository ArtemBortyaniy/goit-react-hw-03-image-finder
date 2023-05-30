export const ImageGalleryItem = ({ data }) => {
  return (
    <li className="gallery-item">
      <img
        src={data.webformatURL}
        alt={data.tags}
        className="imageGalleryItem-image"
      />
    </li>
  );
};
