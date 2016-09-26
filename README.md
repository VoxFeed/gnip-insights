# gnip-insights

Gnip Insights is a NodeJS client for [Gnip insights endpoints](https://gnip.com/insights/).

### Methods

* .get(url, callback)
* .post(url, params, callback)

### Usage example

```
const Gnip = require('gnip-insights');
const authConfig = {
	consumerKey: "YOUR_CONSUMER_KEY",
    consumerSecret: "YOUR_CONSUMER_SECRET",
    accessToken: "YOUR_ACCESS_TOKEN",
    accessTokenSecret: "YOUR_ACCESS_TOKEN_SECRET"
};

const gnipClient = new Gnip(authConfig);
const requestParams = {
  'tweet_ids': [
    '651523131308244993'
  ],
  'engagement_types': [
    'impressions',
    'engagements',
    'favorites',
    'replies',
    'retweets',
    'video_views'
  ],
  'groupings': {
    'types-by-tweet-id': {
      'group_by': [
        'tweet.id',
        'engagement.type'
      ]
    }
  }
};

gnipClient.post('insights/engagement/totals', requestParams)
  .then(response => {
    console.log(response);
  })
  .catch(console.log);

```
