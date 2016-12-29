class FoursquareParser
  require('date_wrapper')
  def initialize
    @client = Foursquare2::Client.new(:oauth_token => APP_CONFIG['foursquare']['oauth_token'], :api_version => '20140715')
    @type = :foursquare
  end

  def get_last_user_events number_of_items
    max_number_of_items = number_of_items - 1
    foursquare_feed = @client.user_checkins()

    format foursquare_feed.items[0..max_number_of_items]
  end

  def format foursquare_feed
    foursquare_feed.map do |item|
      PageItem.new(@type, DateWrapper.fix_date(item['createdAt']), item['venue']['name'], item['venue']['canonicalUrl'], '', item['venue']['location'])
    end
  end

end