import React from "react";
import { fetchImgj } from "./FetchImg";
import { ColorRing } from  'react-loader-spinner'
export class App extends React.Component  {
  state = {
    searchImg:'',
    imgApiMass:[],
    page:1,
    isloader:false
  }
  async componentDidUpdate(prevProps,prevState){
    try{
  if(this.state.searchImg !== prevState.searchImg){
    this.setState({isloader:true})
    console.log(this.state.isloader)
    const articles = await fetchImgj(this.state.searchImg);
     this.setState({imgApiMass:articles.data.hits})
    }
    if(this.state.page !== prevState.page){
      this.setState({isloader:true})
      console.log(this.state.isloader)
      const articles = await fetchImgj(this.state.searchImg,this.state.page);
      this.setState({imgApiMass:[...this.state.imgApiMass,...articles.data.hits]})
    }
    }catch{
    }finally{
      if(this.state.isloader){
        this.setState({isloader:false})
      }
    }
  }

  SubmitSearch = e => {
    e.preventDefault()
   this.setState({searchImg:e.target.lastChild.value})
  }

  lodaMoreImg = e => {
    e.preventDefault()
    const {page} = this.state
    this.setState({page:page+1})
  }

  render() {
    const {imgApiMass,isloader} = this.state
  return (
    <>
    {/* SEARCH-BAR */}
    <header className="searchbar">
  <form onSubmit={this.SubmitSearch} className="form">
    <button type="submit" className="button">
      <span className="button-label">Search</span>
    </button>

    <input
      className="input"
      type="text"
      placeholder="Search images and photos"
    />
  </form>
</header>
{/* SEARCH-BAR */}
{/* ImageGallery */}
<ul className="gallery">
  {console.log(imgApiMass)}
{imgApiMass.length ? imgApiMass.map(e => {
  return(
    <li key={e.id} className="gallery-item">
  <img src={e.webformatURL} alt="" />
</li>
  )
})   :null}
</ul>
{/* ImageGallery */}
{/* LOADMore */}
{isloader ?<ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/> : null } 
<button onClick={this.lodaMoreImg}>Load more</button>
{/* LOADMore */}
    </>
  );}
};
