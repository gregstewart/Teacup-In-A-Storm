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
      items = []
      items.push({date: DateTime.new, content: "Oops an error occured with #{@type}", url: '', thumbnail: '', location: nil})
    end
  end

  def format feed_items
    items = []

    feed_items.each do |item|
      items.push({date: item.published, content: item.title, url: item.entry_id, thumbnail: '', location: nil})
    end

    items
  end

end