import React from 'react';


// This code loads the Gruveo Embed API code asynchronously.
const tag = document.createElement('script');
tag.src = 'https://www.gruveo.com/embed-api/';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function gets called after the API code downloads. It creates
// the actual Gruveo embed and passes parameters to it.

window.onGruveoEmbedAPIReady = () => {
  window.isGruveoLoadedPromise = true;
};

export default class GruveoEmbed extends React.Component {
  constructor(props) {
    super(props);
    this.divId = 'random_id_jdkfjsd';
    this.Gruveo = window.Gruveo;
  }

  componentDidMount() {
    this.embed = new this.Gruveo.Embed(this.divId, {
      responsive: 1,
      embedParams: { code: 'simplymoto' },
    });
  }

  render() {
    return <div id={this.divId} />;
  }
}

