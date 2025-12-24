// Ticket.js
import ParkingSpot from '../parkingspots/ParkingSpot.js';
import Vehicle from '../vehicles/Vehicle.js';
import Payment from '../payment/Payment.js';

export default class Ticket {
  // static counter → same as Java static variable
  static counter = 10000;

  constructor(spot, vehicle) {
    this.ticketNo = ++Ticket.counter;
    this.parkingSpot = spot;
    this.vehicle = vehicle;

    // JS equivalent of LocalTime.now()
    this.entryTime = new Date();
    this.exitTime = null;

    this.parkingFee = 0;
    this.payment = null;

    // Many-to-one relation
    vehicle.assignTicket(this);

    console.log(
      `[+] Ticket Issued: ${this.ticketNo} for ${vehicle.getVehicleNo()}`
    );
  }

  // ------- Getters & Setters ----------
  getTicketNo() {
    return this.ticketNo;
  }

  setTicketNo(no) {
    this.ticketNo = no;
  }

  getEntryTime() {
    return this.entryTime;
  }

  setEntryTime(time) {
    this.entryTime = time;
  }

  getExitTime() {
    return this.exitTime;
  }

  setExitTime(time) {
    this.exitTime = time;
  }

  getParkingFee() {
    return this.parkingFee;
  }

  setParkingFee(fee) {
    this.parkingFee = fee;
  }

  getParkingSpot() {
    return this.parkingSpot;
  }

  setParkingSpot(spot) {
    this.parkingSpot = spot;
  }

  getVehicle() {
    return this.vehicle;
  }

  setVehicle(vehicle) {
    this.vehicle = vehicle;
  }

  setPayment(payment) {
    this.payment = payment;
  }

  // --------- Duration Logic (Java Equivalent) ----------
  getParkingDuration() {
    // In Java:
    // Duration.between(entryTime, exitTime).toHours()
    return this.getParkingTimeInHours();
  }

  // Simulated parking time (same logic as Java Random)
  getParkingTimeInHours() {
    // Generates random 2–4 hours
    return Math.floor(Math.random() * 3) + 2;
  }
}
