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
    github_feed = Octokit.user_events("gregstewart")
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
    delicious_feed = Feed.new("http://feeds.delicious.com/v2/rss/wildcard1999")
    delicious_items = delicious_feed.get_last_five

    delicious_items.each do |item|
      @items.push(set_page_item('delicious', item.published, item.title, item.url, ''))
    end
  end

  def get_blog
    # updated (date), title (content), entry_id (url)
    blog_feed = Feed.new("http://gregs.tcias.co.uk/atom.xml")
    blog_items = blog_feed.get_last_ten

    blog_items.each do |item|
      @items.push(set_page_item('blog', item.updated, item.title, item.entry_id, ''))
    end
  end
end