import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export default class SiteSlider extends React.Component{
	render(){
		var settings = {
			speed: 1000,
		  autoplay: true
		};
		var slides = [];
		for (let i = 0 ; i < 3 ; i++){
			slides.push(
				<div>
					<iframe 
						width="500" 
						height="500"
						frameborder="0"
						src="https://silvercloudsociety.com/"
					></iframe>
				</div>
			);
		}
		return (
      <Slider {...settings}>
        {slides}
      </Slider>
    );
	}
}

