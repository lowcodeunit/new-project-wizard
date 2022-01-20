import '../App.css';
import React from 'react';

class LCUComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  get lcu() {
    return {
      track: (name, path) => {
        if (name) {
          window.ORIBI?.api('track', name);
        }

        if (window.ga && path) {
          window.ga('send', 'pageview', `${window.location.pathname}/${path}`);
        }
      }
    }
  }
}

export default LCUComponent;
