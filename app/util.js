function ReplayCSSAnimation(element, name, time = 1, delay = 0, ease = '', opt = '') {
    element.style.animation = 'none';
    void element.offsetWidth;
    element.style.animation = name + ` ${time}s ${delay}s ${ease} ${opt}`;
}
function ReplayJsAnimation(element, keyframes, opt, after = {}, cancel = {}) {
    element.getAnimations().forEach((animation) => animation.cancel());

    element.animate(keyframes, opt).onfinish = after;
    element.animate(keyframes, opt).oncancel = cancel;
}