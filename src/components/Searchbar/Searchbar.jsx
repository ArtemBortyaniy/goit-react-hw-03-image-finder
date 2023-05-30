import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class Searchbar extends Component {
  state = {
    serchQuery: '',
  };

  handleChangeQuery = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value.toLowerCase() });
  };

  handleSubmitForm = e => {
    e.preventDefault();

    if (this.state.serchQuery.trim() === '') {
      return toast.warning('Write valid parameter');
    }
    this.props.onSubmit(this.state.serchQuery);
    this.reset();
  };

  reset = () => {
    this.setState({ serchQuery: '' });
  };

  render() {
    const { serchQuery } = this.state;

    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmitForm}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <label htmlFor="serchQuery">
            <input
              className="input"
              type="text"
              autoComplete="off"
              name="serchQuery"
              autoFocus
              placeholder="Search images and photos"
              value={serchQuery}
              onChange={this.handleChangeQuery}
            />
          </label>
        </form>
      </header>
    );
  }
}
