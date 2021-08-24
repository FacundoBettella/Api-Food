import './Search.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'


import { getRecipes, getRecipeDetail, sortRecipe, sortRecipeScore, filterBy } from '../actions/index'; 

function Search( props ) {
    const [title, setTitle] = useState('');
    const [postXPage, setPostXPage] = useState(9);
    const [pageNumber, setPageNumber]= useState(0);

    // Paginado
    const pagedVisited = pageNumber * postXPage; //last index
    let currentPost;

    //Paging generator => 8 per page. 
    props.recipe.error ? 
    currentPost = null : 
    currentPost = props.recipe.slice(pagedVisited, pagedVisited + postXPage );    

    //pageCount => How many post per page.
    const pageCount = Math.ceil( props.recipe.length / postXPage  );

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    function handleChange(e){
        setTitle(e.target.value);
    };

    function handleSubmit(e){ // Envía el estado para getRecipes.
        e.preventDefault();
        props.getRecipes(title);
        setTitle("");
    }

    function handleAbc(e) {
        e.preventDefault();
        props.sortRecipe(e.target.value);
        setPageNumber(1);
    };

    function handleMinMax(e){
        e.preventDefault();
        props.sortRecipeScore(e.target.value);
        setPageNumber(1);
    }

    return(
        <div className='appRecipe'>
            <nav className="navRecipe container-fluid">
                    <Link to='/create' className='linkCreate'> 
                        Create a new recipe
                    </Link>
                    <div className='searchConteiner'>
                        <form className='search' >
                            <label className='label' htmlFor='title'>Recipe</label>
                            <input 
                                placeholder="Whats do you want to cook?" 
                                type='text'
                                id='title'
                                value={title}
                                onChange={handleChange}
                                />
                                <button type='submit' className='searchButton' onClick={handleSubmit}>
                                    <FontAwesomeIcon style={{marginRight: '10%'}}
                                    icon={faPaperPlane}></FontAwesomeIcon>
                                    Search
                                </button>
                        </form>
                    </div>

                <div className='selects'>
                    <select id='az' onChange={(e)=> handleAbc(e)}>
                        <option value='ascendente'>A-Z</option>
                        <option value='descendente'>Z-A</option>
                    </select>
                    <select id="minMax" onChange={(e)=> handleMinMax(e)}>
                        <option value="ascendente">Low score</option>
                        <option value="descendente">High score</option>
                    </select>
                </div>
            </nav>
            {/* ---------------------------------------------------------------------------------- */}
            <div className={currentPost.length > 1 ?'withPost container-fluid':'withOutPost'}>
                    <ul className='ul'>
                            {
                                currentPost && currentPost.map((el)=>( 
                                    <li className='col-xl-3 li' key={el.id}>
                                        <div className='card text-center'>
                                            <div className='card-body container-fluid'>
                                                <Link 
                                                    to={`/recipe/${el.id}`} 
                                                    className="btn btn-outline-secondary border-0 card-title" 
                                                    onClick={()=> props.getRecipeDetail(el.id)}>
                                                        {el.title}
                                                </Link> 
                                                <p className="card-text text-warning" style={{marginTop:'2vh'}}>
                                                   Score {el.spoonacularScore}
                                                </p>
                                                {   
                                                    !el.image ?
                                                    <img className='recipeImg img-responsive' src='https://static01.nyt.com/images/2021/01/26/well/well-foods-microbiome/well-foods-microbiome-jumbo.jpg?quality=90&auto=webp' alt="not img"></img>
                                                    :
                                                    <img className='recipeImg img-responsive' src={el.image} alt='not img'></img> 
                                                }
                                            </div>
                                        </div>
                                    </li>                   
                                ))
                            }
                    </ul>
                    {  
                        currentPost.length > 1  ?  
                        <div  className='d-flex justify-content-center align-items-center'>
                            <ReactPaginate
                                previousLabel={"Previous"}   
                                nextLabel={"Next"}
                                pageCount= {pageCount} 
                                onPageChange={changePage}  
                                containerClassName={"paginationBttns"}
                                previousLinkClassName={"previousBttn"}
                                nextLinkClassName={"nextBttn"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                            />            
                        </div>
                        :
                        null
                    }

            </div>
        </div>     
    )
}

const mapStateToProps = (state) => {
    return {
        recipe: state.recipesLoaded,
        recipeDetail: state.recipeDetail,
        diets: state.diets,
        filtered: state.filtered
    };
};

const mapDispatchToProps = (dispatch) =>{
    return {
        getRecipes: title => dispatch(getRecipes(title)),
        getRecipeDetail: id => dispatch(getRecipeDetail(id)),
        sortRecipe: string => dispatch(sortRecipe(string)),
        sortRecipeScore: string => dispatch(sortRecipeScore(string)),
        filterBy: string => dispatch(filterBy(string))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);

