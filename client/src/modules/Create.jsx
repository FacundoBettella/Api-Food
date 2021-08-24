import './Create.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { submit, getDietTypes } from '../actions/index';

function Create ({diets, getDietTypes, submit}) {
    //Estado local
    const [input, setInput] = useState({
        title: '',
        summary: '',
        instructions: '',
        spoonacularScore: 0,
        healthScore: 0,
        diets: []
    });

    const [render, setRender]= useState('');
    
    function handleInputChange(e) {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    };

    function handleCheck(e){
        if(e.target.checked) {
            setInput({
                ...input,
                diets:  [...input.diets, e.target.value]
            })

        }
        else {
            setInput({
                ...input,
                diets: input.diets.filter((diet) => diet !== e.target.value) //Filtra los elementos =! al target.value
            })  
        }
    };
    
    function handleSubmit(e) {
        e.preventDefault();
        submit(input);
        setRender('Your recipe has been created succesfully');
        setInput({
            title: '',
            summary: '',
            instructions: '',
            spoonacularScore: 0,
            healthScore: 0,
            diets: []
        })
    }

    useEffect(() => {
        getDietTypes() // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    
    return(
        <div className="AppCreate">
            <div className="createCard">
                <div className="principalCreate">
                    <h4 className="CreateTitle">
                        <strong>TIME TO CREATE!</strong>
                    </h4>
                </div>
                <div className="CreateBody">
                    <form className="CreateForm">
                        <NavLink to='/home'  className='botonHome'>
                            <button className='btn-close btn-close-black m-1'>
                            </button>
                        </NavLink>
                        <div className='formInputs'>
                            <label className='labels'>Title: </label>
                            <input className='form-control' autoComplete="off" 
                            type="text" name="title" onChange={handleInputChange} value={input.title}/>
                        </div>
                        <div className='formInputs'>
                            <label className='labels'>Summary:</label>
                            <input className='form-control' autoComplete="off" 
                            type="text" name="summary" onChange={handleInputChange} value={input.summary}/>
                        </div>
                        <div className='formInputs'>
                            <label className='labels'>Instructions: </label>
                            <input className='form-control' autoComplete="off" 
                            type="text" name="instructions" onChange={handleInputChange} value={input.instructions}/>
                        </div>
                        <div className='formInputs'>
                            <label className='labels'>Spoonacular score: </label>
                            <input 
                                className='form-control' 
                                autoComplete="off" 
                                type="number" 
                                name="spoonacularScore" min="1" max="100" 
                                onChange={handleInputChange} 
                                value={input.spoonacularScore}/>
                        </div>
                        <div className='formInputs'>
                            <label className='labels'>Health score: </label>
                            <input 
                                className='form-control' 
                                autoComplete="off" 
                                type="number" 
                                name="healthScore" min="1" max="100" 
                                onChange={handleInputChange} 
                                value={input.healthScore}/>
                        </div>
                        <div className='formInputs m-4'>
                            <div className='row'>
                                    {diets && diets.map((el) => (
                                    <div className='col-sm-6'>
                                        <label key={el.id}>
                                            <input 
                                                type='checkbox'
                                                name={el.name} 
                                                value={el.name}
                                                onChange={(e) => handleCheck(e)} 
                                                />
                                                {el.name}
                                        </label>
                                    </div>
                                    ))}
                                    </div>
                            
                        </div>
                        {render[0] &&
                            <div id='recipecreated'>
                            <FontAwesomeIcon icon={faCoffee}/>
                            {render}
                            </div>
                        }
                        <input type="submit" value="submit" id="submitButton" onClick={handleSubmit}></input>
                    </form>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        diets: state.diets,
        submit: state.submit
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDietTypes: () => dispatch(getDietTypes()),
        submit: (obj) => dispatch(submit(obj))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Create);

