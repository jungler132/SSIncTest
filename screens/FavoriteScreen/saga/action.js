export const constants = {
  FAVORITE_SCREEN_WATCHER: 'FAVORITE_SCREEN_WATCHER',
  FAVORITE_SCREEN_WATCHER_DELETE: 'FAVORITE_SCREEN_WATCHER_DELETE',
};

export const favoriteList = arg => ({
  type: constants.FAVORITE_SCREEN_WATCHER,
  arg,
});

export const favoriteDeleteList = arg => ({
  type: constants.FAVORITE_SCREEN_WATCHER_DELETE,
  arg,
});
