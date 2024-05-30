import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Menu.css"

//-----------------------------------------------------------------------------

export const Menu = () => {
    return (
        <>
            <h3><em>Maria Plaza Estilistas<br /> 
            <h5>Profesionales a su servicio y cuidado.</h5></em></h3>
            <Carousel fade>
                <Carousel.Item>
                    <img src='../Images/intro.jpg' />
                </Carousel.Item>
                <Carousel.Item>
                    <img src='./Images/p.jpg' text="Second slide" />
                </Carousel.Item>
                <Carousel.Item>
                    <img src='./Images/p1.jpg' />
                </Carousel.Item>
                <Carousel.Item>
                    <img src='./Images/p2.jpg' />
                </Carousel.Item>
                <Carousel.Item>
                    <img src='./Images/p3.jpg' />
                </Carousel.Item>
                <Carousel.Item>
                    <img src='./Images/p4.jpg' />
                </Carousel.Item>
                <Carousel.Item>
                    <img src='./Images/p5.jpg' />
                </Carousel.Item>
                <Carousel.Item>
                    <img src='./Images/p6.jpg' />
                </Carousel.Item>
                <Carousel.Item>
                    <img src='./Images/p7.jpg' />
                </Carousel.Item>
                <Carousel.Item>
                    <img src='./Images/p8.jpg' className='imagen' />
                </Carousel.Item>
                <Carousel.Item>
                    <img src='./Images/p9.jpg' />
                </Carousel.Item>
            </Carousel>
            <div className="card1">

                <h5><em><b>En María Plaza estilistas creemos firmemente en que tu imagen forma parte de tu seguridad y personalidad.
                    Por ello siempre ofrecemos un trato único y personal, para que tu experiencia siempre sea lo más positiva posible.
                    Ofreciéndote siempre la mayor calidad en nuestros productos para el cuidado de tu imagen con la garantía de contar
                    con profesionales altamente cualificados, para que tu experiencia y tu confianza en nuestros esté al nivel de nuestra
                    profesionalidad.</b></em></h5>
            </div>
        </>
    )
}