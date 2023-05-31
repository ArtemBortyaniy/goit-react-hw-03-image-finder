import React, { Component } from 'react';
import { pixabayApi } from 'components/services/pixabayApi';
import { toast } from 'react-toastify';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { GalleryErrorView } from 'components/GalleryErrorView/GalleryErrorView';
import { Loader } from 'components/Loader/Loader';
import { Idle } from 'components/Idle/Idle';
import { Modal } from 'components/Modal/Modal';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class ImageGallery extends Component {
  static BASE_URL = 'https://pixabay.com/api/';
  static API_KEY = '34616553-8cb9dbb490290e4b0963e806d';

  state = {
    page: 1,
    data: null,
    quantityPage: 1,
    error: null,
    status: Status.IDLE,
    showModal: false,
    activeSrc: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;

    const previousProps = prevProps.parameter;
    const nextProps = this.props.parameter;

    if (previousProps !== nextProps) {
      this.setState({ status: Status.PENDING });

      pixabayApi(ImageGallery.BASE_URL, ImageGallery.API_KEY, nextProps, page)
        .then(data => {
          if (data.hits.length > 0) {
            toast.success('Wow so easy!');
          }
          if (data.hits.length === 0) {
            toast.warning('Write valid parameter');
          }

          this.setState({ quantityPage: this.handleToFixed(data.totalHits) });
          this.setState({ data: data.hits, status: Status.RESOLVED });
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }

    const previousState = prevState.page;
    const nextState = this.state.page;

    if (previousState !== nextState) {
      this.setState({ status: Status.PENDING });
      pixabayApi(ImageGallery.BASE_URL, ImageGallery.API_KEY, nextProps, page)
        .then(data => {
          this.setState({ data: data.hits, status: Status.RESOLVED });
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }
  handleToFixed = value => {
    const total = value / 12;
    return Number(total.toFixed(0));
  };

  handlePagination = option => {
    this.setState(prevState => ({ page: prevState.page + option }));
  };

  toggleModal = (imageUrl, tag) => {
    this.setState({ showModal: !this.state.showModal });
    this.setState({ activeSrc: { imageUrl, tag } });
  };

  render() {
    const { data, page, quantityPage, status, error, showModal, activeSrc } =
      this.state;

    if (status === 'idle') {
      return <Idle></Idle>;
    }

    if (status === 'pending') {
      return <Loader></Loader>;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className="gallery">
            {data.map(data => {
              return (
                <ImageGalleryItem
                  key={data.id}
                  data={data}
                  onClick={this.toggleModal}
                />
              );
            })}
          </ul>
          {data.length > 0 && (
            <Button
              page={page}
              quantityPage={quantityPage}
              onClick={this.handlePagination}
            />
          )}
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={activeSrc.imageUrl} alt={activeSrc.tag} />
            </Modal>
          )}
        </>
      );
    }

    if (status === 'rejected') {
      return <GalleryErrorView error={error.message} />;
    }
  }
}
