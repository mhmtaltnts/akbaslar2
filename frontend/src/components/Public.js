import { useNavigate } from 'react-router-dom'
import Slider from './Slider/Slider'
import { faRightToBracket  } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Public = () => {
    const navigate = useNavigate()

    const onSystemGoClicked = () => navigate("/login") 

    const content = (
        <section className="wrapper">
            <header className='dash-header'>
            <div className='dash-header__container'>
                    <div className='logo__text'>
                        <h1 className="dash-header__title" style={{fontFamily: ['Allura', "cursive"], fontWeight:"bold", fontSize: "33px"}}>Gebze Konak Tır Parkı</h1>
                    </div>
                    <button
                className="dash-header__button icon-button primary__button"
                title="Yeni Kayıt"
                onClick={onSystemGoClicked}
            >
                <FontAwesomeIcon icon={faRightToBracket} />
            </button>
                
            </div>
            </header>
            <main className="dash-container">
                <Slider/>
            </main>
            <footer className='dash-footer'>
                
                    <div className='footer_wrapper'>
                        <address className="public__addr">
                            Kirazlıpınar Mah. Yeni Bağdat Cd. No:791 PK:41400 Gebze/ Kocaeli                
                        </address>
                    </div>
                    <div className='footer_wrapper'>
                        <a href="tel:+902627541406">Tel: +90 262 754 14 06</a>
                    </div>
                
            </footer>
        </section>

    )
    return content
}
export default Public