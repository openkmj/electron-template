# Electron App Template

## With

- electron forge
- webpack
- react
- publish s3
- auto update

## Auto Update Setting

### Auto Publish

1. Set your s3 bucket and region

   ```javascript
   // package.json
   {
       // ...
       "publishers": [
           {
               "name": "@electron-forge/publisher-s3",
               "config": {
                   "bucket": "${YOUR_BUCKET_NAME}",
                   "region": "${YOUR_REGION}",
                   "public": true,
               }
           }
       ],
       // ...
   }
   ```

2. Authenticate AWS

   Follow [AWS Guide](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/setting-credentials-node.html)  
   Ex) Add ~/.aws/credentials(macOS)

   ```
   [default]
   aws_access_key_id = ${YOUR_ACCESS_KEY}
   aws_secret_access_key = ${YOUR_SECRET_KEY}
   ```

3. Publish
   ```bash
   npm run publish
   ```

### Auto Update

Notice that auto update is actived only in production build.

1.  Update Server Setting

    Host your update server.  
     The update server should serve json file like:

    ```json
    {
      "currentRelease": "0.0.6",
      "releases": [
        {
          "version": "0.0.5",
          "updateTo": {
            "version": "0.0.5",
            "pub_date": "2022-07-29T12:29:53+01:00",
            "notes": "version 0.0.5",
            "name": "0.0.5",
            "url": "https://your-s3-url/0.0.5.zip"
          }
        },
        {
          "version": "0.0.6",
          "updateTo": {
            "version": "0.0.6",
            "pub_date": "2022-07-29T12:29:53+01:00",
            "notes": "version 0.0.6",
            "name": "0.0.6",
            "url": "https://your-s3-url/0.0.6.zip"
          }
        }
      ]
    }
    ```

2.  Update Server URL
    ```javascript
    // auto-update.js
    autoUpdater.setFeedURL({
      url: 'your-update-server-url',
      serverType: 'json',
    })
    ```

## Apple Code Signing

1. Set entitlements.plist

   See [this]('https://www.electronjs.org/docs/latest/tutorial/code-signing)

2. Code Sign Config

   ```json
    "packagerConfig": {
       "osxSign": {
         "identity": "${YOUR_APPLE_IDENTITY}",
         "hardened-runtime": true,
         "entitlements": "entitlements.plist",
         "entitlements-inherit": "entitlements.plist"
       },
       "asar": true
     },

   ```
