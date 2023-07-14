import PropTypes from 'prop-types'
import React from 'react';
import {SearchBarHeader,SearchForm,SearchFormButton,SerchFromInput} from './Searchbar.styled'
export const Searchbar = ({ SubmitSearch }) => {
  return (
    <SearchBarHeader className="searchbar">
      <SearchForm onSubmit={SubmitSearch} className="form">
        <SearchFormButton type="submit" className="button">
          <span className="button-label">Search</span>
        </SearchFormButton>

        <SerchFromInput
          className="input"
          type="text"
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchBarHeader>
  );
};
Searchbar.propTypes = {
    SubmitSearch:PropTypes.func.isRequired
}