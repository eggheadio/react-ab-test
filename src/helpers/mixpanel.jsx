import emitter from "../emitter";
import {canUseDOM} from 'fbjs/lib/ExecutionEnvironment';

let playSubscription, winSubscription;

export default {
  enable(){
    if(canUseDOM) {
      if(typeof mixpanel === "undefined") {
        return
      }
      playSubscription = emitter.addPlayListener(function(experimentName, variantName){
        mixpanel.track("Experiment Play", {
          "Experiment": experimentName,
          "Variant": variantName
        }, function(){
          emitter.emit("mixpanel-play", experimentName, variantName);
        });
      });
      winSubscription = emitter.addWinListener(function(experimentName, variantName){
        mixpanel.track("Experiment Win", {
          "Experiment": experimentName,
          "Variant": variantName
        }, function(){
          emitter.emit("mixpanel-win", experimentName, variantName);
        });
      });
    }
  },
  disable(){
    if(canUseDOM) {
      if(!playSubscription || !winSubscription) {
        return
      }
      playSubscription.remove();
      winSubscription.remove();
    }
  }
}
