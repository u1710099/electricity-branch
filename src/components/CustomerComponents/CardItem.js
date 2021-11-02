import React from 'react';
import {Link} from 'react-router-dom';
import classes from "./customer.module.css"
import {Button} from "react-bootstrap";


function CardItem(props) {
    return (
        <>
            <li className='cards__item'>
                <Link className='cards__item__link' to={props.path}>
                    <figure className='cards__item__pic-wrap' data-category={props.label}>
                        <div className={classes.cardItem}>
                            <img
                                // alt='Travel Image'
                                src={props.src}
                                className='cards__item__img'
                            />
                            <div className="button_container">
                                <Button onClick={props.onClickButton} className={classes.button}
                                        variant="success">Reading date</Button>
                                <Button className={classes.button} variant="success">Energy Meter</Button>
                                <Button className={classes.button} variant="success">Billing</Button>
                                <Button className={classes.button} variant="success">Success</Button>
                            </div>
                        </div>
                    </figure>
                    <div className='cards__item__info'>
                        <h5 className='cards__item__text'>{props.text}</h5>
                    </div>
                </Link>
            </li>
        </>
    );
}

export default CardItem;



