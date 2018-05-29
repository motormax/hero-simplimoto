
import React, { Component } from 'react';
import { connect, createLocalTracks } from 'twilio-video';
// import { Button, Container } from 'semantic-ui-react'
import { attachTracks, detachTracks, detachParticipantTracks } from './helpers'
import { GetTwilioToken } from './twilioToken'


export default class VideoPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {        
  }

  componentWillUnmount = () => {
    if (this.state.room && this.state.room.state === 'connected') {
      this.state.room.disconnect();
    }
  }

  displayMessage = (message) => {
    console.log(message);
    this.setState({presenterMessage: message});
  }

  log = (message) => {
    console.log(message);
  }

  handleDisconnect = () => {
    this.log('Left');
    this.displayMessage('Please click Join Room to start a Live Tour');

    this.state.room.participants.forEach(detachParticipantTracks);
    this.setState({ room: undefined, roomJoined: false });
  }

  // Successfully connected!
  roomJoined = (room) => {
    this.setState({ room, roomJoined: true }); 

    // Attach the Tracks of the Room's Participants.
    room.participants.forEach((participant) => {
      this.log(`Already in Room: '${participant.identity}'`);
      const remoteContainer = this.refs.remoteMedia;
      // attachParticipantTracks(participant, remoteContainer);
      attachTracks(participant.tracks, this.refs.remoteMedia);
    });

    // When a Participant joins the Room, log the event.
    room.on('participantConnected', (participant) => {
      this.log(`Joining: '${participant.identity}'`);
    });

    // When a Participant adds a Track, attach it to the DOM.
    room.on('trackAdded', (track, participant) => {
      this.log(`${participant.identity} added track: ${track.kind}!`);
      const remoteContainer = this.refs.remoteMedia;
      attachTracks([track], remoteContainer);
      if (track.kind == 'video') {

      }
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

  handleJoinLeaveClick = () => {
    if (this.state.roomJoined) {
      this.handleJoinClick();
    } else {
      this.handleLeaveClick();
    }
  }

  handleLeaveClick = () => {
    this.log('Leaving room...');
    this.state.room.disconnect();
  }

  handleJoinClick = () => {
    this.roomName = 'Hero-Bike-Live-Tour';
    this.log(`Joining room '${this.roomName}'...`);
    const connectOptions = {
      name: this.roomName,
      logLevel: 'debug',
      video: { width: 710 },
    };

    // Join the Room with the token from the server and the
    // LocalParticipant's Tracks.
    const participantId = 'Bike_Fan_' + Math.floor(Math.random()*100);

    this.roomJoined = this.roomJoined.bind(this);
    connect(GetTwilioToken(participantId), connectOptions).then(this.roomJoined, (error) => {
      console.log(`Could not connect to Twilio: ${error.message}`);
      this.log('Could not connect to Twilio');
    });
  }

  render() {
    const imageUrl = require(`./images/live-tour-home.png`);
    let sectionStyle = {
      width: "100%",
      height: "400px",
      backgroundImage: `url(${imageUrl})`,
      display: this.state.roomJoined ? 'none' : 'block'
    };
    return (
      <div style={{
        width: '1338px',
        margin: 'auto',
        position: 'relative',
      }}
      >
        <img
            style={{
            position: 'relative',
            display: 'block',
            width: '1338px',
          }}
            src={`${imageUrl}`}
          />
        <div ref='remoteMedia' className='media-container' style={{
          position: 'absolute', width: '708px', height: '321px', top: '265px', left: '281px',
        }} ></div>
        <a
          style={{
            position: 'absolute',
            width: '327px',
            height: '58px',
            left: '558px',
            top: '621px',
          }}
          onClick={this.handleJoinLeaveClick}
          ref='joinButton'
        />
      </div>
      // <div ref='remoteMedia' className='media-container' ></div>
      // <video ref='remoteMedia' autoPlay align="center" style={{
      //   position: 'absolute', width: '708px', height: '321px', top: '265px', left: '281px',
      // }}></video>  

      // <Container textAlign='center'>
      //       <h2>Start a Live Tour</h2>
      //       <p>
      //       Meet our bikes guided by one our of specialists. Join a live chat and get all your questions answered about the bike you are interested in.
      //       </p>
      //       <div ref='localMedia' className='media-container'></div>
      //       <div style={ sectionStyle } />
      //       <div ref='remoteMedia' className='media-container'>
      //       </div>

      //       <p>{this.state.presenterMessage}</p>
      //       <Button primary
      //         style={{ display: this.state.roomJoined ? 'none' : 'inline'}}
      //         id='button-join'
      //         onClick={this.handleJoinClick}
      //         ref='joinButton'
      //       >Start a Live Tour</Button>
      //       <Button primary
      //         style={{ display: !this.state.roomJoined ? 'none' : 'inline'}}
      //         id='button-leave'
      //         onClick={this.handleLeaveClick}
      //         ref='leaveButton'
      //         >End the tour</Button>
      //         <p>Live tour is available from Monday to Friday between 10am-7pm EST.</p>
      //   </Container>
    );
  }
}
