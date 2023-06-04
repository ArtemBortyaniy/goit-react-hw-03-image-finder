import React, { Component } from 'react';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const { showModal } = this.state;
    const { data } = this.props;

    return (
      <>
        <li className="gallery-item" onClick={() => this.toggleModal()}>
          <img
            src={data.webformatURL}
            alt={data.tags}
            className="imageGalleryItem-image"
          />
        </li>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={data.webformatURL} alt={data.tag} />
          </Modal>
        )}
      </>
    );
  }
}
