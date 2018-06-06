import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'twilio-video';

import { attachTracks, detachTracks, detachParticipantTracks } from './helpers';
import { getTwilioToken } from './twilioToken';
import IMGPage from '../ImagePages/IMGPage';
import liveTourTransmisionImageUrl from './images/LiveTourTransmision.png';
import liveTourHomeImageUrl from './images/LiveTourHome@2x.png';
import endCommunicationBtnUrl from './images/end_communication_btn.png';

const joinTourButtonStyles = {
  cursor: 'pointer',
  position: 'absolute',
  width: 352.58,
  left: 130,
  height: 55.93,
  top: 410,
};
const leaveTourButtonStyles = {
  cursor: 'pointer',
  position: 'absolute',
  width: '357px',
  height: '56px',
  marginLeft: 'auto',
  marginRight: 'auto',
  left: 0,
  right: 0,
  backgroundImage: `url(${endCommunicationBtnUrl})`,
};

const videoTrackStyles = {
  position: 'absolute',
  width: '670px',
  minHeight: '502px',
  top: '185px',
  left: '335px',
};

export default class LiveTourPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomJoined: false,
      imageUrl: liveTourHomeImageUrl,
      tourButtonStyles: joinTourButtonStyles,
    };
    this.audioMedia = React.createRef();
    this.videoMedia = React.createRef();
  }

  componentDidMount = () => {
    window.addEventListener('beforeunload', this.cleanUp);
  };

  componentWillUnmount = () => {
    window.removeEventListener('beforeunload', this.cleanUp);
    this.cleanUp();
  };

  cleanUp = () => {
    if (this.state.room && this.state.room.state === 'connected') {
      this.state.room.disconnect();
    }
  };

  log = (message) => {
    console.log(message);
  };

  handleDisconnect = () => {
    this.log('Disconnected from room. Detaching participants');
    this.state.room.participants.forEach(detachParticipantTracks);
    this.setState({
      room: undefined,
      roomJoined: false,
      imageUrl: liveTourHomeImageUrl,
      tourButtonStyles: joinTourButtonStyles,
    });
  };

  // Successfully connected!
  roomJoined = (room) => {
    this.setState({
      room,
      roomJoined: true,
      imageUrl: liveTourTransmisionImageUrl,
      tourButtonStyles: leaveTourButtonStyles,
    });

    // Attach the Tracks of the Room's Participants.
    room.participants.forEach((participant) => {
      this.log(`Already in Room: '${participant.identity}'`);
      participant.tracks.forEach(this.attachTrack);
    });

    // When a Participant joins the Room, log the event.
    room.on('participantConnected', (participant) => {
      this.log(`Joining: '${participant.identity}'`);
    });

    // When a Participant adds a Track, attach it to the DOM.
    room.on('trackAdded', (track, participant) => {
      this.log(`${participant.identity} added track: ${track.kind}!`);
      console.log(participant);
      this.attachTrack(track);
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
    room.on('disconnected', this.handleDisconnect);
  };

  attachTrack(track) {
    switch (track.kind) {
      case 'audio':
        track.attach(this.audioMedia.current);
        break;
      case 'video':
        track.attach(this.videoMedia.current);
        break;
      default:
        console.error('unknown track kind', track);
    }
  }

  handleJoinLeaveClick = () => {
    if (this.state.roomJoined) {
      this.handleLeaveClick();
    } else {
      this.handleJoinClick();
    }
  };

  handleLeaveClick = () => {
    this.log('Leaving room...');
    this.state.room.disconnect();
  };

  handleJoinClick = async () => {
    this.roomName = 'Hero-Bike-Live-Tour';
    this.log(`Joining room '${this.roomName}'...`);
    const connectOptions = {
      name: this.roomName,
      logLevel: 'debug',
      audio: true,
      video: false,
    };
    // Join the Room with the token from the server and the
    // LocalParticipant's Tracks.
    const participantId = `Bike_Fan_${Math.floor(Math.random() * 1000)}`;
    const room = await connect(getTwilioToken(participantId), connectOptions);
    this.roomJoined(room);
  };

  render() {
    return (

      <IMGPage imgUrl={this.state.imageUrl}>
        <div style={videoTrackStyles}>
          <audio
            ref={this.audioMedia}
            autoPlay
          />
          <video
            ref={this.videoMedia}
            style={{
              width: videoTrackStyles.width,
              maxHeight: videoTrackStyles.height,
            }}
            autoPlay
          />
          <div
            tabIndex={0}
            role="button"
            onKeyPress={() => undefined}
            style={this.state.tourButtonStyles}
            onClick={this.handleJoinLeaveClick}
          />
        </div>
        <Link
          to="/dashboard-img"
          style={{
            position: 'absolute',
            width: '220px',
            height: '28px',
            left: '54px',
            top: '34px',
          }}
        />
      </IMGPage>
    );
  }
}
