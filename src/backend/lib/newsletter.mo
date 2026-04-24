import Debug "mo:core/Debug";
import Types "../types/newsletter";
import Map "mo:core/Map";

module {
  public func isValidEmail(email : Text) : Bool {
    Debug.todo();
  };

  public func subscribe(
    subscribers : Map.Map<Text, Types.Subscriber>,
    email : Text,
  ) : Types.SubscribeResult {
    Debug.todo();
  };
};
