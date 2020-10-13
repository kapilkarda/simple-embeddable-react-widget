import React from 'react'
import ReactDOM from 'react-dom';
import Config from '../../config';
import './Widget.css';
import Slider from 'react-slick';
// import VideoUrl from './dummy.mp4';
import axios from 'axios';
// import Logo from './logo.png';
// import SpinnerImg from './spinner.gif';
import { Player, Shortcut } from 'video-react';
import StarRatingComponent from 'react-star-rating-component';

import 'bootstrap/dist/css/bootstrap.min.css';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import "video-react/dist/video-react.css";
var current_url=window.location.href;
// let apiKey=current_url.substr(current_url.lastIndexOf('/') + 1);
let apiKey = 'OODn7QCoB2dbFlUYvFxJZJYQGk0i5WEu';

const widgetName = Config.name;

class Widget extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          isLoading: false,
          nav1: null,
          nav2: null,
          videoList: [],
          widgetSetting: '2',
          errorMsg: '',
          rating: 0
        }
      }
      componentDidMount() {
        this.setState({
          nav1: this.slider1,
          nav2: this.slider2,
          isLoading: true
        });
        this.getVideos();
      }
      getVideos(){
        const formData = new FormData();
        formData.append('api_key', apiKey);
        axios.post('https://www.feedfleet.com/Home/videoListByApiKey', formData)
        .then( (response) => {
          // console.log(response);
          if (response.status === 200) {
            if (response.data.success === true) {
              // if (response.data.data.length > 0) {
              //   for (let item of response.data.data) {
              //     let jsonData = item.customer_name;
              //     for (let users of jsonData) {
              //       users.name = users.name.trim();
              //     }
              //     item.field_data = jsonData
              //   }
              // }
              console.log(response.data);
              this.setState({
                videoList: response.data.data,
                widgetSetting: response.data.widget_setting,
                isLoading: false
              });
            }
            if (response.data.success === false) {
              this.setState({
                errorMsg: response.data.data,
                isLoading: false
              });
            }
          } else {
            this.setState({
              isLoading: false
            });
          }
          
        })
        .catch( (error) => {
          // console.log(error);
          this.setState({
            isLoading: false
          });
        });
      }
    //   getVideosPlay = (op, i) => {
        // console.log(op)
        // console.log(this.player)
        // let ind = this.state.videoList.indexOf(op);
        // if (i === ind) {
        //   this.play()
        // }
        // for (let item of this.state.videoList) {
        //   if () {
    
        //   }
        // }
    
    //   }
      play() {
        this.player.play();
      }
    
      pause() {
        this.player.pause();
      }

      render() {
        const settings = {
          arrows: true,
          infinite: false,
          speed: 500,
          slidesToShow: 4,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 1008,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 800,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 512,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
    
          ]
        };
        const settingsAgain = {
          arrows: true,
          infinite: false,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1,
          swipeToSlide: true,
          focusOnSelect: true,
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 1008,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 800,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 512,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
    
          ]
        };
        const { videoList, widgetSetting } = this.state;
        // console.log('this.slider1', this.slider1);
        // console.log('this.slider2', this.slider2);
        return (
          <div className="App">
            
            {
            (this.state.isLoading) &&
              <div className="loader-spinner">
                <img src="./spinner.gif" className="preloader-init" alt="spinner" />
              </div>
              
            }
            {
              this.state.errorMsg !== '' &&
              <div className="error-msg">{this.state.errorMsg}</div>
            }
            
            {
              widgetSetting === '2' &&
              <div className="container-fluid mt-4">
                <div className="row no-gutters">
                  <div className="col-xs-12 col-md-12 col-lg-12" >
                    <div>
                      <Slider
                        asNavFor={this.state.nav2}
                        ref={slider => (this.slider1 = slider)}
                      >
                        {
                          videoList && videoList.map((op, j) =>
                          <div key={j} className="double-slider">
                            <div className="thumbnail card">
                              <div className="img-event">
                                  {/* <video style={{width: '100%'}} controls>
                                    <source  src={op.video_url} type="video/mp4" />
                                  </video> */}
                                  <Player
                                    fluid={false}
                                    playsInline
                                    src={op.video_url}
                                    height={400}
                                    width={'100%'}
                                  />
                              </div>
                            </div>
                          </div>
                          )
                        }
                      </Slider>
    
                      <Slider
                        asNavFor={this.state.nav1}
                        ref={slider => (this.slider2 = slider)}
                        {...settingsAgain}
                      >
                        {
                          videoList && videoList.map((op, i) =>
                          <div className="slider-main-box" key={i}>
                            <div className="thumbnail card">
                              <div className="img-event" style={{pointerEvents: 'none'}}>
                                  {/* <video style={{width: '100%', height: '100%', minHeight: '250px', maxHeight: '350px'}} controls>
                                    <source  src={op.video_url} type="video/mp4" />
                                  </video> */}
                                    <Player
                                      fluid={false}
                                      playsInline
                                      src={op.video_url}
                                      height={320}
                                      width={'100%'}
    
                                    />
                              </div>
                              <div className="card-body">
                                <p className="card-title">{op.customer_name}</p>
                                <StarRatingComponent 
                                  name="rating" 
                                  starCount={5}
                                  editing={false}
                                  value={Number(op.rating)}
                                />
                                {/* <p className="card-caption"> Campians designation</p> */}
                              </div>
                            </div>
                          </div>
                          )
                        }
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
            }
            {
              widgetSetting === '3' &&
              <div className="container-fluid mt-4">
                <div className="row no-gutters">
                  <div className="col-xs-12 col-md-12 col-lg-12" >
                    <div className="mt-5">
                      <Slider {...settings}>
                        {
                            videoList && videoList.map((op, i) =>
                          <div className="slider-main-box" key={i} onClick={() => this.getVideosPlay(op, i)}>
                            <div className="thumbnail card">
                              <div className="img-event">
                                  {/* <video style={{width: '100%', height: '100%', minHeight: '250px', maxHeight: '350px'}} controls>
                                    <source  src={op.video_url} type="video/mp4" />
                                  </video> */}
                                  <Player
                                      fluid={false}
                                      playsInline
                                      src={'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4'}
                                      height={320}
                                      width={'100%'}
                                      ref={player => {
                                        this.player = player;
                                      }}
                                    ><Shortcut clickable={false} /></Player>
                              </div>
                              <div className="card-body">
                                <p className="card-title">{op.customer_name}</p>
                                <StarRatingComponent 
                                  name="rating" 
                                  starCount={5}
                                  editing={false}
                                  value={Number(op.rating)}
                                />
                              </div>
                            </div>
                          </div>
                          )
                        }
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
            }
            {
              widgetSetting === '1' &&
          
              <div className="container-fluid mt-4">
                <div className="row view-group list-view-grid">
                  {
                    videoList && videoList.map((op, i) =>
                      <div className="item col-xs-12 col-lg-3 col-md-3" key={i}>
                        <div className="thumbnail card">
                            <div className="img-event">
                                {/* <video style={{width: '100%', height: '320px'}} controls>
                                  <source  src={op.video_url} type="video/mp4" />
                                </video> */}
                                  <Player
                                    fluid={false}
                                    playsInline
                                    src={op.video_url}
                                    height={320}
                                    width={'100%'}
                                  />
                            </div>
                            <div className="card-body">
                              <p className="card-title">{op.customer_name}</p>
                                <StarRatingComponent 
                                  name="rating" 
                                  starCount={5}
                                  editing={false}
                                  value={Number(op.rating)}
                                />
                            </div>
                        </div>
                    </div>
                    )
                  }
                </div>
              </div>
          }
            <div className="container-fluid mt-2" style={{ position: 'absolute', bottom: 0, marginTop: 20 }}>
              <div className="row">
                <div className="col-md-12">
                  <div style={{ textAlign: 'right', paddingBottom: '1rem' }}>
                    <span>Poweredby <span><img src="https://www.feedfleet.com/assests/frotnend/assets/img/logo/logo.png" alt="logo" style={{ width: 120 }} /></span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
};

export default Widget;