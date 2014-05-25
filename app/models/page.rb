class Page
  attr_reader :items

  def initialize
    @items = []
    @parser_factory = ParserFactory.new
  end

  def fetch
    page_items = {wordpress: {count: 10}, delicious: {count: 5}, instagram: {count: 6}, github: {count: 5},
                  twitter: {count: 4}, vimeo: {count: 1}, foursquare: {count: 10}}

    page_items.each do |page_item|
      type = page_item[0]
      count = page_item[1][:count]

      parser = @parser_factory.build(type)
      feed_items = parser.get_last_user_events count

      feed_items.each do |item|
        page_item = set_page_item(type, item[:date], item[:content], item[:url], item[:thumbnail], item[:location])
        @items.push(page_item)
      end

    end

  end

  def sort_by_date
    @items.sort! { |x, y| y[:date] <=> x[:date] }
  end

  def set_page_item(type, date, content, url, thumbnail, location)
    page_item = {}
    page_item[:type] = type
    page_item[:date] = (type == :instagram || type == :foursquare) ? DateTime.parse(Time.at(date.to_i).to_s) : DateTime.parse(date.to_s)
    page_item[:content] = content
    page_item[:url] = url
    page_item[:thumbnail] = thumbnail
    page_item[:location] = location
    page_item
  end

  def get_by_type(type)
    @items.select { |v| v[:type] =~ Regexp.new(type) }
  end

end