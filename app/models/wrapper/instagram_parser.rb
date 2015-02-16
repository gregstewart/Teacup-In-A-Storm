class InstagramParser
  def initialize
    Instagram.configure do |config|
      config.client_id = APP_CONFIG['instagram']['client_id']
      config.access_token = APP_CONFIG['instagram']['access_token']
    end
    @type = :instagram
  end

  def get_last_user_events number_of_items
    instagram_feed = Instagram.user_recent_media(178138400)

    format instagram_feed[0..number_of_items - 1]
  end

  def format instagram_feed
    instagram_feed.map do |item|
      caption = item['caption']['text'] unless item['caption'].nil?

      PageItem.new(@type, item['created_time'], caption, item['link'], item['images']['standard_resolution']['url'], nil)
    end
  end
end