import React from "react";


import ReactDOM from 'react-dom/client'
import EmblaCarousel from "../components/jumbotron/EmblaCarousel"
import "../components/jumbotron/embla.css"
import "../components/jumbotron/base.css"
import "../components/jumbotron/sandbox.css"
import Navigation from "../components/navigation/Navigation";
import Jumbotron from "../components/jumbotron/Jumbotron"

const MainLayout = () =>
{

    const OPTIONS = { dragFree: true, loop: true }
    const SLIDE_COUNT = 5
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys())


    return (
        <>
            <Navigation />
            <Jumbotron/>
            <section className="sandbox__carousel">
                <EmblaCarousel slides={ SLIDES } options={ OPTIONS } />
            </section>

        </>
    )
}

export default MainLayout;

