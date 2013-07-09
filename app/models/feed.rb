class Feed
  require 'feedzirra'

  def initialize(url)
    @url = url
  end

  def get_last number_of_items
    feed = Feedzirra::Feed.fetch_and_parse(@url)

    max_number_of_items = number_of_items - 1
    feed.entries[0..max_number_of_items]
  end

end