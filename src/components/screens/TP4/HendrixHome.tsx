import { Carousel } from "react-bootstrap";

export const HomeHendrix = () => {
  return (
    <>
      <h1 style={{ textAlign: 'center', color: 'red', fontFamily: 'Roboto, sans-serif' }}>MUSICAL HENDRIX</h1>
      <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <div className="d-flex justify-content-center align-items-center">
            <div className="bg-gray">
              <img
                className="d-block mx-auto"
                src="img/tienda.jpg"
                alt="First slide"
                style={{ width: "1200px", height: "700px" }}
              />
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="d-flex justify-content-center align-items-center">
            <div className="bg-gray">
              <img
                className="d-block mx-auto"
                src="img/tienda2.jpg"
                alt="Second slide"
                style={{ width: "1200px", height: "700px" }}
              />
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="d-flex justify-content-center align-items-center">
            <div className="bg-gray">
              <img
                className="d-block mx-auto"
                src="img/tienda3.jpg"
                alt="Third slide"
                style={{ width: "1200px", height: "700px" }}
              />
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
      <p style={{textAlign:'center', fontSize:'30px', margin:'30px'}}>
      Musical Hendrix es una tienda de instrumentos musicales con ya más de 15 años de
      experiencia. Tenemos el conocimiento y la capacidad como para informarte acerca de las
      mejores elecciones para tu compra musical.
      </p>
    </>
  );
};