import React, { Component } from 'react';

export class ImageGalleryItem extends Component {
  render() {
    const { data, onClick } = this.props;
    return (
      <li
        className="gallery-item"
        onClick={() => onClick(data.largeImageURL, data.tags)}
      >
        <img
          src={data.webformatURL}
          alt={data.tags}
          className="imageGalleryItem-image"
        />
      </li>
    );
  }
}
