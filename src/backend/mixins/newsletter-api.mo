import Map "mo:core/Map";
import NewsletterLib "../lib/newsletter";
import Types "../types/newsletter";

mixin (subscribers : Map.Map<Text, Types.Subscriber>) {
  public func subscribeNewsletter(email : Text) : async Types.SubscribeResult {
    NewsletterLib.subscribe(subscribers, email);
  };
};
