// EntryGate.js
import ParkingSpotManager from "../parkingspots/ParkingSpotManager.js";
import { RuntimeError } from "../utils/RuntimeError.js"; // optional custom error (can remove)

export default class EntryGate {
  constructor() {
    // Same as Java: getInstance()
    this.parkingSpotManager = ParkingSpotManager.getInstance();
  }

  issueTicket(vehicle) {
    // parkVehicle returns a Ticket OR null → same as Java Optional.ofNullable(...).orElseThrow()
    const ticketIssued = this.parkingSpotManager.parkVehicle(vehicle);

    if (!ticketIssued) {
      throw new Error(`[-] No available parking spot for vehicle: ${vehicle.getVehicleNo()}`);
    }

    console.log(
      `[+] Parking Ticket Issued: ${ticketIssued.getTicketNo()} for Vehicle ${vehicle.getVehicleNo()} at Spot: ${ticketIssued.getParkingSpot().getSpotId()}`
    );

    console.log(`[+] Available Spots: ${this.parkingSpotManager.getAvailableSpotsCount()}`);

    return ticketIssued;
  }
}
