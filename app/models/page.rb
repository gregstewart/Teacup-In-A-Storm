class Page
  def fetch
    @items = {}

    get_blog

    get_delicious

    get_instagram

    get_github

    get_twitter

    get_vimeo

    @items
  end

  def get_vimeo
    vimeo_feed = Vimeo::Simple::User.videos("user2724002")
    @items['vimeo_entries'] = vimeo_feed[0..1]
  end

  def get_twitter
    twitter_feed = Twitter.user_timeline("_greg_stewart_")
    @items['twitter_entries'] = twitter_feed[0..4]
  end

  def get_github
    github_feed = Octokit.user_events("gregstewart")
    @items['github_entries'] = github_feed[0..4]
  end

  def get_instagram
    instagram_feed = Instagram.user_recent_media(178138400)
    @items['instagram_entries'] = instagram_feed[0..5]
  end

  def get_delicious
    delicious_feed = Feed.new("http://feeds.delicious.com/v2/rss/wildcard1999")
    @items['delicious_entries'] = delicious_feed.get_last_five
  end

  def get_blog
    blog_feed = Feed.new("http://gregs.tcias.co.uk/atom.xml")
    @items['blog_entries'] = blog_feed.get_last_ten
  end
end