import {IdleTs} from "../lib/IdleTs";

let initialDelay : number = 2500;
console.log("Initialize trigger in " + initialDelay + "ms");

const idlenessTargetElement : HTMLElement | null = document.querySelector('#idle');
const visibilityTargetElement : HTMLElement | null = document.querySelector('.visibility');

if (!idlenessTargetElement || !visibilityTargetElement) {
    console.error("[IDLE-TS]: No target Element found for either idleness or visibility");
} else {

  let idle = new IdleTs({
    idle: initialDelay,

    onIdle: function () {
      idlenessTargetElement.classList.toggle('idle');
      idlenessTargetElement.textContent = 'Idle!';
    },
    onActive: function () {
      idlenessTargetElement.classList.toggle('idle');
      idlenessTargetElement.textContent = 'Active!';
    },
    onHide: function () {
      visibilityTargetElement.classList.toggle('idle');
      visibilityTargetElement.textContent = 'Hidden!';
    },
    onShow: function () {
      // Add a slight pause so you can see the change
      setTimeout(function () {
        visibilityTargetElement.classList.toggle('idle');
        visibilityTargetElement.textContent = 'Visible (again)!';
      }, 1000);
    },
  }).start();


  window.setTimeout(() => {
    let newDelay = 5000;
    idle.set({idle: newDelay});
    console.log(`now triggering in: ${newDelay}`)
  },5000)

}