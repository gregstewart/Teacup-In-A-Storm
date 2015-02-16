class TwitterParser
  def initialize
    @client = Twitter::REST::Client.new do |config|
      config.consumer_key = APP_CONFIG['twitter']['consumer_key']
      config.consumer_secret = APP_CONFIG['twitter']['consumer_secret']
      config.access_token = APP_CONFIG['twitter']['access_token']
      config.access_token_secret = APP_CONFIG['twitter']['access_token_secret']
    end
    @type = :twitter
  end

  def get_last_user_events number_of_items
    twitter_feed = @client.user_timeline("_greg_stewart_")
    format twitter_feed[0..number_of_items]
  end

  def format twitter_feed
    twitter_feed.map do |item|
      PageItem.new(@type, item.attrs[:created_at], item.attrs[:text], "https://twitter.com/_greg_stewart_/status/#{item.attrs[:id]}", '', nil)
    end
  end
end