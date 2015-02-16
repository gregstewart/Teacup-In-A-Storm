class Page
  attr_reader :items

  def initialize
    @items = []
    @wrapper_factory = WrapperFactory.new
  end

  def fetch_page_items(feed_wrapper_configurations)
    feed_wrapper_configurations.each do |feed_wrapper_configuration|
      wrapper = @wrapper_factory.build(feed_wrapper_configuration[0])

      @items.concat(wrapper.get_last_user_events(feed_wrapper_configuration[1][:count]))
    end
  end

  def fetch_sorted_page_items(feed_configurations)
    fetch_page_items(feed_configurations)
    sort_by_date
  end

  def sort_by_date
    @items.sort! { |x, y| y.date <=> x.date }
  end

  # this is still weird - page calls fetch and then view calls back into model - view helper seems the best way to go
  def get_by_type(type)
    @items.select { |v| v.type == type }
  end

end