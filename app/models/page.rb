class Page

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

  end

  def set_page_item(type, date, content, url, thumbnail)
    page_item = {}
    page_item[:type] = type
    page_item[:date] = (type == 'instagram') ? DateTime.parse(Time.at(date.to_i).to_s) : DateTime.parse(date.to_s)
    page_item[:content] = content
    page_item[:url] = url
    page_item[:thumbnail] = thumbnail
    page_item
  end

  def get_by_type(type)
    @items.select {|v| v[:type] =~ Regexp.new(type) }
  end

  def sort_by_date
    @items.sort! {|x,y| y[:date] <=> x[:date] }
  end

  def get_vimeo
    # upload_date (date), title (content), url (url), thumbnail_large (thumbnail)
    vimeo_feed = Vimeo::Simple::User.videos("user2724002")
    vimeo_items = vimeo_feed[0..1]

    vimeo_items.each do |item|
      @items.push(set_page_item('vimeo', item['upload_date'], item['title'], item['url'], item['thumbnail_large']))
    end
  end

  def get_twitter
    # attrs.created_at (date), attrs.text (content), https://twitter.com/_greg_stewart_/status/#{entry.id} (url)
    twitter_feed = Twitter.user_timeline("_greg_stewart_")
    twitter_items = twitter_feed[0..4]

    twitter_items.each do |item|
      @items.push(set_page_item('twitter', item.attrs[:created_at], item.attrs[:text],
                                'https://twitter.com/_greg_stewart_/status/#{item.attrs[:id]}', ''))
    end

  end

  def get_github
    # created_at (date), type + repo.name (content), repo.url (url)
    client = Octokit::Client.new(:login => APP_CONFIG['github']['client_id'], :oauth_token => APP_CONFIG['github']['access_token'])
    github_feed = client.user_events(APP_CONFIG['github']['client_id'])
    github_items = github_feed[0..4]

    github_items.each do |item|
      @items.push(set_page_item('github', item['created_at'], item['type'] + ' ' + item['repo']['name'], item['repo']['url'], ''))
    end
  end

  def get_instagram
    # created_time (date), caption.text unless entry.caption.nil? (content ), link (url), images.thumbnail.url (thumbnail)
    instagram_feed = Instagram.user_recent_media(178138400)
    instagram_items = instagram_feed[0..5]

    instagram_items.each do |item|
      caption = item['caption']['text'] unless item['caption'].nil?

      @items.push(set_page_item('instagram', item['created_time'], caption, item['link'], item['images']['thumbnail']['url']))
    end
  end

  def get_delicious
    # published (date), title (content), url (url)
    delicious_items = get_feed("http://feeds.delicious.com/v2/rss/wildcard1999", 5)
    populate_page_items(delicious_items, 'delicious')
  end

  def get_blog
    # updated (date), title (content), entry_id (url)
    blog_items = get_feed("http://gregs.tcias.co.uk/atom.xml", 10)
    populate_page_items(blog_items, 'blog')
  end

  def get_feed url, number_of_items
    feed = Feed.new(url)

    if number_of_items == 10
      feed.get_last_ten
    elsif number_of_items == 5
      feed.get_last_five
    end
  end

  def populate_page_items items, type
    items.each do |item|
      @items.push(set_page_item(type, item.published, item.title, item.entry_id, ''))
    end
  end

  private :get_feed, :populate_page_items

end