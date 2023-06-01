import React, { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  render() {
    const { users } = this.props;

    return (
      <>
        <ul className="gallery">
          {users.map(user => {
            return <ImageGalleryItem key={user.id} data={user} />;
          })}
        </ul>
      </>
    );
  }
}
