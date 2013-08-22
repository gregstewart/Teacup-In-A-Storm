class FoursquareParser

  def initialize
    @client = Foursquare2::Client.new(:oauth_token => APP_CONFIG['foursquare']['oauth_token'])
  end

  def get_last_user_events number_of_items
    max_number_of_items = number_of_items - 1
    foursquare_feed = @client.user_checkins()

    foursquare_feed.items[0..max_number_of_items]
  end
end