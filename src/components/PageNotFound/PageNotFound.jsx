import React from "react";
import "./PageNotFound.css";

const PageNotFound = () => {
    return (
        <div className="pageNotFound">
            <div className="contentWrapper">
                <span className="bigText">404</span>
                <span className="smallText">Page not found!</span>
            </div>
        </div>
    );
};

export default PageNotFound;