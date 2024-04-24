import React from "react";
import { Link } from "react-router-dom";
import ShopInterior from './../../assets/interior.jpg'
import ShopExterior from './../../assets/exterior.jpg'
import './styles.scss';

const Directory = props => {
    return (
        <div className="directory">
            <div className="wrap">
                <div
                    className="item"
                    style={{
                        backgroundImage: `url(${ShopInterior})`
                    }}>
                        <Link to='/search/interior'>
                        Shop Interior
                        </Link>
                </div>
                <div
                    className="item"
                    style={{
                        backgroundImage: `url(${ShopExterior})`
                    }}>
                        <Link to='/search/exterior'>
                        Shop Exterior
                        </Link>
                </div>
            </div>
        </div>
    );
};

export default Directory;