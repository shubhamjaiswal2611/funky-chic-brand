import Types "../types/lore-drop";

module {
  public func getLoreDrop(state : { var loreDrop : ?Types.LoreDrop }) : ?Types.LoreDrop {
    state.loreDrop;
  };

  public func setLoreDrop(state : { var loreDrop : ?Types.LoreDrop }, target : Int, title : Text) : () {
    state.loreDrop := ?{ targetTimestamp = target; title = title };
  };
};
