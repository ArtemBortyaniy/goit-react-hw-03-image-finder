import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    serchQuery: '',
  };

  handleFormSubmit = queryParam => {
    this.setState({ serchQuery: queryParam });
  };

  render() {
    const { serchQuery } = this.state;

    return (
      <div>
        <ToastContainer autoClose={3000} />
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery parameter={serchQuery} />
      </div>
    );
  }
}
