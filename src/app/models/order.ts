export class OrderDto {
    OrderID:       number;
    OrderType:     number;
    OrderDate:     Date;
    SymbolCode:    string;
    MarketID:      number;
    OrderQty:      number;
    RemainingQty:  number;
    OrderPrice:    number;
    OrderValidity: number;
    GoodTillDate:  null;
    OrderStatus:   number;
    MinimumFill:   number;
    BrokerID:      number;
    CompanyID:     number;
    CustodianID:   number;
    ClientID:      null;
    Locked:        boolean;
    Suspended:     boolean;
    AuctionID:     number;
  }