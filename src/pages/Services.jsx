import React from 'react'
import OnlineAppointment from './OnlineAppointment';

import BridalBooking from './Bridalservies';

import Photoshoot from './PhotoshootBooking'
import SalonArtistBooking from './SalonArtistBooking';

const Services = () => {
  return (
    <div>
 
        <SalonArtistBooking/>
        <BridalBooking/>
        <Photoshoot/>
        <OnlineAppointment/>
    </div>
  )
}

export default Services