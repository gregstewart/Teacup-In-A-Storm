class Feed
  require 'feedjira'

  def initialize(url, type)
    @url = url
    @type = type
  end

  def get_last_user_events number_of_items
    begin
      feed = Feedjira::Feed.fetch_and_parse(@url)

      max_number_of_items = number_of_items - 1
      format feed.entries[0..max_number_of_items]
    rescue
      [PageItem.new(@type, DateTime.new, "Oops an error occured with #{@type}",'', '', nil)]
    end
  end

  def format feed_items
    feed_items.map do |item|
      PageItem.new(@type, item.published, item.title, item.entry_id, '', nil)
    end
  end
end