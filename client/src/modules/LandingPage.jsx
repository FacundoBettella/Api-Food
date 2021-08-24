import { Link } from "react-router-dom";
import './LandingPage.css'

export default function LandingPage() {
    return (
        <div className='app'>
            <nav className="nav">
                <div>
                    <h1>
                        ApiFoodie
                    </h1>
                </div>
            </nav>
                <div className='container'>
                    <div className="botNav">
                        <h3 className="subtitle">
                            The best place to find and create delicious recipes
                        </h3>
                    </div>
                    <div className="enter">
                        <Link to='/home' className='enterButton'>Let us begin!</Link>
                    </div>
                </div>
            <footer className="footer">
                <h3>
                    Technology Stack || Bootstrap, ReactJs, Redux, Express, PostgreSQL, Sequelize
                </h3>
            </footer>    
        </div>
    )
}