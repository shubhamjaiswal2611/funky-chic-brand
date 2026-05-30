import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import LoreDropLib "../lib/lore-drop";
import Types "../types/lore-drop";
import Time "mo:core/Time";

mixin (
  accessControlState : AccessControl.AccessControlState,
  loreDropState : { var loreDrop : ?Types.LoreDrop },
) {
  public query func getLoreDrop() : async ?Types.LoreDrop {
    switch (loreDropState.loreDrop) {
      case (?drop) { ?drop };
      case (null) {
        // Return a default drop 7 days from now if none is set
        let sevenDays : Int = 7 * 24 * 60 * 60 * 1_000_000_000;
        ?{ targetTimestamp = Time.now() + sevenDays; title = "" };
      };
    };
  };

  public shared ({ caller }) func setLoreDrop(target : Int, title : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    LoreDropLib.setLoreDrop(loreDropState, target, title);
  };
};
