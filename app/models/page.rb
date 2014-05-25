class Page
  attr_reader :items

  def initialize
    @items = []
  end

  def fetch

    get_blog

    get_delicious

    get_instagram

    get_github

    get_twitter

    get_vimeo

    get_foursquare

  end

  def get_delicious
    feed_items = DeliciousParser.new().get_last_user_events 5

    feed_items.each do |item|
      page_item = set_page_item("delicious", item[:date], item[:content], item[:url], item[:thumbnail], item[:location])
      @items.push(page_item)
    end

  end

  def get_blog
    feed_items = WordpressParser.new().get_last_user_events 10

    feed_items.each do |item|
      page_item = set_page_item("wordpress", item[:date], item[:content], item[:url], item[:thumbnail], item[:location])
      @items.push(page_item)
    end

  end

  def get_github
    github_items = GithubParser.new.get_last_user_events(5)

    github_items.each do |item|
      page_item = set_page_item('github', item[:date], item[:content], item[:url], item[:thumbnail], item[:location])
      @items.push(page_item)
    end
  end

  def get_instagram
    instagram_items = InstagramParser.new.get_last_user_events 6

    instagram_items.each do |item|
      page_item = set_page_item('instagram', item[:date], item[:content], item[:url], item[:thumbnail], item[:location])
      @items.push(page_item)
    end
  end

  def get_twitter
    twitter_items = TwitterParser.new.get_last_user_events 4

    twitter_items.each do |item|
      @items.push(set_page_item('twitter', item[:date], item[:content], item[:url], item[:thumbnail], item[:location]))
    end

  end

  def get_vimeo
    vimeo_items = VimeoParser.new.get_last_user_events 1

    vimeo_items.each do |item|
      @items.push(set_page_item('vimeo', item[:date], item[:content], item[:url], item[:thumbnail], item[:location]))
    end
  end

  def get_foursquare
    foursquare_items = FoursquareParser.new.get_last_user_events(10)

    foursquare_items.each do |item|
      @items.push(set_page_item('foursquare', item[:date], item[:content], item[:url], item[:thumbnail], item[:location]))
    end
  end

  def sort_by_date
    @items.sort! { |x, y| y[:date] <=> x[:date] }
  end

  def set_page_item(type, date, content, url, thumbnail, location)
    page_item = {}
    page_item[:type] = type
    page_item[:date] = (type == 'instagram' || type == 'foursquare') ? DateTime.parse(Time.at(date.to_i).to_s) : DateTime.parse(date.to_s)
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