import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

document.addEventListener('DOMContentLoaded', function () {
  const player = new Player(document.getElementById('vimeo-player'));

  const storageKey = 'videoplayer-current-time';

  const getStoredTime = () => {
    const storedTime = localStorage.getItem(storageKey);
    return storedTime ? parseFloat(storedTime) : 0;
  };

  const saveCurrentTime = () => {
    player.getCurrentTime().then(currentTime => {
      localStorage.setItem(storageKey, currentTime);
    });
  };

  const setPlayerTimeFromStorage = () => {
    const storedTime = getStoredTime();
    player.setCurrentTime(storedTime);
  };

  const throttledSaveCurrentTime = throttle(saveCurrentTime, 1000);

  player.on('timeupdate', () => {
    throttledSaveCurrentTime();
  });

  setPlayerTimeFromStorage();
});
