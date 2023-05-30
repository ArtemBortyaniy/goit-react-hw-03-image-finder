import React, { Component } from 'react';
import { pixabayApi } from 'components/services/pixabayApi';
import { toast } from 'react-toastify';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';

export class ImageGallery extends Component {
  static BASE_URL = 'https://pixabay.com/api/';
  static API_KEY = '34616553-8cb9dbb490290e4b0963e806d';

  state = {
    page: 1,
    data: null,
    quantityPage: 1,
  };

  handleToFixed = value => {
    const total = value / 12;
    return Number(total.toFixed(0));
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;

    const previousProps = prevProps.parameter;
    const nextProps = this.props.parameter;

    if (previousProps !== nextProps) {
      pixabayApi(ImageGallery.BASE_URL, ImageGallery.API_KEY, nextProps, page)
        .then(response => response.json())
        .then(data => {
          if (data.hits.length > 0) {
            toast.success('Wow so easy!');
          }
          if (data.hits.length === 0) {
            toast.warning('Write valid parameter');
          }

          this.setState({ quantityPage: this.handleToFixed(data.totalHits) });
          this.setState({ data: data.hits });
        });
    }
  }

  handlePagination = (option, value) => {
    const { page } = this.state;

    this.setState(prevState => ({ page: prevState.page + option }));

    const query = this.props.parameter;

    pixabayApi(ImageGallery.BASE_URL, ImageGallery.API_KEY, query, page)
      .then(response => response.json())
      .then(data => {
        toast.success('Wow so easy!');
        this.setState({ data: data.hits });
      });
  };

  render() {
    const { data, page, quantityPage } = this.state;
    return (
      <>
        <ul className="gallery">
          {data &&
            data.map(data => {
              return <ImageGalleryItem key={data.id} data={data} />;
            })}
        </ul>
        <Button
          page={page}
          quantityPage={quantityPage}
          onClick={this.handlePagination}
        />
      </>
    );
  }
}
