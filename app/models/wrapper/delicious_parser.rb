class DeliciousParser < Feed
  def initialize
    @url = "http://feeds.del.icio.us/v2/rss/wildcard1999?count={1..10}"
    @type = :delicious
  end
end
