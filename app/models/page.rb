class Page
  attr_reader :items

  def initialize
    @items = []
    @parser_factory = ParserFactory.new
  end

  def fetch_page_items
    parser_configurations = {wordpress: {count: 10}, delicious: {count: 5}, instagram: {count: 6}, github: {count: 5},
                  twitter: {count: 4}, vimeo: {count: 1}, foursquare: {count: 10}}

    parser_configurations.each do |parser_configuration|
      parser_type = parser_configuration[0]
      feed_item_count = parser_configuration[1][:count]

      parser = @parser_factory.build parser_type
      feed_items = parser.get_last_user_events feed_item_count

      feed_items.each do |item|
        parsed_page_item = set_page_item(parser_type, item[:date], item[:content], item[:url], item[:thumbnail], item[:location])
        @items.push(parsed_page_item)
      end
    end
  end

  def fetch_sorted_page_items
    fetch_page_items
    sort_by_date
  end

  def sort_by_date
    @items.sort! { |x, y| y[:date] <=> x[:date] }
  end

  def set_page_item(type, date, content, url, thumbnail, location)
    return {
      :type => type,
      :date => fix_date(date, type),
      :content => content,
      :url => url,
      :thumbnail => thumbnail,
      :location => location
    }
  end

  def fix_date(date, type)
    return DateTime.new if date.nil?

    (type == :instagram || type == :foursquare) ? DateTime.parse(Time.at(date.to_i).to_s) : DateTime.parse(date.to_s)
  end

  def get_by_type(type)
    @items.select { |v| v[:type] =~ Regexp.new(type) }
  end

end