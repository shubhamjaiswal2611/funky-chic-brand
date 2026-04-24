import Map "mo:core/Map";
import Time "mo:core/Time";
import Types "../types/newsletter";

module {
  public func isValidEmail(email : Text) : Bool {
    // Basic email validation: must contain @ and at least one . after @
    let parts = email.split(#char '@');
    let partsArray = parts.toArray();
    if (partsArray.size() != 2) return false;
    let domain = partsArray[1];
    domain.contains(#char '.');
  };

  public func subscribe(
    subscribers : Map.Map<Text, Types.Subscriber>,
    email : Text,
  ) : Types.SubscribeResult {
    if (not isValidEmail(email)) {
      return #err("Invalid email address");
    };
    if (subscribers.containsKey(email)) {
      return #err("Already subscribed");
    };
    let subscriber : Types.Subscriber = {
      email;
      subscribedAt = Time.now();
    };
    subscribers.add(email, subscriber);
    #ok;
  };
};
