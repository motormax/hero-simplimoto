import React, { Component } from 'react';
import { connect, createLocalTracks } from 'twilio-video';
import { GetTwilioToken } from './twilioToken'
import { Button, Container } from 'semantic-ui-react'
import { attachTracks, detachTracks, detachParticipantTracks } from './helpers'

export default class LiveTourPresenterPage extends Component {
    constructor(props) {
        super(props);
    
        this.state = {roomJoined: false, presenterMessage: 'Please click Join Room to start a Live Tour'};
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

    handleDisconnect = () => {
        this.displayMessage('Please click Join Room to start a Live Tour');

        const conversation = this.state.room;
        console.log('detaching remote participants');
        conversation.participants.forEach(detachParticipantTracks);

        console.log('detaching local participant');
        if (this.state.previewTracks) {
            this.state.previewTracks.forEach((track) => {
                console.log('detach track ' + track.name);
                track.stop();
            });
        }
        this.setState({ room: undefined,  roomJoined: false, previewTracks: undefined});
    }

    roomJoined = (room) => {
        this.setState({ room, roomJoined: true }); 
        
        createLocalTracks().then((tracks) => {
            this.setState({previewTracks: tracks});
            attachTracks(tracks, this.refs.localMedia);
        });
        // attachTracks(room.localParticipant.tracks, this.refs.localMedia);

        room.participants.forEach((participant) => {
          this.displayMessage(`Already in Room: '${participant.identity}'`);
          attachTracks(participant.tracks, this.refs.remoteMedia);
        });

        room.on('participantConnected', (participant) => {
            this.displayMessage(participant.identity + ' has connected');
          });
  
        room.on('trackAdded', (track, participant) => {
          this.displayMessage(`${participant.identity} added track: ${track.kind}!`);
          attachTracks([track], this.refs.remoteMedia);
        //   attachTracks(participant.tracks, this.refs.remoteMedia);
        });
    
        room.on('trackRemoved', (track, participant) => {
            this.displayMessage(`${participant.identity} removed track: ${track.kind}`);
            detachTracks([track]);
        });
              
        room.on('participantDisconnected', (participant) => {
            this.displayMessage(`Participant '${participant.identity}' left the room`);
            detachParticipantTracks(participant);
        });

        room.on('disconnected', this.handleDisconnect);
    }

    handleJoinClick = () => {
        navigator.mediaDevices.getUserMedia({ 
            audio: true, 
            video: { facingMode: { exact: "environment" } } 
        }).then((mediaStream) => {
          const participantId = 'Bike_Expert_' + Math.floor(Math.random()*100);
          this.displayMessage(`Participant Id'${participantId}' is joining`);
          return connect(GetTwilioToken(participantId), {
            name: 'Hero-Bike-Live-Tour',
            tracks: mediaStream.getTracks()
          });          
        }).then(this.roomJoined.bind(this), (error) => {
            console.log(`Could not connect to Twilio: ${error.message}`);
        });
    }

    handleLeaveClick = () => {
        this.displayMessage('Leaving room...');
        this.state.room.disconnect();
    }

    render() {
        return (
        <Container textAlign='center'>
            <h2>Start a Live Tour</h2>
            Local Media
            <div ref='localMedia' className='media-container'></div>
            Remote Media
            <div ref='remoteMedia' className='media-container'></div>
            <p>{this.state.presenterMessage}</p>
            <Button primary
              style={{ display: this.state.roomJoined ? 'none' : 'inline'}}
              id='button-join'
              onClick={this.handleJoinClick}
              ref='joinButton'
            >Join Room</Button>
            <Button primary
              style={{ display: !this.state.roomJoined ? 'none' : 'inline'}}
              id='button-leave'
              onClick={this.handleLeaveClick}
              ref='leaveButton'
              >Leave Room</Button>
        </Container>
        );
    }              
}