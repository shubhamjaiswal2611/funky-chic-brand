module {
  public type Subscriber = {
    email : Text;
    subscribedAt : Int;
  };

  public type SubscribeResult = {
    #ok;
    #err : Text;
  };
};
