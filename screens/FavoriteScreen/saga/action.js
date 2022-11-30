export const constants = {
  FAVORITE_SCREEN_WATCHER: 'FAVORITE_SCREEN_WATCHER',
};

export const favoriteList = arg => ({
  type: constants.FAVORITE_SCREEN_WATCHER,
  arg,
});
