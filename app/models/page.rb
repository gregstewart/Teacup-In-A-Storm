class Page
  attr_reader :items

  def initialize
    @items = []
    @wrapper_factory = WrapperFactory.new
  end

  def fetch_page_items(feed_wrapper_configurations)

    feed_wrapper_configurations.each do |feed_wrapper_configuration|
      parser_type = feed_wrapper_configuration[0]
      feed_item_count = feed_wrapper_configuration[1][:count]

      wrapper = @wrapper_factory.build parser_type

      @items.concat(wrapper.get_last_user_events(feed_item_count))
    end
  end

  def fetch_sorted_page_items(feed_configurations)
    fetch_page_items(feed_configurations)
    sort_by_date
  end

  def sort_by_date
    @items.sort! { |x, y| y.date <=> x.date }
  end

  def get_by_type(type)
    @items.select { |v| v.type == type }
  end

end