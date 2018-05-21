
import React, { Component } from 'react';
import { connect } from 'twilio-video';
import { createLocalTracks } from 'twilio-video';

var AccessToken = require('twilio').jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;

export default class VideoPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  // Detach the Participant's Tracks from the DOM.
  detachParticipantTracks(participant) {
    var tracks = Array.from(participant.tracks.values());
    this.detachTracks(tracks);
  }

  log(message) {
    this.logDiv.innerHTML = '<p>&gt;&nbsp;' + message + '</p>';
  }

  // Attach the Tracks to the DOM.
  attachTracks(tracks, container) {
    tracks.forEach(function(track) {
      container.appendChild(track.attach());
    });
  }

  // Attach the Participant's Tracks to the DOM.
  attachParticipantTracks(participant, container) {
    var tracks = Array.from(participant.tracks.values());
    this.attachTracks(tracks, container);
  }

  // Detach the Tracks from the DOM.
  detachTracks(tracks) {
    tracks.forEach(function(track) {
      track.detach().forEach(function(detachedElement) {
        detachedElement.remove();
      });
    });
  }

  getToken(identity) {
    // Create an access token which we will sign and return to the client,
    // containing the grant we just created.
    var token = new AccessToken(
      process.env.REACT_APP_TWILIO_ACCOUNT_SID,
      process.env.REACT_APP_TWILIO_API_KEY,
      process.env.REACT_APP_TWILIO_API_SECRET
    );
  
    // Assign the generated identity to the token.
    token.identity = identity;
  
    // Grant the access token Twilio Video capabilities.
    var grant = new VideoGrant();
    token.addGrant(grant);
    return token.toJwt();
  }

  handleDisconnect() {
    this.log('Left');
    if (this.previewTracks) {
      this.previewTracks.forEach(function(track) {
        track.stop();
      });
    }
    this.detachParticipantTracks(this.state.room.localParticipant);
    this.state.room.participants.forEach(this.detachParticipantTracks);      
    this.setState({ room: undefined });
    this.buttonJoin.style.display = 'inline';
    this.buttonLeave.style.display = 'none';
  }
  
  localTracksPromiseHandler(tracks) {
    this.previewTracks = tracks;
    var previewContainer = this.localMedia;
    if (!previewContainer.querySelector('video')) {
      this.attachTracks(tracks, previewContainer);
    }
  }

  // Successfully connected!
  roomJoined(room) {
    this.setState({ room });
    // window.room = activeRoom = room;

    // this.log("Joined as '" + this.tokenData.identity + "'");
    this.buttonJoin.style.display = 'none';
    this.buttonLeave.style.display = 'inline';

    // Attach LocalParticipant's Tracks, if not already attached.
    var previewContainer = this.localMedia;
    if (!previewContainer.querySelector('video')) {
      this.attachParticipantTracks(room.localParticipant, previewContainer);
    }

    // Attach the Tracks of the Room's Participants.
    room.participants.forEach(function(participant) {
      this.log("Already in Room: '" + participant.identity + "'");
      var previewContainer = this.remoteMedia;
      this.attachParticipantTracks(participant, previewContainer);
    });

    // When a Participant joins the Room, log the event.
    room.on('participantConnected', function(participant) {
      this.log("Joining: '" + participant.identity + "'");
    });

    // When a Participant adds a Track, attach it to the DOM.
    room.on('trackAdded', function(track, participant) {
      this.log(participant.identity + " added track: " + track.kind);
      var previewContainer = this.remoteMedia;
      this.attachTracks([track], previewContainer);
    });

    // When a Participant removes a Track, detach it from the DOM.
    room.on('trackRemoved', function(track, participant) {
      this.log(participant.identity + " removed track: " + track.kind);
      this.detachTracks([track]);
    });

    // When a Participant leaves the Room, detach its Tracks.
    room.on('participantDisconnected', function(participant) {
      this.log("Participant '" + participant.identity + "' left the room");
      this.detachParticipantTracks(participant);
    });

    // Once the LocalParticipant leaves the room, detach the Tracks
    // of all Participants, including that of the LocalParticipant.
    this.handleDisconnect = this.handleDisconnect.bind(this);
    room.on('disconnected', this.handleDisconnect);
  }

  handlePreviewClick() {
    var localTracksPromise = this.previewTracks
      ? Promise.resolve(this.previewTracks)
      : createLocalTracks();

    this.localTracksPromiseHandler = this.localTracksPromiseHandler.bind(this);
    localTracksPromise.then(this.localTracksPromiseHandler, function(error) {
      console.error('Unable to access local media', error);
      alert('Unable to access Camera and Microphone');
    });
  }

  handleLeaveClick() {
    this.log('Leaving room...');
    this.state.room.disconnect();
  };

  handleJoinClick() {
    if (!this.identityInput.value) {
      alert('Please enter your name name.');
      return;
    }

    this.roomName = 'Meet-Hunk-Bike';
    this.log("Joining room '" + this.roomName + "'...");
    var connectOptions = {
      name: this.roomName,
      logLevel: 'debug'
    };
    
    // Join the Room with the token from the server and the
    // LocalParticipant's Tracks.
    this.roomJoined = this.roomJoined.bind(this);
    connect(this.getToken(this.identityInput.value), connectOptions).then(this.roomJoined, function(error) {
      console.log('Could not connect to Twilio: ' + error.message);
      alert('Could not connect to Twilio');
    });
  }

  componentDidMount() {
    this.roomControl.style.display="block";
  }

  componentWillUnmount() {
    if (this.state.room && this.state.room.state === 'connected') {
      this.state.room.disconnect();
    }
  }

  render() {
    return (
      <div>
        <div id="remote-media" ref={div => {
            this.remoteMedia = div;
            }}></div>
        <div id="controls">
          <div id="preview">
            <p>Please join our channel to meet your bike</p>            
            <div id="local-media" ref={div => {
            this.localMedia = div;
            }}></div>
            <button id="button-preview" onClick={this.handlePreviewClick.bind(this)}>Preview My Camera</button>
          </div>
          <div id="room-controls" ref={div => {
            this.roomControl = div;
            }}>
            <p>Room Name: </p>
            <input id="identity-name" type="text" placeholder="Enter a your name" ref={input => {
              this.identityInput = input;
            }}/>
            <button id="button-join" onClick={this.handleJoinClick.bind(this)} ref={button => {
              this.buttonJoin = button;
            }}>Join Room</button>
            <button id="button-leave" onClick={this.handleLeaveClick.bind(this)} ref={button => {
              this.buttonLeave = button;
            }}>Leave Room</button>
          </div>
          <div id="log" ref={div => {
            this.logDiv = div;
            }}></div>
        </div>
      </div>
    );
  }
}
