class PagesController < ApplicationController
  def home
    @title = "home"

    @wordpress_feed = Feed.new("http://gregs.tcias.co.uk/feed/")
    @wordpress_entries = @wordpress_feed.get_last_five

    @delicious_feed = Feed.new("http://feeds.delicious.com/v2/rss/wildcard1999")
    @delicious_entries = @delicious_feed.get_last_five

    @instagram_feed = Instagram.user_recent_media(178138400)
    @instagram_entries = @instagram_feed[0..4]

    @github_feed = Octokit.user_events("gregstewart")
    @github_entries = @github_feed[0..4]

    @twitter_feed = Twitter.user_timeline("_greg_stewart_")
    @twitter_entries = @twitter_feed[0..4]

    @vimeo_feed = Vimeo::Simple::User.videos("user2724002")
    @vimeo_entries = @vimeo_feed[0..4]

    respond_to do |format|
      format.html
    end
  end

  def portfolio
    @title = "portfolio"
    respond_to do |format|
      format.html
    end
  end

  def cv
    @title = "cv"
    respond_to do |format|
      format.html
    end
  end
end
