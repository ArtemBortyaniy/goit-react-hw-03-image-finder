import React, { Component } from 'react';
import { pixabayApi } from 'services/pixabayApi';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Idle } from 'components/Idle/Idle';
import { GalleryErrorView } from 'components/GalleryErrorView/GalleryErrorView';
import { Button } from 'components/Button/Button';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {
  state = {
    serchQuery: '',
    data: null,
    error: null,
    status: Status.IDLE,
    page: 1,
    quantityPage: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;

    const previousStateQ = prevState.serchQuery;
    const nextStateQ = this.state.serchQuery;

    const previousPage = prevState.page;
    const nextPage = this.state.page;

    if (previousStateQ !== nextStateQ || previousPage !== nextPage) {
      this.setState({ status: Status.PENDING });

      pixabayApi(nextStateQ, page)
        .then(data => {
          if (data.hits.length > 0) {
            toast.success('Wow so easy!');
          }
          if (data.hits.length === 0) {
            toast.warning('Write valid parameter');
          }

          this.setState({
            quantityPage: this.handleToFixed(data.totalHits),
            data: data.hits,
            status: Status.RESOLVED,
          });
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

  handleFormSubmit = queryParam => {
    this.setState({ serchQuery: queryParam });
  };

  render() {
    const { page, data, error, status, quantityPage } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ToastContainer autoClose={3000} />
        {status === 'idle' && <Idle></Idle>}

        {status === 'pending' && <Loader></Loader>}

        {status === 'resolved' && (
          <>
            <ImageGallery users={data} />

            {data.length > 0 && (
              <Button
                page={page}
                quantityPage={quantityPage}
                onClick={this.handlePagination}
              />
            )}
          </>
        )}

        {status === 'rejected' && <GalleryErrorView error={error.message} />}
      </div>
    );
  }
}
