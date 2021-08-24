import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Recipe.css';

function Recipe(props) {

    useEffect(() =>{
        if (props.recipeDetail.instructions){
            let instructions = props.recipeDetail.instructions;
            document.getElementById('instructions').innerHTML = instructions;
            //Al establecerse se reemplaza la sintaxis HTML del elemento por la nueva.
        };
        if(props.recipeDetail.summary){
            let summary = props.recipeDetail.summary;
            document.getElementById('summary').innerHTML = summary;
        };
        //     return () => {};
    }, [props.recipeDetail]); //Dependencia => Para que se renderize una sola vez. 

    return(
        <div className='appRecipeDetail'>
            <div className="RecipeDetail container">
                <Link to='/home'>
                    <button className='btn btn-outline-danger mt-3 mb-3'>X</button>
                </Link>
                <div className='cardRecipeDetail'>
                    <div className='container-fluid text-center mb-3'> 
                        <h3>
                            <strong>
                                {props.recipeDetail.name?
                                props.recipeDetail.name:
                                props.recipeDetail.title}
                            </strong>
                        </h3>
                    </div>
                    <div className='scores row'>
                        <div className='recipeDetailScore col-md-3 align-items-center'>
                            <h4 className='text-center'>Spoonacular Score <strong>{props.recipeDetail.spoonacularScore}</strong></h4>
                        </div>
                        <div className='recipeDetailHealth col-md-3 d-flex align-items-center'>
                            <h4 className='text-center'>Health Score <strong>{props.recipeDetail.healthScore}</strong></h4>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <div className='recipeDetailsSum text-center'>
                                <strong>Summary</strong>
                            </div>
                            <p id='summary'>{props.recipeDetail.summary}</p>
                        </div>
                        <div className='col-sm-12'>
                            <div className='recipeDetailsIns text-center'>
                                <strong>Instructions</strong>
                            </div>
                            <p id='instructions' className='text'>{props.recipeDetail.instructions}</p>
                        </div>
                    </div>
                    <div className='foot'>
                        <div className='imgRecipeDetail'>
                            {
                                !props.recipeDetail.image ? <img src='https://static01.nyt.com/images/2021/01/26/well/well-foods-microbiome/well-foods-microbiome-jumbo.jpg?quality=90&auto=webp' className='neutralPhoto' alt='Not found'></img> 
                                :<img src={props.recipeDetail.image} alt='Not found' className='neutralPhoto'></img>    
                            }
                        </div>
                        <div className='dietRecipeDetail'> 
                                {
                                    props.recipeDetail.DietTypes && props.recipeDetail.DietTypes.map((el) => (
                                    <div>{el.name}</div> ))
                                }
                                {
                                    props.recipeDetail.diets && props.recipeDetail.diets.map((el) =>(
                                    <div>{el}</div>))
                                }
                        </div>
                    </div>    
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return{
        recipeDetail: state.recipeDetail,
    };
};
export default connect(mapStateToProps, null)(Recipe);
