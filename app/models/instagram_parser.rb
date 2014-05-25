class InstagramParser
  def initialize
    Instagram.configure do |config|
      config.client_id = APP_CONFIG['instagram']['client_id']
      config.access_token = APP_CONFIG['instagram']['access_token']
    end
  end

  def get_last_user_events number_of_items
    instagram_feed = Instagram.user_recent_media(178138400)

    format instagram_feed[0..number_of_items - 1]
  end

  def format instagram_feed
    # created_time (date), caption.text unless entry.caption.nil? (content ), link (url), images.thumbnail.url (thumbnail)

    items = []
    instagram_feed.each do |item|
      caption = item['caption']['text'] unless item['caption'].nil?

      instagram_item = {date: item['created_time'], content: caption,
                     url: item['link'], thumbnail: item['images']['standard_resolution']['url'], location: nil}
      items.push(instagram_item)
    end

    items
  end
end