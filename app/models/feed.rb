class Feed
  require 'feedzirra'

  def initialize(url)
    @url = url
  end

  def get_last_five
    # fetching a single feed
    feed = Feedzirra::Feed.fetch_and_parse(@url)

    feed.entries[0..4]
  end

  def get_last_ten
    # fetching a single feed
    feed = Feedzirra::Feed.fetch_and_parse(@url)

    feed.entries[0..9]
  end
end