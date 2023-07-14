import React from 'react';
import { fetchImgj } from './FetchImg';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ButtonLoadMore } from './Button/Button';
import { Searchbar } from './Searchbar/Searchbar';
export class App extends React.Component {
  state = {
    searchImg: '',
    imgApiMass: [],
    page: 1,
    isloader: false,
  };
  async componentDidUpdate(prevProps, prevState) {
    try {
      if (this.state.searchImg !== prevState.searchImg) {
        this.setState({ isloader: true });
        const articles = await fetchImgj(this.state.searchImg);
        this.setState({ imgApiMass: articles.data.hits });
      }
      if (this.state.page !== prevState.page) {
        this.setState({ isloader: true });
        const articles = await fetchImgj(this.state.searchImg, this.state.page);
        this.setState({
          imgApiMass: [...this.state.imgApiMass, ...articles.data.hits],
        });
      }
    } catch {
    } finally {
      if (this.state.isloader) {
        this.setState({ isloader: false });
      }
    }
  }

  SubmitSearch = e => {
    e.preventDefault();
    this.setState({ searchImg: e.target.lastChild.value });
  };

  lodaMoreImg = e => {
    e.preventDefault();
    const { page } = this.state;
    this.setState({ page: page + 1 });
  };

  render() {
    const { imgApiMass, isloader } = this.state;
    return (
      <>
        {/* SEARCH-BAR */}
        <Searchbar SubmitSearch={this.SubmitSearch}></Searchbar>
        {/* SEARCH-BAR */}
        {/* ImageGallery */}
        <ImageGallery imgApiMass={imgApiMass}></ImageGallery>
        {/* ImageGallery */}
        {/* LOADMore */}
        <Loader isloader={isloader}></Loader>
        {imgApiMass.length ? <ButtonLoadMore loadMore={this.lodaMoreImg}></ButtonLoadMore>: null}
        {/* LOADMore */}
        {/* MODAL */}
        {/* MODAL */}
      </>
    );
  }
}
