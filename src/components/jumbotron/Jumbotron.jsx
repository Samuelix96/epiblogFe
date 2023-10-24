
import React from "react";
import Button from "react-bootstrap/esm/Button";
import "./jumbo.css"
const Jumbotron = ()=>  {
    return (
        <div   className=" bg-secondary text-center container-box he d-flex justify-content-center flex-column mx-auto p-2" >
            <h1>LE MERAVIGLIE DELLA NATURA</h1>
            <p className=" fs-3">
            A year can be divided not only into days, weeks and months, but also into Four Seasons. 
            </p>
            <p>
                <Button bsStyle="primary"><a className=" text-light link link-underline" href="https://1x.com/magazine/permalink/9170">Read More</a></Button>
            </p>
        </div>


    )

}
export default Jumbotron;