class Page
  attr_reader :items

  def initialize
    @items = []
    @wrapper_factory = WrapperFactory.new
  end

  def fetch_page_items
    FEED_CONFIGS.each do |feed_configuration|
      parser_type = feed_configuration[0]
      feed_item_count = feed_configuration[1]['count']

      wrapper = @wrapper_factory.build parser_type.to_s.capitalize

      @items.concat(wrapper.get_last_user_events(feed_item_count))
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