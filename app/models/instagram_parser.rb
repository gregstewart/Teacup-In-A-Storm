class InstagramParser
  def initialize
    Instagram.configure do |config|
      config.client_id = APP_CONFIG['instagram']['client_id']
      config.access_token = APP_CONFIG['instagram']['access_token']
    end
  end

  def get_last_user_events number_of_items
    instagram_feed = Instagram.user_recent_media(178138400)

    instagram_feed[0..number_of_items]
  end
end