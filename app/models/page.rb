class Page
  attr_reader :items

  def initialize
    @items = []
    @parser_factory = WrapperFactory.new
  end

  def fetch_page_items
    parser_configurations = {wordpress: {count: 10}, delicious: {count: 5}, instagram: {count: 6}, github: {count: 5},
                  twitter: {count: 4}, vimeo: {count: 1}, foursquare: {count: 10}}

    parser_configurations.each do |parser_configuration|
      parser_type = parser_configuration[0]
      feed_item_count = parser_configuration[1][:count]

      parser = @parser_factory.build parser_type

      @items.concat(parser.get_last_user_events(feed_item_count))
    end
  end

  def fetch_sorted_page_items
    fetch_page_items
    sort_by_date
  end

  def sort_by_date
    @items.sort! { |x, y| y.date <=> x.date }
  end

  def get_by_type(type)
    @items.select { |v| v.type == type }
  end

end