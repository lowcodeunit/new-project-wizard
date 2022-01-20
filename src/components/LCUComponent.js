import '../App.css';
import React from 'react';

class LCUComponent extends React.Component {
  basePath;

  constructor(props) {
    super(props);
    
    this.basePath = window.location.pathname;
  }

  get lcu() {
    return {
      track: (name, path) => {
        if (name) {
          window.ORIBI?.api('track', name);
        }

        if (window.ga && path) {
          window.ga('send', 'pageview', `${this.basePath}/${path}`);
        }
      }
    }
  }
}

export default LCUComponent;
