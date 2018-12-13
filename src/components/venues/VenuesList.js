import React, { Component } from 'react'
import VenueCard from "./VenueCard"
import "./Venues.css"
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from 'reactstrap'


export default class VenuesList extends Component {

  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    }
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  handleClickVenue = choice => {
    this.props.filterVenuesByState(choice, this.props.currentUser)
  }

  removeFilter = () => {
    window.location.reload()
  }

  render() {
    // console.log("filter", this.props.filterVenuesByState)

    return (

      <React.Fragment>

        <div id="venuesTop">
          <h1 id="venuesHeader">Venues</h1>
          <section className="newVenueButton">
            <Button
              id="newVenueButton"
              size="large"
              className="btn"
              onClick={() => {
                this.props.history.push("/venues/new");
              }}
            >
              Add New Venue
            </Button>

            <Dropdown
            isOpen={this.state.dropdownOpen} toggle={this.toggle}
            name="venueState" id="venueState" value="venueState"
            >
              <DropdownToggle id="stateButton" caret>
                Filter Venues By State
              </DropdownToggle>
              <DropdownMenu 
              >
                <DropdownItem header>CHOOSE A STATE</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => this.handleClickVenue("AK")}>Alaska</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("AL")}>Alabama</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("AR")}>Arkansas</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("AZ")}>Arizona</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("CA")}>California</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("CO")}>Colorado</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("CT")}>Connecticut</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("DC")}>District of Columbia</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("DE")}>Delaware</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("FL")}>Florida</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("GA")}>Georgia</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("HI")}>Hawaii</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("IA")}>Iowa</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("ID")}>Idaho</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("IL")}>Illinois</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("IN")}>Indiana</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("KS")}>Kansas</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("KY")}>Kentucky</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("LA")}>Louisiana</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("MA")}>Massachusetts</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("MD")}>Maryland</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("ME")}>Maine</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("MI")}>Michigan</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("MN")}>Minnesota</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("MO")}>Missouri</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("MS")}>Mississippi</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("MT")}>Montana</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("NC")}>North Carolina</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("ND")}>North Dakota</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("NE")}>Nebraska</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("NH")}>New Hampshire</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("NJ")}>New Jersey</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("NM")}>New Mexico</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("NV")}>Nevada</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("NY")}>New York</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("OH")}>Ohio</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("OK")}>Oklahoma</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("OR")}>Oregon</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("PA")}>Pennsylvania</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("PR")}>Puerto Rico</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("RI")}>Rhode Island</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("SC")}>South Carolina</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("SD")}>South Dakota</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("TN")}>Tennessee</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("TX")}>Texas</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("UT")}>Utah</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("VA")}>Virginia</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("VT")}>Vermont</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("WA")}>Washington</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("WI")}>Wisconsin</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("WV")}>West Virginia</DropdownItem>
                <DropdownItem onClick={() => this.handleClickVenue("WY")}>Wyoming</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            
          </section>

          <div>
          <Button
            id="removeFilterButton"
            size="large"
            className="btn"
            onClick={() => {
              this.removeFilter()
            }}
            >
            Remove Venues Filter
            </Button>
          </div>

        </div>

        <div id="venuesContainer">
          <article className="venuesList">
            {
              this.props.venues.map(venue => {
                return <VenueCard key={venue.id} venue={venue} {...this.props} />
            
              } ) 
            }
          </article>
        </div>

      </React.Fragment>
    )
  }
}
