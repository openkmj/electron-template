const { autoUpdater } = require('electron')

const initAutoUpdater = () => {
  autoUpdater.setFeedURL({
    url: 'https://openkmj-electron-app.s3.ap-northeast-2.amazonaws.com/update.json',
    serverType: 'json',
  })
  autoUpdater.on('error', (error) => {
    // handle error while update
  })
  autoUpdater.on('update-available', () => {})
  autoUpdater.on('update-not-available', () => {})
  autoUpdater.on(
    'update-downloaded',
    async (event, releaseNotes, releaseName) => {
      autoUpdater.quitAndInstall()
    }
  )
  autoUpdater.checkForUpdates()
}

export { initAutoUpdater }
