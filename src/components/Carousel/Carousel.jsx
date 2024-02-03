import React, { useRef } from 'react';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import dayjs from 'dayjs';
import './Carousel.css';
import { useNavigate } from 'react-router-dom';
import CircleRating from '../circleRating/CircleRating';
import posterImage from '../../assets/image/poster-image.png';

const Carousel = ({ data }) => {
    const carouselContainer = useRef();
    const navigate = useNavigate();

    const navigation = (dir) => {
        const container = carouselContainer.current;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <div className="carousel">
            <div className='ContentWrapper'>
                <div className="carouselTitle">title</div>
                <ArrowBack
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <ArrowForward
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />
                <div className="carouselItems" ref={carouselContainer}>
                    {data?.map((item) => {
                        return (
                            <div
                                key={item.id}
                                className="carouselItem"
                                onClick={() =>
                                    navigate(
                                        `/movie/${
                                            item.id
                                        }`
                                    )
                                }
                            >
                                <div className="posterBlock">
                                    <img alt={item.title || item.name} src={ item.poster_path 
                                    ? `https://image.tmdb.org/t/p/w500/${item.poster_path}` 
                                    : posterImage } />
                                    <CircleRating
                                        rating={item.vote_average.toFixed(
                                            1
                                        )}
                                    />
                                </div>
                                <div className="textBlock">
                                    <span className="title">
                                        {item.title || item.name}
                                    </span>
                                    <span className="date">
                                        {dayjs(item.release_date || item.first_air_date).format(
                                            "MMM D, YYYY"
                                        )}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Carousel