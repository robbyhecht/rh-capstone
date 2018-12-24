import React, {Component} from 'react'
import { Card, Button, CardHeader, CardBody, CardFooter, CardTitle, CardText, Modal, ModalBody, ModalFooter, ButtonGroup, Label, Input } from 'reactstrap'
import { Link } from "react-router-dom"
import "./Venues.css"

export default class VenueCard extends Component {

  // set state in constructor for the modals and tour button status

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalNote: false,
      contacted: "",
      pending: "",
      confirmed: "",
      notes: ""
    }
    
    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  toggle2() {
    this.setState({
      modalNote: !this.state.modalNote,
    });
  }

  componentDidMount () {
    if (this.props.page === "tour") {
    this.setState({
      contacted: this.props.tourVenue.contacted,
      pending: this.props.tourVenue.pending,
      confirmed: this.props.tourVenue.confirmed,
      notes: this.props.tourVenue.notes,
      })
    }
  }

  // these are functions that toggle boolean state of button properties in the tour objects.
  // The tour object id is passed in as the sole argument, and each method first makes a variable that reverses the state of the targeted property when called, then patches the new value to the database and sets the new state.

  changeContacted = (id) => {
    // variable 'status' holds the new reversed boolean value
    const status = {contacted: !this.state.contacted}
    // the tour patch function is called using the new value as its argument
    this.props.updateTourVenue(status, id)
    // state is set using the updated value
    .then(() => this.setState({contacted: this.props.tourVenue.contacted}))
  }

  changePending = (id) => {
    const status = {pending: !this.state.pending}
    this.props.updateTourVenue(status, id)
    .then(() => this.setState({pending: this.props.tourVenue.pending}))
  }

  changeConfirmed = (id) => {
    const status = {confirmed: !this.state.confirmed}
    this.props.updateTourVenue(status, id)
    .then(() => this.setState({confirmed: this.props.tourVenue.confirmed}))
  }

  handleNoteChange = (id) => {
    const newNote = {notes: this.value}
    this.props.updateTourVenue(newNote, id)
    .then(() => this.setState({notes: this.props.tourVenue.notes}))
  }

  // handleNoteChange(tourVenue) {
  //   const stateToChange = {};
  //   stateToChange[tourVenue.notes] = tourVenue.value;
  //   this.setState(stateToChange);
  // }


  render() {
    
    return(

      // the cards all share these initial properties for both tour page and venues page

      <div id="cards">

      <Card key={this.props.venue.id} className="venueCard text-center" id="venueCard">

        <CardHeader tag="h3" id="cardHeader">
        {
        this.props.venue.url !== "" ?
        <a target="_blank" rel="noopener noreferrer" href={this.props.venue.url}>{this.props.venue.name}</a> :
        this.props.venue.name
        }
        </CardHeader>

        <CardBody>
          <CardTitle>{this.props.venue.city}, {this.props.venue.venueState}</CardTitle>
          <CardText>{this.props.venue.buyer}</CardText>
          <CardText>{this.props.venue.email}</CardText>
          <CardText>{this.props.venue.phone}</CardText>
          <CardText>{this.props.venue.notes}</CardText>

          {/* At this point, the cards are built differently for tour and venue pages, as dictated by the status of 'tourpage', which is set in the componentDidMount sections of TourList and VenuesList */}

          {

            (this.props.page === "venue") ? 

              // VENUES PAGE BUTTONS: 

              <div id="venueCardButtons">

              {/* this button adds the selected venue to the tour page, alerting the user */}
              {/* ADD AN IF STATEMENT TO ONLY SHOW THE BUTTON IF IT'S NOT ALREADY IN TOURS */}

                <span id="havePlayedIcon">
                  {this.props.venue.havePlayed === "yes" ? `🎙` : null}
                </span>
                { 
                // !this.props.venue.tour.length  ?
                <Button className="venueToTour" id="tourButton" size="sm"
                onClick={() => {
                  // this.props.checkStatus()
                  alert(`${this.props.venue.name} has been added to your tour!`)
                  return (
                    this.props.addVenueToTour(this.props.venue.id)
                  )
                  }}>
                Add to your tour
                </Button>
                // : null
                }

                {/* edit card button */}

                <Link to={`/venues/edit/${this.props.venue.id}`}>
                <Button size="sm" className="card-link" id="editButton">Edit</Button>{' '}
                </Link>

                {/* the initial 'delete' button actually opens a modal with the real delete button along with a 'cancel' option */}

                <Button className="card-link" id="deleteButton" size="sm" onClick={this.toggle}>{this.props.buttonLabel}Delete</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                  <ModalBody>
                    Are you sure you want to delete this venue?
                  </ModalBody>
                  <ModalFooter>
                  <Button color="danger" size="sm"
                    onClick={() => this.props.deleteVenue(this.props.venue.id, this.props.currentUser)}
                    >Delete</Button>
                  <Button color="secondary" size="sm" onClick={this.toggle}>Cancel</Button>
                  </ModalFooter>
                </Modal>

                {/* if the user designates a venue as a favorite in the new or edit venue forms, an icon appears in the bottom right corner */}

                <span id="favoriteIcon">
                {this.props.venue.favorite === "yes" ? `👍` : null}
                </span>

                {/* if the user designates a venue as havePlayed in the new or edit venue forms, an icon appears in the bottom left corner */}

              </div>

            :  

              // TOURS PAGE BUTTONS:

              <div id="tourCardButtons">

                {/* The group of buttons below toggles the state of the tour objects' contacted, pending and confirmed properties using a ternary operator and alternates color accordingly by changing the id. Essentially, in each instance, the ternary alternates between two versions of the same button.*/}
                

 
                <section className="tourButtonContainer">
                  <ButtonGroup>
                    {
                      this.state.contacted ? <Button id="contactedButtonSelected" size="sm" onClick={() => 
                        this.changeContacted(this.props.tourVenue.id)
                      }
                      >Contacted</Button> : <Button id="contactedButton" size="sm" onClick={() => 
                        this.changeContacted(this.props.tourVenue.id)
                      }
                      >Contacted</Button>
                    }
                    {
                      this.state.pending ? <Button id="pendingButtonSelected" size="sm" onClick={() => 
                        this.changePending(this.props.tourVenue.id)
                      }
                      >Pending</Button> : <Button id="pendingButton" size="sm" onClick={() =>
                        this.changePending(this.props.tourVenue.id)
                      }
                      >Pending</Button>
                    }
                    {
                      this.state.confirmed ? <Button id="confirmedButtonSelected" size="sm" onClick={() => 
                        this.changeConfirmed(this.props.tourVenue.id)
                      }
                      >Confirmed</Button> : <Button id="confirmedButton" size="sm" onClick={() => 
                        this.changeConfirmed(this.props.tourVenue.id)
                      }
                      >Confirmed</Button>
                    }
                  </ButtonGroup>

                  {/* Initial 'Remove' button takes user to a modal that has remove and cancel buttons */}

                  <Button className="card-link" id="tourRemoveButton" size="sm" onClick={this.toggle}>{this.props.buttonLabel}Remove</Button>
                  <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalBody>
                      Are you sure you want to remove this venue from your tour?
                    </ModalBody>
                    <ModalFooter>
                    <Button color="danger" size="sm"
                      onClick={() => this.props.deleteTourVenue(this.props.tourVenue.id, this.props.currentUser)}
                      >Remove</Button>
                    <Button color="secondary" size="sm" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                  </Modal>

                </section>

                <section id="tourNotesContainer">
                  <Input type="textarea" name="notes" id="notes" placeholder="Notes"

                  />
                {
                this.state.notes === "" ? 
                <Button className="card-link" id="notesButton" size="sm" onClick={this.toggle2}>Add Note</Button> :
                <Button className="card-link" id="notesButton" size="sm" onClick={this.toggle2}>Edit Note</Button>
                }
                </section>
                
              </div>
            }

          </CardBody>
        </Card>
      </div>
    )
  }
}



// <section className="tourButtonContainer">
// <Button className="card-link" id="notesButton" size="sm" onClick={this.toggle2}>Add Note</Button>

{/* <Modal isOpen={this.state.modalNote} className={this.props.className}>
<ModalBody>
  <Label for="notes">Notes</Label>
  <Input type="textarea" name="notes" id="notes" onChange={() => this.handleNoteChange(this.props.tourVenue.notes)} value={this.state.notes}
  // .then(() => console.log())
  />
</ModalBody>
<ModalFooter>
<Button color="success" size="sm"
  onClick={() =>
    console.log(`footer`)
  }
  >Add Note</Button>
<Button color="secondary" size="sm" onClick={this.toggle2}>Cancel</Button>
</ModalFooter>
</Modal> */}