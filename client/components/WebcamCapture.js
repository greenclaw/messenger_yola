import React, { Component } from 'react';
import Webcam from 'react-webcam'


class WebcamCapture extends React.Component {
    setRef(webcam) {
      this.webcam = webcam;
    }
  
    capture() {
      const imageSrc = this.webcam.getScreenshot();
      
    };

    uploadImage(image) {
        const imageName = Date.now();
        const url = 'http://10.91.81.75:8001';
        const formData = new FormData();
        formData.append(imageName, image)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return  post(url, formData,config)
    }
  
    render() {
      return (
        <div>
          <Webcam
            audio={false}
            height={350}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={350}
          />
          <button onClick={this.capture}>Capture photo</button>
        </div>
      );
    }
  }