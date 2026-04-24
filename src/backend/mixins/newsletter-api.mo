import Debug "mo:core/Debug";
import Types "../types/newsletter";
import Map "mo:core/Map";

mixin (subscribers : Map.Map<Text, Types.Subscriber>) {
  public func subscribeNewsletter(email : Text) : async Types.SubscribeResult {
    Debug.todo();
  };
};
