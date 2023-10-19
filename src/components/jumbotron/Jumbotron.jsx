import React from 'react';
import { Button, Carousel } from 'react-bootstrap';
import { Link } from "react-router-dom"


const HeaderCarousel = () => {
  return (
    <>
    <Carousel style={{ maxWidth: '400px', margin: '0 auto' }}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://media.gettyimages.com/id/1341449149/it/vettoriale/paper-art-cartone-animato-onde-astratte-sfondo-di-carta-intagliata-modello-di-design.jpg?s=2048x2048&w=gi&k=20&c=Eof0CAqFEjgT7AL5aBUEh-wiujlFCVfdhSfe-p3p8pU="
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Benvenuti nel nostro sito!</h3>
          <p>Esplora le nostre offerte speciali.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://media.gettyimages.com/id/1270217291/it/vettoriale/sfondo-foglie-autunnali.jpg?s=2048x2048&w=gi&k=20&c=F1mPlc5rSn1pfAZpoW1KmOAOoiP7s_zO-d2gCRTNndY="
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Scopri le ultime tendenze</h3>
          <p>Aggiornamenti settimanali sui prodotti più recenti.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://media.gettyimages.com/id/1186229845/it/vettoriale/neve-di-colore-bianco-e-fiocchi-di-neve-nella-parte-inferiore-di-unillustrazione.jpg?s=2048x2048&w=gi&k=20&c=R9s1u2bQeee7aTnAOQ7wYLwAR28ti6gId5slXMvE_mA="
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>I nostri servizi</h3>
          <p>Offriamo soluzioni su misura per le tue esigenze.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <Button variant="primary">
        <Link to={`/newblogs`}>Nuovo Form</Link>
      </Button>
    </>
  );
};

export default HeaderCarousel;
