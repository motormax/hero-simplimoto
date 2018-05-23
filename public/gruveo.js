// This code loads the Gruveo Embed API code asynchronously.
const tag = document.createElement('script');
tag.src = 'https://www.gruveo.com/embed-api/';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function gets called after the API code downloads. It creates
// the actual Gruveo embed and passes parameters to it.
let embed;

function onGruveoEmbedAPIReady() {
  embed = new Gruveo.Embed('test-call-room', {
    responsive: 1,
    embedParams: {
      code: 'simplymoto',
    },
  });
}
