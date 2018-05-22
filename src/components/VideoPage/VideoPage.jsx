
import React, { Component } from 'react';
import { connect, createLocalTracks } from 'twilio-video';
import { jwt } from 'twilio';
import { GetDeviceSelectionOptions, ApplyVideoInputDeviceSelection } from './helpers'

const { AccessToken } = jwt;
const { VideoGrant } = AccessToken;

function getToken(identity) {
  // Create an access token which we will sign and return to the client,
  // containing the grant we just created.
  const token = new AccessToken(
    process.env.REACT_APP_TWILIO_ACCOUNT_SID,
    process.env.REACT_APP_TWILIO_API_KEY,
    process.env.REACT_APP_TWILIO_API_SECRET,
  );

  // Assign the generated identity to the token.
  token.identity = identity;

  // Grant the access token Twilio Video capabilities.
  const grant = new VideoGrant();
  token.addGrant(grant);
  return token.toJwt();
}

// Attach the Tracks to the DOM.
function attachTracks(tracks, container) {
  tracks.forEach((track) => {
    container.appendChild(track.attach());
  });
}

// Detach the Tracks from the DOM.
function detachTracks(tracks) {
  tracks.forEach((track) => {
    track.detach().forEach((detachedElement) => {
      detachedElement.remove();
    });
  });
}

// Detach the Participant's Tracks from the DOM.
function detachParticipantTracks(participant) {
  const tracks = Array.from(participant.tracks.values());
  detachTracks(tracks);
}

// Attach the Participant's Tracks to the DOM.
function attachParticipantTracks(participant, container) {
  const tracks = Array.from(participant.tracks.values());
  attachTracks(tracks, container);
}

export default class VideoPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.roomControl.style.display = 'block';
    
    let videoDevicesOptions = [];         
    GetDeviceSelectionOptions().then((deviceSelectionOptions) => {
      let kindDeviceInfos = deviceSelectionOptions['videoinput'];
      kindDeviceInfos.forEach((kindDeviceInfo) => {
        let deviceId = kindDeviceInfo.deviceId;
        let label = kindDeviceInfo.label || 'Device [ id: '
          + deviceId.substr(0, 5) + '... ]';

          videoDevicesOptions.push(<option key={deviceId} value={deviceId}>{label}</option>);
      });
      this.setState({
        videoDevices: videoDevicesOptions
      });
    });    
  }

  componentWillUnmount() {
    if (this.state.room && this.state.room.state === 'connected') {
      this.state.room.disconnect();
    }
  }

  log(message) {
    this.logDiv.innerHTML = `<p>&gt;&nbsp;${message}</p>`;
  }

  handleDisconnect() {
    this.log('Left');
    if (this.previewTracks) {
      this.previewTracks.forEach((track) => {
        track.stop();
      });
    }
    this.state.room.participants.forEach(this.detachParticipantTracks);
    this.setState({ room: undefined });
    this.buttonJoin.style.display = 'inline';
    this.buttonLeave.style.display = 'none';
  }

  localTracksPromiseHandler(tracks) {
    this.previewTracks = tracks;
    const previewContainer = this.localMedia;
    if (!previewContainer.querySelector('video')) {
      attachTracks(tracks, previewContainer);
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
    const previewContainer = this.localMedia;
    if (!previewContainer.querySelector('video')) {
      attachParticipantTracks(room.localParticipant, previewContainer);
    }

    // Attach the Tracks of the Room's Participants.
    room.participants.forEach((participant) => {
      this.log(`Already in Room: '${participant.identity}'`);
      const remoteContainer = this.remoteMedia;
      attachParticipantTracks(participant, remoteContainer);
    });

    // When a Participant joins the Room, log the event.
    room.on('participantConnected', (participant) => {
      this.log(`Joining: '${participant.identity}'`);
    });

    // When a Participant adds a Track, attach it to the DOM.
    room.on('trackAdded', (track, participant) => {
      this.log(`${participant.identity} added track: ${track.kind}!`);
      const remoteContainer = this.remoteMedia;
      attachTracks([track], remoteContainer);
    });

    // When a Participant removes a Track, detach it from the DOM.
    room.on('trackRemoved', (track, participant) => {
      this.log(`${participant.identity} removed track: ${track.kind}`);
      detachTracks([track]);
    });

    // When a Participant leaves the Room, detach its Tracks.
    room.on('participantDisconnected', (participant) => {
      this.log(`Participant '${participant.identity}' left the room`);
      detachParticipantTracks(participant);
    });

    // Once the LocalParticipant leaves the room, detach the Tracks
    // of all Participants, including that of the LocalParticipant.
    this.handleDisconnect = this.handleDisconnect.bind(this);
    room.on('disconnected', this.handleDisconnect);
  }

  handlePreviewClick() {
    const localTracksPromise = this.previewTracks
      ? Promise.resolve(this.previewTracks)
      : createLocalTracks({facingMode: "environment"});

    this.localTracksPromiseHandler = this.localTracksPromiseHandler.bind(this);
    localTracksPromise.then(this.localTracksPromiseHandler, (error) => {
      console.error('Unable to access local media', error);
      this.log('Unable to access Camera and Microphone');
    });
  }

  handleApplyVideoInputButton(event) {
    ApplyVideoInputDeviceSelection(this.videoinputSeviceSelection.value, this.localMedia);
    event.preventDefault();
    event.stopPropagation();
  }

  handleLeaveClick() {
    this.log('Leaving room...');
    this.state.room.disconnect();
  }

  handleJoinClick() {
    if (!this.identityInput.value) {
      alert('Please enter your name name.');
      return;
    }

    this.roomName = 'Meet-Hunk-Bike';
    this.log(`Joining room '${this.roomName}'...`);
    const connectOptions = {
      name: this.roomName,
      logLevel: 'debug',
    };

    // Join the Room with the token from the server and the
    // LocalParticipant's Tracks.
    this.roomJoined = this.roomJoined.bind(this);
    connect(getToken(this.identityInput.value), connectOptions).then(this.roomJoined, (error) => {
      console.log(`Could not connect to Twilio: ${error.message}`);
      this.log('Could not connect to Twilio');
    });
  }

  render() {
    return (
      <div>
        <div
          id="remote-media"
          ref={(div) => { this.remoteMedia = div; }}
        />
        <div id="controls">
          <div id="preview">
            <p>Please join our channel to meet your bike. Version 1.0</p>
            <div
              id="local-media"
              ref={(div) => { this.localMedia = div; }}
            />
            <button id="button-preview" onClick={this.handlePreviewClick.bind(this)}>Preview My Camera</button>
          </div>
          <div
            id="room-controls"
            ref={(div) => { this.roomControl = div; }}
          >
            <p>Room Name: </p>
            <input
              id="identity-name"
              type="text"
              placeholder="Enter a your name"
              ref={(input) => { this.identityInput = input; }}
            />
            <button
              id="button-join"
              onClick={this.handleJoinClick.bind(this)}
              ref={(button) => { this.buttonJoin = button; }}
            >
              Join Room
            </button>
            <button
              id="button-leave"
              onClick={this.handleLeaveClick.bind(this)}
              ref={(button) => { this.buttonLeave = button; }}
            >
              Leave Room
            </button>
          </div>
          <form>
            <div className="form-group">
              <label className="form-text text-muted">Video Input</label>
              <div className="input-group">
                <select id="videoinput" name="videoinput"
                       ref={(select) => { this.videoinputSeviceSelection = select; }}>
                { this.state.videoDevices }
                </select>
                <span className="input-group-btn">
                  <button id="videoinputapply" className="btn btn-primary btn-sm"
                    onClick={this.handleApplyVideoInputButton.bind(this)}
                  >Apply</button>
                </span>
              </div>
            </div>
          </form>  
          <div
            id="log"
            ref={(div) => { this.logDiv = div; }}
          />
        </div>
      </div>
    );
  }
}
