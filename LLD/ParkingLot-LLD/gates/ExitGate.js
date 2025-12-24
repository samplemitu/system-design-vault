// ExitGate.js
import ParkingSpotManager from "../parkingspots/ParkingSpotManager.js";
import { PaymentMode } from "../enums/PaymentMode.js";
import PaymentFactory from "../payment/PaymentFactory.js";

export default class ExitGate {
  constructor() {
    this.parkingSpotManager = ParkingSpotManager.getInstance();
  }

  processTicket(ticket, paymentMode) {
    // 1. Set exit time (JS equivalent of LocalTime.now())
    ticket.setExitTime(new Date()); // using Date for time

    // 2. Calculate parking cost
    const amountToPay = this.parkingSpotManager
      .getCostCalculator()
      .calculateTicketCost(ticket);

    ticket.setParkingFee(amountToPay);

    // 3. Get Payment instance from Factory
    const paymentInstance = PaymentFactory.getPaymentInstance(
      paymentMode,
      amountToPay
    );

    ticket.setPayment(paymentInstance);

    // 4. Process Payment
    paymentInstance.processPayment();
    console.log(
      `[+] Ticket ${ticket.getTicketNo()} processed. Cost: $${amountToPay}`
    );

    // 5. Free parking spot
    this.parkingSpotManager.unParkVehicle(
      ticket.getParkingSpot().getSpotId()
    );
  }
}
