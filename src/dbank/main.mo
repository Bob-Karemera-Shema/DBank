import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank{
  stable var money : Float = 300;
  
  stable var startTime = Time.now();
  Debug.print(debug_show(startTime));

  public func topUp(amount: Float){
    money += amount;
    Debug.print(debug_show(money));
  };

  public func withdraw(amount: Float){
    money -= amount;
    Debug.print(debug_show(money));
  };

  public query func checkBalance(): async Float {
    return money;
  };

  public func compound(){
    let currentTime = Time.now();
    let timeElapsedSec = (currentTime - startTime) / 1000000000;
    money := money * (1.01 ** Float.fromInt(timeElapsedSec));
    startTime := currentTime;
  };
};
