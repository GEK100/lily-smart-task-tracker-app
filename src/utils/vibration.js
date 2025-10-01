// Vibration utility for haptic feedback on mobile

export function vibrateLight() {
  if ('vibrate' in navigator) {
    navigator.vibrate(10);
  }
}

export function vibrateMedium() {
  if ('vibrate' in navigator) {
    navigator.vibrate(30);
  }
}

export function vibrateSuccess() {
  if ('vibrate' in navigator) {
    navigator.vibrate([50, 50, 50]);
  }
}

export function vibrateError() {
  if ('vibrate' in navigator) {
    navigator.vibrate([100, 50, 100]);
  }
}

export function vibrateDelete() {
  if ('vibrate' in navigator) {
    navigator.vibrate([20, 30, 20, 30, 50]);
  }
}

export function vibrateComplete() {
  if ('vibrate' in navigator) {
    navigator.vibrate([30, 50, 80]);
  }
}

export function isVibrationSupported() {
  return 'vibrate' in navigator;
}
