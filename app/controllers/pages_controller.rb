class PagesController < ApplicationController
  def home
    @title = "home"

    @wordpress_feed = Feed.new("http://gregs.tcias.co.uk/feed/")
    @wordpress_entries = @wordpress_feed.get_last_five

    @instagram_feed = Instagram.user_recent_media(178138400)
    @instagram_entries = @instagram_feed[0..4]

    @github_feed = Octokit.user_events("gregstewart")
    @github_entries = @github_feed[0..4]

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
