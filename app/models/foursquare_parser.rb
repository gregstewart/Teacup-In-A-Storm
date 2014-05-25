class FoursquareParser

  def initialize
    @client = Foursquare2::Client.new(:oauth_token => APP_CONFIG['foursquare']['oauth_token'], :api_version => '20120505')
  end

  def get_last_user_events number_of_items
    max_number_of_items = number_of_items - 1
    foursquare_feed = @client.user_checkins()

    format foursquare_feed.items[0..max_number_of_items]
  end

  def format foursquare_feed
    # attrs.created_at (date), attrs.text (content), https://twitter.com/_greg_stewart_/status/#{entry.id} (url)

    items = []

    foursquare_feed.each do |item|
      foursquare_item = {date: item['createdAt'], content: item['venue']['name'],
                         url: item['venue']['canonicalUrl'], thumbnail: '', location: item['venue']['location']}
      items.push(foursquare_item)
    end

    items
  end
end